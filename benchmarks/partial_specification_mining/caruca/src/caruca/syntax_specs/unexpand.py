from caruca.ir.syntax import *

unexpand_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Flag("--first-only"),
            Integer(flag="-t", alias=["--tabs"]),
            Other(flag="-t", alias=["--tabs"], choices=("1", "2", "1,2")), # TODO: -t here has two types (Int | List<Position>)
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
