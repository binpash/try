from caruca.ir.syntax import *

echo_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-e"),
            Flag("-n"),
        ],
        [String(arity=Arity.ZERO_OR_MORE)],
    ]
]
