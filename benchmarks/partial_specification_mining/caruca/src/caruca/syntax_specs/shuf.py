from caruca.ir.syntax import *

shuf_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-e", alias=["--echo"]),
            Range(flag="-i", alias=["--input-range"]),  # IntRange
            Integer(flag="-n", alias=["--head-count"]),
            Path(flag="-o", alias=["--output"]),
            Path(flag="--random-source"),
            Flag("-r", alias=["--repeat"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE, dash_as_stdin=True)],
    ]
]
