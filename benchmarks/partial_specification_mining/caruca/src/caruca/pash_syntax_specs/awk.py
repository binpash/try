from caruca.ir.syntax import *

awk_syntax_spec: list[SyntaxSpecification] = [
    [
        [Separator(flag="-F"), Variable(flag="-v", arity=Arity.ZERO_OR_MORE)],
        [
            String(arity=Arity.ZERO_OR_MORE, choices=["{ print $1 }"]),
        ],
    ]
]
