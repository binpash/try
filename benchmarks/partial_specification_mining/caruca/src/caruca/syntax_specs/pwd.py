from caruca.ir.syntax import *

pwd_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-L", alias=["--logical"]),
            Flag("-P", alias=["--physical"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]
