from caruca.ir.syntax import *

fmt_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--crown-margin"]),
            String(flag="-p", alias=["--prefix"], choices=("prefix1", "prefix2", "prefix3"), flag_followed_by_equals=True),
            Flag("-s", alias=["--split-only"]),
            Flag("-t", alias=["--tagged-paragraph"]),
            Flag("-u", alias=["--uniform-spacing"]),
            Integer(flag="-w", alias=["--width"]),
            Integer(flag="-g", alias=["--goal"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

