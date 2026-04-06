from caruca.ir.syntax import *

env_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-i", alias=["--ignore-environment"]),
            Flag("-0", alias=["--null"]),
            String(flag="-u", alias=["--unset"]),
            Path(flag="-C", alias=["--chdir"]),
            String(flag="-S", alias=["--split-string"]),
            Signal(
                flag="--block-signal",
                flag_followed_by_equals=True,
            ),
            Signal(
                flag="--default-signal",
                flag_followed_by_equals=True,
            ),
            Signal(
                flag="--ignore-signal",
                flag_followed_by_equals=True,
            ),
            Flag("--list-signal-handling"),
            Flag("-v", alias=["--debug"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Variable(arity=Arity.ZERO_OR_MORE),   # For NAME=VALUE
            Command(arity=Arity.ZERO_OR_MORE),  # For COMMAND and ARG
        ],
    ]
]

