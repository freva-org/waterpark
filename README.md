# Waterpark

The landing page and backend for [waterpark.dkrz.de](https://waterpark.dkrz.de),
the HEALPix data hub on S3.

Multiple things live here. The **landing page** is a mkdocs-material site
published to `gh-pages` and served by nginx on the VM. The **API** is a
small FastAPI service behind the same nginx, serving `/api`.

The `grid-doctor` package and its technical documentation live in
[freva-org/grid-doctor](https://github.com/freva-org/grid-doctor). A few
pages are shared between the two sites; see [Shared pages](#shared-pages).

## Layout

| | |
|---|---|
| `landingpage/` | mkdocs site: content, theme overrides, build tooling |
| `catalogue/` | crawler configs, and the service that delivers what CI publishes |
| `.dev/` | development stack: compose file, proxy config, secrets |
| `Makefile` | entry point for everything below |

## Development

Everything runs in containers behind a proxy, so development is
**same-origin** exactly like production behind nginx. There is no setup
step.

```sh
make dev          # foreground, Ctrl-C stops it
make up           # same, detached
```

| | |
|---|---|
| `http://localhost:8000` | the site, with `/api` on the same origin |
| `http://localhost:8000/mailbox/` | every outgoing email lands here |

Using podman: `make dev COMPOSE=podman-compose`, or export `COMPOSE` once
in your shell. Rootless is fine for either runtime.

### Reading the mail

Nothing you send in development leaves your machine. The API talks to a
mailpit container that accepts every message and delivers none, so you can
sign up with real addresses all day without mailing anyone. Mailpit is not
published on a port of its own; like everything else it is reached through
the proxy, at `/mailbox/`.

A confirmation link in a message there is clickable and takes you to
`/newsletter/?status=success`, which is the whole double opt-in flow.

To check without opening the UI, `make mail` prints what the API logged
alongside what mailpit actually holds. If those two disagree, you know
which side to look at.

### Sending for real

Optional, and the only configuration this stack has. Write one file per
setting into `.dev/secrets/`. The filename is the setting name, the
contents are the value.

With that directory empty, which is the default and how CI runs,
everything goes to the mailbox.

### What runs where

Only the proxy is published. Everything else talks over the `waterpark`
bridge by service name, which is what keeps development same-origin:
nothing can reach the API on a second port and start needing CORS.

| service | what it is |
|---|---|
| `proxy` | Caddy. `/api/*` to the API, `/mailbox/*` to mailpit, the rest to the docs |
| `docs` | mkdocs serve with live reload; `data`, `shared`, `assets` mounted read-only |
| `mailbox` | mailpit |

Source is mounted read-only and everything the containers write goes to
named volumes, so nothing lands root-owned in your checkout.

### Live reload

Editing anything under `landingpage/data`, `landingpage/shared`.

Adding a **new** file to the docs needs one service restarted:

```sh
docker compose -f dev/compose.yml restart docs
```

The docs container assembles `.build/data` at startup as a farm of
symlinks into the three source trees, which is why edits are picked up but
new files are not. Never edit anything under `.build/`; it is generated.

### Commands

```sh
make logs S=api      # follow one service
make shell S=docs    # shell inside a container
make ps              # what is running
make mail            # what the mailbox has caught
make announce        # seed a test announcement so the banner shows
make rebuild         # rebuild images ignoring the layer cache
make down            # stop, keep volumes
make clean           # stop, delete volumes and images
make smoke           # drive the whole signup flow against the stack
make check           # everything CI runs, in both projects
make doctor          # dump everything needed to diagnose a broken stack
```

### When something is wrong

Start with `make doctor`. It prints the parsed compose config, the
container list including exited ones, published ports, recent logs from
proxy, docs and api, and what is actually in `.build/data`.

- **A 404 in the browser.** If the page says "This response came from
  Caddy", the proxy could not reach an upstream container. If it does not,
  the 404 came from mkdocs or the API and the proxy is fine.
- **Nothing on `:8000` at all.** Check for a stray process holding the
  port: `pgrep -af "mkdocs serve"`.
- **Emails not arriving.** They are in the mailbox, not your inbox.
  `make mail` settles it either way.
- **No log output from the API.** The application logger defaults to
  `ERROR`, which hides every "verification sent" and "address rejected"
  line. The stack sets `VERBOSITY=2` (INFO); `3` is DEBUG.
- **The STAC or data browser page 404s.** Those two pages are generated at
  container start by scripts that clone and run npm. The step is
  deliberately non-fatal so the rest of the site still works when it
  breaks. `SKIP_ASSET_BUILD=1 make dev` skips it entirely, which confirms
  whether that is what is failing.

## Content

### Shared pages

`landingpage/shared/` holds pages owned by grid-doctor and rendered by both
sites. They are vendored at a pinned commit rather than fetched at build
time, so builds work offline and an upstream change arrives as a reviewable
diff.

```sh
cd landingpage
python scripts/sync_shared.py --check     # CI guard: did someone edit them here?
python scripts/sync_shared.py --update    # re-pin to grid-doctor's tip
```

The pin lives in `landingpage/shared-sources.toml`. A scheduled workflow
bumps it weekly and opens a pull request. Edit these pages upstream, never
here: a local change is reverted by the next sync, and `--check` fails the
build in the meantime.

### Announcements

The banner across the top of the site is served at runtime from
`/api/announcements`, backed by a TOML file on the host. Editing that file
is the whole publishing workflow: no rebuild, no workflow run, no restart.

Every entry needs an `expires`, deliberately. A notice that cannot clear
itself is how the previous banner got stuck; anything true indefinitely is
documentation and belongs in a page.

Locally, `make announce` seeds a two-hour test notice.

### Gallery

`landingpage/examples/` holds short, complete programs that do something
useful with the data in the hub, and `scripts/build_gallery.py` turns them
into pages. Each script runs on its own against the public endpoint with
nothing but `examples/requirements.txt`, which is the property to protect:
nothing in there may depend on being inside a documentation build.

Execution and rendering are deliberately separate, for the same reason the
shared pages are vendored rather than fetched.

```
python scripts/build_gallery.py --render --out .build/data   # offline, every docs build
make gallery            # run the examples, refresh assets/gallery/
make gallery ONLY=03    # just one
make gallery-check      # which figures no longer match their example
```

The figures in `landingpage/assets/gallery/` are committed. The docs build
therefore never touches S3, a changed plot arrives as a reviewable diff, and
a bucket being migrated shows up as a red `gallery` run rather than as a
documentation build nobody can merge past. A page whose figure is missing
still builds, with a notice in place of the plot.

Adding an example means adding a line to the `nav:` block in `mkdocs.yml`.
The strict build says so clearly if you forget.

### Dataset listing

`landingpage/scripts/refresh_buckets.py` regenerates
`assets/waterpark-datasets.json` from the live S3 endpoint, keeping any
hand-written descriptions. Needs `WATERPARK_S3_KEY` and
`WATERPARK_S3_SECRET`.

## Continuous integration

Six workflows, all with `workflow_dispatch` so they can be run by hand
from the Actions tab.

| workflow | runs on | what it does |
|---|---|---|
| `docs` | changes under `landingpage/` | strict mkdocs build; publishes to `gh-pages` from `main` |
| `smoke` | changes to either, or to `dev/` | brings up the compose stack and runs the `stack`-marked tests |
| `catalogue` | changed dataset configs, and daily | validates them, crawls S3, publishes a complete snapshot, and files one issue per broken dataset |
| `sync-shared` | weekly, or on demand | re-pins the shared pages and opens a pull request |
| `gallery` | changes under `landingpage/examples/`, weekly | runs the examples against S3 and opens a pull request with the refreshed figures |

`docs` takes a `deploy` input, on by default, so a manual run can build
without republishing.

## Deployment

The dev stack above is for development only. Production is Ansible plus
Podman Quadlet with nginx in front.

The docs deploy from CI to `gh-pages`, which nginx serves from a shallow
clone.
