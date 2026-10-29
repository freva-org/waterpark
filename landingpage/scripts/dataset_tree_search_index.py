#!/usr/bin/env python3
"""Crawl the buckets into a dataset-tree-search-index-v1 file."""

from __future__ import annotations

import argparse
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

import s3fs

ASSETS = Path(__file__).resolve().parent.parent / "assets"
MAX_DEPTH = 12


def listing(fs: s3fs.S3FileSystem, item: tuple) -> tuple:
    try:
        return item, fs.ls(item[0], detail=True)
    except Exception as error:
        print(f"warning: {item[0]}: {error}", file=sys.stderr)
        return item, None


def crawl(fs, bucket: str, title: str, workers: int) -> tuple[list, bool]:
    entries, complete = [], True
    level = [(bucket, [{"id": f"s3://{bucket}/", "name": title}])]
    with ThreadPoolExecutor(workers) as pool:
        for _ in range(MAX_DEPTH):
            if not level:
                break
            deeper = []
            for (_, ancestors), found in pool.map(
                lambda item: listing(fs, item), level
            ):
                if found is None:
                    complete = False
                    continue
                for obj in found:
                    key = obj["name"].rstrip("/")
                    name = key.rsplit("/", 1)[-1]
                    is_dir = obj["type"] == "directory"
                    if name.lower().endswith(".zarr"):
                        kind = "dataset"
                    elif is_dir:
                        kind = "directory"
                    else:
                        continue
                    uri = f"s3://{key}/" if is_dir else f"s3://{key}"
                    entries.append(
                        {
                            "id": uri,
                            "kind": kind,
                            "name": name,
                            "path": uri,
                            "ancestors": ancestors,
                        }
                    )
                    if kind == "directory":
                        crumb = {"id": uri, "name": name}
                        deeper.append((key, [*ancestors, crumb]))
            level = deeper
    return entries, complete and not level


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--endpoint", default="https://s3.waterpark.dkrz.de")
    ap.add_argument(
        "--buckets", type=Path, default=ASSETS / "waterpark-datasets.json"
    )
    ap.add_argument(
        "--out", type=Path, default=ASSETS / "dataset-tree-search-index.json"
    )
    ap.add_argument("--workers", type=int, default=16)
    args = ap.parse_args()

    fs = s3fs.S3FileSystem(
        anon=True,
        use_listings_cache=False,
        client_kwargs={"endpoint_url": args.endpoint},
    )
    meta = json.loads(args.buckets.read_text())
    entries, complete = [], True
    for bucket in meta["buckets"]:
        info = meta.get("datasets", {}).get(bucket) or {}
        if info.get("locked"):
            continue
        title = info.get("title") or bucket
        found, ok = crawl(fs, bucket, title, args.workers)
        print(f"{bucket}: {len(found)} entries", file=sys.stderr)
        entries += found
        complete &= ok
    entries.sort(key=lambda entry: entry["id"])

    try:
        old = json.loads(args.out.read_text())
    except (OSError, ValueError):
        old = {}
    if old.get("entries") == entries and old.get("complete") == complete:
        print("search index is up to date", file=sys.stderr)
        return
    if len(entries) < 0.8 * len(old.get("entries", [])):
        raise SystemExit(
            f"refusing to shrink the index from {len(old['entries'])} "
            f"to {len(entries)} entries"
        )

    head = {
        "schemaVersion": 1,
        "generatedAt": datetime.now(timezone.utc).strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        ),
        "source": args.endpoint,
        "complete": complete,
    }
    lines = ",\n".join(json.dumps(e, separators=(",", ":")) for e in entries)
    body = json.dumps(head)[:-1] + ', "entries": [\n' + lines + "\n]}\n"
    args.out.write_text(body)
    print(f"wrote {args.out} ({len(entries)} entries)", file=sys.stderr)


if __name__ == "__main__":
    main()
