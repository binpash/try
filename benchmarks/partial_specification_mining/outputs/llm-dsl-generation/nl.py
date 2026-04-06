from caruca.ir.syntax import *

nl_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(
                flag="-b", alias=["--body-numbering"],
                choices=("a", "t", "n", "pBRE"),
                flag_followed_by_equals=True
            ),
            String(flag="-d", alias=["--section-delimiter"], flag_followed_by_equals=True),
            Selection(
                flag="-f", alias=["--footer-numbering"],
                choices=("a", "t", "n", "pBRE"),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="-h", alias=["--header-numbering"],
                choices=("a", "t", "n", "pBRE"),
                flag_followed_by_equals=True
            ),
            Integer(flag="-i", alias=["--line-increment"]),
            Integer(flag="-l", alias=["--join-blank-lines"]),
            Selection(
                flag="-n", alias=["--number-format"],
                choices=("ln", "rn", "rz"),
                flag_followed_by_equals=True
            ),
            Flag("-p", alias=["--no-renumber"]),
            String(flag="-s", alias=["--number-separator"]),
            Integer(flag="-v", alias=["--starting-line-number"]),
            Integer(flag="-w", alias=["--number-width"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

