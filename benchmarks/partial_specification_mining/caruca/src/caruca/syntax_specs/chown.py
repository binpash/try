from caruca.ir.syntax import *

chown_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--changes"]),
            Flag("-f", alias=["--silent", "--quiet"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--dereference"),
            Flag("-h", alias=["--no-dereference"]),
            OwnerGroup(flag="--from"),
            Flag("--no-preserve-root"),
            Flag("--preserve-root"),
            Path(flag="--reference"),
            
            Flag("-R", alias=["--recursive"]),
            Flag("-H"),
            Flag("-L"),
            Flag("-P"),

            Flag("--help"),
            Flag("--version"),
        ],
        [
            OwnerGroup(arity=Arity.OPTIONAL),  # OwnerGroup
            Path(arity=Arity.ONE_OR_MORE)
        ],
    ]
]
