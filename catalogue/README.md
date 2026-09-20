# Waterpark catalogue

```
CI:      crawl s3.waterpark.dkrz.de -> catalogue files + SQL dump -> workflow artifact
server:  Pull artifact -> dumps/ Json -> Solr ×2
                                   |
                                    -> PostgreSQL
```
>[!NOTE]
> the ingest host in this case is `freva-sandbox.cloud.dkrz.de`
>


## How things works:

1. CI crawls the buckets described in `datasets/`, daily and on every merge, 
and publishes one catalogue per dataset as a workflow artifact. 
2. The ingest host pulls the newest bundle every hour and indexes it into
both Solr servers.

Since the whole crawling take around less than 5 mins, in this workflow
Each dataset is crawled twice in CI: **once** into the crawler's own store, which
is what Solr is indexed from, and **once** into PostgreSQL, which is then
`pg_dump`ed into the same artifact.


### Edge cases:
- a dataset whose new catalogue is missing, corrupt, or suddenly much smaller
  keeps the last one that passed, and stays searchable
- records that disappear from a bucket are taken back out of Solr: indexing
  only ever overwrites, so each delivery also removes, by unique key, whatever
  the generations a server may still hold have and the new one does not
- a server that ends up holding *more* than was delivered cannot be corrected
  by difference, since nothing says which documents are the extra ones; `check`
  notices the surplus and has the dataset deleted and indexed again
- when another project's rotation wipes our documents from the shared Solr,
  the twenty-minute `check` notices and re-indexes from `dumps/` — subject to
  its own repair budget, so a server that keeps losing them waits for a pull

#### What is what:

| path | what it is |
|---|---|
| `datasets/*.toml` | the drs_configs |
| `schema.toml` | shared index schema and the `uri`/`file` rules |
| `bin/waterpark-catalogue` | the service |
| `bin/waterpark-validate` | the config rules, run by CI only |
| `deploy/` | systemd units and the server config template |

Settings, credentials, state and the downloaded catalogues all live under
`/opt/waterpark`; the only things outside it are the unit files and the
`waterpark-catalogue` symlink.

## Adding a new dataset

Copy the nearest file in `datasets/` and edit it. A file may define one
dataset or several — put related ones together, as `waterpark-dyamond.toml`
does with its three models. It is the **table name** that names the dataset,
not the filename: it is what the Solr `dataset` field holds, what the manifest
is keyed on, and what the host delivers and deletes, so it must be unique
across every file and keep the `waterpark-` prefix. No inheritance between
datasets. Open a pull request: CI validates the configs and crawls every
dataset the changed files define, against the real object store.

`./catalogue/bin/waterpark-validate` checks the same rules locally:

- every dataset name matches `waterpark-*` and is defined only once
- `drs_format` equals the dataset name; each `drs_settings.dialect.<name>`
  names a dataset in the same file
- `fs_type`, `root_path`, `drs_format`, `glob_pattern` all present
- `root_path` is `s3://…` and `endpoint_url` is `https://s3.waterpark.dkrz.de`
- every `defaults` key is a known facet or declared in `schema.toml` — a typo is
  not an error, the field is silently dropped, so this is the only thing that
  will tell you
- `fs_type = "s3"`, `anon = true`, no `inherits_from`
- the `uri` and `file` rules stay in `schema.toml`: they decide what the unique
  key is, and the whole delivery model is built on it
- a file defining several datasets keeps its `special` rules inside
  `drs_settings.dialect.<dataset>` — one outside applies to all of them, and
  nothing in the file says so
- the `xspies` bucket must not be indexed

`call` expressions are executed by the crawler in CI, so a config file here is
code and reviewed as such — it runs with the workflow's own permissions.

**A dataset with no data yet cannot be added.** The crawler raises `EmptyCrawl`
whenever it discovers zero files, whatever threshold you set, so a config must
wait until its bucket has something in it.


## When something breaks

```
waterpark-catalogue report                     # what is stale, and why
journalctl -u 'waterpark-catalogue@*' -n 200
```

`report` shows three separate things per dataset: when it was really crawled,
what we hold, and which servers have it. They fail separately, so they are
reported separately. Nothing needs restarting by hand — every state is retried
on the next hourly pull. It exits 1 when anything is unhealthy and 3 when the
service itself could not run, so a broken install is not read as a stale
dataset. The age thresholds are the schedule's, not a deadline: reporting is
six-hourly with systemd's randomised delay on top.

| what you see | meaning | do |
|---|---|---|
| `crawled 200h ago` | CI has not produced a fresh crawl since then, even if the snapshot keeps carrying it forward | fix the crawl — CI files an issue naming the dataset |
| `not on <server>` | accepted here, but that Solr would not take it, or would not show it afterwards | look at Solr; it retries hourly |
| `awaiting deletion` | removed from the repo, but a destination would not delete it | look at that Solr or the database; it retries hourly |
| `not on postgres` | the dump would not load, or holds fewer rows than the snapshot counted | `journalctl` has the psql error; it retries hourly |
| `N stale on <server>/<core>` | more documents than the snapshot has — records from before this service, or from a delivery that died before it could be acknowledged | nothing; `check` rebuilds the dataset on that server within twenty minutes |
| `absent from the snapshot` | this dataset was never published and has no local copy | look at the CI run |
| `carried (older configuration)` | its config changed but no crawl of the new one has succeeded | look at the CI run; the daily crawl retries it |
| `not initialised` | no snapshot has ever been accepted | check the token and the workflow |

A dataset is rejected if its new catalogue holds less than 80% of the records
the last accepted one did — the data moved and the config is now wrong.


## Deploying

### First time

Must already exist: `metadata-crawler` on the machine, the tools listed at the
top of this page, a `metadata-crawler` system user, and a GitHub token with
`Actions: read` on the repository.

```
git clone https://github.com/freva-org/waterpark.git /srv/waterpark
cd /srv/waterpark                                  # anywhere but /opt/waterpark
sudo ./catalogue/deploy.sh

sudo vim /opt/waterpark/catalogue.conf              # SERVERS, EXECUTABLE
sudo install -m 0600 /dev/null /opt/waterpark/catalogue.env
sudo vim /opt/waterpark/catalogue.env               # CATALOGUE_GITHUB_TOKEN=...
                                                    # CATALOGUE_POSTGRES=... for the database

sudo systemctl start waterpark-catalogue@pull.service
journalctl -fu waterpark-catalogue@pull.service
waterpark-catalogue report                         # every dataset should say ok

sudo systemctl enable --now waterpark-catalogue-pull.timer \
                            waterpark-catalogue-check.timer \
                            waterpark-catalogue-report.timer
```

`report` runs on a schedule of its own as well as on failure: if publication
quietly stops, nothing fails — the datasets simply get older — so the age
thresholds need their own timer to be noticed.

### Updating

| what changed | what to do | when it lands |
|---|---|---|
| `datasets/`, `schema.toml` | merge to `main` | CI republishes, the host pulls within the hour |
| `bin/waterpark-catalogue` | `git pull` in `/srv/waterpark` | next run — the command is a symlink into it |
| `deploy/` | `git pull && sudo ./catalogue/deploy.sh` | immediately |

`deploy.sh` never overwrites `/opt/waterpark/catalogue.conf`; it prints a diff
against the repo version instead.

### Removing

```
sudo ./catalogue/deploy.sh --wipe
```

Lists what it deletes and asks for confirmation. Everything the service owns
is under `/opt/waterpark`, so that directory, the five unit files and one
symlink are the whole footprint. Solr and Postgress are left alone.
