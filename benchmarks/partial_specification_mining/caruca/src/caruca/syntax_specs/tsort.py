from caruca.ir.syntax import *

tsort_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.EXACTLY_ONE)],
    ]
]
