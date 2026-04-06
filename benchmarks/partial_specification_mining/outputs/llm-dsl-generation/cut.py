from caruca.ir.syntax import *

cut_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Range(flag="-b", alias=["--bytes"], flag_followed_by_equals=True),
            Range(flag="-c", alias=["--characters"], flag_followed_by_equals=True),
            Char(flag="-d", alias=["--delimiter"], flag_followed_by_equals=True),
            Range(flag="-f", alias=["--fields"], flag_followed_by_equals=True),
            Flag("-n"),
            Flag("--complement"),
            Flag("-s", alias=["--only-delimited"]),
            String(flag="--output-delimiter", flag_followed_by_equals=True),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

