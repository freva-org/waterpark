"""
The type machinery behind the settings schema.

Every setting declares a type as a string in server_settings.toml, and
that string drives the environment parsing, the argparse conversion and
the value written back out. These are the pieces that translate.
"""

from __future__ import annotations

from pathlib import Path

import pytest
from waterpark_api.config.server_settings import (
    Config,
    Types,
    _conv_to_int,
    _merge_config,
    _str_to_bool,
    _str_to_list,
)


class TestScalarHelpers:
    @pytest.mark.parametrize(
        "value,expected",
        [("8080", 8080), ("", 42), (None, 42), ("not a number", 42), ("-1", 42)],
    )
    def test_conv_to_int_falls_back_rather_than_raising(self, value, expected):
        """Used on environment variables at import time, where raising
        would take the process down over a typo."""
        assert _conv_to_int(value, 42) == expected

    @pytest.mark.parametrize(
        "value,expected",
        [
            ("1", True), ("true", True), ("TRUE", True), ("yes", True),
            ("0", False), ("false", False), ("no", False), ("maybe", False),
        ],
    )
    def test_str_to_bool(self, value, expected):
        assert _str_to_bool(value) is expected

    def test_str_to_bool_without_a_value_or_default_is_none(self):
        """None is distinct from False here: it means unset."""
        assert _str_to_bool(None) is None

    def test_str_to_bool_uses_the_default(self):
        assert _str_to_bool(None, "yes") is True

    @pytest.mark.parametrize(
        "value,expected",
        [
            ("a,b", ["a", "b"]),
            (" a , b ", ["a", "b"]),
            ("a,,b", ["a", "b"]),
            ("", []),
            (None, []),
            (",", []),
        ],
    )
    def test_str_to_list_trims_and_drops_blanks(self, value, expected):
        assert _str_to_list(value) == expected


class TestTypeDeduction:
    @pytest.mark.parametrize(
        "value,expected",
        [(1, "integer"), ("s", "string"), (True, "bool"), (1.5, "float")],
    )
    def test_scalars(self, value, expected):
        assert Types.get_type(value) == expected

    def test_a_path(self):
        assert Types.get_type(Path("/tmp")) == "path"

    def test_a_collection_takes_its_first_element(self):
        assert Types.get_type(["a", "b"]) == "string[2]"

    def test_none_is_rejected(self):
        """A setting with no value cannot have its type deduced, and
        guessing string would silently produce the wrong parser."""
        with pytest.raises(ValueError, match="NoneTypes"):
            Types.get_type(None)

    def test_an_empty_collection_is_rejected(self):
        with pytest.raises(ValueError, match="deduce"):
            Types.get_type([])


class TestTypeParsing:
    @pytest.mark.parametrize(
        "spec,base,multi",
        [
            ("string", "string", False),
            ("integer", "integer", False),
            ("string[]", "string", True),
            ("string[3]", "string", True),
        ],
    )
    def test_specs(self, spec, base, multi):
        parsed = Config.parse_type(spec)
        assert parsed["base"] == base
        assert parsed["multi_valued"] is multi

    def test_a_fixed_length_is_kept(self):
        assert Config.parse_type("string[3]")["length"] == 3

    def test_an_invalid_spec_is_rejected(self):
        with pytest.raises(ValueError, match="invalid type spec"):
            Config.parse_type("banana")


class TestConfigRoundTrip:
    def test_a_string_setting(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_BASE_URL", raising=False)
        cfg = Config(name="base_url", default="http://x.invalid", type="string")
        assert cfg.to_env() == ("WATERPARK_BASE_URL", "http://x.invalid")

    def test_a_bool_is_written_as_0_or_1(self, monkeypatch):
        """`str(False)` is "False", which _str_to_bool reads back as
        False only by accident of not being in its truthy list."""
        monkeypatch.delenv("WATERPARK_EMAIL_DISABLED", raising=False)
        cfg = Config(name="email_disabled", default=False, type="bool")
        assert cfg.to_env() == ("WATERPARK_EMAIL_DISABLED", "0")

        monkeypatch.delenv("WATERPARK_EMAIL_DISABLED", raising=False)
        cfg = Config(name="email_disabled", default=True, type="bool")
        assert cfg.to_env() == ("WATERPARK_EMAIL_DISABLED", "1")

    def test_a_list_is_written_comma_separated(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_CORS_ORIGINS", raising=False)
        cfg = Config(name="cors_origins", default=["a", "b"], type="string[]")
        assert cfg.to_env() == ("WATERPARK_CORS_ORIGINS", "a,b")

    def test_a_list_survives_the_round_trip(self, monkeypatch):
        monkeypatch.setenv("WATERPARK_CORS_ORIGINS", "a,b,c")
        cfg = Config(name="cors_origins", default=[], type="string[]")
        assert cfg.default == ["a", "b", "c"]
        assert cfg.to_env() == ("WATERPARK_CORS_ORIGINS", "a,b,c")

    def test_an_integer_from_the_environment_is_typed(self, monkeypatch):
        monkeypatch.setenv("WATERPARK_PORT", "9999")
        cfg = Config(name="port", default=8080, type="integer")
        assert cfg.default == 9999
        assert isinstance(cfg.default, int)


class TestCliParams:
    def test_a_scalar_takes_one_value(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_PORT", raising=False)
        params = Config(name="port", default=8080, type="integer").cli_params
        assert params["name"] == "--port"
        assert params["nargs"] == 1
        assert params["type"] is int

    def test_a_bool_is_a_switch(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_EMAIL_DISABLED", raising=False)
        params = Config(
            name="email_disabled", default=False, type="bool"
        ).cli_params
        assert params["action"] == "store_true"
        assert "type" not in params
        assert "nargs" not in params

    def test_a_list_takes_any_number(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_CORS_ORIGINS", raising=False)
        params = Config(
            name="cors_origins", default=[], type="string[]"
        ).cli_params
        assert params["nargs"] == "*"
        assert params["default"] == []

    def test_underscores_become_dashes(self, monkeypatch):
        monkeypatch.delenv("WATERPARK_EMAIL_FROM_ADDRESS", raising=False)
        params = Config(
            name="email_from_address", default="a@b.invalid", type="string"
        ).cli_params
        assert params["name"] == "--email-from-address"


class TestMergeConfig:
    def test_missing_keys_are_filled_in(self):
        user = {"a": 1}
        _merge_config(user, {"a": 9, "b": 2})
        assert user == {"a": 1, "b": 2}

    def test_the_user_value_is_kept(self):
        """A partial local.toml must not lose the setting it overrides."""
        user = {"a": {"default": "mine"}}
        _merge_config(user, {"a": {"default": "shipped", "type": "string"}})
        assert user["a"]["default"] == "mine"

    def test_nested_keys_are_merged_not_replaced(self):
        """Overriding only `default` has to keep the shipped `type`, or the
        value is parsed as a string and the setting silently changes type."""
        user = {"port": {"default": 9999}}
        _merge_config(
            user, {"port": {"default": 8080, "type": "integer", "description": "d"}}
        )
        assert user["port"] == {
            "default": 9999,
            "type": "integer",
            "description": "d",
        }
