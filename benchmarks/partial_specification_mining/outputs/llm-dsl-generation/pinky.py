from caruca.ir.syntax import *

pinky_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-l"),
            Flag("-b"),
            Flag("-h"),
            Flag("-p"),
            Flag("-s"),
            Flag("-f"),
            Flag("-w"),
            Flag("-i"),
            Flag("-q"),
            Flag("--help"),
            Flag("--version"),
        ],
        [User(arity=Arity.ZERO_OR_MORE)],
    ]
]

