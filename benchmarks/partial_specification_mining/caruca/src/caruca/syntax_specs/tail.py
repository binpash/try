from caruca.ir.syntax import *

tail_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Other(flag="-c", alias=["--bytes"], choices=("0", "+10", "10"), flag_followed_by_equals=True),  # IntPlusMinus
            Selection(flag="-f", alias=["--follow"], choices=("descriptor", "name", ""), flag_followed_by_equals=True),
            Flag("-F"),
            Other(flag="-n", alias=["--lines"], choices=("0", "+10", "10"), flag_followed_by_equals=True),  # IntPlusMinus
            Integer(flag="--max-unchanged-stats", flag_followed_by_equals=True),
            Pid(flag="--pid", flag_followed_by_equals=True),  # PID
            Flag("-q", alias=["--quiet", "--silent"]),
            Flag("--retry"),
            Integer(flag="-s", alias=["--sleep-interval"], flag_followed_by_equals=True),
            Flag("-v", alias=["--verbose"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
