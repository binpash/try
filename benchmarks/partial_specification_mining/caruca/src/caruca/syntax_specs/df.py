from caruca.ir.syntax import *

df_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--all"]),
            Size(flag="-B", alias=["--block-size"]),
            Flag("-h", alias=["--human-readable"]),
            Flag("-H", alias=["--si"]),
            Flag("-i", alias=["--inodes"]),
            Flag("-k"),
            Flag("-l", alias=["--local"]),
            Flag("--no-sync"),
            Selection(flag="--output", choices=("source", "fstype", "itotal", "iused", "iavail", "ipcent", "size", "used", "avail", "pcent", "file", "target")),
            Flag("-P", alias=["--portability"]),
            Flag("--sync"),
            Flag("--total"),
            Filesystem(flag="-t", alias=["--type"]),
            Flag("-T", alias=["--print-type"]),
            Filesystem(flag="-x", alias=["--exclude-type"]),

            Flag("-v"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]