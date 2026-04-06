from caruca.ir.syntax import (
    Flag,
    Selection,
    Path,
    Arity,
    SyntaxSpecification,
)

rm_syntax_spec: list[SyntaxSpecification] = [
    [
        [Path(arity=Arity.AT_LEAST_ONE)],
    ],
]
