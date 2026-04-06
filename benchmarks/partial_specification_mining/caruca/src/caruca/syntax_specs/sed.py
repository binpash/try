from caruca.ir.syntax import *

sed_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-n", alias=["--quiet", "--silent"]),
            Flag("--debug"),
            Other(flag="-e", alias=["--expression"], choices=("s/a/b/g")),
            Path(flag="-f", alias=["--file"]),
            Flag("--follow-symlinks"),
            String(flag="-i", alias=["--in-place"], flag_followed_by_equals=True),
            Integer(flag="-l", alias=["--line-length"]),
            Flag("--posix"),
            Flag("-E", alias=["-r", "--regexp-extended"]),
            Flag("-s", alias=["--separate"]),
            Flag("--sandbox"),
            Flag("-u", alias=["--unbuffered"]),
            Flag("-z", alias=["--null-data"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Other(arity=Arity.ZERO_OR_ONE, choices=("s/a/b/g")),  # script-if-no-other-script
            Path(arity=Arity.ZERO_OR_MORE)    # file...
        ]
    ]
]
