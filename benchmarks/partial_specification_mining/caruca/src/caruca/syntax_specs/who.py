from caruca.ir.syntax import *

who_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Flag("-b", alias=["--boot"]),
            Flag("-d", alias=["--dead"]),
            Flag("-H", alias=["--heading"]),
            Flag("--ips"),
            Flag("-l", alias=["--login"]),
            Flag("--lookup"),
            Flag("-m"),
            Flag("-p", alias=["--process"]),
            Flag("-q", alias=["--count"]),
            Flag("-r", alias=["--runlevel"]),
            Flag("-s", alias=["--short"]),
            Flag("-t", alias=["--time"]),
            Flag("-T", alias=["-w", "--mesg"]),
            Flag("-u", alias=["--users"]),
            Flag("--message"),
            Flag("--writable"),
            Flag("--help"),
            Flag("--version"),
        ],
        [
            Path(arity=Arity.ZERO_OR_ONE),
            String(arity=Arity.ZERO_OR_ONE),
            String(arity=Arity.ZERO_OR_ONE),
        ],
    ]
]
