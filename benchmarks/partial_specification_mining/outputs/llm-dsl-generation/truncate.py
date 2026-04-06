from caruca.ir.syntax import *

truncate_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--no-create"]),
            Flag("-o", alias=["--io-blocks"]),
            Path(flag="-r", alias=["--reference"]),
            Size(flag="-s", alias=["--size"], flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]

