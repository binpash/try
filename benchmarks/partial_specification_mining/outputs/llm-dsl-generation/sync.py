from caruca.ir.syntax import *

sync_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d", alias=["--data"]),
            Flag("-f", alias=["--file-system"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

