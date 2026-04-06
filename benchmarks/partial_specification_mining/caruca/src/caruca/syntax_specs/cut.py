from caruca.ir.syntax import *

cut_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Range(flag="-b", alias=["--bytes"]),
            Range(flag="-c", alias=["--characters"]),
            Delimiter(flag="-d", alias=["--delimiter"]),
            Range(flag="-f", alias=["--fields"]),
            Flag("-n"),
            Flag("-w"), # Only FreeBSD
            Flag("--complement"),
            Flag("-s", alias=["--only-delimited"]),
            Delimiter(flag="--output-delimiter"),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
