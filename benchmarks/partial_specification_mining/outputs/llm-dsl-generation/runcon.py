from caruca.ir.syntax import *

runcon_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            SecurityContext(arity=Arity.ZERO_OR_ONE),
            Flag("-c", alias=["--compute"]),
            SecurityType(flag="-t", alias=["--type"]),
            User(flag="-u", alias=["--user"]),
            SecurityRole(flag="-r", alias=["--role"]),
            SecurityRange(flag="-l", alias=["--range"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Command(), Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

