"""
Configuration resolution.

The order is: container secret, then environment variable, then config
file, then the shipped default. The secret beats the plain variable
because compose always sets the plain one to a local default, and the
reverse order would mean a mounted secret was silently ignored.
"""

from __future__ import annotations

import pytest


@pytest.fixture
def settings(env, reset_state):
    """Resolve settings fresh from whatever the environment now says."""

    def resolve():
        import waterpark_api.config as config

        config._SETTINGS = None
        return config.get_settings()

    return resolve


class TestSecrets:
    def test_falls_back_to_the_environment_with_no_secret(self, settings):
        resolved = settings()
        assert resolved.email_server == "mailbox"
        assert resolved.email_port == 1025

    def test_a_secret_beats_the_environment(
        self, settings, monkeypatch, tmp_path
    ):
        secret = tmp_path / "email_server"
        secret.write_text("posteo.de\n")
        monkeypatch.setenv("WATERPARK_EMAIL_SERVER_FILE", str(secret))
        assert settings().email_server == "posteo.de"

    def test_a_missing_secret_file_is_not_an_error(
        self, settings, monkeypatch, tmp_path
    ):
        """The compose file always points _FILE at /run/secrets/<name>,
        whether or not anything is mounted there."""
        monkeypatch.setenv(
            "WATERPARK_EMAIL_SERVER_FILE", str(tmp_path / "absent")
        )
        assert settings().email_server == "mailbox"

    def test_an_empty_secret_counts_as_absent(
        self, settings, monkeypatch, tmp_path
    ):
        secret = tmp_path / "email_server"
        secret.write_text("   \n")
        monkeypatch.setenv("WATERPARK_EMAIL_SERVER_FILE", str(secret))
        assert settings().email_server == "mailbox"

    def test_a_secret_is_stripped(self, settings, monkeypatch, tmp_path):
        """Files written with printf, echo or a here-doc differ in whether
        they end in a newline."""
        secret = tmp_path / "email_password"
        secret.write_text("  hunter2\n\n")
        monkeypatch.setenv("WATERPARK_EMAIL_PASSWORD_FILE", str(secret))
        assert settings().email_password == "hunter2"

    def test_a_typed_secret_is_converted(self, settings, monkeypatch, tmp_path):
        secret = tmp_path / "email_port"
        secret.write_text("587")
        monkeypatch.setenv("WATERPARK_EMAIL_PORT_FILE", str(secret))
        resolved = settings()
        assert resolved.email_port == 587
        assert isinstance(resolved.email_port, int)


class TestConfigFile:
    def test_a_partial_file_merges_with_the_shipped_defaults(
        self, settings, monkeypatch, tmp_path
    ):
        config_file = tmp_path / "local.toml"
        config_file.write_text('[email_from_name]\ndefault = "Waterpark (dev)"\n')
        monkeypatch.setenv("WATERPARK_CONFIG_PATH", str(config_file))

        resolved = settings()
        assert resolved.email_from_name == "Waterpark (dev)"
        # untouched keys still resolve
        assert resolved.db_type == "sqlite"

    def test_the_environment_beats_the_file(
        self, settings, monkeypatch, tmp_path
    ):
        config_file = tmp_path / "local.toml"
        config_file.write_text('[email_server]\ndefault = "from-file"\n')
        monkeypatch.setenv("WATERPARK_CONFIG_PATH", str(config_file))
        monkeypatch.setenv("WATERPARK_EMAIL_SERVER", "from-env")
        assert settings().email_server == "from-env"

    def test_a_missing_file_is_seeded_from_the_shipped_defaults(
        self, settings, monkeypatch, tmp_path
    ):
        config_file = tmp_path / "does-not-exist.toml"
        monkeypatch.setenv("WATERPARK_CONFIG_PATH", str(config_file))
        settings()
        assert config_file.is_file()
        assert "email_server" in config_file.read_text()


class TestTypes:
    def test_multi_valued_settings_survive_repeated_reads(
        self, settings, monkeypatch
    ):
        """This was a generator once, so the first reader consumed it and
        everyone after saw an empty list."""
        monkeypatch.setenv(
            "WATERPARK_CORS_ORIGINS", "http://a.invalid,http://b.invalid"
        )
        resolved = settings()
        first = list(resolved.cors_origins)
        second = list(resolved.cors_origins)
        assert first == second == ["http://a.invalid", "http://b.invalid"]

    def test_an_unset_multi_valued_setting_is_an_empty_list(self, settings):
        assert list(settings().cors_origins) == []

    @pytest.mark.parametrize(
        "value,expected",
        [("1", True), ("true", True), ("yes", True), ("0", False), ("no", False)],
    )
    def test_booleans(self, settings, monkeypatch, value, expected):
        monkeypatch.setenv("WATERPARK_EMAIL_DISABLED", value)
        assert settings().email_disabled is expected


class TestSchema:
    def test_every_setting_the_code_reads_is_declared(self):
        """Guard against a setting used in code but missing from the TOML.

        Settings resolve through __getattr__, so a key that is read but
        never declared fails at runtime with AttributeError rather than at
        import. Adding `api_url` to the code without adding it to
        server_settings.toml took out 41 tests at once, all with the same
        unhelpful message.
        """
        import re
        import tomllib
        from pathlib import Path

        root = Path(__file__).resolve().parent.parent / "src" / "waterpark_api"
        schema = root / "config" / "server_settings.toml"
        declared = set(tomllib.loads(schema.read_text()))

        # Attributes of Settings that are not config keys, and attributes
        # read off other objects that happen to be called `settings`.
        not_config_keys = {
            "debug", "model_fields", "api", "username", "password",
            "name", "from_email", "from_name", "port", "server", "toml",
        }

        read = set()
        for path in root.rglob("*.py"):
            source = path.read_text()
            read |= set(re.findall(r"(?:get_settings\(\)|settings)\.([a-z_]+)", source))

        missing = sorted(read - declared - not_config_keys)
        assert not missing, (
            f"read in code but not declared in server_settings.toml: {missing}"
        )


class TestDefaults:
    def test_debug_is_present_even_when_nobody_passed_it(self, settings):
        """get_settings caches, so whichever module calls it first fixes the
        instance. Without a default, a caller that beat app.py to it would
        leave every later read of settings.debug raising AttributeError."""
        assert settings().debug in (True, False)

    def test_an_unknown_setting_still_raises(self, settings):
        """__getattr__ exists to declare the dynamic surface for mypy, not
        to make every attribute succeed. A typo must fail loudly, and the
        message has to say where settings come from."""
        with pytest.raises(AttributeError, match="server_settings.toml"):
            settings().not_a_real_setting

    def test_api_url_defaults_to_empty(self, settings):
        """Empty means same origin as base_url, which is the production
        shape behind nginx."""
        assert settings().api_url == ""
