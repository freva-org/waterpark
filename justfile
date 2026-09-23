# Waterpark workspace.
#
#   just            list every recipe
#   just dev        the whole stack, Ctrl-C stops it
#
# Everything runs in containers behind a proxy on :8000, so development is
# same-origin exactly like production behind nginx. Source is bind-mounted
# read-only with live reload on the docs; everything the containers write
# goes to named volumes, so nothing lands root-owned in your checkout under
# rootless podman or rootless docker.
#
# COMPOSE picks the tool: `docker compose` by default, or
#   COMPOSE=podman-compose just dev
# Export it once in your shell if you always use the same one.

set shell := ["bash", "-euo", "pipefail", "-c"]

# The docs site, one directory down. `just site::serve` from here, or plain
# `just serve` inside landingpage/.
mod site 'landingpage'

compose := env("COMPOSE", "docker compose") + " -f .dev/compose.yml"
seed := ".dev/postgres/init/00-listmonk.sql"

[private]
default:
    @just --list --list-submodules
    @echo
    @echo "  site     http://localhost:8000"
    @echo "  mailbox  http://localhost:8000/mailbox/  (catches every mail)"
    @echo "  lists    http://localhost:8000/lists/    (listmonk admin)"
    @echo
    @echo "  No setup needed. Mail is caught, not delivered. Details in README.md."
    @echo "  Using podman?  COMPOSE=podman-compose just dev"

# --- the stack --------------------------------------------------------------

# Run the whole stack in the foreground (Ctrl-C stops it)
[group('stack')]
dev:
    {{ compose }} up --build

# Same, but in the background
[group('stack')]
up:
    {{ compose }} up --build -d
    @echo "site    http://localhost:8000"
    @echo "mailbox http://localhost:8000/mailbox/"

# Stop the stack, keeping volumes
[group('stack')]
down:
    {{ compose }} down

# Show what is running
[group('stack')]
ps:
    {{ compose }} ps

# Follow logs, of everything or of one service: just logs docs
[group('stack')]
logs service="":
    {{ compose }} logs -f {{ service }}

# Open a shell in a service (default: docs)
[group('stack')]
shell service="docs":
    {{ compose }} exec {{ service }} /bin/sh

# Restart services, e.g. after adding a new docs page: just restart docs
[group('stack')]
restart +services:
    {{ compose }} restart {{ services }}

# Rebuild images from scratch, ignoring the layer cache
[group('stack')]
rebuild:
    {{ compose }} build --no-cache

# --- inspecting -------------------------------------------------------------

# List what the mailbox has caught, without opening the UI
[group('inspect')]
mail:
    #!/usr/bin/env bash
    set -euo pipefail
    echo "### what listmonk logged"
    {{ compose }} logs listmonk 2>&1 | grep -iE "mail|smtp|subscri" | tail -15 || echo "  nothing logged"
    echo
    echo "### what mailpit actually holds"
    if curl -fsS http://localhost:8000/mailbox/api/v1/messages 2>/dev/null \
       | python3 -c "import json,sys; d=json.load(sys.stdin); print('  total:', d.get('total', 0)); [print('  -', m.get('Subject'), '->', ', '.join(a.get('Address','') for a in m.get('To', []))) for m in d.get('messages', [])[:10]]"; then
      echo
      echo "  open it at http://localhost:8000/mailbox/"
    else
      echo "  could not reach the mailpit API through the proxy."
      echo "  If the web UI 404s too, MP_WEBROOT is not taking effect; check with:"
      echo "    {{ compose }} exec proxy wget -qO- http://mailbox:8025/mailbox/api/v1/messages"
      echo "    {{ compose }} exec proxy wget -qO- http://mailbox:8025/api/v1/messages"
    fi

# Dump everything needed to diagnose a broken stack
[group('inspect')]
doctor:
    #!/usr/bin/env bash
    set -uo pipefail
    echo "### compose config (ports as actually parsed)"
    {{ compose }} config 2>&1 | sed -n '1,60p'
    echo
    echo "### containers"
    {{ compose }} ps -a
    echo
    echo "### published port"
    {{ compose }} port proxy 80 2>&1 || true
    echo
    for svc in proxy docs listmonk mailbox; do
      echo "### logs: $svc"
      {{ compose }} logs --tail 40 "$svc" 2>&1
      echo
    done
    echo "### what mkdocs is actually serving from"
    {{ compose }} exec -T docs sh -c 'ls -la /work/.build/data | head -20' 2>&1 || true

# Seed a local announcement so the banner can be tested (expires in 4h)
[group('inspect')]
announce:
    #!/usr/bin/env bash
    set -euo pipefail
    target="${WATERPARK_ANNOUNCEMENTS_PATH:-{{ justfile_directory() }}/.dev/announcements/announcements.json}"
    mkdir -p "$(dirname "$target")"
    expires=$(python3 -c "import datetime as d; print((d.datetime.now(d.timezone.utc)+d.timedelta(hours=4)).strftime('%Y-%m-%dT%H:%M:%SZ'))")
    id=$(python3 -c "from uuid import uuid1; print(uuid1())")
    cat > "$target" <<EOT
    {"announcements": [{"id": "$id", "level": "info", "text": "Want to stay tuned? Subscribe to our newsletter!", "starts": "2020-09-02T08:00:00Z", "expires": "$expires", "link": "/newsletter/", "link_text": "Subscribe to updates"}]}
    EOT
    echo "wrote $target, expires $expires"
    echo "remove it again with: rm $target"

# --- quality ----------------------------------------------------------------

# Install the pre-commit hooks (once per clone)
[group('quality')]
hooks:
    python3 -m pip install --quiet pre-commit
    pre-commit install
    @echo "installed. Bypass one with SKIP=<id>, all with git commit --no-verify"

# Run the pre-commit hooks over the whole tree
[group('quality')]
lint:
    pre-commit run --all-files

# Everything CI runs for the docs
[group('quality')]
check: site::check

# --- state ------------------------------------------------------------------

# The whole database, so the list UUID in the compose file survives a
# rebuild along with the settings.

# Save listmonk's current settings and lists as the dev seed
[group('state')]
seed-dump:
    {{ compose }} exec -T postgres \
      pg_dump --clean --if-exists --no-owner --no-privileges -U listmonk listmonk \
      > {{ seed }}
    @echo "wrote {{ seed }} ($(wc -l < {{ seed }}) lines)"
    @echo "commit it, then 'just nuke && just up' to check it restores"

# Stop the stack and remove its images, KEEPING the database
[group('state')]
clean: && site::clean
    {{ compose }} down --rmi local
    @echo "cleaned. The database volume is intact; 'just nuke' drops it."

# Delete everything including the database volume
[group('state')]
nuke:
    #!/usr/bin/env bash
    # Separate from `clean` on purpose: this discards listmonk's settings,
    # lists and subscribers. Without a committed seed dump the list UUID
    # changes and the signup form stops working until WP_LIST_UUID in the
    # compose file is updated to match.
    #
    # A hand-rolled prompt rather than [confirm]: the seed warning has to be
    # shown before the question, and a y/N is too easy to fat-finger here.
    set -euo pipefail
    echo "This deletes the listmonk database, including its settings."
    if [ ! -s {{ seed }} ]; then
      echo "There is no seed dump, so nothing will be restored." >&2
      echo "Run 'just seed-dump' first if you want to keep the settings." >&2
    fi
    read -r -p "Type yes to continue: " reply
    [ "$reply" = "yes" ] || exit 1
    {{ compose }} down --volumes --rmi local
    echo "gone"
