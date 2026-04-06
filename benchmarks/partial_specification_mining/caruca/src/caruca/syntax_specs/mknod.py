from caruca.ir.syntax import *

mknod_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Permission(flag="-m", alias=["--mode"]),
            Flag("-Z"),
            SecurityContext(flag="--context", flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),
            Selection(choices=["b", "c", "u", "p"], arity=Arity.EXACTLY_ONE),
            Integer(arity=Arity.OPTIONAL),
            Integer(arity=Arity.OPTIONAL),
        ],
    ]
]

