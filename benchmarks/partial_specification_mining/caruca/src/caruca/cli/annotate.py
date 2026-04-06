from pathlib import Path

from caruca.annotator import annotate
from caruca.tracer.data import Traces


def launch_annotate(args):
    input = Path(args.input or f"outputs/{args.command}.json").read_text()
    traces = Traces.model_validate_json(input)
    annotations = annotate(args.command, args.annotation_type, traces)
    if args.annotation_type == "shellcheck":
        print(annotations.code)
    elif args.human:
        print(*(ann.to_human() for ann in annotations.root), sep="\n\n")
    else:
        print(annotations.model_dump_json(indent=2, by_alias=True))


def annotate_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "annotate",
        parents=parents,
        help="Generate annotations for a command from traces",
    )
    parser.add_argument(
        "--input", type=Path, help="Path to directory containing trace files"
    )
    parser.add_argument(
        "--human",
        action="store_true",
        help="Output in a human readable way",
    )
    parser.add_argument(
        "--hide-trivial",
        action="store_true",
        help="Hide trivial/vacuous annotations",
    )
    parser.add_argument(
        "--include-all-traces",
        action="store_true",
        help="Use all traces, including traces using files not in the sandbox. Potentially leads to many meaningless annotations",
    )
    parser.add_argument(
        "annotation_type",
        type=str,
        choices=["pash", "posh", "sash", "shellcheck"],
        default="pash",
    )
    parser.set_defaults(func=launch_annotate)
    return parser
