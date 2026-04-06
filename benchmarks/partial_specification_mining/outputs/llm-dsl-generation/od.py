from caruca.ir.syntax import *

od_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(flag="-A", alias=["--address-radix"], choices=("d", "o", "x", "n"), flag_followed_by_equals=True),
            Selection(flag="--endian", choices=("big", "little"), flag_followed_by_equals=True),
            Integer(flag="-j", alias=["--skip-bytes"]),
            Integer(flag="-N", alias=["--read-bytes"]),
            Integer(flag="-S", alias=["--strings"], flag_followed_by_equals=True),
            Selection(flag="-t", alias=["--format"], choices=("a", "c", "d", "f", "o", "u", "x"), flag_followed_by_equals=True),
            Flag("-v", alias=["--output-duplicates"]),
            Integer(flag="-w", alias=["--width"], flag_followed_by_equals=True),
            Flag("--traditional"),
            Flag("--help"),
            Flag("--version"),
            Flag("-a"),
            Flag("-b"),
            Flag("-c"),
            Flag("-d"),
            Flag("-f"),
            Flag("-i"),
            Flag("-l"),
            Flag("-o"),
            Flag("-s"),
            Flag("-x"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

