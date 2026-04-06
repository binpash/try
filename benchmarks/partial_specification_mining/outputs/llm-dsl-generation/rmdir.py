from caruca.ir.syntax import *

rmdir_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--ignore-fail-on-non-empty"),
            Flag("-p", alias=["--parents"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]

