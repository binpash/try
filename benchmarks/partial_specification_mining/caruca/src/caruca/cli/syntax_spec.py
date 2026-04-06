from caruca.syntax_specs import get_syntax_spec


def launch_syntac_spec(args):
    if args.fetch:
        print(args.command)
        spec = get_syntax_spec(None, args.command)
        if not spec:
            raise Exception(f"Could not find prewritten spec for {args.command}")
        print(spec)
    else:
        import caruca.llm as llm

        print(llm.doc_to_dsl(args.command))


def syntax_spec_subparser(subparsers, parents):
    parser = subparsers.add_parser(
        "syntax-spec",
        parents=parents,
        help="Generate the syntax specification from documentation using an LLM",
    )
    parser.set_defaults(func=launch_syntac_spec)
    parser.add_argument(
        "--fetch",
        action="store_true",
        help="Fetch a prewritten specification if possible",
    )
    parser.add_argument("--json", action="store_true", help="Serialize output as json")
    return parser
