from caruca.ir.syntax import *

readlink_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-f", alias=["--canonicalize"]),
            Flag("-e", alias=["--canonicalize-existing"]),
            Flag("-m", alias=["--canonicalize-missing"]),
            Flag("-n", alias=["--no-newline"]),
            Flag("-q", alias=["--quiet"]),
            Flag("-s", alias=["--silent"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-z", alias=["--zero"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE)],
    ]
]
