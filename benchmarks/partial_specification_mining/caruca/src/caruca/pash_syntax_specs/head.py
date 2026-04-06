from caruca.ir.syntax import *

head_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Int(flag="-n", alias=["--lines"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
