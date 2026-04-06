from caruca.ir.syntax import *

sum_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-r"),
            Flag("-s", alias=["--sysv"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

