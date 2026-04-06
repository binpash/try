from caruca.ir.syntax import *

date_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            DateTime(flag="-d", alias=["--date"]),
            Flag("--debug"),
            Path(flag="-f", alias=["--file"]),
            Selection(flag="-I", alias=["--iso-8601"], choices=("date", "hours", "minutes", "seconds", "ns"), flag_followed_by_equals=True),
            Flag("-R", alias=["--rfc-email"]),
            Selection(flag="--rfc-3339", choices=("date", "seconds", "ns"), flag_followed_by_equals=True),
            Path(flag="-r", alias=["--reference"]),
            DateTime(flag="-s", alias=["--set"]),
            Flag("-u", alias=["--utc", "--universal"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [DateFormat(arity=Arity.ZERO_OR_ONE)],
    ]
]

