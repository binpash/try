from caruca.ir.syntax import *

realpath_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-e", alias=["--canonicalize-existing"]),
            Flag("-m", alias=["--canonicalize-missing"]),
            Flag("-L", alias=["--logical"]),
            Flag("-P", alias=["--physical"]),
            Flag("-q", alias=["--quiet"]),
            Path(flag="--relative-to"),
            Path(flag="--relative-base"),
            Flag("-s", alias=["--strip", "--no-symlinks"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ONE_OR_MORE)],
    ]
]

