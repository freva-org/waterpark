"""Site announcements, served at runtime.

Announcements are operational state: the S3 gateway is down, a bucket is
being re-chunked, a migration window is coming. That is a property of the
machine, not of the documentation, so it does not belong in a git repo and
must not require a docs rebuild to change or to clear.

The source is a TOML file on the host, read on demand. Editing the file is
the whole publishing workflow; the API notices the new mtime on the next
request and the banner changes within the cache lifetime. Nothing to
deploy, no workflow to hunt for.

Every entry must carry an ``expires``. An announcement that cannot expire
on its own is the failure mode this replaces, and a notice that is true
indefinitely is documentation and belongs in a page instead.
"""

from __future__ import annotations

import tomllib
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from fastapi import APIRouter, Response, status
from pydantic import BaseModel

from .config import get_logger, get_settings

logger = get_logger("announcements")

router = APIRouter(prefix="/api", tags=["announcements"])

LEVELS = ("info", "warning", "outage")

# (path, mtime_ns, size) -> parsed entries. Keyed on the stat tuple so an
# edit is picked up without a restart, while an unchanged file costs one
# stat call per request rather than a parse.
_CACHE: Dict[Tuple[str, int, int], List[Dict[str, Any]]] = {}


class Announcement(BaseModel):
    """A single active notice."""

    id: str
    level: str = "info"
    text: str
    link: Optional[str] = None
    link_text: Optional[str] = None
    dismissible: bool = True
    expires: datetime


class AnnouncementList(BaseModel):
    """Everything currently in force."""

    announcements: List[Announcement]


def _as_aware(value: Any, field: str, entry_id: str) -> datetime:
    """Coerce a TOML datetime to an aware UTC one."""
    if not isinstance(value, datetime):
        raise ValueError(
            f"{entry_id}: {field} must be a TOML datetime, got {type(value).__name__}"
        )
    # TOML allows a local datetime with no offset. Treat that as UTC rather
    # than as server-local, so the file means the same thing wherever it is
    # read and whatever TZ the container happens to have.
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _parse(raw: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Validate the file contents, dropping and logging bad entries.

    One malformed entry must not take the banner down for the others, and
    must never take the endpoint down: this is called on a request path.
    """
    entries: List[Dict[str, Any]] = []
    seen: set[str] = set()

    for index, item in enumerate(raw.get("announcement", [])):
        entry_id = str(item.get("id") or "").strip()
        try:
            if not entry_id:
                raise ValueError(f"entry {index} has no id")
            if entry_id in seen:
                raise ValueError(f"{entry_id}: duplicate id")
            if not str(item.get("text", "")).strip():
                raise ValueError(f"{entry_id}: text is empty")

            level = str(item.get("level", "info")).lower()
            if level not in LEVELS:
                raise ValueError(
                    f"{entry_id}: level {level!r} not in {', '.join(LEVELS)}"
                )

            if "expires" not in item:
                raise ValueError(
                    f"{entry_id}: expires is required, "
                    "an announcement has to be able to clear itself"
                )
            expires = _as_aware(item["expires"], "expires", entry_id)
            starts = (
                _as_aware(item["starts"], "starts", entry_id)
                if "starts" in item
                else None
            )
            if starts and starts >= expires:
                raise ValueError(f"{entry_id}: starts is not before expires")

            seen.add(entry_id)
            entries.append(
                {
                    "id": entry_id,
                    "level": level,
                    "text": str(item["text"]).strip(),
                    "link": item.get("link"),
                    "link_text": item.get("link_text"),
                    "dismissible": bool(item.get("dismissible", True)),
                    "starts": starts,
                    "expires": expires,
                }
            )
        except ValueError as error:
            logger.warning("Ignoring announcement: %s", error)

    return entries


def load_entries(path: Optional[Path] = None) -> List[Dict[str, Any]]:
    """Read and cache the announcement file. Missing file means none."""
    path = Path(path or get_settings().announcements_path)
    try:
        stat = path.stat()
    except OSError:
        return []

    key = (str(path), stat.st_mtime_ns, stat.st_size)
    if key in _CACHE:
        return _CACHE[key]

    try:
        with path.open("rb") as handle:
            raw = tomllib.load(handle)
    except (tomllib.TOMLDecodeError, OSError) as error:
        # Keep serving the previous good parse if we have one. A typo saved
        # halfway through an edit should not blank the banner mid-incident.
        logger.error("Cannot read %s: %s", path, error)
        return next(iter(_CACHE.values()), []) if _CACHE else []

    entries = _parse(raw)
    _CACHE.clear()
    _CACHE[key] = entries
    logger.info("Loaded %d announcement(s) from %s", len(entries), path)
    return entries


def active(
    now: Optional[datetime] = None, path: Optional[Path] = None
) -> List[Dict[str, Any]]:
    """Entries currently in force, soonest expiry first."""
    now = now or datetime.now(timezone.utc)
    live = [
        entry
        for entry in load_entries(path)
        if entry["expires"] > now
        and (entry["starts"] is None or entry["starts"] <= now)
    ]
    return sorted(live, key=lambda entry: entry["expires"])


@router.get("/announcements", response_model=AnnouncementList)
async def announcements(response: Response) -> AnnouncementList:
    """Notices the site should currently display.

    Cached for a minute at the edge. That bounds how long a stale banner
    can linger after the file changes, and keeps a burst of page loads
    during an actual outage off the disk.
    """
    entries = active()
    response.headers["Cache-Control"] = "public, max-age=60"
    if not entries:
        response.status_code = status.HTTP_200_OK
    return AnnouncementList(announcements=[Announcement(**entry) for entry in entries])
