from caruca.ir.syntax import *

sort_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-n", alias=["--numeric-sort"]),
            Flag("-r", alias=["--reverse"]),
            String(flag="-k", alias=["--key"], choices=("1", "1.2", "1.2n", "1.2nr", "1n", "1nr")),
            Separator(flag="-t", alias=["--field-separator"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
]
