"""
The command line interface and the `python -m waterpark_api` entry point.

The parser is generated from server_settings.toml rather than written out,
so most of what is worth testing is that the generation stays consistent
with the schema, and that a flag actually reaches uvicorn.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
import tomllib
from pathlib import Path
from typing import Annotated, Any, Dict, List, Optional, Union
from unittest.mock import patch

import pytest
from waterpark_api import __version__
from waterpark_api.cli import (
    VersionAction,
    _dict_to_defaults,
    _is_type_annotation,
    cli_app,
    create_arg_parser,
)

SCHEMA = (
    Path(__file__).resolve().parent.parent
    / "src"
    / "waterpark_api"
    / "config"
    / "server_settings.toml"
)


@pytest.fixture
def cli_env(monkeypatch: pytest.MonkeyPatch, reset_state: None, tmp_path: Path) -> Path:
    """A clean environment, so the parser shows the schema defaults.

    Deliberately not the shared `env` fixture: that sets WATERPARK_* values
    which legitimately outrank the config file, and the point of most of
    these tests is what the schema produces on its own.

    The config path is redirected because BootstrapConfig writes the
    defaults out when the file is absent, and its default location is the
    developer's own config directory.
    """
    for key in list(os.environ):
        if key.startswith("WATERPARK_") or key in {"DEBUG", "VERBOSITY"}:
            monkeypatch.delenv(key, raising=False)
    config = tmp_path / "server_settings.toml"
    monkeypatch.setenv("WATERPARK_CONFIG_PATH", str(config))
    return config


class FakeUvicorn:
    """Capture what cli_app would have run, and the env file it wrote."""

    def __init__(self) -> None:
        self.kwargs: Dict[str, Any] = {}
        self.env_file: Dict[str, str] = {}

    def __call__(self, app: str, **kwargs: Any) -> None:
        self.kwargs = {"app": app, **kwargs}
        # NamedTemporaryFile deletes it when cli_app returns, so read now.
        path = kwargs.get("env_file")
        if path and Path(path).is_file():
            for line in Path(path).read_text().splitlines():
                key, _, value = line.partition("=")
                self.env_file[key] = value


@pytest.fixture
def uvicorn_run(monkeypatch: pytest.MonkeyPatch) -> FakeUvicorn:
    fake = FakeUvicorn()
    monkeypatch.setattr("waterpark_api.cli.uvicorn.run", fake)
    return fake


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------


class TestIsTypeAnnotation:
    @pytest.mark.parametrize(
        "annotation,target",
        [
            (dict, dict),
            (Dict[str, str], dict),
            (Optional[Dict[str, str]], dict),
            (Union[Dict[str, str], None], dict),
            (Annotated[Dict[str, str], "note"], dict),
            (Annotated[Optional[Dict[str, str]], "note"], dict),
            (List[str], list),
        ],
    )
    def test_matches_through_wrappers(self, annotation, target):
        assert _is_type_annotation(annotation, target)

    @pytest.mark.parametrize(
        "annotation,target",
        [(str, dict), (List[str], dict), (Optional[str], dict), (None, dict)],
    )
    def test_does_not_match_other_types(self, annotation, target):
        assert not _is_type_annotation(annotation, target)


class TestDictToDefaults:
    def test_none_gives_nothing(self):
        assert _dict_to_defaults(None) == []

    def test_a_string_becomes_one_pair(self):
        assert _dict_to_defaults({"a": "1"}) == [("a", "1")]

    def test_a_list_becomes_one_pair_per_item(self):
        assert _dict_to_defaults({"a": ["1", "2"]}) == [("a", "1"), ("a", "2")]

    def test_keys_are_kept_in_order(self):
        result = _dict_to_defaults({"a": "1", "b": ["2", "3"]})
        assert result == [("a", "1"), ("b", "2"), ("b", "3")]


# --------------------------------------------------------------------------
# the parser
# --------------------------------------------------------------------------


class TestParser:
    def test_builds(self, cli_env):
        assert isinstance(create_arg_parser(), argparse.ArgumentParser)

    def test_no_duplicate_flags(self, cli_env):
        """Every setting in the schema becomes a flag, and a few are added
        by hand. A name appearing in both raises ArgumentError at build
        time, which is exactly how `--debug` broke once: it was added by
        hand and also leaked into model_fields.
        """
        parser = create_arg_parser()
        flags = [
            option for action in parser._actions for option in action.option_strings
        ]
        assert len(flags) == len(set(flags)), sorted(
            f for f in flags if flags.count(f) > 1
        )

    def test_every_setting_has_a_flag(self, cli_env):
        parser = create_arg_parser()
        flags = {
            option for action in parser._actions for option in action.option_strings
        }
        for name in tomllib.loads(SCHEMA.read_text()):
            expected = "--" + name.replace("_", "-")
            assert expected in flags, f"{name} has no CLI flag"

    def test_defaults_come_from_the_schema(self, cli_env):
        args = create_arg_parser().parse_args([])
        schema = tomllib.loads(SCHEMA.read_text())
        assert args.port == schema["port"]["default"]
        assert args.base_url == schema["base_url"]["default"]

    def test_a_flag_overrides_its_default(self, cli_env):
        args = create_arg_parser().parse_args(["--port", "9999"])
        assert args.port == 9999

    def test_typed_settings_are_converted(self, cli_env):
        """`port` is declared as an integer, so argparse must not hand back
        the string."""
        args = create_arg_parser().parse_args(["--port", "9999"])
        assert isinstance(args.port, int)

    def test_bool_settings_are_switches(self, cli_env):
        """A bool takes no value: `--email-disabled`, not
        `--email-disabled true`."""
        parser = create_arg_parser()
        assert parser.parse_args([]).email_disabled is False
        assert parser.parse_args(["--email-disabled"]).email_disabled is True

    def test_multi_valued_settings_take_several(self, cli_env):
        args = create_arg_parser().parse_args(
            ["--cors-origins", "http://a.invalid", "http://b.invalid"]
        )
        assert args.cors_origins == ["http://a.invalid", "http://b.invalid"]

    def test_config_path_is_a_path(self, cli_env):
        args = create_arg_parser().parse_args(["--config-path", "/tmp/x.toml"])
        assert isinstance(args.config_path, Path)

    def test_verbosity_counts(self, cli_env):
        assert create_arg_parser().parse_args([]).v == 0
        assert create_arg_parser().parse_args(["-vvv"]).v == 3

    def test_unknown_flag_is_rejected(self, cli_env):
        with pytest.raises(SystemExit):
            create_arg_parser().parse_args(["--not-a-real-flag"])


class TestVersion:
    def test_action_prints_and_exits_cleanly(self, cli_env, capsys):
        with pytest.raises(SystemExit) as exit_info:
            create_arg_parser().parse_args(["--version"])
        assert exit_info.value.code == 0
        assert __version__ in capsys.readouterr().out

    def test_action_is_the_custom_one(self, cli_env):
        """The stock _VersionAction would print the rich markup literally."""
        parser = create_arg_parser()
        action = next(a for a in parser._actions if "--version" in a.option_strings)
        assert isinstance(action, VersionAction)


# --------------------------------------------------------------------------
# cli_app
# --------------------------------------------------------------------------


class TestCliApp:
    def test_starts_the_right_app(self, cli_env, uvicorn_run):
        cli_app([])
        assert uvicorn_run.kwargs["app"] == "waterpark_api.main:app"
        assert uvicorn_run.kwargs["host"] == "0.0.0.0"

    def test_port_reaches_uvicorn(self, cli_env, uvicorn_run):
        cli_app(["--port", "9999"])
        assert uvicorn_run.kwargs["port"] == 9999

    def test_without_debug_it_forks_workers(self, cli_env, uvicorn_run):
        cli_app(["--n-workers", "4"])
        assert uvicorn_run.kwargs["reload"] is False
        assert uvicorn_run.kwargs["workers"] == 4
        assert uvicorn_run.kwargs["reload_dirs"] is None

    def test_debug_reloads_instead_of_forking(self, cli_env, uvicorn_run):
        """Workers and reload are mutually exclusive in uvicorn; passing
        both leaves the reloader unable to restart anything."""
        cli_app(["--debug"])
        assert uvicorn_run.kwargs["reload"] is True
        assert uvicorn_run.kwargs["workers"] is None

    def test_reload_dirs_are_strings(self, cli_env, uvicorn_run):
        """uvicorn rejects Path objects here."""
        cli_app(["--debug"])
        assert all(
            isinstance(entry, str) for entry in uvicorn_run.kwargs["reload_dirs"]
        )

    def test_settings_are_passed_through_an_env_file(self, cli_env, uvicorn_run):
        """uvicorn re-imports the app in a subprocess when reloading, so
        the configuration has to travel as an env file rather than as
        already-set attributes."""
        cli_app([])
        assert uvicorn_run.kwargs["env_file"]
        assert "WATERPARK_PORT" in uvicorn_run.env_file

    def test_a_flag_ends_up_in_the_env_file(self, cli_env, uvicorn_run):
        cli_app(["--email-server", "relay.invalid"])
        assert uvicorn_run.env_file["WATERPARK_EMAIL_SERVER"] == "relay.invalid"

    def test_a_flag_beats_an_environment_variable(
        self, cli_env, uvicorn_run, monkeypatch
    ):
        """Precedence is command line, then environment, then config file.

        cli_app used to write the env file out of model_fields, and each
        Config re-reads its own variable in model_post_init, so an explicit
        flag was silently replaced by whatever the environment already
        said.
        """
        monkeypatch.setenv("WATERPARK_EMAIL_SERVER", "from-the-environment")
        cli_app(["--email-server", "from-the-command-line"])
        assert uvicorn_run.env_file["WATERPARK_EMAIL_SERVER"] == "from-the-command-line"

    def test_the_environment_is_used_when_no_flag_is_given(
        self, cli_env, uvicorn_run, monkeypatch
    ):
        monkeypatch.setenv("WATERPARK_EMAIL_SERVER", "from-the-environment")
        cli_app([])
        assert uvicorn_run.env_file["WATERPARK_EMAIL_SERVER"] == "from-the-environment"

    def test_debug_and_verbosity_reach_the_env_file(self, cli_env, uvicorn_run):
        cli_app(["--debug", "-vv"])
        assert uvicorn_run.env_file["DEBUG"] == "1"
        assert uvicorn_run.env_file["VERBOSITY"] == "2"

    def test_config_path_reaches_the_env_file(self, cli_env, uvicorn_run, tmp_path):
        config = tmp_path / "elsewhere.toml"
        cli_app(["--config-path", str(config)])
        assert uvicorn_run.env_file["CONFIG_PATH"] == str(config.absolute())

    def test_the_env_file_is_removed_afterwards(self, cli_env, uvicorn_run):
        """It holds the database and mail passwords."""
        cli_app([])
        assert not Path(uvicorn_run.kwargs["env_file"]).exists()

    def test_empty_values_are_not_written(self, cli_env, uvicorn_run):
        """A blank line, or a key set to nothing, would make uvicorn's
        dotenv parser unhappy for no benefit."""
        cli_app([])
        assert all(value.strip() for value in uvicorn_run.env_file.values())


# --------------------------------------------------------------------------
# python -m waterpark_api
# --------------------------------------------------------------------------


class TestModuleEntryPoint:
    def run(self, *argv: str) -> subprocess.CompletedProcess:
        return subprocess.run(
            [sys.executable, "-m", "waterpark_api", *argv],
            capture_output=True,
            text=True,
            timeout=60,
        )

    def test_module_form_works(self):
        """`python -m waterpark_api` has to reach cli_app. __main__.py is
        four lines and nothing else imports it, so nothing else would
        notice if it broke."""
        result = self.run("--version")
        assert result.returncode == 0, result.stderr
        assert __version__ in result.stdout

    def test_module_form_shows_help(self):
        result = self.run("--help")
        assert result.returncode == 0, result.stderr
        assert "--port" in result.stdout

    def test_console_script_works(self):
        """`waterpark-api` is what the container and the systemd unit run.
        The entry point was once `waterpark_api:cli.cli_app`, which is an
        attribute lookup on the package that __init__.py never performs, so
        the installed command raised AttributeError on every invocation.
        """
        import shutil

        script = shutil.which("waterpark-api")
        if not script:
            pytest.skip("package not installed in this environment")
        result = subprocess.run(
            [script, "--version"], capture_output=True, text=True, timeout=60
        )
        assert result.returncode == 0, result.stderr
        assert __version__ in result.stdout


def test_main_passes_command_line_arguments() -> None:
    """Test __main__"""
    from waterpark_api.__main__ import main

    with (
        patch("waterpark_api.__main__.cli_app") as mock_cli_app,
        patch(
            "waterpark_api.__main__.sys.argv",
            ["program-name", "arg1", "--flag"],
        ),
    ):
        main()

    mock_cli_app.assert_called_once_with(["arg1", "--flag"])
