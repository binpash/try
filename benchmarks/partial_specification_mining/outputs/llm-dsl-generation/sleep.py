from caruca.ir.syntax import *

sleep_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Number(arity=Arity.ONE_OR_MORE)],
    ]
]

