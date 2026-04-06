from caruca.ir.syntax import *

runcon_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--compute"]),
            SecurityType(flag="-t", alias=["--type"], choices=["type1", "type2"]),
            User(flag="-u", alias=["--user"]),
            SecurityRole(flag="-r", alias=["--role"], choices=["role1", "role2"]),
            SecurityRange(flag="-l", alias=["--range"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            SecurityContext(arity=Arity.EXACTLY_ONE),  # Context
            Command(arity=Arity.AT_LEAST_ONE),  # COMMAND and args
        ],
    ]
]

