from caruca.ir.syntax import *

shred_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-f", alias=["--force"]),
            Integer(flag="-n", alias=["--iterations"]),
            Path(flag="--random-source"),
            Size(flag="-s", alias=["--size"]),
            Flag("-u"),
            Selection(
                flag="--remove",
                choices=("unlink", "wipe", "wipesync"),
                flag_followed_by_equals=True,
            ),
            Flag("-v", alias=["--verbose"]),
            Flag("-x", alias=["--exact"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]

