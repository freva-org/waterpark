"""# Command line interface for starting the Waterpark backend service."""

import argparse
import os
import sys
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import (
    Annotated,
    Any,
    Dict,
    List,
    Optional,
    Tuple,
    Type,
    Union,
    get_args,
    get_origin,
)

import uvicorn
from rich import print as pprint
from rich.markdown import Markdown
from rich_argparse import ArgumentDefaultsRichHelpFormatter

from waterpark_api import __version__

from .config import get_logger
from .config.server_settings import (
    ENV_PREFIX,
    BootstrapConfig,
    Config,
    Settings,
)


def _is_type_annotation(annotation: Any, target_type: Type[Any]) -> bool:
    """Check whether an annotation is, or contains, the target type.

    Looks through Optional, Annotated and other wrappers, so a
    ``Optional[List[str]]`` still matches ``list``.
    """
    origin = get_origin(annotation)

    if origin is Annotated:
        return _is_type_annotation(get_args(annotation)[0], target_type)

    if origin is Union:
        return any(
            _is_type_annotation(arg, target_type) for arg in get_args(annotation)
        )

    return origin is target_type or annotation is target_type


def _dict_to_defaults(
    input_dict: Optional[Dict[str, Union[List[str], str]]],
) -> List[Tuple[str, str]]:
    """Convert to dict to argparse defaults."""
    output: List[Tuple[str, str]] = []
    input_dict = input_dict or {}
    for key, value in input_dict.items():
        if isinstance(value, str):
            value = [value]
        for v in value:
            output.append((key, v))
    return output


class VersionAction(argparse._VersionAction):
    """Custom Action for displaying the program's versions."""

    def __call__(
        self,
        parser: argparse.ArgumentParser,
        namespace: argparse.Namespace,
        values: Any,
        option_string: Optional[str] = None,
    ) -> None:
        """Print the version of every relevant package and exit."""
        version = self.version or "%(prog)s"
        pprint(version % {"prog": parser.prog or sys.argv[1]})
        parser.exit()


def create_arg_parser(
    name: str = "waterpark-api", doc: Optional[str] = None
) -> argparse.ArgumentParser:
    """Create the cli parser."""
    parser = argparse.ArgumentParser(
        prog=name,
        description=Markdown(doc or __doc__),  # type: ignore
        formatter_class=ArgumentDefaultsRichHelpFormatter,
    )
    parser.add_argument(
        "--config-path",
        help="Path to the server config file.",
        type=Path,
        default=BootstrapConfig.get_default_config_path(),
    )
    parser.add_argument(
        "-V",
        "--version",
        help="Display version and exit.",
        version=f"[b][red]%(prog)s[/red]: {__version__}[/b]",
        action=VersionAction,
    )
    for config in Settings().model_fields:
        args = config.cli_params.copy()
        nargs = args.get("nargs", 1)
        if isinstance(nargs, int) and nargs == 1:
            _ = args.pop("nargs", 1)
        name = args.pop("name")
        parser.add_argument(name, **args)
    parser.add_argument(
        "--n-workers",
        "-w",
        help="Number of parallel processes.",
        default=os.getenv(f"{ENV_PREFIX}_WORKER", "8"),
        type=int,
    )
    parser.add_argument(
        "--debug",
        help="Turn on debug mode.",
        default=False,
        action="store_true",
    )
    parser.add_argument(
        "-v",
        action="count",
        default=0,
        help="Increase the verbosity level.",
    )
    return parser


def cli_app(argv: Optional[List[str]] = None) -> None:
    """Start the web service."""
    parser = create_arg_parser()
    args = parser.parse_args(argv)
    logger = get_logger(verbosity=args.v)
    logger.apply_verbosity(args.v)
    defaults = {
        "DEBUG": str(int(args.debug)),
        "VERBOSITY": str(args.v),
    }
    if args.config_path:
        defaults["CONFIG_PATH"] = str(args.config_path.absolute())
    defaults.setdefault(*Config.deduce_type("log_level", logger.level).to_env())
    settings = Settings(
        **{k: v for k, v in args._get_kwargs() if parser.get_default(k) != v},
    )
    for cfg in settings.model_fields:
        # Take the value off the resolved Settings rather than off the
        # Config. A Config re-reads its own environment variable in
        # model_post_init, so the objects in model_fields carry the
        # environment value even where the command line overrode it, and
        # writing those out would silently ignore an explicit flag.
        cfg.default = getattr(settings, cfg.name, cfg.default)
        defaults.setdefault(*cfg.to_env())
    with NamedTemporaryFile(suffix=".conf", prefix="env") as temp_f:
        env = "\n".join(
            sorted(
                [f"{k}={v.strip()}" for (k, v) in set(defaults.items()) if v.strip()]
            )
        )
        Path(temp_f.name).write_text(env, encoding="utf-8")
        reload_paths = [Path(__file__).parent.absolute()]
        uvicorn.run(
            "waterpark_api.main:app",
            host="0.0.0.0",
            port=args.port,
            reload=args.debug,
            log_level=logger.level,
            workers=args.n_workers if args.debug is False else None,
            env_file=temp_f.name,
            reload_dirs=[str(p) for p in reload_paths] if args.debug else None,
        )
