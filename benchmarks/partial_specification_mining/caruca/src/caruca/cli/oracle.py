from sys import stdin

from caruca.oracle import oracle, Exact


def launch_oracle(args):
    for line in stdin:
        line = line.strip()
        remaining, strategies = oracle(line)

        if args.implicit_exact:
            strategies = [s for s in strategies if not isinstance(s, Exact)]

        print(not remaining, strategies, line, remaining)


def oracle_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "oracle",
        help="Determine whether caruca can produce annotations for the command",
        parents=parents,
    )
    parser.set_defaults(func=launch_oracle)
    parser.add_argument(
        "--implicit-exact",
        action="store_true",
        help="Hide exact matches from strategies output",
    )
    return parser
