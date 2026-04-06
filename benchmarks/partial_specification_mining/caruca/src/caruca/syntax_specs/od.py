from caruca.ir.syntax import *

od_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(
                flag="-A", alias=["--address-radix"],
                choices=["d", "o", "x", "n"],
                flag_followed_by_equals=True,
            ),
            Selection(
                flag="--endian",
                choices=["big", "little"],
                flag_followed_by_equals=True,
            ),
            Size(flag="-j", alias=["--skip-bytes"]),
            Size(flag="-N", alias=["--read-bytes"]),
            Size(flag="-S", alias=["--strings"]),
            Other(flag="-t", alias=["--format"]),
            Flag("-v", alias=["--output-duplicates"]),
            Size(flag="-w", alias=["--width"]),
            Flag("--traditional"),
            Flag("--help"),
            Flag("--version"),
            Flag("-a"),
            Flag("-b"),
            Flag("-c"),
            Flag("-d"),
            Flag("-f"),
            Flag("-i"),
            Flag("-l"),
            Flag("-o"),
            Flag("-s"),
            Flag("-x"),
        ],
        [
            Path(arity=Arity.ZERO_OR_MORE),
            Integer(flag="+"),
        ],
    ]
]

