import argparse
from pathlib import Path

from caruca.cli.annotate import annotate_subparser
from caruca.cli.generate import generate_subparser
from caruca.cli.syntax_spec import syntax_spec_subparser
from caruca.cli.trace import trace_subparser
from caruca.oracle import oracle_subparser

DEFAULT_SKIP = "--version,--help,--interactive"


def setup_argparser():
    parser = argparse.ArgumentParser(description="Mining command specifications.")
    subparsers = parser.add_subparsers(title="subcommands")

    generate_mixin = argparse.ArgumentParser(add_help=False)
    generate_mixin.add_argument(
        "--skip",
        type=str,
        metavar="FLAGS",
        nargs="?",
        help=f'Comma separated list of flags to ignore. When flag is set without args, defaults to "{DEFAULT_SKIP}"',
        const=DEFAULT_SKIP,
    )
    generate_mixin.add_argument(
        "--max-arity",
        type=int,
        default=1,
        help="Set maximum generated arity for repeatable args. Larger values greatly increase runtime",
    )
    generate_mixin.add_argument(
        "--elaborate-relations",
        action="store_true",
        help="Use more elaborate file system relations when generating configs.",
    )
    generate_mixin.add_argument(
        "--stdin",
        type=str,
        default="simple",
        choices=["simple", "varied", "split"],
        help="Degree of variation to stdin input",
    )
    generate_mixin.add_argument(
        "--content",
        type=str,
        default="simple",
        choices=["simple", "varied", "split"],
        help="Degree of variation to file content",
    )
    generate_mixin.add_argument(
        "--max-count",
        type=int,
        default=4,
        help="The maximum number of optional flags to use for a single invocation",
    )
    generate_mixin.add_argument("--path", type=Path, help="Path to syntax spec")

    oracle_subparser(subparsers, [])
    for subparser in [
        annotate_subparser(subparsers, []),
        syntax_spec_subparser(subparsers, []),
        trace_subparser(subparsers, [generate_mixin]),
        generate_subparser(subparsers, [generate_mixin]),
    ]:
        subparser.add_argument(
            "command", help="The command to process.", type=str, metavar="COMMAND"
        )

    return parser.parse_args()
