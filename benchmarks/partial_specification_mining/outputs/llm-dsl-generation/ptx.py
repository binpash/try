from caruca.ir.syntax import *

ptx_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-A", alias=["--auto-reference"]),
            Flag("-G", alias=["--traditional"]),
            String(flag="-F", alias=["--flag-truncation"]),
            String(flag="-M", alias=["--macro-name"]),
            Flag("-O", alias=["--format=roff"]),
            Flag("-R", alias=["--right-side-refs"]),
            Regex(flag="-S", alias=["--sentence-regexp"]),
            Flag("-T", alias=["--format=tex"]),
            Regex(flag="-W", alias=["--word-regexp"]),
            Path(flag="-b", alias=["--break-file"]),
            Flag("-f", alias=["--ignore-case"]),
            Integer(flag="-g", alias=["--gap-size"]),
            Path(flag="-i", alias=["--ignore-file"]),
            Path(flag="-o", alias=["--only-file"]),
            Flag("-r", alias=["--references"]),
            Flag("-t", alias=["--typeset-mode"]),
            Integer(flag="-w", alias=["--width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

