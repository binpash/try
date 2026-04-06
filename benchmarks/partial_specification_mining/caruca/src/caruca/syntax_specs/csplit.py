from caruca.ir.syntax import *

csplit_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            SprintfFormat(flag="-b", alias=["--suffix-format"]),
            String(flag="-f", alias=["--prefix"]),
            Flag("-k", alias=["--keep-files"]),
            Flag("--suppress-matched"),
            Integer(flag="-n", alias=["--digits"]),
            Flag("-s", alias=["--quiet", "--silent"]),
            Flag("-z", alias=["--elide-empty-files"]),

            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),
            Other(arity=Arity.AT_LEAST_ONE)  # Pattern/Regex
        ],
    ]
]
