from caruca.ir.syntax import *

mknod_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Permission(flag="-m", alias=["--mode"]),
            Flag("-Z"),
            SecurityContext(flag="--context"),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),  # NAME
            Selection(choices=("b", "c", "u", "p"), arity=Arity.EXACTLY_ONE),  # TYPE
            Integer(arity=Arity.ZERO_OR_ONE),  # MAJOR
            Integer(arity=Arity.ZERO_OR_ONE),  # MINOR
        ],
    ]
]

