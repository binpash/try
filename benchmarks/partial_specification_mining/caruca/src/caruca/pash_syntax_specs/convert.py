from caruca.ir.syntax import *

convert_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Path(arity=Arity.EXACTLY_ONE),
        ],
        [
            Geometry(flag="-resize"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),
        ],
    ]
]
