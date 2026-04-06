from caruca.ir.syntax import *

base64_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d", alias=["--decode"]),
            Flag("-i", alias=["--ignore-garbage"]),
            Integer("-w", alias=["--wrap"], flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.EXACTLY_ONE, dash_as_stdin=True)],
    ]
]
