"""Configuration, logging and database connection helpers."""

import logging
import os
from functools import lru_cache
from pathlib import Path
from typing import Optional, Union

import platformdirs

from .logger import Logger
from .server_settings import ENV_PREFIX, BootstrapConfig, ConfigValue, Settings

_LOGGER: Optional[Logger] = None
_SETTINGS: Optional[Settings] = None


__all__ = [
    "get_asset_dir",
    "get_logger",
    "get_settings",
    "ENV_PREFIX",
    "BootstrapConfig",
]


@lru_cache
def get_asset_dir() -> Path:
    """Define the asset dir."""
    prefix = ENV_PREFIX.lower().replace("_", "-")
    try:
        return platformdirs.site_cache_path(prefix, ensure_exists=True)
    except PermissionError:
        return platformdirs.user_cache_path(prefix, ensure_exists=True)


def get_logger(name: str = "api", verbosity: int = 0) -> Logger:
    """Get the logger."""
    global _LOGGER
    verbosity = int(os.getenv("VERBOSITY", verbosity))
    logger = Logger(name, level=Logger.get_level_from_verbosity(verbosity))
    if _LOGGER is None:
        _LOGGER = logger
        _LOGGER.apply_verbosity(verbosity)
    logger.reset_loggers(logger.level)
    for key in ("sqlalchemy.engine.Engine",):
        _logger = logging.getLogger(key)
        _logger.setLevel(logging.ERROR)
        _logger.propagate = True
    return logger


def get_settings(
    config_path: Optional[Union[str, Path]] = None, **kwargs: ConfigValue
) -> Settings:
    """Resolve the settings once and reuse them for the process.

    Cached deliberately: the configuration is read at startup and is not
    meant to change under a running server. Tests reset ``_SETTINGS``.
    """
    global _SETTINGS
    if _SETTINGS is None:
        _SETTINGS = Settings(config_path=config_path, **kwargs)
    return _SETTINGS


def get_connection_string(
    db_type: str,
    host: Optional[str] = None,
    port: Optional[int] = None,
    database: str = "waterpark_backend",
    username: Optional[str] = None,
    password: Optional[str] = None,
) -> str:
    """Build SQLAlchemy connection string from components.

    Args:
        db_type: Database type (sqlite, postgresql, mysql)
        host: Database host
        port: Database port
        database: Database name
        username: Database username
        password: Database password

    Returns:
        SQLAlchemy connection string
    """
    db_type = db_type.lower()

    if db_type == "sqlite":
        return f"sqlite:///{database}.db"

    if db_type == "postgresql":
        port = port or 5432
        return f"postgresql://{username}:{password}@{host}:{port}/{database}"

    if db_type == "mysql":
        port = port or 3306
        return f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"

    raise ValueError(f"Unsupported database type: {db_type}")
