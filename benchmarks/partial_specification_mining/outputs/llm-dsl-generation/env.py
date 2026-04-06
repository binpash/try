from caruca.ir.syntax import *

env_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-i", alias=["--ignore-environment"]),
            Flag("-0", alias=["--null"]),
            Variable(flag="-u", alias=["--unset"], flag_followed_by_equals=True),
            Path(flag="-C", alias=["--chdir"]),
            String(flag="-S", alias=["--split-string"], flag_followed_by_equals=True),
            Signal(flag="--block-signal", flag_followed_by_equals=True),
            Signal(flag="--default-signal", flag_followed_by_equals=True),
            Signal(flag="--ignore-signal", flag_followed_by_equals=True),
            Flag("--list-signal-handling"),
            Flag("-v", alias=["--debug"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            [Variable(), String()],
            [Command(), String(arity=Arity.ZERO_OR_MORE)],
        ],
    ]
]

