from caruca.ir.syntax import *

wc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--bytes"]),
            Flag("-m", alias=["--chars"]),
            Flag("-l", alias=["--lines"]),
            Path(flag="--files0-from"),
            Flag("-L", alias=["--max-line-length"]),
            Flag("-w", alias=["--words"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

