from caruca.ir.syntax import *

printf_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [
            PrintfFormat(),  # FORMAT
            String(arity=Arity.ZERO_OR_MORE),  # ARGUMENT
        ],
    ]
]

