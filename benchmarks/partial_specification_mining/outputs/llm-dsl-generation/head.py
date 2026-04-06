from caruca.ir.syntax import *

head_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Size(flag="-c", alias=["--bytes"]),
            Size(flag="-n", alias=["--lines"]),
            Flag("-q", alias=["--quiet", "--silent"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

