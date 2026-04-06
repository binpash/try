from caruca.ir.syntax import *

rev_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-h", alias=["--help"]),
            Flag("-V", alias=["--version"]),
            # Flag("-0", alias=["--zero"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
