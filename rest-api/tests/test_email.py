"""What actually goes out on the wire: templates, links and headers."""

from __future__ import annotations

import pytest

ADDRESS = "someone@dkrz.de"


@pytest.fixture
def subscribed(client, mailbox):
    client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
    return mailbox


class TestStructure:
    def test_has_both_a_plain_and_an_html_part(self, subscribed):
        parts = subscribed.parts()
        assert "text/plain" in parts
        assert "text/html" in parts

    def test_plain_part_is_actually_plain(self, subscribed):
        """multipart/alternative carrying only HTML is a spam signal, and a
        plain part that is really HTML is no better."""
        text = subscribed.parts()["text/plain"]
        assert text.strip()
        assert "<html" not in text.lower()
        assert "<div" not in text.lower()

    def test_html_part_comes_last(self, subscribed):
        """Clients prefer the last alternative, so the order carries
        meaning: plain first, HTML second."""
        types = [
            part.get_content_type()
            for part in subscribed.last.walk()
            if not part.is_multipart()
        ]
        assert types == ["text/plain", "text/html"]

    def test_subject_has_no_emoji(self, subscribed):
        """Institutional relays score on it."""
        subject = subscribed.last["Subject"]
        assert subject
        assert all(ord(character) < 0x2000 for character in subject)


class TestUnsubscribeHeaders:
    def test_list_unsubscribe_offers_both_methods(self, subscribed):
        header = subscribed.last["List-Unsubscribe"]
        assert header
        assert "/api/newsletter/unsubscribe/" in header
        assert "mailto:" in header

    def test_one_click_is_advertised(self, subscribed):
        """RFC 8058. Without it the client shows no unsubscribe button and
        people reach for 'report as junk' instead."""
        assert subscribed.last["List-Unsubscribe-Post"] == "List-Unsubscribe=One-Click"


class TestLinks:
    def test_links_use_the_configured_base_url(self, subscribed):
        html = subscribed.html()
        assert "http://localhost:8000/api/newsletter/verify/" in html
        assert "waterpark.dkrz.de" not in html

    def test_api_url_overrides_only_the_api_links(
        self, client, mailbox, monkeypatch, reset_state
    ):
        """Split origins: pages on one host, the API on another. Production
        leaves api_url empty and both collapse to base_url."""
        import waterpark_api.app as app_module
        import waterpark_api.config as config

        monkeypatch.setenv("WATERPARK_API_URL", "http://localhost:8080")
        config._SETTINGS = None
        app_module.server_settings = config.get_settings()

        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        html = mailbox.html()

        assert "http://localhost:8080/api/newsletter/verify/" in html
        assert "http://localhost:8000/newsletter/?action=unsubscribe" in html

    def test_carries_an_unsubscribe_link_for_the_page(self, subscribed):
        assert "/newsletter/?action=unsubscribe" in subscribed.html()


class TestTranslations:
    @pytest.mark.parametrize(
        "language,marker",
        [("de", "Waterpark"), ("en", "Waterpark"), ("es", "Waterpark")],
    )
    def test_every_language_renders(self, client, mailbox, language, marker):
        client.post(
            "/api/newsletter/subscribe",
            data={"email": ADDRESS, "language": language},
        )
        assert marker in mailbox.html()

    def test_no_leftover_branding_from_the_source_project(
        self, client, mailbox
    ):
        for language in ("de", "en", "es"):
            mailbox.messages.clear()
            client.post(
                "/api/newsletter/subscribe",
                data={"email": ADDRESS, "language": language},
            )
            html = mailbox.html()
            assert "SolKraft" not in html
            assert "sol-kraft" not in html


class TestTransport:
    def test_connects_to_the_configured_relay(self, subscribed):
        assert subscribed.connections == [("mailbox", 1025)]

    def test_does_not_authenticate_without_credentials(self, subscribed):
        """The DKRZ relay accepts unauthenticated mail and mailpit rejects
        AUTH outright, so an unconditional login breaks both."""
        assert subscribed.logins == []

    def test_authenticates_when_credentials_are_set(
        self, client, mailbox, monkeypatch, reset_state
    ):
        import waterpark_api.app as app_module
        import waterpark_api.config as config

        monkeypatch.setenv("WATERPARK_EMAIL_USER", "someone")
        monkeypatch.setenv("WATERPARK_EMAIL_PASSWORD", "hunter2")
        config._SETTINGS = None
        app_module.server_settings = config.get_settings()

        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        assert mailbox.logins == [("someone", "hunter2")]

    def test_a_send_failure_does_not_break_the_request(
        self, client, monkeypatch, mailbox
    ):
        """The response is already out by the time the send runs, so a
        relay outage must not surface as a 500."""
        import smtplib

        def explode(*args, **kwargs):
            raise ConnectionRefusedError(111, "Connection refused")

        monkeypatch.setattr(smtplib, "SMTP", explode)

        response = client.post(
            "/api/newsletter/subscribe", data={"email": ADDRESS}
        )
        assert response.status_code == 200
        assert len(mailbox) == 0
