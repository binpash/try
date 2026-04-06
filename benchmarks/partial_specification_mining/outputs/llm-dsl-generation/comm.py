from caruca.ir.syntax import *

comm_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-1"),
            Flag("-2"),
            Flag("-3"),
            Flag("--check-order"),
            Flag("--nocheck-order"),
            Delimiter(flag="--output-delimiter"),
            Flag("--total"),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]

