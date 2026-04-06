from caruca.ir.syntax import *

tee_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--append"]),
            Flag("-i", alias=["--ignore-interrupts"]),
            Flag("-p"),
            Selection(
                flag="--output-error",
                choices=("warn", "warn-nopipe", "exit", "exit-nopipe"),
                flag_followed_by_equals=True,
            ),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

