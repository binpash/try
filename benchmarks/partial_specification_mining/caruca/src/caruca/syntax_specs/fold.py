from caruca.ir.syntax import *

fold_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--bytes"]),
            Flag("-s", alias=["--spaces"]),
            Integer("-w", alias=["--width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
