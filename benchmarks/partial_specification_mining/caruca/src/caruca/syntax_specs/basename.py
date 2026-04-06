from caruca.ir.syntax import *

basename_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--multiple"]),
            Flag("-s", alias=["--suffix"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE), String(arity=Arity.OPTIONAL)],
    ]
]
