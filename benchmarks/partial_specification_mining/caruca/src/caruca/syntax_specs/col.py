from caruca.ir.syntax import *

col_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--no-backspaces"]),
            Flag("-f", alias=["--fine"]),
            Flag("-h", alias=["--tabs"]),
            Integer(flag="-l", alias=["--lines"]),
            Flag("-p", alias=["--pass"]),
            Flag("-x", alias=["--spaces"]),
            Flag("-H", alias=["--help"]),
            Flag("-V", alias=["--version"]),
        ],
        []
    ]
]
