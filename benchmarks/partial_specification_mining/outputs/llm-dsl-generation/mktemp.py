from caruca.ir.syntax import *

mktemp_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d", alias=["--directory"]),
            Flag("-u", alias=["--dry-run"]),
            Flag("-q", alias=["--quiet"]),
            String(flag="--suffix"),
            Path(flag="-p", alias=["--tmpdir"]),
            Flag("-t"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_ONE)],
    ]
]

