from caruca.ir.syntax import *

truncate_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--characters"]),
            Flag("-o", alias=["--io-blocks"]),
            Path(flag="-r", alias=["--reference"]),
            Integer(flag="-s", alias=["--size"]),  # IntBytes
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
