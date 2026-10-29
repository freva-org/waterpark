#!/usr/bin/env bash
#
# Publish a built site to the gh-pages branch as a single commit.
#
#   scripts/publish-gh-pages.sh [SITE_DIR] [MESSAGE]
#
# The same thing `mkdocs gh-deploy --force --no-history` did: the branch is
# always exactly one commit holding the site and a .nojekyll, force-pushed.
# The VM serving waterpark.dkrz.de does a shallow clone of gh-pages that only
# ever pulls, so history there would be pure cost, and the site is large and
# mostly binary.
#
# Works inside the repository with a throwaway index, so it pushes through
# the repository's own remote and credentials (in CI, the token that
# actions/checkout configured) and never touches the working tree.
#
# REMOTE (default origin) and BRANCH (default gh-pages) override the target.

set -euo pipefail

site="${1:-dist}"
message="${2:-docs: $(git rev-parse HEAD)}"
remote="${REMOTE:-origin}"
branch="${BRANCH:-gh-pages}"

if [ ! -f "$site/index.html" ]; then
    echo "publish: $site/index.html is missing; build the site first (just build)" >&2
    exit 1
fi

site="$(cd "$site" && pwd)"
touch "$site/.nojekyll"

scratch="$(mktemp -d)"
trap 'rm -rf "$scratch"' EXIT
export GIT_INDEX_FILE="$scratch/index"

# -f: the repository's .gitignore (build/, *.log, ...) must not drop files
# from the site; nothing here is ever committed to the source branches.
git --work-tree="$site" add --all --force .
tree="$(git write-tree)"
commit="$(git commit-tree "$tree" -m "$message")"

git push --force "$remote" "$commit:refs/heads/$branch"
echo "publish: $branch is now $commit"
