#!/usr/bin/env sh
#
# Install dependencies when the lock file has changed, then serve with
# live reload.
#
# /work is the landingpage/ checkout. node_modules, .astro and .cache are
# named volumes (.dev/compose.yml), so nothing the container installs or
# caches lands in the checkout. The pages it generates do, under
# src/content/docs/, listed in the .gitignore next to them, exactly as
# `just serve` on the host leaves them.

set -eu

log() { printf '  %s\n' "$*" >&2; }

# --- dependencies -----------------------------------------------------------
# The node_modules volume outlives the image, so compare against the lock
# file it was installed from rather than trusting it.
stamp=node_modules/.waterpark-lock
if ! cmp -s package-lock.json "$stamp" 2>/dev/null; then
    log "installing dependencies (package-lock.json changed)"
    npm ci --no-audit --no-fund
    cp package-lock.json "$stamp"
fi

# --- serve ------------------------------------------------------------------
# 0.0.0.0 so the proxy container can reach it; the port is not published to
# the host, so the only way in is through Caddy on :8000. That is deliberate:
# it keeps development single-origin.
log "serving on :8000"
npm run content
exec npx astro dev --host 0.0.0.0 --port 8000 "$@"
