from caruca.ir.syntax import *

mkdir_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Permission(flag="-m", alias=["--mode"]),
            Flag("-p", alias=["--parents"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-Z"),
            SecurityContext(flag="--context"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]
