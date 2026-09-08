"""Newsletter subscription service.

Handles subscribe, verify and unsubscribe with double opt-in.
"""

from typing import Optional, Tuple

from email_validator import EmailNotValidError, validate_email
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..config import get_logger
from .db_manager import Subscriber, utcnow
from .email import EmailService

logger = get_logger("newsletter")


def check_email(addr: Optional[str], available: bool = True) -> str:
    """Validate and sanitise an email address.

    Raises EmailNotValidError, which every caller already handles: the
    endpoints turn it into a 400 and the service logs and drops the entry.
    """
    if not addr:
        # validate_email cannot take None, and every caller that might pass
        # one wants the same "not a valid address" outcome.
        raise EmailNotValidError("no email address given")
    return (
        validate_email(addr, globally_deliverable=available)
        .normalized.lower()
        .strip()
    )


class NewsletterService:
    """Service for managing newsletter subscriptions with double opt-in."""

    def __init__(
        self, db_session: Session, email_service: Optional[EmailService] = None
    ):
        """Initialize newsletter service.

        Args:
            db_session: SQLAlchemy database session
            email_service: Email service for sending verification emails
        """
        self.db = db_session
        self.email = email_service or EmailService()

    @staticmethod
    def _log_outcome(email: str, delivered: bool, resend: bool) -> None:
        """Report what actually happened to the verification email.

        EmailService swallows send failures and returns False, so without
        this the log read "verification sent" immediately after the ERROR
        line saying it had not been. The row is left in place either way:
        the pending subscriber is harmless, and the next signup attempt
        issues a fresh token and tries again.
        """
        what = (
            "Resent verification to"
            if resend
            else "New subscriber, verification sent"
        )
        if delivered:
            logger.info("%s: %s", what, email)
        else:
            logger.warning(
                "%s: %s -- but the email could NOT be delivered, so they "
                "will never receive the confirmation link",
                what,
                email,
            )

    def subscribe(
        self,
        email: str,
        language: str = "en",
        signup_ip: Optional[str] = None,
    ) -> bool:
        """Start the subscription process.

        Creates a pending subscriber and sends the verification email.

        Uses parameterized queries via SQLAlchemy ORM for SQL injection
        protection.

        Args:
            email: Subscriber email address
            language: Preferred language (de, en, es)
            signup_ip: Address the signup came from, kept as proof of
                consent under Art. 7(1) DSGVO

        Returns:
            True if operation completed (regardless of outcome for security)
        """
        try:
            email = check_email(email, available=True)
        except Exception as error:
            logger.warning(error)
            return False

        try:
            # Normalize email

            # Check if subscriber exists
            existing = (
                self.db.query(Subscriber)
                .filter(Subscriber.email == email)
                .first()
            )

            if existing:
                if existing.is_active:
                    # Already subscribed and verified - don't reveal this
                    logger.info(f"Already active subscriber: {email}")
                    return True

                # Reactivate: generate new token and resend verification
                existing.language = language
                existing.subscribed_at = utcnow()
                existing.signup_ip = signup_ip
                existing.unsubscribed_at = None
                existing.unsubscribe_reason = None
                token = existing.generate_verification_token()
                existing.generate_unsubscribe_token()
                self.db.commit()

                # Send verification email
                delivered = self.email.send_verification_email(
                    to_email=email,
                    token=token,
                    language=language,
                    unsubscribe_token=existing.unsubscribe_token,
                )
                self._log_outcome(email, delivered, resend=True)
            else:
                # Create new subscriber
                subscriber = Subscriber(
                    email=email,
                    language=language,
                    is_active=False,
                    signup_ip=signup_ip,
                )
                token = subscriber.generate_verification_token()
                subscriber.generate_unsubscribe_token()
                self.db.add(subscriber)
                self.db.commit()

                # Send verification email
                delivered = self.email.send_verification_email(
                    to_email=email,
                    token=token,
                    language=language,
                    unsubscribe_token=subscriber.unsubscribe_token,
                )
                self._log_outcome(email, delivered, resend=False)

            return True

        except IntegrityError:
            self.db.rollback()
            logger.warning(f"Integrity error for email: {email}")
            return True  # Don't reveal if email exists

        except Exception as e:
            self.db.rollback()
            logger.error(f"Error subscribing {email}: {e}")
            return True  # Generic response for security

    def verify(
        self, token: str, confirm_ip: Optional[str] = None
    ) -> Tuple[bool, Optional[str], Optional[str]]:
        """Verify a subscription using the token from the email link.

        Args:
            token: Verification token from email

        Returns:
            Tuple of (success, language, error_reason)
        """
        try:
            subscriber = (
                self.db.query(Subscriber)
                .filter(Subscriber.verification_token == token)
                .first()
            )

            if not subscriber:
                logger.warning(f"Invalid verification token: {token[:16]}...")
                return False, None, "invalid_token"

            if subscriber.is_active:
                logger.info(f"Already verified: {subscriber.email}")
                return True, subscriber.language, None

            if not subscriber.is_token_valid():
                logger.warning(f"Expired token for: {subscriber.email}")
                return False, subscriber.language, "expired_token"

            # Verify the subscription
            subscriber.verify(confirm_ip=confirm_ip)
            self.db.commit()

            logger.info(f"Subscription verified: {subscriber.email}")

            # Send welcome email. A failure here is cosmetic: the
            # subscription is already confirmed and committed above, so the
            # outcome is logged but never propagated to the caller.
            if not self.email.send_welcome_email(
                to_email=subscriber.email,
                language=subscriber.language,
                unsubscribe_token=subscriber.unsubscribe_token,
            ):
                logger.warning(
                    "Confirmed %s but the welcome email could not be sent",
                    subscriber.email,
                )

            return True, subscriber.language, None

        except Exception as e:
            self.db.rollback()
            logger.error(f"Error verifying token: {e}")
            return False, None, "error"

    def unsubscribe(
        self,
        email: Optional[str] = None,
        token: Optional[str] = None,
        reason: Optional[str] = None,
    ) -> bool:
        """Unsubscribe an email address.

        Args:
            email: Subscriber email address (optional if token provided)
            token: Unsubscribe token (optional if email provided)
            reason: Optional unsubscribe reason

        Returns:
            True if operation completed
        """
        try:
            subscriber = None

            if token:
                subscriber = (
                    self.db.query(Subscriber)
                    .filter(Subscriber.unsubscribe_token == token)
                    .first()
                )
            elif email:
                try:
                    email = check_email(email, available=True)
                except Exception as error:
                    logger.warning(error)
                    return False
                subscriber = (
                    self.db.query(Subscriber)
                    .filter(Subscriber.email == email)
                    .first()
                )

            if subscriber and subscriber.is_active:
                subscriber.is_active = False
                subscriber.unsubscribed_at = utcnow()
                subscriber.unsubscribe_reason = reason
                # Clear verification token but keep unsubscribe token
                subscriber.verification_token = None
                subscriber.token_created_at = None
                self.db.commit()
                logger.info(f"Unsubscribed: {subscriber.email}")

            return True

        except Exception as e:
            self.db.rollback()
            logger.error(f"Error unsubscribing: {e}")
            return True

    def get_subscriber(self, email: str) -> Optional[Subscriber]:
        """Get subscriber by email (for internal use only).

        Args:
            email: Subscriber email address

        Returns:
            Subscriber if found, None otherwise
        """
        email = check_email(email, available=False)
        return self.db.query(Subscriber).filter(Subscriber.email == email).first()

    def get_subscriber_by_token(self, token: str) -> Optional[Subscriber]:
        """Get subscriber by unsubscribe token.

        Args:
            token: Unsubscribe token

        Returns:
            Subscriber if found, None otherwise
        """
        return (
            self.db.query(Subscriber)
            .filter(Subscriber.unsubscribe_token == token)
            .first()
        )
