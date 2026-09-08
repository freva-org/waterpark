"""FastAPI dependency injection providers."""

from contextlib import contextmanager
from typing import TYPE_CHECKING, Generator, Iterator, Optional

from sqlalchemy.orm import Session

from ..config import get_connection_string, get_logger, get_settings
from .db_manager import DatabaseManager
from .newsletter import NewsletterService

if TYPE_CHECKING:
    from ..config.server_settings import Settings


_db_manager: Optional[DatabaseManager] = None

logger = get_logger("db")


def init_database(
    server_settings: Optional["Settings"] = None,
) -> DatabaseManager:
    """Initialize the global database manager."""
    global _db_manager
    if _db_manager is None:
        server_settings = server_settings or get_settings()
        connection_string = (
            server_settings.db_connect_string
            or get_connection_string(
                db_type=server_settings.db_type,
                host=server_settings.db_host,
                port=server_settings.db_port,
                database=server_settings.db_name,
                username=server_settings.db_username,
                password=server_settings.db_password,
            )
        )

        _db_manager = DatabaseManager(
            connection_string=connection_string,
            echo=bool(server_settings.debug),
        )

        _db_manager.create_tables()
        logger.info("Database initialized: %s", server_settings.db_type)
    return _db_manager


async def db_lifespan(server_settings: Optional["Settings"] = None) -> None:
    """Adjust the database settings."""
    _ = init_database(server_settings)


async def db_shutdown() -> None:
    """Release pooled connections on teardown."""
    global _db_manager
    if _db_manager is not None:
        _db_manager.dispose()
        _db_manager = None


@contextmanager
def session_scope() -> Iterator[Session]:
    """Session for code that runs outside the request/response cycle.

    Background tasks must not reuse a session yielded by ``Depends``. FastAPI
    0.106 made that explicitly unsupported; 0.118 moved the teardown back to
    after the response is sent, so it happens to work again on current
    versions. Relying on that ties the correctness of this service to a
    FastAPI patch release, so background tasks open their own session here.
    """
    if _db_manager is None:  # pragma: no cover
        raise RuntimeError("Database not initialized")

    session = _db_manager.get_session()
    try:
        yield session
    finally:
        session.close()


def get_db_session() -> Generator[Session, None, None]:
    """Dependency that provides a database session.

    Yields:
        SQLAlchemy Session
    """
    with session_scope() as session:
        yield session


def get_newsletter_service() -> Generator[NewsletterService, None, None]:
    """Dependency that provides a newsletter service instance.

    Yields:
        NewsletterService instance
    """
    with session_scope() as session:
        yield NewsletterService(session)
