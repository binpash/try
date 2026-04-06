from caruca.ir.syntax import *

join_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-a"),
            String(flag="-e"),
            Flag("-i", alias=["--ignore-case"]),
            Integer(flag="-j"),
            String(flag="-o"),
            Char(flag="-t"),
            Integer(flag="-v"),
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

