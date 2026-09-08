"""Module call of the CLI."""

import sys

from .cli import cli_app


def main() -> None:
    """Run the cli."""
    cli_app(sys.argv[1:])


if __name__ == "__main__":
    main()
