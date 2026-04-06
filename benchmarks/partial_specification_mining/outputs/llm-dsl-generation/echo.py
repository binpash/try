from caruca.ir.syntax import *

echo_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-n"),
            Flag("-e"),
            Flag("-E"),
            Flag("--help"),
            Flag("--version"),
        ],
        [String(arity=Arity.ONE_OR_MORE)],
    ]
]

