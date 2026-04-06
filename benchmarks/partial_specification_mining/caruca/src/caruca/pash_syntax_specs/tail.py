from caruca.ir.syntax import *

tail_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Other(flag="-n", alias=["--lines"], choices=("0", "+10", "10"), flag_followed_by_equals=True),  # IntPlusMinus
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
