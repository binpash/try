from caruca.ir.syntax import *

yes_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [String(arity=Arity.ZERO_OR_MORE)],
    ]
]

