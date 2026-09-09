# Waterpark workspace.
#
#   make            list every target
#   make dev        the whole stack, Ctrl-C stops it
#
# Everything runs in containers behind a proxy on :8000, so development is
# same-origin exactly like production behind nginx. Source is bind-mounted
# read-only with live reload on both the API and the docs; everything the
# containers write goes to named volumes, so nothing lands root-owned in
# your checkout under rootless podman or rootless docker.
#
# COMPOSE picks the tool: `docker compose` by default, or
#   make dev COMPOSE="podman-compose"
# Set it once in your shell if you always use the same one.

SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
.DEFAULT_GOAL := help

API_DIR  ?= rest-api
DOCS_DIR ?= landingpage
COMPOSE  ?= docker compose
FILE     := -f .dev/compose.yml

.PHONY: help dev up down logs rebuild ps shell announce check clean nuke seed-dump doctor mail smoke hooks lint

help: ## Show this help
	@echo "Waterpark workspace"
	echo
	grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | sort \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'
	echo
	echo "  site     http://localhost:8000      (/api on the same origin)"
	echo "  mailbox  http://localhost:8000/mailbox/  (catches every mail)"
	echo
	echo "  No setup needed. Mail is caught, not delivered: read it at the"
	echo "  mailbox URL above. Details in README.md."
	echo
	echo "  Using podman?  make dev COMPOSE=podman-compose"
	echo

dev: ## Run the whole stack in the foreground (Ctrl-C stops it)
	@$(COMPOSE) $(FILE) up --build

up: ## Same, but in the background
	@$(COMPOSE) $(FILE) up --build -d
	echo "site    http://localhost:8000"
	echo "mailbox http://localhost:8000/mailbox/"

down: ## Stop the stack, keeping volumes
	@$(COMPOSE) $(FILE) down

logs: ## Follow logs; make logs S=api for one service
	@$(COMPOSE) $(FILE) logs -f $(S)

ps: ## Show what is running
	@$(COMPOSE) $(FILE) ps

shell: ## Open a shell in a service; make shell S=docs
	@$(COMPOSE) $(FILE) exec $${S:-api} /bin/sh

rebuild: ## Rebuild images from scratch, ignoring the layer cache
	@$(COMPOSE) $(FILE) build --no-cache

announce: ## Seed a test announcement so the banner can be checked
	@expires=$$(date -u -d '+2 hours' +%Y-%m-%dT%H:%M:%SZ)
	$(COMPOSE) $(FILE) exec -T api sh -c "cat > /work/.dev/announcements.toml" <<-EOF
	[[announcement]]
	id = "local-test"
	level = "warning"
	text = "This is a local test announcement. It expires in two hours."
	expires = $$expires
	EOF
	echo "seeded, expires $$expires. Remove it with:"
	echo "  $(COMPOSE) $(FILE) exec api rm /work/.dev/announcements.toml"

smoke: ## Run the end-to-end tests against the running stack
	@cd "$(API_DIR)" && WATERPARK_STACK_URL=http://localhost:8000 tox -e stack

mail: ## List what the mailbox has caught, without opening the UI
	@echo "### what the API thinks it did"
	$(COMPOSE) $(FILE) logs api 2>&1 | grep -iE "email|newsletter" | tail -15 || echo "  nothing logged"
	echo
	echo "### what mailpit actually holds"
	if curl -fsS http://localhost:8000/mailbox/api/v1/messages 2>/dev/null \
	   | python3 -c "import json,sys; d=json.load(sys.stdin); print('  total:', d.get('total', 0)); [print('  -', m.get('Subject'), '->', ', '.join(a.get('Address','') for a in m.get('To', []))) for m in d.get('messages', [])[:10]]"; then
	  echo
	  echo "  open it at http://localhost:8000/mailbox/"
	else
	  echo "  could not reach the mailpit API through the proxy."
	  echo "  If the web UI 404s too, MP_WEBROOT is not taking effect; check with:"
	  echo "    $(COMPOSE) $(FILE) exec proxy wget -qO- http://mailbox:8025/mailbox/api/v1/messages"
	  echo "    $(COMPOSE) $(FILE) exec proxy wget -qO- http://mailbox:8025/api/v1/messages"
	fi

doctor: ## Dump everything needed to diagnose a broken stack
	@echo "### compose config (ports as actually parsed)"
	$(COMPOSE) $(FILE) config 2>&1 | sed -n '1,60p'
	echo
	echo "### containers"
	$(COMPOSE) $(FILE) ps -a
	echo
	echo "### published ports"
	docker port waterpark-dev-proxy-1 2>&1 || true
	echo
	for svc in proxy docs api; do
	  echo "### logs: $$svc"
	  $(COMPOSE) $(FILE) logs --tail 40 $$svc 2>&1
	  echo
	done
	echo "### what mkdocs is actually serving from"
	$(COMPOSE) $(FILE) exec -T docs sh -c 'ls -la /work/.build/data | head -20' 2>&1 || true

hooks: ## Install the pre-commit hooks (once per clone)
	@python3 -m pip install --quiet pre-commit
	pre-commit install
	echo "installed. Bypass one with SKIP=<id>, all with git commit --no-verify"

lint: ## Run the pre-commit hooks over the whole tree
	@pre-commit run --all-files

check: ## Everything CI runs, in both repos
	@cd "$(API_DIR)" && tox -e lint,types,test
	cd "$(DOCS_DIR)" && $(MAKE) check

seed-dump: ## Save listmonk's current settings and lists as the dev seed
	@# The whole database, so the list UUID in mkdocs.yml survives a
	@# rebuild along with the settings.
	$(COMPOSE) $(FILE) exec -T postgres \
	  pg_dump --clean --if-exists --no-owner --no-privileges -U listmonk listmonk \
	  > .dev/postgres/init/00-listmonk.sql
	echo "wrote .dev/postgres/init/00-listmonk.sql ($$(wc -l < ./dev/postgres/init/00-listmonk.sql) lines)"
	echo "commit it, then 'make nuke && make up' to check it restores"

clean: ## Stop the stack and remove its images, KEEPING the database
	@$(COMPOSE) $(FILE) down --rmi local
	cd "$(DOCS_DIR)" && $(MAKE) clean
	echo "cleaned. The database volume is intact; 'make nuke' drops it."

nuke: ## Delete everything including the database volume
	@# Separate from `clean` on purpose: this discards listmonk's settings,
	@# lists and subscribers. Without a committed seed dump the list UUID
	@# changes and the signup form stops working until mkdocs.yml is
	@# updated to match.
	echo "This deletes the listmonk database, including its settings."
	if [ ! -s dev/postgres/init/00-listmonk.sql ]; then
	  echo "There is no seed dump, so nothing will be restored." >&2
	  echo "Run 'make seed-dump' first if you want to keep the settings." >&2
	fi
	read -r -p "Type yes to continue: " reply; [ "$$reply" = "yes" ] || exit 1
	$(COMPOSE) $(FILE) down --volumes --rmi local
	echo "gone"
