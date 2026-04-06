from caruca.ir.syntax import *


grep_syntax_spec = [
    [
        [
            Flag("-v", alias=["--invert-match"]),
            Regex(flag="-e", alias=["--regexp"]),
            Path(flag="-f", alias=["--file"]),
        ],
        [
            Path(arity=Arity.ZERO_OR_MORE, dash_as_stdin=True),  # [FILE...]
        ],
    ]
]
