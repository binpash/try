from caruca.ir.syntax import *

md5sum_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--binary"]),
            Flag("-c", alias=["--check"]),
            Flag("--tag"),
            Flag("-t", alias=["--text"]),
            Flag("-z", alias=["--zero"]),
            Flag("--ignore-missing"),
            Flag("--quiet"),
            Flag("--status"),
            Flag("--strict"),
            Flag("-w", alias=["--warn"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

