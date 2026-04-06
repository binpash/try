from caruca.ir.syntax import *

install_syntax_spec: list[SyntaxSpecification] = [
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
            Flag("-c"),
            Flag("-C", alias=["--compare"]),
            Flag("-d", alias=["--directory"]),
            Flag("-D"),
            Group(flag="-g", alias=["--group"]),
            Permission(flag="-m", alias=["--mode"]),
            User(flag="-o", alias=["--owner"]),
            Flag("-p", alias=["--preserve-timestamps"]),
            Flag("-s", alias=["--strip"]),
            Command(flag="--strip-program"),
            String(flag="-S", alias=["--suffix"]),
            Path(flag="-t", alias=["--target-directory"]),
            Flag("-T", alias=["--no-target-directory"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--preserve-context"),
            Flag("-Z"),
            Selection(flag="--context", choices=("", "CTX")),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ONE_OR_MORE)],
    ]
]

