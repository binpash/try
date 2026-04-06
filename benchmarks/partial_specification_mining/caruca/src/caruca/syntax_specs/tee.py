from caruca.ir.syntax import *

tee_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--append"]),
            Flag("-i", alias=["--ignore-interrupts"]),
            Flag("-p"),
            Selection(
                flag="--output-error", 
                flag_followed_by_equals=True,
                choices=("warn", "warn-nopipe", "exit", "exit-nopipe")
            ),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]
