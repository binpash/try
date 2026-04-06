from caruca.ir.syntax import *

options = [
    Flag("-c", alias=["--bytes"]),
    Flag("-m", alias=["--chars"]),
    Flag("-l", alias=["--lines"]),
    Flag("-L", alias=["--max-line-length"]),
    Flag("-w", alias=["--words"]),
    Flag("--help"),
    Flag("--version"),
]

wc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--bytes"]),
            Flag("-l", alias=["--lines"]),
        ]   
    ]
]
