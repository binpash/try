from caruca.ir.syntax import *

ls_syntax_spec: list[SyntaxSpecification] = [
    [
        [Flag("-n", alias=["--numeric-uid-gid"])],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]