from caruca.ir.syntax import *

chgrp_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-c", alias=["--changes"]),
            Flag("-f", alias=["--silent", "--quiet"]),
            Flag("-v", alias=["--verbose"]),
            Flag("--dereference"),
            Flag("-h", alias=["--no-dereference"]),
            Flag("--no-preserve-root"),
            Flag("--preserve-root"),
            Path(flag="--reference"),
            
            Flag("-R", alias=["--recursive"]),
            Flag("-H"),
            Flag("-L"),
            Flag("-P"),

            Flag("--help"),
            Flag("--version"),

        ],
        [Group(arity=Arity.OPTIONAL),  # Group
         Path(arity=Arity.AT_LEAST_ONE)]  # File
    ]
]
