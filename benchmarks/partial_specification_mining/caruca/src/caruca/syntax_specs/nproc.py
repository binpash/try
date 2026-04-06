from caruca.ir.syntax import *

nproc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--all"),
            Int(flag="--ignore", flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]

