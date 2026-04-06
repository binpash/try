from caruca.ir.syntax import *

options = [
    Flag("-c", alias=["--bytes"]),
    Flag("-m", alias=["--chars"]),
    Flag("-l", alias=["--lines"]),
    Flag("-L", alias=["--max-line-length"]),
    Flag("-w", alias=["--words"]),
    Flag("--help"),
    Flag("--version"),
]

wc_syntax_spec: list[SyntaxSpecification] = [
    [
        options,
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
    [
        [
            *options,
            Path(flag="--files0-from"),
        ],
    ],
]
