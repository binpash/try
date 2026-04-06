from caruca.ir.syntax import *

groups_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [User(arity=Arity.ZERO_OR_MORE)],
    ]
]

