from caruca.ir.syntax import *

id_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a"),
            Flag("-Z", alias=["--context"]),
            Flag("-g", alias=["--group"]),
            Flag("-G", alias=["--groups"]),
            Flag("-n", alias=["--name"]),
            Flag("-r", alias=["--real"]),
            Flag("-u", alias=["--user"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [User(arity=Arity.ZERO_OR_MORE)],
    ]
]

