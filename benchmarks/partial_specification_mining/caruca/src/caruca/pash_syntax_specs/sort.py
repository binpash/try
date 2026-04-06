from caruca.ir.syntax import *

sort_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-m", alias=["--merge"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
]
