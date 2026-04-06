from caruca.ir.syntax import *

date_syntax_spec: list[SyntaxSpecification] = [
    [ 
        [
            Date(flag="-d", alias=["--date"]),
            Flag("--debug"),
            Path(flag="-f", alias=["--file"]),
            Selection(flag="-I", alias=["--iso-8601"], choices=("date", "hours", "minutes", "seconds", "ns")),
            Flag("-R", alias=["--rfc-2822"]),
            Other(flag="--rfc-3339", choices=("date", "seconds", "ns")),
            Path(flag="-r", alias=["--reference"]),
            Date(flag="-s", alias=["--set"]),
            Flag("-u", alias=["--utc", "--universal"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [DateFormat()],
    ]
]
