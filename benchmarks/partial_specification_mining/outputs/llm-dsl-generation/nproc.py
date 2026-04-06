from caruca.ir.syntax import *

nproc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--all"),
            Integer(flag="--ignore"),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]

