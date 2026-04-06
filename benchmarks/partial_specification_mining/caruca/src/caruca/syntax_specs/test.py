from caruca.ir.syntax import *
# Let's not include this command in the evaluation

test_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("--version"),
            Flag("!"),
            String(flag="-n"),
            String(flag="-z"),
            String(flag="="),
            String(flag="!="),
            Integer(flag="-eq"),
            Integer(flag="-ne"),
            Integer(flag="-gt"),
            Integer(flag="-ge"),
            Integer(flag="-lt"),
            Integer(flag="-le"),
            Path(flag="-b"),
            Path(flag="-c"),
            Path(flag="-d"),
            Path(flag="-e"),
            Path(flag="-f"),
            Path(flag="-g"),
            Path(flag="-G"),
            Path(flag="-h", alias=["-L"]),
            Path(flag="-k"),
            Path(flag="-N"),
            Path(flag="-O"),
            Path(flag="-p"),
            Path(flag="-r"),
            Path(flag="-s"),
            Path(flag="-S"),
            Path(flag="-t"),
            Path(flag="-u"),
            Path(flag="-w"),
            Path(flag="-x"),
        ],
        [Expression(arity=Arity.EXACTLY_ONE)]
    ]
]

