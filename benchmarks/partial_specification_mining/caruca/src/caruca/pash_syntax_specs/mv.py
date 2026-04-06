from caruca.ir.syntax import *

mv_syntax_spec: list[SyntaxSpecification] = [
    [
        [Path(arity=Arity.AT_LEAST_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]
