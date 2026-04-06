from caruca.ir.syntax import *

pathchk_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-p"),
            Flag("-P"),
            Flag("--portability"),

            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ONE_OR_MORE)],
    ]
]
