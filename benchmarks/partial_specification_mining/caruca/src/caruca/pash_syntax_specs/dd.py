from caruca.ir.syntax import *

dd_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Path(flag="if", alias=["--input-file"], flag_followed_by_equals=True),
            Path(flag="of", alias=["--output-file"], flag_followed_by_equals=True),
        ]
    ]
]
