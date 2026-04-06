from caruca.ir.syntax import *

dirname_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ONE_OR_MORE)],
    ]
]

