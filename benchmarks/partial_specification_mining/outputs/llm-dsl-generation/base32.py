from caruca.ir.syntax import *

base32_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d", alias=["--decode"]),
            Flag("-i", alias=["--ignore-garbage"]),
            Integer(flag="-w", alias=["--wrap"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_ONE)],
    ]
]

