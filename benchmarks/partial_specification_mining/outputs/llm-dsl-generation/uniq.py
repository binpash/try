from caruca.ir.syntax import *

uniq_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--count"]),
            Flag("-d", alias=["--repeated"]),
            Flag("-D"),
            Selection(
                flag="--all-repeated",
                choices=("none", "prepend", "separate"),
                flag_followed_by_equals=True,
            ),
            Integer(flag="-f", alias=["--skip-fields"]),
            Selection(
                flag="--group",
                choices=("separate", "prepend", "append", "both"),
                flag_followed_by_equals=True,
            ),
            Flag("-i", alias=["--ignore-case"]),
            Integer(flag="-s", alias=["--skip-chars"]),
            Flag("-u", alias=["--unique"]),
            Flag("-z", alias=["--zero-terminated"]),
            Integer(flag="-w", alias=["--check-chars"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.ZERO_OR_ONE),  # INPUT
            Path(arity=Arity.ZERO_OR_ONE),  # OUTPUT
        ],
    ]
]

