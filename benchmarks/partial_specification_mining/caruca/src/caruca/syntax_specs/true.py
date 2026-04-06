from caruca.ir.syntax import *

true_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [],  # No arguments are needed
    ]
]

