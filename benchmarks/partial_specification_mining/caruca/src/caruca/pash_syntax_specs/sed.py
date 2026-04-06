from caruca.ir.syntax import *

sed_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-n", alias=["--quiet", "--silent"]),
        ],
        [
            String(
                arity=Arity.ZERO_OR_ONE, choices=("s/a/b/g")
            )  # script-if-no-other-script
        ],
    ]
]
