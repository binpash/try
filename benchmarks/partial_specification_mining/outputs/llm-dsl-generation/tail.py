from caruca.ir.syntax import *

tail_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-c", alias=["--bytes"]),
            Selection(flag="-f", alias=["--follow"], choices=("name", "descriptor")),
            Flag("-F"),
            Integer(flag="-n", alias=["--lines"]),
            Integer(flag="--max-unchanged-stats"),
            Pid(flag="--pid"),
            Flag("-q", alias=["--quiet", "--silent"]),
            Flag("--retry"),
            Integer(flag="-s", alias=["--sleep-interval"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

