from caruca.ir.syntax import *

basenc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--base64"),
            Flag("--base64url"),
            Flag("--base32"),
            Flag("--base32hex"),
            Flag("--base16"),
            Flag("--base2msbf"),
            Flag("--base2lsbf"),
            Flag("-d", alias=["--decode"]),
            Flag("-i", alias=["--ignore-garbage"]),
            Integer(flag="-w", alias=["--wrap"]),
            Flag("--z85"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_ONE)],
    ]
]

