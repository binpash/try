from caruca.ir.syntax import *

paste_syntax_spec = [
    [
        [Delimiter(flag="-d", alias=["--delimiters"])],
        [Path(arity=Arity.ZERO_OR_MORE, dash_as_stdin=True)]
    ]
]
