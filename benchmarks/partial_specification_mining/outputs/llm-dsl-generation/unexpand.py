from caruca.ir.syntax import *

unexpand_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Flag("--first-only"),
            Integer(flag="-t", alias=["--tabs"]),
            String(flag="-t", alias=["--tabs"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

