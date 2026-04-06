from caruca.ir.syntax import *

cp_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Path(arity=Arity.AT_LEAST_ONE),  # Source
            Path(arity=Arity.EXACTLY_ONE),  # Destination
        ],
    ],
]
