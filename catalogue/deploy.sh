#!/usr/bin/env bash
# Deploy (or remove) the catalogue service. Run as root from the repository root.
#
#   sudo ./catalogue/deploy.sh
#   sudo ./catalogue/deploy.sh --wipe [--yes]

set -euo pipefail

user=metadata-crawler
home=/opt/waterpark
link=/usr/local/bin/waterpark-catalogue
units=(waterpark-catalogue@.service waterpark-catalogue-notify.service
       waterpark-catalogue-pull.timer waterpark-catalogue-check.timer
       waterpark-catalogue-report.timer)

if [ "${1:-}" = "--wipe" ]; then
  targets=("$link" "${units[@]/#//etc/systemd/system/}" "$home")
  echo "this deletes:"
  printf '  %s\n' "${targets[@]}"
  echo
  echo "including $home/lib, which holds the deletion history and the counts"
  echo "the drop guard compares against. To keep them, move $home/lib aside"
  echo "first; wiping makes the next pull deliver everything again."
  if [ "${2:-}" != "--yes" ]; then
    read -rp "type 'wipe' to confirm: " answer
    [ "$answer" = wipe ] || { echo "aborted."; exit 1; }
  fi
  systemctl disable --now waterpark-catalogue-pull.timer \
                          waterpark-catalogue-check.timer \
                          waterpark-catalogue-report.timer 2>/dev/null || true
  systemctl stop 'waterpark-catalogue@*' waterpark-catalogue-notify.service \
                 2>/dev/null || true
  rm -rf "${targets[@]}"
  systemctl daemon-reload
  echo "wiped. the documents already in Solr are untouched."
  exit 0
fi

[ -f catalogue/bin/waterpark-catalogue ] || {
  echo "run this from the repository root: sudo ./catalogue/deploy.sh" >&2
  exit 1
}
# The command is a symlink into this checkout, and --wipe deletes $home
# outright, so the two must not be the same place.
case "$PWD/" in "$home"/*)
  echo "clone the repository somewhere other than $home" >&2; exit 1 ;;
esac

install -d -m 0755 "$(dirname "$link")"
ln -sfn "$PWD/catalogue/bin/waterpark-catalogue" "$link"
install -m 0644 "${units[@]/#/catalogue/deploy/}" /etc/systemd/system/

# 0750 root:$user - the service reads its settings as $user, writes its state
# and nothing else on the machine needs either.
install -d -m 0750 -o root -g "$user" "$home"
install -d -m 0750 -o "$user" -g "$user" "$home/lib" "$home/log"
if [ -f "$home/catalogue.conf" ]; then
  echo "kept $home/catalogue.conf; differences from the repo:"
  diff -u "$home/catalogue.conf" catalogue/deploy/catalogue.conf || true
else
  install -m 0640 -o root -g "$user" catalogue/deploy/catalogue.conf "$home/catalogue.conf"
  echo "installed $home/catalogue.conf - review it"
fi

systemctl daemon-reload
cat <<NEXT

deployed:
  $link -> $PWD/catalogue/bin/waterpark-catalogue
  $home/{catalogue.conf,lib,log}
  /etc/systemd/system/waterpark-catalogue*

next:
  1. create $home/catalogue.env (see deploy/catalogue.env.example), mode 0600 root:root
  2. systemctl start waterpark-catalogue@pull.service       # first run, watch it
  3. systemctl enable --now waterpark-catalogue-pull.timer \
       waterpark-catalogue-check.timer waterpark-catalogue-report.timer
NEXT
