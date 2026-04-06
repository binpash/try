from caruca.ir.syntax import *

sed_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-V", alias=["--version"]),
            Flag("--help"),
            Flag("-n", alias=["--quiet", "--silent"]),
            Flag("--debug"),
            String(flag="-e", alias=["--expression"], flag_followed_by_equals=True),
            Path(flag="-f", alias=["--file"], flag_followed_by_equals=True),
            Flag("--follow-symlinks"),
            String(flag="-i", alias=["--in-place"], flag_followed_by_equals=True),
            Integer(flag="-l", alias=["--line-length"]),
            Flag("--posix"),
            Flag("-E", alias=["-r", "--regexp-extended"]),
            Flag("-s", alias=["--separate"]),
            Flag("--sandbox"),
            Flag("-u", alias=["--unbuffered"]),
            Flag("-z", alias=["--null-data"]),
        ],
        [
            String(arity=Arity.ZERO_OR_ONE),  # script-if-no-other-script
            Path(arity=Arity.ZERO_OR_MORE),   # [file...]
        ],
    ]
]

