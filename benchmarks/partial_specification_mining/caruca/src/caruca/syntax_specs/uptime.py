from caruca.ir.syntax import *

uptime_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-p", alias=["--pretty"]),
            Flag("-h", alias=["--help"]),
            DateTime(flag="-s", alias=["--since"]),
            Flag("-V", alias=["--version"]),
        ],
        [],
    ]
]
