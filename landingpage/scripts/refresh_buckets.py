#!/usr/bin/env python3
"""
Refresh assets/waterpark-datasets.json from the live bucket listing.

This script used to also rewrite the theme override to inject an
announcement banner. It no longer does. Announcements are operational
state and are served at runtime from /api/announcements, backed by a TOML
file on the host; see waterpark_api/announcements.py. Two consequences of
the old design are worth remembering:

  * data/overrides/main.html was written wholesale, so anything else added
    to that template was silently deleted on the next refresh;
  * clearing a banner required finding and triggering *this* workflow,
    which is not where anyone would look for it.

What is left here is genuinely build-time input: the set of buckets that
exist, which the dataset tree renders.
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
# scripts/ sits next to assets/ since the docs tree was flattened; this
# used to be HERE.parent.parent / "docs" / "assets".
DEFAULT_OUT = HERE.parent / "assets" / "waterpark-datasets.json"

logger = logging.getLogger(__name__)


def list_buckets(endpoint: str, key: str, secret: str) -> set[str]:
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
            continue
    if not names:
        raise SystemExit(
            f"could not list buckets from {endpoint} "
            "(check admin credentials / gateway permissions)"
        )
    return set(names)


def main() -> None:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("--endpoint", default="https://s3.waterpark.dkrz.de")
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    ap.add_argument(
        "--check",
        action="store_true",
        help="Report what would change and exit non-zero, without writing.",
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
    buckets = list_buckets(args.endpoint, key, secret) - blacklist

    existing: dict = {}
    if args.out.exists():
        try:
            existing = json.loads(args.out.read_text()).get("datasets", {})
        except (json.JSONDecodeError, OSError) as error:
            logger.warning("ignoring unreadable %s: %s", args.out, error)
            existing = {}

    # Keep hand-written descriptions, add new buckets bare, drop the rest.
    datasets = {b: existing.get(b, {"title": b}) for b in sorted(buckets)}

    added = sorted(buckets - set(existing))
    removed = sorted(set(existing) - buckets)

    # `buckets` is a set, which json.dumps cannot serialise: the previous
    # version raised TypeError here and never wrote the file. Sorting also
    # makes the output stable, so an unchanged listing produces no diff.
    payload = {"buckets": sorted(buckets), "datasets": datasets}
    body = json.dumps(payload, indent=2) + "\n"

    current = args.out.read_text() if args.out.exists() else None
    if args.check:
        if current == body:
            print("dataset listing is up to date", file=sys.stderr)
            return
        print(f"{args.out} is stale", file=sys.stderr)
        if added:
            print(f"  would add: {', '.join(added)}", file=sys.stderr)
        if removed:
            print(f"  would remove: {', '.join(removed)}", file=sys.stderr)
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
