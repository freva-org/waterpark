"""The double opt-in flow: subscribe, confirm, unsubscribe."""

from __future__ import annotations

import re
from datetime import timedelta
from typing import Any

import pytest
from email_validator import EmailNotValidError
from sqlalchemy.exc import IntegrityError
from waterpark_api.db.db_manager import (
    TOKEN_EXPIRY_HOURS,
    Base,
    DatabaseManager,
    Subscriber,
    utcnow,
)
from waterpark_api.db.newsletter import NewsletterService, check_email

# A domain the validator accepts. Reserved names like example.com are
# rejected before any mail is sent, which is a legitimate behaviour but a
# confusing thing to build the happy path on.
ADDRESS = "someone@dkrz.de"


@pytest.fixture
def service(tmp_path, mailbox, env, reset_state):
    """A service on its own database, without going through the app."""
    manager = DatabaseManager(f"sqlite:///{tmp_path / 'direct'}.db")
    manager.create_tables()
    session = manager.get_session()
    try:
        yield NewsletterService(session)
    finally:
        session.close()
        manager.dispose()


def confirmed(service) -> Subscriber:
    service.subscribe(ADDRESS)
    row = service.get_subscriber(ADDRESS)
    service.verify(row.verification_token)
    return service.get_subscriber(ADDRESS)


def verification_token(html: str) -> str:
    match = re.search(r"/api/newsletter/verify/([A-Za-z0-9_-]+)", html)
    assert match, "no verification link in the email"
    return match.group(1)


def row(session: Any, email: str = ADDRESS) -> Subscriber:
    return session.query(Subscriber).filter(Subscriber.email == email).one()


class TestSubscribe:
    def test_accepts_a_valid_address_and_sends_one_mail(self, client, mailbox):
        response = client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        assert response.status_code == 200
        assert response.json()["success"] is True
        assert len(mailbox) == 1
        assert mailbox.to() == [ADDRESS]

    def test_rejects_a_malformed_address(self, client, mailbox):
        response = client.post(
            "/api/newsletter/subscribe", data={"email": "not-an-address"}
        )
        assert response.status_code == 400
        assert len(mailbox) == 0

    def test_honeypot_answers_200_and_sends_nothing(self, client, mailbox):
        """A bot must not be able to tell it was caught."""
        response = client.post(
            "/api/newsletter/subscribe",
            data={"email": ADDRESS, "website": "http://spam.example"},
        )
        assert response.status_code == 200
        assert response.json()["success"] is True
        assert len(mailbox) == 0

    def test_address_is_normalised(self, client, mailbox, session):
        client.post("/api/newsletter/subscribe", data={"email": "SoMeOne@DKRZ.de"})
        assert row(session).email == ADDRESS

    def test_records_the_signup_address_for_consent(self, client, mailbox, session):
        """Art. 7(1) DSGVO puts the burden of showing consent on us."""
        client.post(
            "/api/newsletter/subscribe",
            data={"email": ADDRESS},
            headers={"x-forwarded-for": "134.1.2.3, 10.0.0.9"},
        )
        # Leftmost entry is the client; the rest are proxies.
        assert row(session).signup_ip == "134.1.2.3"

    def test_starts_inactive(self, client, mailbox, session):
        """Nothing is on the list until the link is clicked."""
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        subscriber = row(session)
        assert subscriber.is_active is False
        assert subscriber.confirmed_at is None

    @pytest.mark.parametrize("language", ["de", "en", "es"])
    def test_language_is_honoured(self, client, mailbox, session, language):
        client.post(
            "/api/newsletter/subscribe",
            data={"email": ADDRESS, "language": language},
        )
        assert row(session).language == language

    def test_unknown_language_falls_back_to_english(self, client, mailbox, session):
        client.post(
            "/api/newsletter/subscribe", data={"email": ADDRESS, "language": "kl"}
        )
        assert row(session).language == "en"

    def test_second_signup_reissues_rather_than_duplicating(
        self, client, mailbox, session
    ):
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        first = row(session).verification_token
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        assert session.query(Subscriber).count() == 1
        assert row(session).verification_token != first
        assert len(mailbox) == 2

    def test_response_does_not_reveal_membership(self, client, mailbox):
        """Otherwise the endpoint is an oracle for who is on the list."""
        first = client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        second = client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        assert first.json() == second.json()
        assert first.status_code == second.status_code


class TestVerify:
    def test_confirms_and_redirects_to_the_page(self, client, mailbox, session):
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())

        response = client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)
        assert response.status_code == 302
        location = response.headers["location"]
        assert location.endswith("/newsletter/?status=success&lang=en")

        subscriber = row(session)
        assert subscriber.is_active is True
        assert subscriber.confirmed_at is not None

    def test_redirect_is_absolute(self, client, mailbox):
        """The page and the API are not always the same origin in
        development, so a relative redirect would land on the API."""
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())
        location = client.get(
            f"/api/newsletter/verify/{token}", follow_redirects=False
        ).headers["location"]
        assert location.startswith("http://")

    def test_clears_the_token_so_it_cannot_be_replayed(self, client, mailbox, session):
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())
        client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)

        assert row(session).verification_token is None
        again = client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)
        assert "status=invalid" in again.headers["location"]

    def test_sends_a_welcome_mail(self, client, mailbox):
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())
        client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)
        assert len(mailbox) == 2

    def test_unknown_token_redirects_with_invalid(self, client):
        response = client.get("/api/newsletter/verify/nonsense", follow_redirects=False)
        assert response.status_code == 302
        assert "status=invalid" in response.headers["location"]

    def test_expired_token_redirects_with_expired(self, client, mailbox, session):
        from datetime import timedelta

        from waterpark_api.db.db_manager import TOKEN_EXPIRY_HOURS, utcnow

        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())

        subscriber = row(session)
        subscriber.token_created_at = utcnow() - timedelta(hours=TOKEN_EXPIRY_HOURS + 1)
        session.commit()

        response = client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)
        assert "status=expired" in response.headers["location"]
        assert row(session).is_active is False

    def test_records_the_confirming_address(self, client, mailbox, session):
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())
        client.get(
            f"/api/newsletter/verify/{token}",
            follow_redirects=False,
            headers={"x-forwarded-for": "134.9.9.9"},
        )
        assert row(session).confirm_ip == "134.9.9.9"


class TestUnsubscribe:
    def confirmed(self, client, mailbox, session) -> Subscriber:
        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        token = verification_token(mailbox.html())
        client.get(f"/api/newsletter/verify/{token}", follow_redirects=False)
        return row(session)

    def test_by_token_alone(self, client, mailbox, session):
        """Every link in every mail carries only a token. This path used to
        fail with a 400 because the address was validated unconditionally."""
        token = self.confirmed(client, mailbox, session).unsubscribe_token

        response = client.post("/api/newsletter/unsubscribe", data={"token": token})
        assert response.status_code == 200
        assert row(session).is_active is False

    def test_by_address(self, client, mailbox, session):
        self.confirmed(client, mailbox, session)
        response = client.post("/api/newsletter/unsubscribe", data={"email": ADDRESS})
        assert response.status_code == 200
        assert row(session).is_active is False

    def test_requires_one_of_the_two(self, client):
        response = client.post("/api/newsletter/unsubscribe", data={})
        assert response.status_code == 400

    def test_one_click_endpoint(self, client, mailbox, session):
        """RFC 8058: the mail client POSTs here on its own, no session."""
        token = self.confirmed(client, mailbox, session).unsubscribe_token

        response = client.post(f"/api/newsletter/unsubscribe/{token}")
        assert response.status_code == 200
        subscriber = row(session)
        assert subscriber.is_active is False
        assert subscriber.unsubscribe_reason == "one-click"

    def test_reason_is_recorded_and_bounded(self, client, mailbox, session):
        token = self.confirmed(client, mailbox, session).unsubscribe_token
        client.post(
            "/api/newsletter/unsubscribe",
            data={"token": token, "reason": "x" * 900},
        )
        assert len(row(session).unsubscribe_reason) == 500

    def test_resubscribing_after_leaving_works(self, client, mailbox, session):
        token = self.confirmed(client, mailbox, session).unsubscribe_token
        client.post("/api/newsletter/unsubscribe", data={"token": token})

        client.post("/api/newsletter/subscribe", data={"email": ADDRESS})
        subscriber = row(session)
        assert subscriber.verification_token is not None
        assert subscriber.is_active is False

    def test_unknown_token_still_answers_200(self, client):
        """Otherwise the endpoint reveals which tokens are real."""
        response = client.post(
            "/api/newsletter/unsubscribe", data={"token": "nonsense"}
        )
        assert response.status_code == 200


class TestOps:
    def test_health(self, client):
        assert client.get("/api/health").json() == {"status": "ok"}


class TestVerifyBranches:
    def test_an_unknown_token(self, service):
        assert service.verify("nonsense") == (False, None, "invalid_token")

    def test_the_token_is_cleared_after_use(self, service):
        """A confirmation link is single use: the token is cleared, so a
        replay from a mail client prefetch or a forwarded message cannot
        re-run the confirmation."""
        row = confirmed(service)
        assert row.verification_token is None
        assert row.is_active is True

    def test_an_active_subscriber_with_a_live_token_verifies_idempotently(
        self, service
    ):
        """Defensive branch. It is reachable if a row ends up active while
        still holding a token, and it has to answer success rather than
        invalid, or a second click would tell a confirmed reader their link
        was broken.
        """
        service.subscribe(ADDRESS)
        row = service.get_subscriber(ADDRESS)
        token = row.verification_token
        row.is_active = True
        service.db.commit()

        success, language, error = service.verify(token)
        assert (success, error) == (True, None)
        assert language == row.language

    def test_an_expired_token(self, service):
        service.subscribe(ADDRESS)
        row = service.get_subscriber(ADDRESS)
        token = row.verification_token
        row.token_created_at = utcnow() - timedelta(hours=TOKEN_EXPIRY_HOURS + 1)
        service.db.commit()

        success, _, error = service.verify(token)
        assert (success, error) == (False, "expired_token")
        assert service.get_subscriber(ADDRESS).is_active is False

    def test_an_unexpected_error_is_reported_not_raised(self, service, monkeypatch):
        def explode(*args, **kwargs):
            raise RuntimeError("database on fire")

        monkeypatch.setattr(service.db, "query", explode)
        assert service.verify("token") == (False, None, "error")

    def test_a_failed_welcome_mail_does_not_undo_the_confirmation(
        self, service, monkeypatch, mailbox
    ):
        service.subscribe(ADDRESS)
        token = service.get_subscriber(ADDRESS).verification_token
        monkeypatch.setattr(service.email, "send_welcome_email", lambda **kwargs: False)

        success, _, error = service.verify(token)
        assert (success, error) == (True, None)
        assert service.get_subscriber(ADDRESS).is_active is True


class TestModel:
    def test_repr_names_the_subscriber(self, service):
        service.subscribe(ADDRESS)
        text = repr(service.get_subscriber(ADDRESS))
        assert ADDRESS in text
        assert "active=False" in text

    def test_a_token_without_a_timestamp_is_invalid(self):
        """Belt and braces: a row edited by hand should not verify."""
        subscriber = Subscriber(email=ADDRESS)
        subscriber.verification_token = "token"
        subscriber.token_created_at = None
        assert subscriber.is_token_valid() is False

    def test_verify_refuses_an_invalid_token(self):
        subscriber = Subscriber(email=ADDRESS)
        assert subscriber.verify() is False
        assert subscriber.is_active is not True

    def test_the_unsubscribe_token_is_stable(self):
        """It appears in every mail ever sent, so regenerating it would
        break the links in messages already delivered."""
        subscriber = Subscriber(email=ADDRESS)
        first = subscriber.generate_unsubscribe_token()
        assert subscriber.generate_unsubscribe_token() == first

    def test_metadata_covers_the_consent_columns(self):
        columns = Base.metadata.tables["subscribers"].columns
        assert "signup_ip" in columns
        assert "confirm_ip" in columns


class TestCheckEmail:
    def test_normalises(self):
        assert check_email("SoMeOne@DKRZ.de", available=False) == ADDRESS

    def test_none_is_rejected_like_any_bad_address(self):
        """Callers pass Optional[str]; they all want the same outcome, and
        validate_email would raise TypeError rather than its own error."""
        with pytest.raises(EmailNotValidError):
            check_email(None)

    def test_empty_is_rejected(self):
        with pytest.raises(EmailNotValidError):
            check_email("")

    def test_a_null_mx_domain_is_rejected(self):
        """example.com publishes a null MX record, meaning it accepts no
        mail. Rejected under both settings, since the check that catches it
        is not the globally_deliverable one."""
        for available in (True, False):
            with pytest.raises(EmailNotValidError):
                check_email("a@example.com", available=available)


class TestSubscribeBranches:
    def test_an_already_active_subscriber_gets_no_new_mail(self, service, mailbox):
        """Re-subscribing must not let someone spam a confirmed address by
        submitting the form repeatedly."""
        confirmed(service)
        before = len(mailbox)

        assert service.subscribe(ADDRESS) is True
        assert len(mailbox) == before

    def test_a_pending_subscriber_gets_a_fresh_token(self, service, mailbox):
        service.subscribe(ADDRESS)
        first = service.get_subscriber(ADDRESS).verification_token

        service.subscribe(ADDRESS)
        assert service.get_subscriber(ADDRESS).verification_token != first

    def test_an_integrity_error_is_swallowed(self, service, monkeypatch):
        """Two simultaneous signups race on the unique index. The loser
        must not surface the collision, which would reveal membership."""

        def explode():
            raise IntegrityError("insert", {}, Exception("duplicate"))

        monkeypatch.setattr(service.db, "commit", explode)
        assert service.subscribe(ADDRESS) is True

    def test_an_unexpected_error_is_swallowed(self, service, monkeypatch):
        def explode():
            raise RuntimeError("database on fire")

        monkeypatch.setattr(service.db, "commit", explode)
        assert service.subscribe(ADDRESS) is True

    def test_a_rejected_address_is_reported_to_the_caller(self, service, mailbox):
        """subscribe returns False only here, for an address that fails
        validation. Every other failure returns True so the endpoint cannot
        be used to test who is on the list; an invalid address reveals
        nothing, so it is allowed to say so.
        """
        assert service.subscribe("a@example.com") is False
        assert len(mailbox) == 0
        # Queried directly: get_subscriber validates too, and would raise
        # on the very address under test.
        assert service.db.query(Subscriber).count() == 0


class TestUnsubscribeBranches:
    def test_an_unknown_token_reports_success(self, service):
        """Otherwise the endpoint tells an attacker which tokens exist."""
        assert service.unsubscribe(token="nonsense") is True

    def test_an_unknown_address_reports_success(self, service):
        assert service.unsubscribe(email="nobody@dkrz.de") is True

    def test_an_unexpected_error_is_swallowed(self, service, monkeypatch):
        def explode(*args, **kwargs):
            raise RuntimeError("database on fire")

        confirmed(service)
        monkeypatch.setattr(service.db, "query", explode)
        assert service.unsubscribe(email=ADDRESS) is True

    def test_the_reason_is_stored(self, service):
        row = confirmed(service)
        service.unsubscribe(token=row.unsubscribe_token, reason="too much mail")
        assert service.get_subscriber(ADDRESS).unsubscribe_reason == "too much mail"

    def test_unsubscribing_twice_is_harmless(self, service):
        row = confirmed(service)
        assert service.unsubscribe(token=row.unsubscribe_token) is True
        assert service.unsubscribe(token=row.unsubscribe_token) is True
        assert service.get_subscriber(ADDRESS).is_active is False


class TestLookups:
    def test_get_subscriber_normalises_the_address(self, service):
        service.subscribe(ADDRESS)
        assert service.get_subscriber("SoMeOne@DKRZ.de") is not None

    def test_get_subscriber_returns_none_when_absent(self, service):
        assert service.get_subscriber("nobody@dkrz.de") is None

    def test_get_subscriber_by_token(self, service):
        row = confirmed(service)
        found = service.get_subscriber_by_token(row.unsubscribe_token)
        assert found is not None
        assert found.email == ADDRESS

    def test_get_subscriber_by_token_returns_none_when_absent(self, service):
        assert service.get_subscriber_by_token("nonsense") is None
