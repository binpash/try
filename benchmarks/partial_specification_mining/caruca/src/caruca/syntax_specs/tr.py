from caruca.ir.syntax import *

tr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["-C", "--complement"]),
            Flag("-d", alias=["--delete"]),
            Flag("-s", alias=["--squeeze-repeats"]),
            Flag("-t", alias=["--truncate-set1"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [String(arity=Arity.EXACTLY_ONE), String(arity=Arity.OPTIONAL)],
    ]
]
