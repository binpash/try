from caruca.ir.syntax import *

true_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

