from caruca.ir.syntax import *

expr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Expression(arity=Arity.EXACTLY_ONE)],
    ]
]

