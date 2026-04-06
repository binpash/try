from caruca.ir.syntax import *

expand_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-i", alias=["--initial"]),
            Integer(flag="-t", alias=["--tabs"]),
            Other(flag="-t", alias=["--tabs"], choices=("1,5,9", "1,10,20", "1/5", "+5")),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
