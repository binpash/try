from collections.abc import Iterable
import pathlib

from caruca.ir.string import CommandInvocation
from caruca.ir.syntax import CommandSpecification
from caruca.syntax_specs import get_syntax_spec
from caruca.oracle import select_from


def string_invocations(
    cmd_name, path, skip, max_arity, elaborate_relations, max_count
) -> Iterable[CommandInvocation]:
    syntax_spec = get_syntax_spec(path, cmd_name)
    if syntax_spec is None:
        raise Exception(f"Syntax specification for '{cmd_name}' not found")

    command_spec = CommandSpecification(cmd_name, *syntax_spec)
    if skip:
        command_spec.remove(skip.split(","))

    return command_spec.to_concrete_string(max_arity, elaborate_relations, max_count)


def invocation_numbers(
    cmd_name, path, skip, max_arity, elaborate_relations, stdin, content
) -> tuple[int, int]:
    syntax_spec = get_syntax_spec(path, cmd_name)
    if syntax_spec is None:
        raise Exception(f"Syntax specification for '{cmd_name}' not found")

    command_spec = CommandSpecification(cmd_name, *syntax_spec)
    if skip:
        command_spec.remove(skip.split(","))

    return command_spec.length_hint(max_arity, elaborate_relations, stdin, content)


def launch_invocation(args):
    if args.number:
        syntax_spec = get_syntax_spec(args.path, args.command)
        n = 1
        for spec in syntax_spec:
            n_s = 1
            for group in spec:
                max_group_arity = max([len(arg.choices) if hasattr(arg, "choices") else 1 for arg in group])
                n_s *= select_from(len(group), args.max_count) * max_group_arity
            n *= n_s
        print(n)
        return

    for inv in string_invocations(
        args.command,
        args.path,
        args.skip,
        args.max_arity,
        args.elaborate_relations,
        args.max_count,
    ):
        if args.full:
            for config in inv.to_exec_env("split", "varied"):
                print(config)
        else:
            print(inv)


def generate_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "generate",
        help="Generate all possible invocations for given command",
        parents=parents,
    )
    parser.add_argument("--number", action="store_true", help="Only print number of invocations")
    parser.add_argument(
        "--output",
        type=pathlib.Path,
        help="Path to store output file. Defaults to outputs/CMD_invocations.txt",
    )
    parser.add_argument(
        "--full",
        action="store_true",
        help="Generate the most elaborate invocations. Overrides any invocation generation related flags",
    )

    parser.set_defaults(func=launch_invocation)
    return parser
