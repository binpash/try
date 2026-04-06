from caruca.ir.syntax import *

chcon_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--dereference"),
            Flag("-h", alias=["--no-dereference"]),
            User(flag="-u", alias=["--user"]),
            SecurityRole(flag="-r", alias=["--role"]),
            SecurityType(flag="-t", alias=["--type"]),
            SecurityRange(flag="-l", alias=["--range"]),
            Flag("--no-preserve-root"),
            Flag("--preserve-root"),
            Path(flag="--reference"),
            Flag("-R", alias=["--recursive"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-H"),
            Flag("-L"),
            Flag("-P"),
            Flag("--help"),
            Flag("--version"),
        ],
        [SecurityContext(arity=Arity.EXACTLY_ONE), Path(arity=Arity.AT_LEAST_ONE)],
    ]
]
