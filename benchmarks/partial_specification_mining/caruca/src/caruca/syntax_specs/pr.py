from caruca.ir.syntax import *

pr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Range(flag="+", alias=["--page"]),
            Integer(flag="-", alias=["--columns"]),
            Flag("-a", alias=["--across"]),
            Flag("-c", alias=["--show-control-chars"]),
            Flag("-d", alias=["--double-space"]),
            DateFormat(flag="-D", alias=["--date-format"]),
            Other(flag="-e", alias=["--expand-tabs"], choices=(".5", "*10", "2")),  # CharWidth
            Flag("-F", alias=["-f", "--form-feed"]),
            String(flag="-h", alias=["--header"]),
            Other(flag="-i", alias=["--output-tabs"], choices=(".5", "*10", "2")),  # CharWidth
            Flag("-J", alias=["--join-lines"]),
            Integer(flag="-l", alias=["--length"]),
            Flag("-m", alias=["--merge"]),
            Other(flag="-n", alias=["--number-lines"], choices=("3--", "2*", "5")),  # SepDigits
            Integer(flag="-N", alias=["--first-line-number"]),
            Integer(flag="-o", alias=["--indent"]),
            Flag("-r", alias=["--no-file-warning"]),
            Char(flag="-s", alias=["--separator"]),  # Char
            String(flag="-S", alias=["--sep-string"]),
            Flag("-t", alias=["--omit-header"]),
            Flag("-T", alias=["--omit-pagination"]),
            Flag("-v", alias=["--show-nonprinting"]),
            Integer(flag="-w", alias=["--width"]),
            Integer(flag="-W", alias=["--page-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
