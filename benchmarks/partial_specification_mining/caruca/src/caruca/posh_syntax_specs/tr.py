from caruca.ir.syntax import *

tr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d", alias=["--delete"]),
        ],
        [String(arity=Arity.EXACTLY_ONE), String(arity=Arity.OPTIONAL)],
    ]
]
