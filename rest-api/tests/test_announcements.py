"""The announcement banner, served from a file on the host at request time."""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest

FUTURE = "2099-01-01T00:00:00Z"
PAST = "2020-01-01T00:00:00Z"


@pytest.fixture
def announcements_file(env) -> Path:
    return Path(os.environ["WATERPARK_ANNOUNCEMENTS_PATH"])


def write(path: Path, body: str) -> None:
    path.write_text(body, encoding="utf-8")


def ids(response) -> list[str]:
    return [item["id"] for item in response.json()["announcements"]]


class TestFiltering:
    def test_missing_file_means_no_announcements(self, client):
        assert client.get("/api/announcements").json() == {"announcements": []}

    def test_serves_a_live_entry(self, client, announcements_file):
        write(
            announcements_file,
            f'[[announcement]]\nid = "live"\ntext = "Hello"\nexpires = {FUTURE}\n',
        )
        assert ids(client.get("/api/announcements")) == ["live"]

    def test_drops_an_expired_entry(self, client, announcements_file):
        write(
            announcements_file,
            f'[[announcement]]\nid = "gone"\ntext = "Bye"\nexpires = {PAST}\n',
        )
        assert ids(client.get("/api/announcements")) == []

    def test_holds_back_a_scheduled_entry(self, client, announcements_file):
        write(
            announcements_file,
            '[[announcement]]\nid = "later"\ntext = "Soon"\n'
            f"starts = {FUTURE}\nexpires = 2099-06-01T00:00:00Z\n",
        )
        assert ids(client.get("/api/announcements")) == []

    def test_orders_by_soonest_expiry(self, client, announcements_file):
        write(
            announcements_file,
            '[[announcement]]\nid = "late"\ntext = "a"\n'
            "expires = 2099-12-01T00:00:00Z\n\n"
            '[[announcement]]\nid = "soon"\ntext = "b"\n'
            "expires = 2099-01-01T00:00:00Z\n",
        )
        assert ids(client.get("/api/announcements")) == ["soon", "late"]


class TestValidation:
    @pytest.mark.parametrize(
        "body,why",
        [
            ('[[announcement]]\nid = "x"\ntext = "no expiry"\n', "expires missing"),
            (f'[[announcement]]\ntext = "no id"\nexpires = {FUTURE}\n', "id missing"),
            (
                '[[announcement]]\nid = "x"\ntext = ""\nexpires = {FUTURE}\n',
                "empty text",
            ),
            (
                f'[[announcement]]\nid = "x"\ntext = "y"\nlevel = "catastrophe"\n'
                f"expires = {FUTURE}\n",
                "unknown level",
            ),
            (
                '[[announcement]]\nid = "x"\ntext = "y"\n'
                "starts = 2099-06-01T00:00:00Z\nexpires = 2099-01-01T00:00:00Z\n",
                "starts after expires",
            ),
        ],
    )
    def test_invalid_entries_are_dropped(self, client, announcements_file, body, why):
        write(announcements_file, body)
        assert ids(client.get("/api/announcements")) == [], why

    def test_a_bad_entry_does_not_take_the_good_ones_with_it(
        self, client, announcements_file
    ):
        write(
            announcements_file,
            '[[announcement]]\nid = "broken"\ntext = "no expiry"\n\n'
            f'[[announcement]]\nid = "fine"\ntext = "y"\nexpires = {FUTURE}\n',
        )
        assert ids(client.get("/api/announcements")) == ["fine"]

    def test_duplicate_ids_keep_only_the_first(self, client, announcements_file):
        write(
            announcements_file,
            f'[[announcement]]\nid = "same"\ntext = "first"\nexpires = {FUTURE}\n\n'
            f'[[announcement]]\nid = "same"\ntext = "second"\nexpires = {FUTURE}\n',
        )
        response = client.get("/api/announcements")
        assert ids(response) == ["same"]
        assert response.json()["announcements"][0]["text"] == "first"

    def test_naive_datetimes_are_read_as_utc(self, client, announcements_file):
        """TOML allows an offsetless datetime. Reading it as server-local
        would make the file mean different things on different machines."""
        soon = (datetime.now(timezone.utc) + timedelta(hours=1)).strftime(
            "%Y-%m-%dT%H:%M:%S"
        )
        write(
            announcements_file,
            f'[[announcement]]\nid = "naive"\ntext = "y"\nexpires = {soon}\n',
        )
        entry = client.get("/api/announcements").json()["announcements"][0]
        assert entry["expires"].endswith(("Z", "+00:00"))


class TestReloading:
    def test_an_edit_is_picked_up_without_a_restart(self, client, announcements_file):
        write(
            announcements_file,
            f'[[announcement]]\nid = "first"\ntext = "a"\nexpires = {FUTURE}\n',
        )
        assert ids(client.get("/api/announcements")) == ["first"]

        write(
            announcements_file,
            f'[[announcement]]\nid = "second"\ntext = "b"\nexpires = {FUTURE}\n',
        )
        assert ids(client.get("/api/announcements")) == ["second"]

    def test_broken_toml_keeps_serving_the_last_good_parse(
        self, client, announcements_file
    ):
        """A half-saved edit must not blank the banner mid-incident."""
        write(
            announcements_file,
            f'[[announcement]]\nid = "good"\ntext = "a"\nexpires = {FUTURE}\n',
        )
        assert ids(client.get("/api/announcements")) == ["good"]

        write(announcements_file, '[[announcement]\nid = "oops"')
        assert ids(client.get("/api/announcements")) == ["good"]


class TestResponse:
    def test_is_cacheable_for_a_minute(self, client):
        """Bounds how long a stale banner lingers, and keeps a burst of
        page loads during an outage off the disk."""
        response = client.get("/api/announcements")
        assert response.headers["cache-control"] == "public, max-age=60"

    def test_fields_survive_the_round_trip(self, client, announcements_file):
        write(
            announcements_file,
            '[[announcement]]\nid = "full"\nlevel = "outage"\ntext = "Down"\n'
            'link = "https://example.invalid/status"\nlink_text = "Status"\n'
            f"dismissible = false\nexpires = {FUTURE}\n",
        )
        entry = client.get("/api/announcements").json()["announcements"][0]
        assert entry["level"] == "outage"
        assert entry["text"] == "Down"
        assert entry["link_text"] == "Status"
        assert entry["dismissible"] is False
