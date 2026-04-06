from caruca.ir.syntax import *

iconv_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            String(flag="--from-code", alias=["-f"]),
            String(flag="--to-code", alias=["-t"]),
            Flag("--list", alias=["-l"]),
            Flag("-c"),
            Path(flag="--output", alias=["-o"]),
            Flag("--silent", alias=["-s"]),
            Flag("--verbose"),
            Flag("--help", alias=["-?"]),
            Flag("--usage"),
            Flag("--version", alias=["-V"]),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

