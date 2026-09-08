"""Database models for Waterpark newsletter subscriptions.

Uses the SQLAlchemy ORM, so every query is parameterised.
"""

import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import DateTime, String, Text, create_engine
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    Session,
    mapped_column,
    sessionmaker,
)

from ..config import get_logger


class Base(DeclarativeBase):
    """Declarative base.

    A class rather than `declarative_base()` so mypy can use it as a base
    class and resolve the mapped attributes.
    """


# Token expiry duration
TOKEN_EXPIRY_HOURS = 48

logger = get_logger("db")


def utcnow() -> datetime:
    """Naive UTC timestamp.

    ``datetime.utcnow`` is deprecated from Python 3.12 on, but the columns
    below are naive ``DateTime``. Stripping the tzinfo keeps the stored
    values byte-identical to what the old code wrote, so no migration is
    needed, while silencing the deprecation.
    """
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Subscriber(Base):
    """Newsletter subscriber model with double opt-in support."""

    __tablename__ = "subscribers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    language: Mapped[str] = mapped_column(String(5), default="en")

    # Subscription timestamps
    subscribed_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow)
    confirmed_at: Mapped[Optional[datetime]] = mapped_column(DateTime)
    unsubscribed_at: Mapped[Optional[datetime]] = mapped_column(DateTime)

    # Status
    is_active: Mapped[bool] = mapped_column(default=False)

    # Double opt-in token
    verification_token: Mapped[Optional[str]] = mapped_column(String(64), index=True)
    token_created_at: Mapped[Optional[datetime]] = mapped_column(DateTime)

    # Unsubscribe
    unsubscribe_token: Mapped[Optional[str]] = mapped_column(String(64), index=True)
    unsubscribe_reason: Mapped[Optional[str]] = mapped_column(Text)

    # Proof of consent. Art. 7(1) DSGVO puts the burden of demonstrating
    # consent on us, and the address plus the two timestamps alone do not
    # show where the confirmation came from. Both are nullable so an entry
    # made by hand (support request) does not need them. IPv6 needs 45
    # characters.
    signup_ip: Mapped[Optional[str]] = mapped_column(String(45))
    confirm_ip: Mapped[Optional[str]] = mapped_column(String(45))

    def __repr__(self) -> str:
        """Identify the subscriber in logs and shell sessions."""
        return f"<Subscriber(email='{self.email}', active={self.is_active})>"

    def generate_verification_token(self) -> str:
        """Generate a new verification token."""
        self.verification_token = secrets.token_urlsafe(32)
        self.token_created_at = utcnow()
        return self.verification_token

    def generate_unsubscribe_token(self) -> str:
        """Generate a persistent unsubscribe token."""
        if not self.unsubscribe_token:
            self.unsubscribe_token = secrets.token_urlsafe(32)
        return self.unsubscribe_token

    def is_token_valid(self) -> bool:
        """Check if verification token is still valid."""
        if not self.verification_token or not self.token_created_at:
            return False

        expiry_time = self.token_created_at + timedelta(hours=TOKEN_EXPIRY_HOURS)
        return utcnow() < expiry_time

    def verify(self, confirm_ip: Optional[str] = None) -> bool:
        """Verify the subscription and clear the token."""
        if not self.is_token_valid():
            return False

        self.is_active = True
        self.confirmed_at = utcnow()
        self.confirm_ip = confirm_ip
        self.verification_token = None
        self.token_created_at = None
        return True


class DatabaseManager:
    """Manages database connections and sessions."""

    def __init__(self, connection_string: str, echo: bool = False):
        """Initialize database manager.

        Args:
            connection_string: SQLAlchemy connection string
            echo: Whether to log SQL statements
        """
        self.engine = create_engine(
            connection_string,
            echo=echo,
            pool_pre_ping=True,
        )
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine,
        )

    def create_tables(self) -> None:
        """Create all tables in the database.

        ``create_all`` only ever creates missing tables, it never alters an
        existing one. If the ``subscribers`` table predates the two consent
        IP columns, add them by hand or bring in alembic.
        """
        Base.metadata.create_all(bind=self.engine)

    def get_session(self) -> Session:
        """Get a new database session."""
        return self.SessionLocal()

    def dispose(self) -> None:
        """Close all pooled connections."""
        self.engine.dispose()
