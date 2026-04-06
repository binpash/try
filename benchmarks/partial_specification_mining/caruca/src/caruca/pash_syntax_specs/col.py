from caruca.ir.syntax import *

col_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--no-backspaces"]),
            Flag("-x", alias=["--spaces"]),
        ],
    ]
]
