from caruca.ir.syntax import *

comm_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-2"),
            Flag("-3"),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]
