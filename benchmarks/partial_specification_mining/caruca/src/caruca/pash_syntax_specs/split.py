from caruca.ir.syntax import *

split_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-d"),
            Integer(
                flag="-n", alias=["--number"]
            ),  # TODO: This is more complex that a number
        ],
        [Path(arity=Arity.ZERO_OR_MORE), String()],
    ],
]
