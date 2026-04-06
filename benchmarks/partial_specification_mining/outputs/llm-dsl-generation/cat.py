from caruca.ir.syntax import *

cat_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-A", alias=["--show-all"]),
            Flag("-b", alias=["--number-nonblank"]),
            Flag("-e"),
            Flag("-E", alias=["--show-ends"]),
            Flag("-n", alias=["--number"]),
            Flag("-s", alias=["--squeeze-blank"]),
            Flag("-t"),
            Flag("-T", alias=["--show-tabs"]),
            Flag("-u"),
            Flag("-v", alias=["--show-nonprinting"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

