from caruca.ir.syntax import *

mv_syntax_spec: list[SyntaxSpecification] = [
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
            ),
            Flag("-b"),
            Flag("-f", alias=["--force"]),
            Flag("-i", alias=["--interactive"]),
            Flag("-n", alias=["--no-clobber"]),
            Flag("--strip-trailing-slashes"),
            String(flag="-S", alias=["--suffix"]),
            Flag("-u", alias=["--update"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-Z", alias=["--context"]),
            Flag("--help"),
            Flag("--version"),
            Flag("-T", alias=["--no-target-directory"]),
            Path(flag="-t", alias=["--target-directory"]),
        ],
        [Path(arity=Arity.AT_LEAST_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]

