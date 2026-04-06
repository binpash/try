from caruca.ir.syntax import *

grep_syntax_spec = [
    [
        [
            Flag("-c", alias=["--count"]),
            Flag("-v", alias=["--invert-match"]),
            Flag("-r", alias=["--recursive"], arity=Arity.OPTIONAL),
            Flag("-R", alias=["--dereference-recursive"], arity=Arity.OPTIONAL),
        ],
        [
            Regex(arity=Arity.EXACTLY_ONE),  # PATTERNS
            Path(arity=Arity.ZERO_OR_MORE, dash_as_stdin=True),  # [FILE...]
        ],
    ]
]
