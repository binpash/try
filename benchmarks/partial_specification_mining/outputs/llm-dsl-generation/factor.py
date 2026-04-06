from caruca.ir.syntax import *

factor_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Int(arity=Arity.ZERO_OR_MORE)],
    ]
]

