from caruca.ir.syntax import *

# The syntax spec is not 100% accurate, but in any case no interesting annotations 
# are generated for this command.

stty_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Flag("-g", alias=["--save"]),
            Path(flag="-F", alias=["--file"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Other(arity=Arity.ZERO_OR_MORE)],
    ]
]
