from caruca.ir.syntax import *

comm_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-i"),  # This is actually incorrect, but posh provides it
            Flag("-1"),
            Flag("-2"),
            Flag("-3"),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]
