from caruca.ir.syntax import *

stdbuf_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(
                flag="-i", alias=["--input"],
                choices=("L", "0", "1K", "1M", "1G"),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="-o", alias=["--output"],
                choices=("L", "0", "1K", "1M", "1G"),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="-e", alias=["--error"],
                choices=("L", "0", "1K", "1M", "1G"),
                flag_followed_by_equals=True
            ),
            Flag("--help"),
            Flag("--version"),
        ],
        [Command(arity=Arity.EXACTLY_ONE)],
    ]
]

