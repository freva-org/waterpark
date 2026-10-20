#!/usr/bin/env sh
#
# Assemble the flat docs_dir mkdocs needs, then serve with live reload.
#
# data/, shared/ and assets/ are three separate read-only mounts, but
# mkdocs wants one directory. This is the container equivalent of the
# [docs-prep] block in tox.ini, and it uses symlinks (cp -as) rather than
# copies for the same reason that does: mkdocs watches the source trees and
# reads through .build, so a copy would serve stale content after an edit.

set -eu

BUILD=/work/.build
DATA="$BUILD/data"

log() { printf '  %s\n' "$*" >&2; }

# --- assemble ---------------------------------------------------------------
# The mountpoint itself cannot be removed, only its contents.
find "$BUILD" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
mkdir -p "$DATA/assets"

cp -as /work/data/. "$DATA/"
cp -as /work/shared/. "$DATA/"
cp -as /work/assets/. "$DATA/assets/"

# --- serve ------------------------------------------------------------------
# 0.0.0.0 so the proxy container can reach it; the port is not published to
# the host, so the only way in is through Caddy on :8000. That is deliberate:
# it keeps development single-origin.
#
# --watch on the sources, not on .build, which holds only symlinks to them.
log "serving on :8000"
exec mkdocs serve \
    --dev-addr 0.0.0.0:8000 \
    --watch /work/data \
    --watch /work/shared \
    --watch /work/assets \
    "$@"
