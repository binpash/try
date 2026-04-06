from caruca.ir.syntax import *

cat_syntax_spec: list[SyntaxSpecification] = [
    [
        [Flag("-n", alias=["--number"])],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
