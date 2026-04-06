from caruca.ir.syntax import *

head_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-n", alias=["--lines"]),
        ],
    ]
]
