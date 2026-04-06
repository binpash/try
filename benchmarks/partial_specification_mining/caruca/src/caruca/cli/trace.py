import pathlib
from pathlib import Path

from caruca.cli.generate import invocation_numbers, string_invocations
from caruca.tracer.data import Traces
from caruca.tracer.tracer import Tracer


def launch_trace(args):
    output = Path(args.output or f"outputs/{args.command}.json")
    if args.pash:
        spec_path = "caruca.pash_syntax_specs"
    elif args.posh:
        spec_path = "caruca.posh_syntax_specs"
    else:
        spec_path = None

    if args.length_only:
        s = 0
        for c in invocation_numbers(
            args.command,
            spec_path,
            args.skip,
            args.max_arity,
            args.elaborate_relations,
            args.stdin,
            args.content,
        ):
            s += c
        print(s)
        return

    invocations = string_invocations(
        args.command,
        spec_path,
        args.skip,
        args.max_arity,
        args.elaborate_relations,
        args.max_count,
    )

    traces = Tracer(args.parallel, args.stdin, args.content, args.prefix).run(
        invocations
    )
    output.write_text(Traces(traces).model_dump_json(indent=2))


def trace_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "trace",
        help="Trace all possible invocations of the given command",
        parents=parents,
    )
    parser.set_defaults(func=launch_trace)
    parser.add_argument(
        "--prefix",
        type=str,
        default="",
        help="add a prefix to the command to use alternate command implementations",
    )
    parser.add_argument(
        "--output",
        type=pathlib.Path,
        help="Directory to store trace files. Defaults to outputs/CMD_traces/",
    )
    parser.add_argument(
        "--parallel",
        "-p",
        type=int,
        metavar="N",
        help="""
        Run invocations in parallel.
        Decreases completion time at the risk of producing different results for some commands. 
        Most commands are not affected by this option. 
        Setting this to a non-positive int will disable parallelism.
        """,
        default=10,
    )
    parser.add_argument(
        "--pash", action="store_true", help="Use simplified specifications for PaSh"
    )
    parser.add_argument(
        "--posh", action="store_true", help="Use simplified specifications for POSH"
    )
    parser.add_argument(
        "--length-only",
        action="store_true",
        help="Calculate the number of executions needed",
    )
    return parser
