from caruca.ir.syntax import *

ln_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(
                flag="--backup",
                choices=(
                    "none",
                    "off",
                    "simple",
                    "numbered",
                    "t",
                    "existing",
                    "nil",
                    "simple",
                    "never",
                ),
                flag_followed_by_equals=True,
            ),
            Flag("-b"),
            Flag("-d", alias=["-F", "--directory"]),
            Flag("-f", alias=["--force"]),
            Flag("-i", alias=["--interactive"]),
            Flag("-L", alias=["--logical"]),
            Flag("-n", alias=["--no-dereference"]),
            Flag("-P", alias=["--physical"]),
            Flag("-r", alias=["--relative"]),
            Flag("-s", alias=["--symbolic"]),
            String(flag="-S", alias=["--suffix"]),
            Path(flag="-t", alias=["--target-directory"]),
            Flag("-T", alias=["--no-target-directory"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.AT_LEAST_ONE),
            Path(arity=Arity.EXACTLY_ONE),
        ],
    ]
]
