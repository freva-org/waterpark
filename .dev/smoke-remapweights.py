import base64
import json
import secrets
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import netCDF4
import numpy as np

KC = "http://localhost:8080/realms/waterpark/protocol/openid-connect/token"
API = "http://localhost:8000/api/v1/remapweights"
DOCS = "http://localhost:8000/api/v1/docs"


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def call(url, data=None, token=None, method=None):
    request = urllib.request.Request(url, data=data, method=method)
    if token:
        request.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.build_opener(NoRedirect).open(request, timeout=60) as r:
            return r.status, r.headers, r.read()
    except urllib.error.HTTPError as exc:
        return exc.code, exc.headers, exc.read()


def wait(url, data=None, seconds=180):
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        try:
            status, _, body = call(url, data)
            if status == 200:
                return body
        except urllib.error.URLError:
            pass
        time.sleep(2)
    sys.exit(f"{url} not ready after {seconds}s")


def token(user, client="waterpark-cli"):
    form = {"client_id": client, "grant_type": "password"}
    form |= {"username": user, "password": user}
    return json.loads(wait(KC, urllib.parse.urlencode(form).encode()))["access_token"]


def weights(path, grid, shift):
    n_b, n_a = 48, 20
    row = np.repeat(np.arange(1, n_b + 1), 2)
    with netCDF4.Dataset(path, "w") as ds:
        ds.createDimension("n_s", row.size)
        ds.createVariable("row", "i4", ("n_s",))[:] = row
        ds.createVariable("col", "i4", ("n_s",))[:] = (row + shift) % n_a + 1
        ds.createVariable("S", "f8", ("n_s",))[:] = 0.5
        ds.setncatts(
            dict(
                source_grid_hash=grid,
                ellipsoid="sphere",
                grid_doctor_level=1,
                grid_doctor_method="conservative",
                grid_doctor_ignore_unmapped=1,
                grid_doctor_order="nested",
                grid_doctor_source_size=n_a,
            )
        )
    return path.read_bytes()


def expect(what, got, want):
    print(f"{what:<34} {got}")
    if got != want:
        sys.exit(f"expected {want}")


alice, bob = token("alice"), token("bob")
wait(DOCS)
grid = secrets.token_hex(32)
tmp = Path(tempfile.mkdtemp())
good, other = weights(tmp / "a.nc", grid, 0), weights(tmp / "b.nc", grid, 1)

expect("upload without token", call(API, good)[0], 401)
foreign = token("alice", "waterpark-other")
aud = json.loads(base64.urlsafe_b64decode(foreign.split(".")[1] + "==")).get("aud")
aud = [aud] if isinstance(aud, str) else aud or []
expect("other client's token lacks API aud", "waterpark-api" in aud, False)
expect("upload with that token", call(API, good, foreign)[0], 401)
expect("token with a broken signature", call(API, good, alice[:-6] + "AAAAAA")[0], 401)
expect("upload as bob", call(API, good, bob)[0], 403)
status, _, body = call(API, good, alice)
expect("upload as alice", status, 201)
key = json.loads(body)["key"]
expect("same file again", call(API, good, alice)[0], 200)
expect("different file, same key", call(API, other, alice)[0], 409)

status, headers, _ = call(f"{API}/{key}")
expect("download", status, 302)
location = headers["Location"]
expect("file behind the redirect", call(location)[2] == good, True)
expect("anonymous write to Versity", call(location, other, method="PUT")[0], 403)

race = weights(tmp / "r.nc", secrets.token_hex(32), 0)
with ThreadPoolExecutor(4) as pool:
    codes = sorted(pool.map(lambda _: call(API, race, alice)[0], range(4)))
print(f"{'4 parallel uploads, same file':<34} {codes}")
expect(
    "exactly one created", codes.count(201) == 1 and set(codes) <= {200, 201, 503}, True
)
