from caruca.ir.syntax import *

iconv_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            String(flag="-f", alias=["--from-code"], choices=["UTF-8", "ISO-8859-1", "ASCII"]),
            String(flag="-t", alias=["--to-code"], choices=["UTF-8", "ISO-8859-1", "ASCII", "ASCII//TRANSLIT", "ASCII//IGNORE"]),
            Flag("-c")
        ],
    ]
]
