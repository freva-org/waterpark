import asyncio
import importlib
import tempfile
import threading

import netCDF4
import numpy as np
import pytest
import remapweights as rw
from botocore.exceptions import ClientError
from litestar import Litestar
from litestar.exceptions import HTTPException
from litestar.testing import TestClient
from py_oidc_auth import IDToken
from py_oidc_auth.exceptions import InvalidRequest

LEVEL, N_A = 1, 20
N_B = 12 * 4**LEVEL
ROW = np.repeat(np.arange(1, N_B + 1), 2)
COL = np.resize(np.arange(1, N_A + 1), ROW.size)
ATTRS = dict(
    source_grid_hash="a" * 64,
    ellipsoid="sphere",
    grid_doctor_level=LEVEL,
    grid_doctor_method="conservative",
    grid_doctor_ignore_unmapped=1,
    grid_doctor_order="nested",
    grid_doctor_source_size=N_A,
)
KEY = f"v0/{'a' * 64}/hpx1/sphere/conservative-ignore_unmapped=1"


def weights(path, row=ROW, col=COL, S=None, packed=False, **attrs):
    S = np.full(row.size, 0.5) if S is None else S
    with netCDF4.Dataset(path, "w") as ds:
        ds.createDimension("n_s", row.size)
        for name, data, dtype in (
            ("row", row, "i4"),
            ("col", col, "i4"),
            ("S", S, "f8"),
        ):
            ds.createVariable(name, dtype, ("n_s",))[:] = data
        ds.setncatts({k: v for k, v in {**ATTRS, **attrs}.items() if v is not None})
        if packed:
            ds["S"].scale_factor = 1.0
    return path


class FakeS3:
    def __init__(self):
        self.objects, self.conflicts = {}, 0

    def head_object(self, Bucket, Key):
        if Key not in self.objects:
            raise ClientError({"Error": {"Code": "404"}}, "HeadObject")
        return {"Metadata": self.objects[Key][1]}

    def put_object(self, Bucket, Key, Body, Metadata, IfNoneMatch, **_):
        if self.conflicts:
            self.conflicts -= 1
            raise ClientError({"Error": {"Code": "ConditionalRequestConflict"}}, "Put")
        if Key in self.objects:
            raise ClientError({"Error": {"Code": "PreconditionFailed"}}, "PutObject")
        self.objects[Key] = (Body.read(), Metadata)


async def fake_token(bearer, **_):
    if bearer is None:
        raise InvalidRequest(401, "Not authenticated")
    roles = [] if bearer == "bob" else [rw.ROLE]
    return IDToken(
        iss="test", sub=bearer, exp=1, resource_access={rw.AUDIENCE: {"roles": roles}}
    )


@pytest.fixture
def s3(monkeypatch, tmp_path):
    monkeypatch.setenv("REMAPWEIGHTS_MAX_MB", "1")
    importlib.reload(rw)
    fake = FakeS3()
    monkeypatch.setattr(rw, "s3", fake)
    monkeypatch.setattr(rw, "CHUNK", 7)
    monkeypatch.setattr(rw.time, "sleep", lambda _: None)
    monkeypatch.setattr(rw.auth, "_get_token", fake_token)
    monkeypatch.setattr(tempfile, "tempdir", str(tmp_path / "tmp"))
    (tmp_path / "tmp").mkdir()
    return fake


@pytest.fixture
def client(s3):
    with TestClient(Litestar(route_handlers=[rw.router])) as client:
        yield client


def post(client, path, token="alice"):
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    return client.post(
        "/api/v1/remapweights", content=path.read_bytes(), headers=headers
    )


def test_accepts(s3, tmp_path):
    assert rw.inspect(weights(tmp_path / "w.nc"), True) == KEY
    full = weights(tmp_path / "f.nc", grid_doctor_ignore_unmapped=0)
    assert rw.inspect(full, True).endswith("ignore_unmapped=0")
    row = np.arange(1, N_B + 1)
    nearest = weights(
        tmp_path / "n.nc",
        row,
        row % N_A + 1,
        np.ones(N_B),
        grid_doctor_method="nearest",
    )
    assert rw.inspect(nearest, True).endswith("/nearest-ignore_unmapped=1")
    half = weights(tmp_path / "h.nc", HALF, S=np.full(ROW.size, 0.25))
    assert rw.inspect(half, True) == KEY


HALF = np.repeat(np.arange(1, N_B // 2 + 1), 4)
MASKED = np.ma.masked_array(np.full(ROW.size, 0.5), mask=np.arange(ROW.size) < 3)


@pytest.mark.parametrize(
    "change",
    [
        dict(source_grid_hash=None),
        dict(source_grid_hash="xyz"),
        dict(ellipsoid="wgs84"),
        dict(grid_doctor_order="ring"),
        dict(grid_doctor_level=99),
        dict(grid_doctor_level=1.9),
        dict(grid_doctor_ignore_unmapped=0.5),
        dict(grid_doctor_source_size="many"),
        dict(grid_doctor_source_size=None),
        dict(S=np.full(ROW.size, 0.7)),
        dict(S=np.zeros(ROW.size)),
        dict(S=np.where(np.arange(ROW.size) == 0, -1e-9, 0.5)),
        dict(S=np.where(ROW == 1, 0.0, 0.5), grid_doctor_ignore_unmapped=0),
        dict(row=HALF, S=np.full(ROW.size, 0.25), grid_doctor_ignore_unmapped=0),
        dict(S=np.where(np.arange(ROW.size) == 0, np.nan, 0.5)),
        dict(S=MASKED),
        dict(packed=True),
        dict(col=np.where(np.arange(ROW.size) == 0, N_A + 1, COL)),
    ],
)
def test_rejects(s3, tmp_path, change):
    with pytest.raises(HTTPException) as exc:
        rw.inspect(weights(tmp_path / "w.nc", **change), True)
    assert exc.value.status_code == 422


NEW = dict(source_grid_hash="b" * 64)


def test_upload_and_download(client, s3, tmp_path):
    good = weights(tmp_path / "w.nc")
    other = weights(tmp_path / "o.nc", col=np.roll(COL, 1))
    assert post(client, good, token=None).status_code == 401
    assert post(client, good, token="bob").status_code == 403
    assert post(client, weights(tmp_path / "b.nc", S=MASKED)).status_code == 422
    created = post(client, good)
    assert (created.status_code, created.json()["key"]) == (201, KEY)
    assert post(client, good).status_code == 200
    assert post(client, other).status_code == 409
    s3.conflicts = 2
    assert post(client, weights(tmp_path / "n.nc", **NEW)).status_code == 201
    assert s3.objects[f"{KEY}.nc"][1]["uploader-sub"] == "alice"

    response = client.get(f"/api/v1/remapweights/{KEY}", follow_redirects=False)
    assert response.status_code == 302
    assert response.headers["location"].endswith(f"/remapweights/{KEY}.nc")
    unknown = KEY.replace("hpx1", "hpx2")
    assert client.get(f"/api/v1/remapweights/{unknown}").status_code == 404


def test_limits_and_cleanup(client, monkeypatch, tmp_path):
    big = tmp_path / "big.nc"
    big.write_bytes(b"0" * (2**20 + 1))
    assert post(client, big).status_code == 413
    monkeypatch.setattr(rw, "uploads", asyncio.Semaphore(0))
    assert post(client, weights(tmp_path / "w.nc")).status_code == 503
    assert list((tmp_path / "tmp").iterdir()) == []


def test_cancelled_upload_finishes_its_work(s3, monkeypatch, tmp_path):
    monkeypatch.setattr(rw, "uploads", asyncio.Semaphore(1))
    started, release, seen = threading.Event(), threading.Event(), {}
    real_store = rw.store

    def slow_store(path, *args):
        started.set()
        release.wait(5)
        seen["file still there"] = path.exists()
        return real_store(path, *args)

    monkeypatch.setattr(rw, "store", slow_store)
    data = weights(tmp_path / "w.nc").read_bytes()

    class Upload:
        async def stream(self):
            yield data
            yield b""

    async def main():
        call = asyncio.create_task(rw.admit(Upload(), await fake_token("alice")))
        await asyncio.to_thread(started.wait, 5)
        call.cancel()
        with pytest.raises(asyncio.CancelledError):
            await call
        assert rw.uploads.locked()
        release.set()
        await asyncio.gather(*rw.running)
        assert not rw.uploads.locked()

    asyncio.run(main())
    assert seen == {"file still there": True}
    assert f"{KEY}.nc" in s3.objects
    assert list((tmp_path / "tmp").iterdir()) == []


@pytest.mark.parametrize(
    "name, value",
    [("PUBLIC_URL", ""), ("MAX_LEVEL", 12), ("MAX_UPLOADS", 0), ("MAX_BYTES", 6 << 30)],
)
def test_check_config(monkeypatch, name, value):
    monkeypatch.setattr(rw, "PUBLIC_URL", "http://localhost:7070")
    rw.check_config()
    monkeypatch.setattr(rw, name, value)
    with pytest.raises(RuntimeError):
        rw.check_config()
