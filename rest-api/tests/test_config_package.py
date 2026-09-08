"""
The config package: connection strings, the logger factory, asset dirs.

Complements test_config.py, which covers how settings resolve. This is
about the module-level helpers around them.
"""

from __future__ import annotations

import logging
from pathlib import Path

import pytest
from waterpark_api.config import (
    get_asset_dir,
    get_connection_string,
    get_logger,
    get_settings,
)


class TestConnectionString:
    def test_sqlite_is_a_file_path(self):
        assert (
            get_connection_string("sqlite", database="/tmp/wp")
            == "sqlite:////tmp/wp.db"
        )

    def test_postgres_defaults_to_5432(self):
        url = get_connection_string(
            "postgresql",
            host="db.invalid",
            database="waterpark",
            username="u",
            password="p",
        )
        assert url == "postgresql://u:p@db.invalid:5432/waterpark"

    def test_mysql_defaults_to_3306_and_names_the_driver(self):
        """SQLAlchemy needs the driver in the scheme; plain `mysql://`
        picks MySQLdb, which is not a dependency here."""
        url = get_connection_string(
            "mysql",
            host="db.invalid",
            database="waterpark",
            username="u",
            password="p",
        )
        assert url == "mysql+pymysql://u:p@db.invalid:3306/waterpark"

    @pytest.mark.parametrize("db_type", ["PostgreSQL", "MySQL", "SQLite"])
    def test_the_type_is_case_insensitive(self, db_type):
        assert get_connection_string(db_type, database="x", host="h")

    def test_an_explicit_port_wins(self):
        url = get_connection_string(
            "postgresql", host="h", port=6543, database="d", username="u", password="p"
        )
        assert ":6543/" in url

    def test_an_unknown_type_is_rejected_by_name(self):
        """A typo in the config should say what was wrong, not fail later
        with an opaque SQLAlchemy dialect error."""
        with pytest.raises(ValueError, match="oracle"):
            get_connection_string("oracle", database="x")


class TestGetLogger:
    def test_each_call_builds_a_fresh_logger(self):
        """Not a cache: the module global only gates applying the verbosity
        once. Each call returns a new Logger, constructed directly rather
        than through logging.getLogger, so it is detached from the logging
        manager and carries its own handlers.

        That is why every module takes its logger once at import. Calling
        get_logger in a request path would add another rotating file
        handler on the same file on every request.
        """
        first, second = get_logger(), get_logger()
        assert first is not second
        assert first.name == second.name

    def test_handlers_are_not_stacked_on_one_instance(self):
        logger = get_logger()
        assert len(logger.handlers) == len(set(map(id, logger.handlers)))

    def test_the_name_is_namespaced(self):
        assert get_logger("newsletter").name == "waterpark.newsletter"

    def test_verbosity_lowers_the_level(self, monkeypatch):
        import waterpark_api.config as config

        monkeypatch.setattr(config, "_LOGGER", None)
        assert get_logger(verbosity=2).level == logging.INFO

        monkeypatch.setattr(config, "_LOGGER", None)
        assert get_logger(verbosity=3).level == logging.DEBUG

    def test_the_default_is_quiet(self, monkeypatch):
        """ERROR by default, which is why a missing confirmation email
        looks like silence until VERBOSITY is raised."""
        import waterpark_api.config as config

        monkeypatch.setattr(config, "_LOGGER", None)
        monkeypatch.delenv("VERBOSITY", raising=False)
        assert get_logger().level == logging.ERROR

    def test_the_environment_beats_the_argument(self, monkeypatch):
        import waterpark_api.config as config

        monkeypatch.setattr(config, "_LOGGER", None)
        monkeypatch.setenv("VERBOSITY", "3")
        assert get_logger(verbosity=0).level == logging.DEBUG


class TestGetSettings:
    def test_is_cached(self, env, reset_state):
        assert get_settings() is get_settings()

    def test_resetting_the_global_rebuilds_it(self, env, reset_state, monkeypatch):
        """What the test fixtures rely on for isolation."""
        import waterpark_api.config as config

        first = get_settings()
        config._SETTINGS = None
        monkeypatch.setenv("WATERPARK_BASE_URL", "http://elsewhere.invalid")
        second = get_settings()

        assert first is not second
        assert second.base_url == "http://elsewhere.invalid"


class TestAssetDir:
    def test_returns_an_existing_directory(self):
        path = get_asset_dir()
        assert isinstance(path, Path)
        assert path.is_dir()

    def test_falls_back_when_the_site_path_is_not_writable(self, monkeypatch):
        """Unprivileged installs cannot write the system cache directory."""
        import platformdirs
        import waterpark_api.config as config

        def refuse(*args, **kwargs):
            raise PermissionError("read-only")

        monkeypatch.setattr(platformdirs, "site_cache_path", refuse)
        config.get_asset_dir.cache_clear()
        try:
            assert get_asset_dir().is_dir()
        finally:
            config.get_asset_dir.cache_clear()
