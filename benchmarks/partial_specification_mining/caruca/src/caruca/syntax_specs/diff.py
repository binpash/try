from caruca.ir.syntax import *

diff_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--normal"),
            Flag("-q", alias=["--brief"]),
            Flag("-s", alias=["--report-identical-files"]),
            Integer(flag="-c", alias=["-C", "--context"]),  # Default context lines
            Integer(flag="-u", alias=["-U", "--unified"]),  # Default unified context lines
            Flag("-e", alias=["--ed"]),
            Flag("-n", alias=["--rcs"]),
            Flag("-y", alias=["--side-by-side"]),
            Integer(flag="-W", alias=["--width"]),  # Default width
            Flag("--left-column"),
            Flag("--suppress-common-lines"),
            Flag("-p", alias=["--show-c-function"]),
            Regex(flag="-F", alias=["--show-function-line"]),
            String(flag="--label"),
            Flag("-t", alias=["--expand-tabs"]),
            Flag("-T", alias=["--initial-tab"]),
            Integer(flag="--tabsize"),
            Flag("--suppress-blank-empty"),
            Flag("-l", alias=["--paginate"]),
            Flag("-r", alias=["--recursive"]),
            Flag("--no-dereference"),
            Flag("-N", alias=["--new-file"]),
            Flag("--unidirectional-new-file"),
            Flag("--ignore-file-name-case"),
            Flag("--no-ignore-file-name-case"),
            Glob(flag="-x", alias=["--exclude"]),
            Path(flag="-X", alias=["--exclude-from"]),
            Path(flag="-S", alias=["--starting-file"]),
            Path(flag="--from-file"),
            Path(flag="--to-file"),
            Flag("-i", alias=["--ignore-case"]),
            Flag("-E", alias=["--ignore-tab-expansion"]),
            Flag("-Z", alias=["--ignore-trailing-space"]),
            Flag("-b", alias=["--ignore-space-change"]),
            Flag("-w", alias=["--ignore-all-space"]),
            Flag("-B", alias=["--ignore-blank-lines"]),
            Regex(flag="-I", alias=["--ignore-matching-lines"]),
            Flag("-a", alias=["--text"]),
            Flag("--strip-trailing-cr"),
            String(flag="-D", alias=["--ifdef"]),

            Format("--GTYPE-group-format"),
            Format(flag="--line-format"),
            Format("--LTYPE-line-format"),

            Flag("-d", alias=["--minimal"]),
            Integer(flag="--horizon-lines"),
            Flag("--speed-large-files"),
            Selection(flag="--color", choices=["never", "always", "auto"]),
            List(flag="--palette", separator=":", choices=["none", "normal", "bold", "reverse", "underline", "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"]),
            Flag("--help"),
            Flag("-v", alias=["--version"]),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Path(arity=Arity.EXACTLY_ONE)]
    ]
]
