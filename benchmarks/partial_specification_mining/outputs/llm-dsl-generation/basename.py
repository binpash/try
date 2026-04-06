from caruca.ir.syntax import *

basename_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--multiple"]),
            String(flag="-s", alias=["--suffix"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ONE_OR_MORE), String(arity=Arity.ZERO_OR_ONE)],
    ]
]

