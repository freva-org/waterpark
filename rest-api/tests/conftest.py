"""
Shared fixtures.

Two module-level globals make isolation the main thing to get right here:
`config._SETTINGS` caches the resolved configuration for the process, and
`dependencies._db_manager` caches the engine. Both are reset around every
test so a test that changes the environment cannot leak into the next one.

The application object itself is imported once and reused. Its routes read
settings at request time, so a fresh `_SETTINGS` is enough; only `app.debug`
and the CORS middleware are fixed at import, and no test depends on those.
"""

from __future__ import annotations

import email as email_module
import smtplib
from pathlib import Path
from typing import Any, Iterator

import pytest


@pytest.fixture
def env(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> dict[str, str]:
    """Baseline configuration: sqlite in a tmp dir, mail to a fake relay.

    Mirrors what dev/compose.yml sets, so a test failing here is a real
    failure rather than a difference between test and development config.
    """
    values = {
        "WATERPARK_DB_TYPE": "sqlite",
        "WATERPARK_DB_NAME": str(tmp_path / "waterpark"),
        "WATERPARK_LOGDIR": str(tmp_path / "logs"),
        "WATERPARK_ANNOUNCEMENTS_PATH": str(tmp_path / "announcements.toml"),
        "WATERPARK_BASE_URL": "http://localhost:8000",
        "WATERPARK_EMAIL_SERVER": "mailbox",
        "WATERPARK_EMAIL_PORT": "1025",
        "WATERPARK_EMAIL_DISABLED": "0",
        "DEBUG": "0",
        "VERBOSITY": "0",
    }
    for key, value in values.items():
        monkeypatch.setenv(key, value)
    # Anything inherited from the developer's shell would silently override
    # the config file and make these tests depend on the machine.
    for stale in (
        "WATERPARK_API_URL",
        "WATERPARK_CORS_ORIGINS",
        "WATERPARK_CONFIG_PATH",
        "WATERPARK_EMAIL_USER",
        "WATERPARK_EMAIL_PASSWORD",
        "WATERPARK_EMAIL_FROM_ADDRESS",
    ):
        monkeypatch.delenv(stale, raising=False)
    return values


@pytest.fixture
def reset_state() -> Iterator[None]:
    """Clear every process-wide cache the application keeps."""
    import waterpark_api.announcements as announcements
    import waterpark_api.config as config
    import waterpark_api.db.dependencies as dependencies

    def clear() -> None:
        config._SETTINGS = None
        dependencies._db_manager = None
        announcements._CACHE.clear()

    clear()
    yield
    clear()


class Mailbox:
    """Stands in for the SMTP server and keeps what was handed to it."""

    def __init__(self) -> None:
        self.messages: list[email_module.message.Message] = []
        self.connections: list[tuple[str, int]] = []
        self.logins: list[tuple[str, str]] = []

    # -- inspection ---------------------------------------------------------

    def __len__(self) -> int:
        return len(self.messages)

    @property
    def last(self) -> email_module.message.Message:
        assert self.messages, "no mail was sent"
        return self.messages[-1]

    def parts(self, index: int = -1) -> dict[str, str]:
        """Decoded bodies by content type.

        MIMEText base64-encodes a utf-8 payload, so asserting on the raw
        message would be asserting on base64.
        """
        message = self.messages[index]
        return {
            part.get_content_type(): part.get_payload(decode=True).decode("utf-8")
            for part in message.walk()
            if not part.is_multipart()
        }

    def html(self, index: int = -1) -> str:
        return self.parts(index)["text/html"]

    def to(self, index: int = -1) -> list[str]:
        return [a.strip() for a in self.messages[index]["To"].split(",")]


@pytest.fixture
def mailbox(monkeypatch: pytest.MonkeyPatch) -> Mailbox:
    """Replace smtplib.SMTP so nothing leaves the test process."""
    box = Mailbox()

    class FakeSMTP:
        def __init__(self, host: str = "", port: int = 0, *a: Any, **k: Any) -> None:
            box.connections.append((host, port))

        def starttls(self, *a: Any, **k: Any) -> None:
            pass

        def login(self, user: str, password: str) -> None:
            box.logins.append((user, password))

        def sendmail(self, sender: str, to: str, message: str) -> None:
            box.messages.append(email_module.message_from_string(message))

        def quit(self) -> None:
            pass

    monkeypatch.setattr(smtplib, "SMTP", FakeSMTP)
    monkeypatch.setattr(smtplib, "SMTP_SSL", FakeSMTP)
    return box


@pytest.fixture
def client(env: dict[str, str], reset_state: None) -> Iterator[Any]:
    """A TestClient with the lifespan run, so the database exists."""
    import waterpark_api.app as app_module
    import waterpark_api.config as config
    from fastapi.testclient import TestClient
    from waterpark_api.main import app

    # app.py resolves settings once at import and hands that object to the
    # lifespan, so without this every test would share the first test's
    # database and see its subscribers. Re-point it at the settings this
    # test's environment produces.
    app_module.server_settings = config.get_settings()

    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def session() -> Iterator[Any]:
    """A database session against whatever the client just used."""
    from waterpark_api.db.dependencies import session_scope

    with session_scope() as db_session:
        yield db_session
