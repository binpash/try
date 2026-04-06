from caruca.ir.syntax import *

chmod_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Permission(arity=Arity.OPTIONAL),
            Path(arity=Arity.AT_LEAST_ONE)     # FILE
        ]
    ]
]
