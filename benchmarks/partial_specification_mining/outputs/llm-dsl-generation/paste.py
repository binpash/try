from caruca.ir.syntax import *

paste_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Delimiter(flag="-d", alias=["--delimiters"], flag_followed_by_equals=True),
            Flag("-s", alias=["--serial"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

