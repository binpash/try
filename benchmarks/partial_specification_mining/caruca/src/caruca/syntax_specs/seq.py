from caruca.ir.syntax import *

seq_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            PrintfFormat(flag="-f", alias=["--format"]),
            Separator(flag="-s", alias=["--separator"]),
            Flag("-w", alias=["--equal-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Integer(arity=Arity.EXACTLY_ONE),
        ],
    ],
    [
        [
            PrintfFormat(flag="-f", alias=["--format"]),
            Separator(flag="-s", alias=["--separator"]),
            Flag("-w", alias=["--equal-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Integer(arity=Arity.EXACTLY_ONE),
            Integer(arity=Arity.EXACTLY_ONE),
        ],
    ],
    [
        [
            PrintfFormat(flag="-f", alias=["--format"]),
            Separator(flag="-s", alias=["--separator"]),
            Flag("-w", alias=["--equal-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Integer(arity=Arity.EXACTLY_ONE),
            Integer(arity=Arity.EXACTLY_ONE),
            Integer(arity=Arity.EXACTLY_ONE),
        ],
    ],
]
