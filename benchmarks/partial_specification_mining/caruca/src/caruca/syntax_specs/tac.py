from caruca.ir.syntax import *

tac_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--before"]),
            Flag("-r", alias=["--regex"]),
            Separator(flag="-s", alias=["--separator"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
