import asyncio
import hashlib
import logging
import os
import re
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import boto3
import netCDF4
import numpy as np
from botocore.config import Config
from botocore.exceptions import ClientError
from litestar import Request, Response, Router, get, post
from litestar.di import NamedDependency
from litestar.exceptions import (
    HTTPException,
    NotFoundException,
    PermissionDeniedException,
    ServiceUnavailableException,
)
from litestar.openapi.spec import (
    OpenAPIFormat,
    OpenAPIMediaType,
    OpenAPIType,
    Operation,
    RequestBody,
    Schema,
)
from litestar.params import FromPath
from litestar.response import Redirect
from py_oidc_auth import IDToken, LitestarOIDCAuth

AUDIENCE = os.environ.get("OIDC_AUDIENCE", "waterpark-api")
ROLE = os.environ.get("REMAPWEIGHTS_ROLE", "remapweights-contributor")
BUCKET = os.environ.get("REMAPWEIGHTS_BUCKET", "remapweights")
PUBLIC_URL = os.environ.get(
    "REMAPWEIGHTS_PUBLIC_URL", os.environ.get("AWS_ENDPOINT_URL", "")
).rstrip("/")
MAX_BYTES = int(os.environ.get("REMAPWEIGHTS_MAX_MB", "4096")) * 2**20
MAX_LEVEL = int(os.environ.get("REMAPWEIGHTS_MAX_LEVEL", "10"))
MAX_NNZ = int(os.environ.get("REMAPWEIGHTS_MAX_NNZ", "500000000"))
MAX_UPLOADS = int(os.environ.get("REMAPWEIGHTS_MAX_UPLOADS", "2"))
CHUNK = 2**23
TOL = 1e-6

# TODO(grid-doctor#86, #87): "v0" is the placeholder key schema; move to "v1"
# with the agreed contract and wipe v0.
PREFIX = "v0"
KEY = re.compile(
    r"v0/[0-9a-f]{64}/hpx\d{1,2}/sphere/(conservative|nearest)-ignore_unmapped=[01]"
)

auth = LitestarOIDCAuth(
    client_id=AUDIENCE,
    discovery_url=os.environ.get("OIDC_DISCOVERY_URL", ""),
    audience=AUDIENCE,
)
s3 = boto3.client("s3", config=Config(s3={"addressing_style": "path"}))
netcdf = ThreadPoolExecutor(max_workers=1)
logger = logging.getLogger(__name__)
uploads = asyncio.Semaphore(max(MAX_UPLOADS, 1))
running: set[asyncio.Task] = set()


def check_config() -> None:
    if not (
        urlparse(PUBLIC_URL).scheme in ("http", "https")
        and urlparse(PUBLIC_URL).hostname
        and 0 <= MAX_LEVEL <= 11
        and 0 < MAX_BYTES <= 5 * 2**30
        and MAX_NNZ > 0
        and MAX_UPLOADS > 0
    ):
        raise RuntimeError(
            "REMAPWEIGHTS_PUBLIC_URL must be an http(s) URL, REMAPWEIGHTS_MAX_LEVEL "
            "0-11, REMAPWEIGHTS_MAX_MB 1-5120, REMAPWEIGHTS_MAX_NNZ and "
            "REMAPWEIGHTS_MAX_UPLOADS positive"
        )


def invalid(detail: str) -> HTTPException:
    return HTTPException(status_code=422, detail=detail)


def url(key: str) -> str:
    return f"{PUBLIC_URL}/{BUCKET}/{key}.nc"


def stored(key: str) -> dict[str, str] | None:
    try:
        return s3.head_object(Bucket=BUCKET, Key=f"{key}.nc")["Metadata"]
    except ClientError as exc:
        if exc.response["Error"]["Code"] in ("404", "NoSuchKey", "NotFound"):
            return None
        raise


def same(metadata: dict[str, str] | None, sha256: str) -> int:
    if (metadata or {}).get("sha256") != sha256:
        raise HTTPException(status_code=409, detail="a different file has this key")
    return 200


def number(attrs: dict[str, Any], name: str, low: int, high: int) -> int:
    value = np.asarray(attrs.get(name))
    if (
        value.shape != ()
        or value.dtype.kind not in "iuf"
        or not np.isfinite(value)
        or value % 1
        or not low <= value <= high
    ):
        raise invalid(f"{name} must be a whole number between {low} and {high}")
    return int(value)


def text(attrs: dict[str, Any], name: str) -> str:
    if not isinstance(attrs.get(name), str):
        raise invalid(f"{name} must be a string attribute")
    return attrs[name]


# TODO(grid-doctor#87): attribute names, allowed values and the way options
# are written into the key are placeholders until the contract is agreed.
def label(attrs: dict[str, Any]) -> tuple[str, int, str, int]:
    level = number(attrs, "grid_doctor_level", 0, MAX_LEVEL)
    unmapped = number(attrs, "grid_doctor_ignore_unmapped", 0, 1)
    method = text(attrs, "grid_doctor_method")
    if text(attrs, "grid_doctor_order") != "nested":
        raise invalid("grid_doctor_order must be 'nested'")
    key = (
        f"{PREFIX}/{text(attrs, 'source_grid_hash')}/hpx{level}/"
        f"{text(attrs, 'ellipsoid')}/{method}-ignore_unmapped={unmapped}"
    )
    if not KEY.fullmatch(key):
        raise invalid(
            "source_grid_hash must be 64 lowercase hex characters, "
            "ellipsoid 'sphere', grid_doctor_method 'conservative' or 'nearest'"
        )
    return key, level, method, unmapped


def read(var: netCDF4.Variable, start: int) -> np.ndarray:
    data = var[start : start + CHUNK]
    if np.ma.is_masked(data):
        raise invalid(f"{var.name} contains missing values")
    return np.ma.getdata(data)


def validate(ds: netCDF4.Dataset, level: int, method: str, unmapped: int) -> None:
    for name, kind in (("row", "iu"), ("col", "iu"), ("S", "f")):
        var = ds.variables.get(name)
        if var is None or var.ndim != 1 or var.dtype.kind not in kind:
            raise invalid("row and col must be 1-D integers, S 1-D floating point")
        if {"scale_factor", "add_offset"} & set(var.ncattrs()):
            raise invalid(f"{name} must not be packed")
    nnz = ds["S"].shape[0]
    if not 0 < nnz <= MAX_NNZ or ds["row"].shape[0] != nnz or ds["col"].shape[0] != nnz:
        raise invalid(f"row, col and S must have the same length, 1 to {MAX_NNZ}")

    n_b = 12 * 4**level
    if "n_b" in ds.dimensions and ds.dimensions["n_b"].size != n_b:
        raise invalid(f"n_b must be {n_b} for HEALPix level {level}")
    sizes = set()
    if "grid_doctor_source_size" in ds.ncattrs():
        sizes.add(number(ds.__dict__, "grid_doctor_source_size", 1, 2**31 - 1))
    if "n_a" in ds.dimensions:
        sizes.add(ds.dimensions["n_a"].size)
    if len(sizes) != 1:
        raise invalid("give n_a or grid_doctor_source_size; if both, they must agree")
    n_a = sizes.pop()

    totals, covered = np.zeros(n_b), np.zeros(n_b, dtype=bool)
    nonzero = False
    for start in range(0, nnz, CHUNK):
        row, col, weights = (read(ds[n], start) for n in ("row", "col", "S"))
        if row.min() < 1 or row.max() > n_b or col.min() < 1 or col.max() > n_a:
            raise invalid(f"row must be in [1, {n_b}] and col in [1, {n_a}]")
        if not np.isfinite(weights).all() or weights.min() < 0:
            raise invalid("S must be finite and non-negative")
        if method == "nearest" and np.abs(weights - 1).max() > TOL:
            raise invalid("nearest weights must all be 1")
        np.add.at(totals, row - 1, weights)
        covered[row[weights > 0] - 1] = True
        nonzero = nonzero or bool(weights.any())
    if not nonzero:
        raise invalid("S has no non-zero weights")
    if totals.max() > 1 + TOL:
        raise invalid("weights of a destination cell must sum to at most 1")
    if not unmapped and not covered.all():
        raise invalid("grid_doctor_ignore_unmapped is 0 but cells are unmapped")


def inspect(path: Path, full: bool) -> str:
    try:
        with netCDF4.Dataset(path) as ds:
            key, level, method, unmapped = label(ds.__dict__)
            if full:
                validate(ds, level, method, unmapped)
    except HTTPException:
        raise
    except Exception as exc:
        raise invalid(f"not a readable netCDF weight file: {exc}")
    return key


def store(path: Path, key: str, sha256: str, token: IDToken) -> int:
    # TODO(grid-doctor#86): recompute source_grid_hash from the file and
    # reject a mismatch.
    for attempt in range(3):
        try:
            with path.open("rb") as body:
                s3.put_object(
                    Bucket=BUCKET,
                    Key=f"{key}.nc",
                    Body=body,
                    ContentType="application/x-netcdf",
                    Metadata={
                        "uploader-iss": str(token.iss),
                        "uploader-sub": str(token.sub),
                        "sha256": sha256,
                    },
                    IfNoneMatch="*",
                )
            return 201
        except ClientError as exc:
            code = exc.response["Error"]["Code"]
            if code == "PreconditionFailed":
                break
            if code != "ConditionalRequestConflict" or attempt == 2:
                raise
            time.sleep(attempt + 1)
    return same(stored(key), sha256)


async def ingest(request: Request, token: IDToken) -> tuple[int, str]:
    try:
        digest, buffer = hashlib.sha256(), bytearray()
        with tempfile.NamedTemporaryFile(suffix=".nc") as tmp:
            async for chunk in request.stream():
                digest.update(chunk)
                buffer += chunk
                if len(buffer) >= CHUNK or not chunk:
                    await asyncio.to_thread(tmp.write, bytes(buffer))
                    buffer.clear()
            await asyncio.to_thread(tmp.flush)
            path, sha256 = Path(tmp.name), digest.hexdigest()
            loop = asyncio.get_running_loop()
            key = await loop.run_in_executor(netcdf, inspect, path, False)
            existing = await asyncio.to_thread(stored, key)
            if existing is not None:
                return same(existing, sha256), key
            await loop.run_in_executor(netcdf, inspect, path, True)
            return await asyncio.to_thread(store, path, key, sha256, token), key
    finally:
        uploads.release()


def finished(task: asyncio.Task) -> None:
    running.discard(task)
    if task.cancelled():
        return
    exc = task.exception()
    if exc is not None and not isinstance(exc, HTTPException):
        logger.error("upload failed", exc_info=exc)


async def drain() -> None:
    await asyncio.gather(*running, return_exceptions=True)
    netcdf.shutdown()


async def admit(request: Request, token: IDToken) -> tuple[int, str]:
    if uploads.locked():
        raise ServiceUnavailableException(detail="too many uploads, retry later")
    await uploads.acquire()
    task = asyncio.ensure_future(ingest(request, token))
    running.add(task)
    task.add_done_callback(finished)
    return await asyncio.shield(task)


@dataclass
class NetCDFBody(Operation):
    def __post_init__(self) -> None:
        binary = Schema(type=OpenAPIType.STRING, format=OpenAPIFormat.BINARY)
        self.request_body = RequestBody(
            required=True,
            content={"application/x-netcdf": OpenAPIMediaType(schema=binary)},
        )


@post(
    "/",
    dependencies={"token": auth.required()},
    request_max_body_size=MAX_BYTES,
    security=[{"bearer": []}],
    operation_class=NetCDFBody,
)
async def upload(
    request: Request, token: NamedDependency[IDToken]
) -> Response[dict[str, str]]:
    """Upload an ESMF weight file as the raw request body.

    Needs the contributor role. Answers 201 for a new file, 200 if the same
    file is already registered, 409 if a different file has the same key,
    422 if the file is rejected and 503 if too many uploads are running.
    """
    roles = ((token.resource_access or {}).get(AUDIENCE) or {}).get("roles") or []
    if ROLE not in roles or not (token.iss and token.sub and token.exp):
        raise PermissionDeniedException(
            detail=f"requires client role {ROLE!r} of {AUDIENCE!r}"
        )
    status, key = await admit(request, token)
    return Response({"key": key, "url": url(key)}, status_code=status)


@get("/{key:path}")
async def download(key: FromPath[str]) -> Redirect:
    """Redirect to the public URL of a weight file. No login needed."""
    key = key.strip("/")
    if not KEY.fullmatch(key) or await asyncio.to_thread(stored, key) is None:
        raise NotFoundException(detail=f"no remapping weights for {key!r}")
    return Redirect(url(key))


router = Router(path="/api/v1/remapweights", route_handlers=[upload, download])
