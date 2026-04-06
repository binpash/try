from caruca.ir.syntax import *

pr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            String(flag="-h", alias=["--header"]),
            Flag("-t", alias=["--omit-header"]),
            Flag("-T", alias=["--omit-pagination"]),
        ],
    ]
]
