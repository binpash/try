from caruca.ir.syntax import *

link_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),
            Path(arity=Arity.EXACTLY_ONE),
        ],
    ]
]
