from caruca.ir.syntax import *

sleep_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Integer(arity=Arity.AT_LEAST_ONE, suffixes=("s", "m", "h", "d"))],
    ]
]
