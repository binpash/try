from caruca.ir.syntax import *

date_syntax_spec: list[SyntaxSpecification] = [
    [ 
        [
            Date(flag="-d", alias=["--date"]),
            Path(flag="-f", alias=["--file"]),
        ],
        [DateFormat()],
    ]
]
