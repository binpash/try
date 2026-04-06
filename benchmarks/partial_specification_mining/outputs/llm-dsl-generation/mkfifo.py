from caruca.ir.syntax import *

mkfifo_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Permission(flag="-m", alias=["--mode"]),
            Flag("-Z"),
            SecurityContext(flag="--context", flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]

