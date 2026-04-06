from caruca.ir.syntax import (
    Flag,
    Selection,
    Path,
    Arity,
    SyntaxSpecification,
)

rm_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-f", alias=["--force"]),
            Flag("-i"),
            Flag("-I"),
            Selection(
                flag="--interactive",
                choices=["never", "once", "always"],
                flag_followed_by_equals=True,
            ),
            Flag("--one-file-system"),
            Flag("--no-preserve-root"),
            Selection(
                flag="--preserve-root",
                choices=("", "all"),
                flag_followed_by_equals=True,
            ),
            Flag("-r", alias=["-R", "--recursive"]),
            Flag("-d", alias=["--dir"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ],
]

