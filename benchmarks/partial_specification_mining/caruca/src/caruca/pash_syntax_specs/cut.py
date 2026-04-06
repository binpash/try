from caruca.ir.syntax import *

cut_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Range(flag="-b", alias=["--bytes"]),
            Range(flag="-c", alias=["--characters"]),
            Delimiter(flag="-d", alias=["--delimiter"]),
            Range(flag="-f", alias=["--fields"]),
        ],
    ],
]
