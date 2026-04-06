from caruca.ir.syntax import *

touch_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a"),
            Flag("-c", alias=["--no-create"]),
            DateTime(flag="-d", alias=["--date"]),
            Flag("-f"),
            Flag("-h", alias=["--no-dereference"]),
            Flag("-m"),
            Path(flag="-r", alias=["--reference"]),
            DateTime(flag="-t"),
            Selection(
                flag="--time", choices=("access", "atime", "use", "modify", "mtime")
            ),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]

