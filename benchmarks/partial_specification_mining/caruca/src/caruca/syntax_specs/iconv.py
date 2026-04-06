from caruca.ir.syntax import *

iconv_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Other(flag="-f", alias=["--from-code"], choices=["UTF-8", "ISO-8859-1", "ASCII"]),
            Other(flag="-t", alias=["--to-code"], choices=["UTF-8", "ISO-8859-1", "ASCII", "ASCII//TRANSLIT", "ASCII//IGNORE"]),
            Flag("-l", alias=["--list"]),
            Flag("-c"),
            Path(flag="-o", alias=["--output"]),
            Flag("-s", alias=["--silent"]),

            Flag("--verbose"),
            Flag("--help"),
            Flag("-?", alias=["--usage"]),
            Flag("-V", alias=["--version"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
