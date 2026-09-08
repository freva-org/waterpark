"""
End-to-end checks against a running stack.

Skipped unless WATERPARK_STACK_URL is set, so the ordinary suite stays a
fast in-process run with no containers:

    make up
    WATERPARK_STACK_URL=http://localhost:8000 pytest tests/test_stack.py

What these add over the rest of the suite is everything outside the
application: that the proxy routes /api and /mailbox, that the docs are
served, and that the links inside a real email work when followed. The
mailbox is read through the same proxy on the same port, so this exercises
the routing rather than reaching around it.

Standard library only, so CI can run it without installing the package.
"""

from __future__ import annotations

import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Optional

import pytest

STACK_URL = os.environ.get("WATERPARK_STACK_URL", "").rstrip("/")

pytestmark = [
    pytest.mark.stack,
    pytest.mark.skipif(
        not STACK_URL,
        reason="set WATERPARK_STACK_URL to run against a live stack",
    ),
]

# A domain the validator accepts. Reserved names such as example.com are
# rejected before any mail is sent.
ADDRESS = "stack-test@dkrz.de"
TIMEOUT = 10


def fetch(
    url: str,
    data: Optional[dict] = None,
    method: Optional[str] = None,
    follow: bool = True,
) -> tuple[int, dict[str, str], str]:
    """Return (status, headers, body) and never raise on an HTTP status."""
    body = urllib.parse.urlencode(data).encode() if data else None
    request = urllib.request.Request(url, data=body, method=method)
    if data:
        request.add_header("Content-Type", "application/x-www-form-urlencoded")

    if follow:
        opener = urllib.request.build_opener()
    else:

        class NoRedirect(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, *a: Any, **k: Any) -> None:
                return None

        opener = urllib.request.build_opener(NoRedirect)

    try:
        with opener.open(request, timeout=TIMEOUT) as response:
            return response.status, dict(response.headers), response.read().decode()
    except urllib.error.HTTPError as error:
        return error.code, dict(error.headers), error.read().decode()


@pytest.fixture(scope="session", autouse=True)
def stack_is_up() -> None:
    """Block until the API answers through the proxy."""
    last = ""
    for _ in range(60):
        try:
            status, _, body = fetch(f"{STACK_URL}/api/health")
            if status == 200 and json.loads(body).get("status") == "ok":
                return
            last = f"HTTP {status}"
        except Exception as error:  # still starting
            last = str(error)
        time.sleep(1)
    pytest.fail(f"stack never became healthy: {last}")


@pytest.fixture(scope="session")
def confirmation_mail() -> dict:
    """Subscribe once, then pull the resulting message out of the mailbox."""
    status, _, body = fetch(
        f"{STACK_URL}/api/newsletter/subscribe", data={"email": ADDRESS}
    )
    assert status == 200, f"subscribe returned {status}: {body}"

    for _ in range(30):
        status, _, body = fetch(f"{STACK_URL}/mailbox/api/v1/messages")
        assert status == 200, (
            f"mailbox API returned {status}. If the site itself works the "
            "proxy is fine and MP_WEBROOT is the suspect."
        )
        for message in json.loads(body).get("messages", []):
            recipients = [a.get("Address", "") for a in message.get("To", [])]
            if ADDRESS in recipients:
                status, _, detail = fetch(
                    f"{STACK_URL}/mailbox/api/v1/message/{message['ID']}"
                )
                assert status == 200
                return json.loads(detail)
        time.sleep(1)

    pytest.fail(
        f"no mail for {ADDRESS}. Check `docker compose -f dev/compose.yml "
        "logs api` for a send failure."
    )


class TestRouting:
    def test_the_site_is_served(self):
        status, _, body = fetch(f"{STACK_URL}/")
        assert status == 200
        assert "<html" in body.lower()

    def test_the_api_is_on_the_same_origin(self):
        status, _, body = fetch(f"{STACK_URL}/api/health")
        assert status == 200
        assert json.loads(body) == {"status": "ok"}

    def test_the_newsletter_page_exists(self):
        assert fetch(f"{STACK_URL}/newsletter/")[0] == 200

    def test_the_mailbox_is_reachable_through_the_proxy(self):
        status, _, body = fetch(f"{STACK_URL}/mailbox/api/v1/messages")
        assert status == 200
        assert "messages" in json.loads(body)

    def test_announcements_endpoint_answers(self):
        status, _, body = fetch(f"{STACK_URL}/api/announcements")
        assert status == 200
        assert "announcements" in json.loads(body)


class TestFlow:
    def test_the_mail_arrives_with_both_parts(self, confirmation_mail):
        assert confirmation_mail.get("HTML")
        assert confirmation_mail.get("Text", "").strip()

    def test_links_are_same_origin_with_the_site(self, confirmation_mail):
        """Behind the proxy there is one origin, as in production. A link
        pointing anywhere else means the config is wrong."""
        for url in re.findall(r'href="(https?://[^"]+)"', confirmation_mail["HTML"]):
            if "/api/" in url or "/newsletter/" in url:
                assert url.startswith(STACK_URL), url

    def test_the_confirmation_link_works_when_followed(self, confirmation_mail):
        match = re.search(
            r"https?://[^\s\"']+/api/newsletter/verify/[\w-]+",
            confirmation_mail["HTML"],
        )
        assert match, "no confirmation link in the email"

        status, headers, _ = fetch(match.group(0), follow=False)
        assert status == 302
        location = headers["Location"]
        assert location.startswith(STACK_URL)
        assert "status=success" in location
        assert fetch(location)[0] == 200

    def test_one_click_unsubscribe(self, confirmation_mail):
        """The token comes from the page link; the one-click URL itself is
        only advertised in the List-Unsubscribe header."""
        match = re.search(
            r"/newsletter/\?action=unsubscribe[^\s\"']*",
            confirmation_mail["HTML"].replace("&amp;", "&"),
        )
        assert match, "no unsubscribe link in the email"
        token = re.search(r"token=([\w-]+)", match.group(0))
        assert token, match.group(0)

        status, _, _ = fetch(
            f"{STACK_URL}/api/newsletter/unsubscribe/{token.group(1)}",
            method="POST",
        )
        assert status == 200


class TestRejections:
    def test_invalid_address(self):
        assert (
            fetch(
                f"{STACK_URL}/api/newsletter/subscribe",
                data={"email": "not-an-address"},
            )[0]
            == 400
        )

    def test_honeypot_answers_200(self):
        status, _, _ = fetch(
            f"{STACK_URL}/api/newsletter/subscribe",
            data={"email": "bot@dkrz.de", "website": "http://spam.invalid"},
        )
        assert status == 200

    def test_unsubscribe_without_an_identifier(self):
        assert fetch(f"{STACK_URL}/api/newsletter/unsubscribe", data={})[0] >= 400
