import os
from pathlib import Path

os.environ.update(
    WATERPARK_DB_TYPE="sqlite",
    WATERPARK_DB_NAME="/tmp/anntest/db",
    WATERPARK_ANNOUNCEMENTS_PATH="/tmp/anntest/ann.toml",
    DEBUG="0",
)

from fastapi.testclient import TestClient
from waterpark_api import announcements as A
from waterpark_api.main import app

with TestClient(app) as c:
    r = c.get("/api/announcements")
    ids = [a["id"] for a in r.json()["announcements"]]
    assert ids == ["s3-maintenance"], ids
    print("only the live entry served; expired/future/invalid dropped   OK")
    assert r.headers["cache-control"] == "public, max-age=60"
    print("cache-control set                                            OK")

    # edit the file -> picked up without a restart
    p = Path("/tmp/anntest/ann.toml")
    p.write_text(
        '[[announcement]]\nid = "new"\ntext = "Edited live."\n'
        "expires = 2099-01-01T00:00:00Z\n"
    )
    ids = [a["id"] for a in c.get("/api/announcements").json()["announcements"]]
    assert ids == ["new"], ids
    print("file edit picked up with no restart                          OK")

    # broken TOML keeps serving the last good parse
    p.write_text('[[announcement]\nid = "oops"')
    ids = [a["id"] for a in c.get("/api/announcements").json()["announcements"]]
    assert ids == ["new"], ids
    print("malformed file falls back to last good parse                 OK")

    # missing file is simply "no announcements"
    p.unlink()
    A._CACHE.clear()
    assert c.get("/api/announcements").json() == {"announcements": []}
    print("missing file -> empty list, no error                         OK")

    # naive TOML datetime is treated as UTC, not server-local
    p.write_text(
        '[[announcement]]\nid = "naive"\ntext = "x"\nexpires = 2099-01-01T00:00:00\n'
    )
    a = c.get("/api/announcements").json()["announcements"][0]
    assert a["expires"].endswith("+00:00") or "Z" in a["expires"], a["expires"]
    print("naive datetime normalised to UTC                             OK")
print("\nannouncement checks passed")
