from caruca.ir.syntax import *

test_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            # Logical operators
            Flag("!"),
            # String comparisons
            String(flag="-n"),
            String(flag="-z"),
            String(flag="="),
            String(flag="!="),
            # Integer comparisons
            Integer(flag="-eq"),
            Integer(flag="-ne"),
            Integer(flag="-gt"),
            Integer(flag="-ge"),
            Integer(flag="-lt"),
            Integer(flag="-le"),
            # File tests
            Path(flag="-b"),
            Path(flag="-c"),
            Path(flag="-d"),
            Path(flag="-e"),
            Path(flag="-f"),
            Path(flag="-g"),
            Path(flag="-G"),
            Path(flag="-h"),
            Path(flag="-k"),
            Path(flag="-L"),
            Path(flag="-N"),
            Path(flag="-O"),
            Path(flag="-p"),
            Path(flag="-r"),
            Path(flag="-s"),
            Path(flag="-S"),
            Integer(flag="-t"),
            Path(flag="-u"),
            Path(flag="-w"),
            Path(flag="-x"),
            # Help and version (recognized by [ but not by test)
            Flag("--help"),
            Flag("--version"),
        ],
        [Expression(arity=Arity.ZERO_OR_ONE)],
    ]
]

