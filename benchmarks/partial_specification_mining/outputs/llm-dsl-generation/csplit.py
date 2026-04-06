from caruca.ir.syntax import *

csplit_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            SprintfFormat(flag="-b", alias=["--suffix-format"], flag_followed_by_equals=True),
            String(flag="-f", alias=["--prefix"], flag_followed_by_equals=True),
            Flag("-k", alias=["--keep-files"]),
            Flag("--suppress-matched"),
            Integer(flag="-n", alias=["--digits"], flag_followed_by_equals=True),
            Flag("-s", alias=["--quiet", "--silent"]),
            Flag("-z", alias=["--elide-empty-files"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.EXACTLY_ONE),
            Other(arity=Arity.ONE_OR_MORE),  # Represents the PATTERN argument
        ],
    ]
]

