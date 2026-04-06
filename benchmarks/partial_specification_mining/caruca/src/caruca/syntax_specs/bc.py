from caruca.ir.syntax import *

bc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-h", alias=["--help"]),
            Flag("-i", alias=["--interactive"]),
            Flag("-l", alias=["--mathlib"]),
            Flag("-w", alias=["--warn"]),
            Flag("-s", alias=["--standard"]),
            Flag("-q", alias=["--quiet"]),
            Flag("-v", alias=["--version"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
]
