from caruca.ir.syntax import *

uniq_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--count"]),
            Flag("-d", alias=["--repeated"]),
        ],
    ]
]