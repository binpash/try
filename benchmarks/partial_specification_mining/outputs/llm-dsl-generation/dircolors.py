from caruca.ir.syntax import *

dircolors_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--sh", "--bourne-shell"]),
            Flag("-c", alias=["--csh", "--c-shell"]),
            Flag("-p", alias=["--print-database"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_ONE)],
    ]
]

