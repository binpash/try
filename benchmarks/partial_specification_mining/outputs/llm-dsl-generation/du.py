from caruca.ir.syntax import *

du_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-0", alias=["--null"]),
            Flag("-a", alias=["--all"]),
            Flag("--apparent-size"),
            Size(flag="-B", alias=["--block-size"]),
            Flag("-b", alias=["--bytes"]),
            Flag("-c", alias=["--total"]),
            Flag("-D", alias=["--dereference-args"]),
            Integer(flag="-d", alias=["--max-depth"]),
            Path(flag="--files0-from"),
            Flag("-H"),
            Flag("-h", alias=["--human-readable"]),
            Flag("--inodes"),
            Flag("-k"),
            Flag("-L", alias=["--dereference"]),
            Flag("-l", alias=["--count-links"]),
            Flag("-m"),
            Flag("-P", alias=["--no-dereference"]),
            Flag("-S", alias=["--separate-dirs"]),
            Flag("--si"),
            Flag("-s", alias=["--summarize"]),
            Size(flag="-t", alias=["--threshold"]),
            Flag("--time"),
            Selection(flag="--time", choices=("atime", "access", "use", "ctime", "status"), flag_followed_by_equals=True),
            TimeStyle(flag="--time-style", flag_followed_by_equals=True),
            Path(flag="-X", alias=["--exclude-from"]),
            Glob(flag="--exclude"),
            Flag("-x", alias=["--one-file-system"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

