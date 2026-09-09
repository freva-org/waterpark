#!/usr/bin/env python3
"""
Refresh assets/waterpark-datasets.json from the live bucket listing.

Announcements are operational state and are served at runtime from
/api/announcements. This script only maintains the build-time bucket listing
used by the dataset tree.
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import sys
from pathlib import Path

import s3fs

HERE = Path(__file__).resolve().parent
DEFAULT_OUT = HERE.parent / "assets" / "waterpark-datasets.json"
logger = logging.getLogger(__name__)


def list_buckets(endpoint: str, key: str, secret: str) -> list[str]:
    fs = s3fs.S3FileSystem(
        key=key, secret=secret, client_kwargs={"endpoint_url": endpoint}
    )
    names: list[str] = []
    for root in ("", "/"):
        try:
            items = fs.ls(root, detail=False)
            names = [i.strip("/").split("/")[-1] for i in items if i.strip("/")]
            if names:
                break
        except Exception as error:
            logger.debug("listing %r failed: %s", root, error)
    if not names:
        raise SystemExit(
            f"could not list buckets from {endpoint} "
            "(check admin credentials / gateway permissions)"
        )
    return sorted(names)


def main() -> None:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("--endpoint", default="https://s3.waterpark.dkrz.de")
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    ap.add_argument(
        "--check",
        action="store_true",
        help="Report whether the generated dataset listing is stale.",
    )
    args = ap.parse_args()

    key = os.environ.get("WATERPARK_S3_KEY")
    secret = os.environ.get("WATERPARK_S3_SECRET")
    if not key or not secret:
        raise SystemExit(
            "set WATERPARK_S3_KEY and WATERPARK_S3_SECRET in the environment"
        )

    blacklist = {
        b.strip()
        for b in os.environ.get("WATERPARK_BUCKET_BLACKLIST", "").split(",")
        if b.strip()
    }
    buckets = [
        b
        for b in list_buckets(args.endpoint, key, secret)
        if b not in blacklist
    ]

    existing: dict = {}
    if args.out.exists():
        try:
            existing = json.loads(args.out.read_text()).get("datasets", {})
        except (json.JSONDecodeError, OSError) as error:
            logger.warning("ignoring unreadable %s: %s", args.out, error)

    datasets = {b: existing.get(b, {"title": b}) for b in buckets}
    added = [b for b in buckets if b not in existing]
    removed = [b for b in existing if b not in buckets]

    payload = {"buckets": buckets, "datasets": datasets}
    body = json.dumps(payload, indent=2) + "\n"
    current = args.out.read_text() if args.out.exists() else None

    if args.check:
        if current == body:
            print("dataset listing is up to date", file=sys.stderr)
            return
        print(f"{args.out} is stale", file=sys.stderr)
        if added:
            print(f"would add: {', '.join(added)}", file=sys.stderr)
        if removed:
            print(f"would remove: {', '.join(removed)}", file=sys.stderr)
        raise SystemExit(1)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(body)

    print(f"wrote {args.out}  ({len(buckets)} buckets)", file=sys.stderr)
    if added:
        print(f"added (no description): {', '.join(added)}", file=sys.stderr)
    if removed:
        print(f"removed: {', '.join(removed)}", file=sys.stderr)


if __name__ == "__main__":
    main()
