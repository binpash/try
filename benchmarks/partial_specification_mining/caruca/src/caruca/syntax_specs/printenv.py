from caruca.ir.syntax import *

printenv_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-0", alias=["--null"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Variable(arity=Arity.ZERO_OR_MORE)],
    ]
]

