from caruca.ir.syntax import *

chmod_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--changes"]),
            Flag("-f", alias=["--silent", "--quiet"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--no-preserve-root"),
            Flag("--preserve-root"),
            Path(flag="--reference"),
            Flag("-R", alias=["--recursive"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Permission(arity=Arity.ONE_OR_MORE),  # MODE can be symbolic or octal
            Path(arity=Arity.ONE_OR_MORE),  # FILE can be one or more files
        ],
    ]
]

