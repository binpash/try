from caruca.ir.syntax import Flag, SyntaxSpecification

uname_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Flag("-s", alias=["--kernel-name"]),
            Flag("-n", alias=["--nodename"]),
            Flag("-r", alias=["--kernel-release"]),
            Flag("-v", alias=["--kernel-version"]),
            Flag("-m", alias=["--machine"]),
            Flag("-p", alias=["--processor"]),
            Flag("-i", alias=["--hardware-platform"]),
            Flag("-o", alias=["--operating-system"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]

