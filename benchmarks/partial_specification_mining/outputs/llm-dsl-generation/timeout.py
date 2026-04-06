from caruca.ir.syntax import *

timeout_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--preserve-status"),
            Flag("--foreground"),
            Duration(flag="-k", alias=["--kill-after"]),
            Signal(flag="-s", alias=["--signal"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Duration(arity=Arity.EXACTLY_ONE),
            Command(arity=Arity.EXACTLY_ONE),
            Other(arity=Arity.ZERO_OR_MORE),
        ],
    ]
]

