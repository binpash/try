from caruca.ir.syntax import *

fmt_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-w", alias=["--width"], arity=Arity.OPTIONAL),
        ],
    ]
]
