from caruca.ir.syntax import *

pr_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Range(flag="+", alias=["--pages"]),
            Integer(flag="-", alias=["--columns"]),
            Flag("-a", alias=["--across"]),
            Flag("-c", alias=["--show-control-chars"]),
            Flag("-d", alias=["--double-space"]),
            DateFormat(flag="-D", alias=["--date-format"]),
            String(flag="-e", alias=["--expand-tabs"]),
            Flag("-F", alias=["-f", "--form-feed"]),
            String(flag="-h", alias=["--header"]),
            String(flag="-i", alias=["--output-tabs"]),
            Flag("-J", alias=["--join-lines"]),
            Integer(flag="-l", alias=["--length"]),
            Flag("-m", alias=["--merge"]),
            String(flag="-n", alias=["--number-lines"]),
            Integer(flag="-N", alias=["--first-line-number"]),
            Integer(flag="-o", alias=["--indent"]),
            Flag("-r", alias=["--no-file-warnings"]),
            Char(flag="-s", alias=["--separator"]),
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

