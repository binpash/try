from caruca.ir.syntax import *

awk_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Separator(flag="-F"),
            Path(flag="-f"),
            Variable(flag="-v", arity=Arity.ZERO_OR_MORE),
        ],
        [
            Other(arity=Arity.ZERO_OR_MORE, choices=["{ print $1 }"]),  # AWK Program
        ],
    ]
]
