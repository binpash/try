from caruca.ir.syntax import *

ln_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-s", alias=["--symbolic"]),
        ],
        [
            Path(arity=Arity.AT_LEAST_ONE),
            Path(arity=Arity.EXACTLY_ONE),
        ],
    ]
]
