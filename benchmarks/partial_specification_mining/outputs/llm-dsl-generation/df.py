from caruca.ir.syntax import *

df_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Size(flag="-B", alias=["--block-size"], flag_followed_by_equals=True),
            Flag("-h", alias=["--human-readable"]),
            Flag("-H", alias=["--si"]),
            Flag("-i", alias=["--inodes"]),
            Flag("-k"),
            Flag("-l", alias=["--local"]),
            Flag("--no-sync"),
            String(flag="--output", flag_followed_by_equals=True),
            Flag("-P", alias=["--portability"]),
            Flag("--sync"),
            Flag("--total"),
            Filesystem(flag="-t", alias=["--type"], flag_followed_by_equals=True),
            Flag("-T", alias=["--print-type"]),
            Filesystem(flag="-x", alias=["--exclude-type"], flag_followed_by_equals=True),
            Flag("-v"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

