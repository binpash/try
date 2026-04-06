from caruca.ir.syntax import *

pr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-m", alias=["--merge"]),
            Char(flag="-s", alias=["--separator"]),  # Char
            Flag("-t", alias=["--omit-header"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]