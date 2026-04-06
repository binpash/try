from caruca.ir.syntax import *

wc_syntax_spec: list[SyntaxSpecification] = [
    [
        [Flag("-l", alias=["--lines"])],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
]
