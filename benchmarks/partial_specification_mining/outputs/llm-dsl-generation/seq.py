from caruca.ir.syntax import *

seq_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            PrintfFormat(flag="-f", alias=["--format"], flag_followed_by_equals=True),
            Separator(flag="-s", alias=["--separator"], flag_followed_by_equals=True),
            Flag("-w", alias=["--equal-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Number(arity=Arity.EXACTLY_ONE),
            Number(arity=Arity.EXACTLY_TWO),
            [Number(arity=Arity.EXACTLY_TWO), Number(arity=Arity.EXACTLY_ONE)],
        ],
    ]
]

