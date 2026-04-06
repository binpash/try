from caruca.ir.syntax import *

nohup_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
        ],
        [Command(arity=Arity.EXACTLY_ONE), Other(arity=Arity.ZERO_OR_MORE)],
    ]
]

