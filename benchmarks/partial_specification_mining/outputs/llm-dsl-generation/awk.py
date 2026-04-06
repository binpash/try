from caruca.ir.syntax import *

awk_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            String(flag="-F"),
            Path(flag="-f"),
            String(flag="-v", arity=Arity.ZERO_OR_MORE),
        ],
        [
            String(arity=Arity.EXACTLY_ONE),
            [Path(arity=Arity.ZERO_OR_MORE)],
        ],
    ]
]

