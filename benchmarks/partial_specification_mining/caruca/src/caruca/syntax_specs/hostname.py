from caruca.ir.syntax import *

hostname_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Hostname(arity=Arity.OPTIONAL), # Hostname
        ],
    ]
]
