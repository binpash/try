from caruca.ir.syntax import *

tty_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-s", alias=["--silent", "--quiet"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]
