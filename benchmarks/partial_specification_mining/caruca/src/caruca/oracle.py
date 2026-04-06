import shlex
from collections import defaultdict, Counter
from itertools import chain
from sys import stdin
import math

from caruca.ir.syntax import MatchStrategy
from caruca.syntax_specs import get_syntax_spec


def oracle(invocation: str) -> tuple[str, list[MatchStrategy]]:
    """
    Given a command invocation string, eliminates as many recognized flags/options/arguments as possible
    Returns the unrecognized invocation string (empty string if the command is fully recognized)
    """
    strategies: list[MatchStrategy] = []

    try:
        command, *args = shlex.split(invocation, posix=True)
        if command == "sudo":
            command, *args = args
        usages = get_syntax_spec(None, command)
    except (ValueError, ModuleNotFoundError):
        return invocation, strategies

    for pos in chain.from_iterable(usages):
        progressed = True
        while progressed:
            progressed = False
            for sarg in pos:
                if not args:
                    return "", strategies

                args_tmp, strats = sarg.could_match(args)
                strategies.extend(strats)

                progressed = progressed or (args_tmp != args)
                args = args_tmp

    return shlex.join(args), strategies


def launch_oracle(args):
    summary = defaultdict(set)
    flag_count = Counter()
    for line in stdin:
        line = line.strip()
        assert line
        command, *_ = line.split()

        remaining, strategies = oracle(line)
        if args.exclude:
            strategies = [
                s for s in strategies if s.__class__.__name__ not in args.exclude
            ]

        flag_count[len(strategies)] += 1

        if args.no_strat:
            strategies = [s.arg for s in strategies]

        if args.full_match_only and remaining:
            continue

        if args.summary:
            summary[command].update(strategies)
        elif args.full_match_only:
            print(command, strategies)
        else:
            print(
                command,
                not remaining,
                strategies,
                f"Original: {line}, Unmatched: {remaining}",
            )

    if args.summary:
        print("===Summary===")
        print("How many flags does each invocation use?")
        for n, cnt in flag_count.items():
            print(f"{n} flags: {cnt}")
        for k, v in summary.items():
            print(k, v)

def select_from(n, k):
    if k > n:
        c = n
    else:
        c =  math.comb(n, k)
    assert c >= 1
    return c

def oracle_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "oracle",
        help="Determine whether caruca can produce annotations for the command",
        parents=parents,
    )
    parser.set_defaults(func=launch_oracle)
    parser.add_argument(
        "--no-strat",
        action="store_true",
        help="Only output the string of the matched args without information about the strategy used",
    )
    parser.add_argument(
        "--full-match-only",
        action="store_true",
        help="Only output full matches. In other words, no part of the command was unparsable",
    )
    parser.add_argument(
        "--exclude",
        nargs="+",
        default=None,
        help="Exclude arguments matched with these strategies from the output",
    )
    parser.add_argument(
        "--summary", action="store_true", help="Accumulate all results and deduplicate"
    )

    return parser
