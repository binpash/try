from caruca.ir.syntax import *

diff_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-B", alias=["--ignore-blank-lines"]),
            Flag("-q", alias=["--brief"]),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]
