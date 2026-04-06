from caruca.ir.syntax import *

join_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(flag="-a", choices=("1", "2")),
            String(flag="-e"),
            Flag("-i", alias=["--ignore-case"]),
            Integer(flag="-j"),
            Format(flag="-o"),
            Char(flag="-t"),
            Selection(flag="-v", choices=("1", "2")),
            Integer(flag="-1"),
            Integer(flag="-2"),
            Flag("--check-order"),
            Flag("--nocheck-order"),
            Flag("--header"),
            Flag("-z", alias=["--zero-terminated"]),

            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]
