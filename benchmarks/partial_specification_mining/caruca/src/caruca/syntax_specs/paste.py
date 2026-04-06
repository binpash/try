from caruca.ir.syntax import *

paste_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            # List(flag="-d", alias=["--delimiters"], of=Delimiter),  # List
            Delimiter(flag="-d", alias=["--delimiters"]),  # List
            Flag("-s", alias=["--serial"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
