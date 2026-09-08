# Waterpark landing page.
#
#   make            list every target
#   make serve      docs on :8000 with live reload
#
# Docs only. Running the docs alongside the API and a mailbox is the
# workspace Makefile's job, one directory up: `make dev` there. Everything
# here works with this repo checked out on its own.
#
# tox still owns the build itself, because the copy-then-build dance in
# [docs-prep] is genuinely tox's job and CI calls those envs directly.
# These are thin wrappers so nobody has to remember the env names.

SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
.DEFAULT_GOAL := help

STATE_DIR ?= $(CURDIR)/.dev

.PHONY: help serve docs deploy check shared shared-update buckets \
        buckets-check announce clean

help: ## Show this help
	@echo "Waterpark landing page (docs)"
	echo
	grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | sort \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'
	echo

# WP_API_BASE reaches mkdocs through `!ENV` and ends up in the rendered
# HTML. It must be empty for anything that gets published, and is only set
# by the workspace Makefile when the API is running locally too.
serve: ## Serve the docs at localhost:8000 with live reload
	@exec tox -e docs-serve

docs: ## Build the site into ./site
	@WP_API_BASE= tox -e docs

deploy: ## Publish ./site to gh-pages (normally CI does this)
	@WP_API_BASE= tox -e docs-deploy

check: ## Everything CI runs: shared pin, then a strict build
	@tox -e shared-check
	WP_API_BASE= tox -e docs

# --- content maintenance ---------------------------------------------------

shared: ## Verify the vendored shared docs still match the pin
	@python scripts/sync_shared.py --check

shared-update: ## Re-pin the shared docs to grid-doctor's tip
	@python scripts/sync_shared.py --update

buckets: ## Refresh the dataset listing from the live S3 endpoint
	@python scripts/refresh_buckets.py

buckets-check: ## Report whether the dataset listing is stale
	@python scripts/refresh_buckets.py --check

announce: ## Seed a local announcement so the banner can be tested
	@target="$${WATERPARK_ANNOUNCEMENTS_PATH:-$(CURDIR)/../rest-api/.dev/announcements.toml}"
	mkdir -p "$$(dirname "$$target")"
	expires=$$(python -c "import datetime as d; print((d.datetime.now(d.timezone.utc)+d.timedelta(hours=2)).strftime('%Y-%m-%dT%H:%M:%SZ'))")
	cat > "$$target" <<-EOF
	[[announcement]]
	id = "local-test"
	level = "warning"
	text = "This is a local test announcement. It expires in two hours."
	expires = $$expires
	EOF
	echo "wrote $$target, expires $$expires"
	echo "remove it again with: rm $$target"

clean: ## Remove build output and local state
	@rm -rf .build site site-data "$(STATE_DIR)"
	echo "cleaned"
