"""Server configuration: the schema, its types and the resolved Settings.

Every setting is declared in server_settings.toml with a default, a
description and a type. That file is the single source of truth: the CLI
flags, the environment variable names and the Settings attributes are all
derived from it.
"""

import os
import re
import sysconfig
from enum import Enum
from functools import cached_property
from pathlib import Path
from typing import (
    Any,
    Dict,
    List,
    MutableMapping,
    Optional,
    Tuple,
    Type,
    TypeAlias,
    TypedDict,
    Union,
    cast,
)

import toml
from platformdirs import user_config_path
from pydantic import BaseModel

ENV_PREFIX: str = "WATERPARK"
InnerConfig: TypeAlias = Union[int, float, str, bool, None, Path]
ConfigValue: TypeAlias = Union[InnerConfig, List[InnerConfig]]


def _conv_to_int(var: Optional[str], fallback: int) -> int:
    """Convert a env variable to a dict."""
    var = var or ""
    if not var.isdigit():
        return fallback
    return int(var)


def _str_to_bool(value: Optional[str], default: Optional[str] = None) -> Optional[bool]:
    value = value or default
    if value is None:
        return None
    return value.lower() in ("1", "true", "yes")


def _str_to_list(value: Optional[str]) -> List[str]:
    value = value or ""
    return [v.strip() for v in value.split(",") if v.strip()] or []


def _merge_config(
    user_config: MutableMapping[str, Any],
    system_config: MutableMapping[str, Any],
) -> None:
    for key, value in system_config.items():
        if key in user_config and isinstance(value, dict):
            _merge_config(user_config[key], system_config[key])
        else:
            user_config.setdefault(key, value)


class CliArgs(TypedDict, total=False):
    """Arguments for parsing the command line interface.

    total=False because callers legitimately remove keys before handing the
    rest to argparse: `name` becomes the positional flag, `nargs` is
    dropped for single values, and a bool carries `action` rather than
    `type`.
    """

    name: str
    nargs: Union[str, int]
    help: str
    default: Any
    type: Type[Any]
    action: str


class Types(Enum):
    """Types supported by the config."""

    string = str
    integer = int
    float = float
    bool = bool
    path = Path

    @classmethod
    def items(cls) -> List[str]:
        """List the names of every supported type."""
        return list(cls.__members__)

    @classmethod
    def get_type(cls, t: ConfigValue, length: int = 0) -> str:
        """Get the basetype from a given input type.

        The types can be either a base type or a collection of that contains
        *one* base type. Dictionaries and Collections that contain multiple
        types are not supported.
        """
        if t is None:
            raise ValueError("NoneTypes are not allowed.")
        if isinstance(t, (list, set, tuple)):
            if len(t) == 0:
                raise ValueError("Can't deduce type from collection")
            return cls.get_type(t[0], length=len(t))
        mapping = {v.value: k for (k, v) in Types.__members__.items()}
        if isinstance(t, Path):
            _type = "path"
        else:
            _type = mapping[type(t)]
        if length > 0:
            return f"{_type}[{length}]"
        return _type

    def map(self, value: str) -> ConfigValue:
        """Map a env variable to a default value."""
        if self.name == "bool":
            return (
                value.lower().startswith("y")
                or value.lower().startswith("t")
                or value == "1"
            )
        return cast(ConfigValue, self.value(value))


class ParseType(TypedDict):
    """A parsed type declaration: base name, length and repetition."""

    base: str
    length: Optional[int]
    multi_valued: bool


class Config(BaseModel):
    """Base model for each config value."""

    name: str
    """Name of the config key."""
    default: ConfigValue = None
    """The assigned default value."""
    description: str = ""
    """Human readable description."""
    type: str = "string"
    """The data type."""

    @staticmethod
    def read_secret(env_var: str) -> Optional[str]:
        """Read a setting from a container secret, if one is mounted.

        Follows the convention used by the postgres and mysql images: a
        `<VAR>_FILE` variable names a path, and the value is the contents
        of that file. Container runtimes expose secrets as files under
        /run/secrets, so this works the same for `podman secret`, `docker
        secret` and a plain bind-mounted directory, and it keeps
        credentials out of `ps` output and out of the image.

        A missing or empty file is not an error: it means the secret was
        not provided, and the caller falls back to the ordinary
        environment variable. That is what lets the same compose file run
        unconfigured against the local mailbox and configured against a
        real relay.
        """
        path = os.getenv(f"{env_var}_FILE")
        if not path:
            return None
        try:
            value = Path(path).read_text(encoding="utf-8").strip()
        except OSError:
            return None
        return value or None

    def model_post_init(self, __context: Any = None) -> None:
        """Override the declared default from a secret or the environment."""
        env_var = f"{ENV_PREFIX}_{self.name.upper()}"
        self.__parsed_type = self.parse_type(self.type)
        # The secret wins over the plain variable. Compose sets the plain
        # one to a sensible local default, so the reverse order would mean
        # a mounted secret was silently ignored.
        value = self.read_secret(env_var) or os.getenv(env_var)
        if value:
            _type = getattr(Types, self.__parsed_type["base"])
            if self.__parsed_type["multi_valued"]:
                self.default = [
                    _type.map(k.strip())
                    for k in value.split(",")
                    if k.strip()
                ]
            else:
                self.default = _type.map(value.strip())

    @classmethod
    def deduce_type(cls, name: str, default: ConfigValue) -> "Config":
        """Create an instance of the config class by guessing the type."""
        return cls(name=name, default=default, type=Types.get_type(default))

    @classmethod
    def parse_type(cls, v: str) -> ParseType:
        """Parse the data types.

        Accepts
        ^^^^^^^
          - 'string', 'integer', 'float'  -> length=None
          - 'float[2]', 'integer[5]' -> length=number
          - 'string[]'  -> length=None, multi_valued semantics
        """
        m = re.fullmatch(r"({})(\[(\d*)\])?".format("|".join(Types.items())), v)
        if not m:
            raise ValueError(f"invalid type spec {v!r}")
        base, _, num = m.groups()
        return {
            "base": base,
            "length": int(num) if num else None,
            "multi_valued": ("[" in v and "]" in v),
        }

    def to_env(self) -> Tuple[str, str]:
        """Create an environment entry."""
        key = f"{ENV_PREFIX}_{self.name.upper()}"
        if self.__parsed_type["multi_valued"]:
            default = self.default if isinstance(self.default, list) else []
            value = ",".join(map(str, default))
        elif self.__parsed_type["base"] == "bool":
            value = str(int(bool(self.default)))
        else:
            value = str(self.default)
        return key, value

    @property
    def cli_params(self) -> CliArgs:
        """Render this setting as keyword arguments for argparse."""
        default: ConfigValue
        nargs: Union[str, int]
        if self.__parsed_type["multi_valued"]:
            default = self.default if isinstance(self.default, list) else []
            nargs = "*"
        else:
            default = self.default
            nargs = 1
        args: CliArgs = {
            "name": f"--{self.name.replace('_', '-')}",
            "help": self.description,
            "type": getattr(Types, self.__parsed_type["base"]).value,
            "default": default,
            "nargs": nargs,
        }
        if self.type == "bool":
            args.pop("type")
            args.pop("nargs")
            args["action"] = "store_true"
        return args


class BootstrapConfig:
    """Bootstrap Configuration class."""

    def __init__(
        self,
        config_path: Optional[Union[str, Path]] = None,
        **extra_config: ConfigValue,
    ):
        """Read the config file, creating it from the defaults if absent."""
        self.config_path = Path(config_path or self.get_default_config_path())
        try:
            cfg = toml.loads(self.config_path.read_text())
        except (FileNotFoundError, IsADirectoryError, toml.TomlDecodeError):
            self.config_path.parent.mkdir(exist_ok=True, parents=True)
            self.config_path.write_text(
                self.system_config_file().read_text(), encoding="utf-8"
            )
            cfg = toml.loads(self.config_path.read_text())
        self._cfg: Dict[str, Config] = {
            k: Config.deduce_type(name=k, default=v) for (k, v) in extra_config.items()
        }
        _merge_config(cfg, self.default_config)

    @staticmethod
    def get_default_config_path() -> Path:
        """Find the config file, preferring a writable system-wide one."""
        _config = ENV_PREFIX.lower().replace("_", "-")
        config_prefix = f"{ENV_PREFIX}_CONFIG_PATH"
        sys_config_path = (
            Path(sysconfig.get_paths()["data"])
            / "share"
            / f"{_config}"
            / "server_settings.toml"
        )
        config_path = Path(os.getenv(config_prefix) or sys_config_path)
        if os.access(config_path, os.W_OK):
            return config_path
        return user_config_path(_config, ensure_exists=True) / "server_settings.toml"

    @classmethod
    def from_cli_env(
        cls, config_path: Optional[Union[str, Path]] = None, **kwargs: ConfigValue
    ) -> "BootstrapConfig":
        """Build the config from a path, the environment, or the defaults."""
        config_path = config_path or os.getenv(f"{ENV_PREFIX}_CONFIG_PATH")
        return cls(config_path=Path(config_path or cls.system_config_file()), **kwargs)

    @staticmethod
    def system_config_file() -> Path:
        """Check the system config."""
        return Path(__file__).parent / "server_settings.toml"

    @cached_property
    def default_config(self) -> Dict[str, Config]:
        """Read the systems default config."""
        user_cfg = toml.loads(self.config_path.read_text())
        system_cfg = toml.loads(self.system_config_file().read_text())
        _merge_config(user_cfg, system_cfg)
        for key, _cfg in user_cfg.items():
            self._cfg.setdefault(
                key,
                Config(
                    name=key,
                    default=_cfg.get("default"),
                    description=_cfg.get("description"),
                    type=_cfg.get("type", "string"),
                ),
            )
        return self._cfg


class Settings:
    """Setup for the Server config."""

    def __init__(
        self,
        config_path: Optional[Union[str, Path]] = None,
        **kwargs: ConfigValue,
    ) -> None:
        """Resolve every setting into an attribute on this instance."""
        # `debug` arrives as a kwarg from app.py, but get_settings is cached:
        # whoever calls it first fixes the instance for the process, so a
        # module that reaches it before app.py would leave the attribute
        # missing and every later read of it an AttributeError.
        #
        # Set directly rather than via kwargs: kwargs feed BootstrapConfig
        # and end up in model_fields, from which the CLI generates a flag
        # per setting. `debug` already has an explicit --debug there, and
        # the duplicate made `waterpark-api --help` die with
        # "conflicting option string: --debug".
        self.debug = bool(int(os.getenv("DEBUG", "0")))
        self.model_fields = list(
            BootstrapConfig.from_cli_env(config_path, **kwargs).default_config.values()
        )
        for cfg in self.model_fields:
            setattr(self, cfg.name, cfg.default)
            setattr(self, cfg.name.upper(), cfg.default)
        for key, value in kwargs.items():
            setattr(self, key, value)
            setattr(self, key.upper(), value)

    def __getattr__(self, name: str) -> Any:
        """Settings are built from the TOML schema, not declared here.

        Every key in server_settings.toml becomes an attribute via setattr
        in __init__, so a type checker has nothing to see and reports two
        dozen attr-defined errors. Declaring the dynamic surface once here
        is honest about that. Normal lookup runs first, so this is only
        reached for a key that genuinely is not configured, and it still
        raises the way an ordinary attribute miss would.
        """
        raise AttributeError(
            f"{type(self).__name__!r} object has no attribute {name!r}. "
            "Settings come from server_settings.toml; add it there."
        )
