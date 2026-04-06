from caruca.ir.syntax import *

nice_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-n", alias=["--adjustment"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Command(), Other(arity=Arity.ZERO_OR_MORE)],
    ]
]

