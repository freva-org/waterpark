"""Definition of the central logging system."""

import logging
import logging.config
import os
import sysconfig
from logging.handlers import RotatingFileHandler
from pathlib import Path
from typing import List, Optional

import platformdirs
from rich.console import Console
from rich.logging import RichHandler

from .server_settings import ENV_PREFIX


def _get_logdir() -> Path:
    """Define the logging dir."""
    prefix = ENV_PREFIX.lower()
    from_env = os.environ.get(f"{ENV_PREFIX}_LOGDIR")
    if from_env:
        env_dir = Path(from_env)
        env_dir.mkdir(exist_ok=True, parents=True)
        return env_dir
    for log_dir in (
        Path(f"/var/lib/{prefix}"),
        Path(sysconfig.get_paths()["data"]) / "var" / "lib" / prefix.lower(),
    ):
        if os.access(log_dir, os.W_OK):
            log_dir.mkdir(exist_ok=True, parents=True)
            return log_dir
    return platformdirs.user_log_path(prefix, ensure_exists=True)


THIS_NAME: str = ENV_PREFIX.lower().replace("_", "-")
BASE_LEVEL: int = int(os.getenv(f"{ENV_PREFIX}_LOG_LEVEL", str(logging.ERROR)))

logging.config.dictConfig(
    {
        "version": 1,
        # keep existing handlers
        "disable_existing_loggers": False,
        "root": {
            "level": BASE_LEVEL,
            "handlers": ["default"],
        },
        "formatters": {
            "standard": {
                "format": "%(asctime)s %(levelname)s: %(name)s - %(message)s",
            },
        },
        "handlers": {
            "default": {
                "class": "logging.StreamHandler",
                "formatter": "standard",
                "level": BASE_LEVEL,
            },
        },
    }
)


class Logger(logging.Logger):
    """Custom Logger defining the logging behaviour."""

    _instance: Optional["Logger"] = None
    logfmt: str = "%(name)s: %(message)s"
    filelogfmt: str = "%(asctime)s %(levelname)s: %(name)s - %(message)s"
    datefmt: str = "%Y-%m-%dT%H:%M:%S"
    no_debug: list[str] = ["watchfiles", "httpcore", "sqlalchemy"]

    def __init__(
        self,
        name: str = "api",
        level: Optional[int] = None,
    ) -> None:
        """Instantiate this logger only once and for all."""
        self.level = level or BASE_LEVEL
        name = f"{THIS_NAME}.{name or 'api'}"
        super().__init__(name, self.level)

        self.propagate = False
        self.handlers = self.get_handlers(self.level)

    @classmethod
    def get_handlers(cls, level: int) -> List[logging.Handler]:
        """Build the console and rotating-file handlers for a level."""
        logger_format = logging.Formatter(cls.logfmt, cls.datefmt)
        logger_file_handle = cls.get_file_handle(min(level, logging.ERROR))
        logger_stream_handle = RichHandler(
            rich_tracebacks=True,
            tracebacks_max_frames=10,
            tracebacks_extra_lines=5,
            show_path=True,
            console=Console(
                soft_wrap=False,
                force_jupyter=False,
                stderr=True,
            ),
        )
        logger_stream_handle.setFormatter(logger_format)
        logger_stream_handle.setLevel(level)
        return [logger_stream_handle, logger_file_handle]

    def set_level(self, level: int) -> None:
        """Set the logger level to level."""
        for handler in self.handlers:
            log_level = level
            if isinstance(handler, RotatingFileHandler):
                log_level = min(level, logging.ERROR)
            handler.setLevel(log_level)
        self.setLevel(level)
        self.level = level

    def reset_loggers(self, level: Optional[int] = None) -> None:
        """Unify all loggers that we have currently aboard."""
        level = self.level if level is None else level
        self.setLevel(level)
        for name, _logger in logging.root.manager.loggerDict.items():
            if any([name.startswith(n) for n in self.no_debug]):
                lev = logging.ERROR
            else:
                lev = level
            # loggerDict also holds PlaceHolder entries for namespace
            # parents that nobody has requested yet. They have no level and
            # no handlers, so skip them rather than catching AttributeError
            # and hoping that was the only reason.
            if not isinstance(_logger, logging.Logger):
                continue
            _logger.setLevel(lev)
            _logger.propagate = True
            _logger.handlers = self.get_handlers(lev)

    @classmethod
    def get_file_handle(
        cls,
        level: int = logging.ERROR,
    ) -> logging.Handler:
        """Add a file log handle to the logger."""
        log_dir = _get_logdir()
        log_dir.mkdir(exist_ok=True, parents=True)
        logger_file_handle = RotatingFileHandler(
            log_dir / f"{THIS_NAME}.log",
            mode="a",
            maxBytes=5 * 1024**2,
            backupCount=5,
            encoding="utf-8",
            delay=False,
        )
        logger_file_handle.setFormatter(
            logging.Formatter(cls.filelogfmt, cls.datefmt)
        )
        logger_file_handle.setLevel(level)
        return logger_file_handle

    @staticmethod
    def get_level_from_verbosity(verbosity: int) -> int:
        """Calculate the log level from a verbosity."""
        return max(logging.ERROR - 10 * verbosity, -1)

    def apply_verbosity(self, verbosity: Optional[int] = None) -> int:
        """Set the logging level of the handlers to a certain level."""
        verbosity = self.level if verbosity is None else verbosity
        old_level = self.level
        level = self.get_level_from_verbosity(verbosity)
        self.reset_loggers(level)
        return old_level


logging.basicConfig(
    format="%(name)s: %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
    level=BASE_LEVEL,
    force=True,
    handlers=Logger.get_handlers(BASE_LEVEL),
)
