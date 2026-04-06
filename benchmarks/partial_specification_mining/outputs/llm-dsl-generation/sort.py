from caruca.ir.syntax import *

sort_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-b", alias=["--ignore-leading-blanks"]),
            Flag("-d", alias=["--dictionary-order"]),
            Flag("-f", alias=["--ignore-case"]),
            Flag("-g", alias=["--general-numeric-sort"]),
            Flag("-i", alias=["--ignore-nonprinting"]),
            Flag("-M", alias=["--month-sort"]),
            Flag("-h", alias=["--human-numeric-sort"]),
            Flag("-n", alias=["--numeric-sort"]),
            Flag("-R", alias=["--random-sort"]),
            Flag("-r", alias=["--reverse"]),
            Selection(flag="--sort", choices=("general-numeric", "human-numeric", "month", "numeric", "random", "version"), flag_followed_by_equals=True),
            Flag("-V", alias=["--version-sort"]),
            Flag("-c", alias=["--check"]),
            Flag("-C", alias=["--check=quiet"]),
            Flag("--debug"),
            Path(flag="--random-source"),
            Flag("-m", alias=["--merge"]),
            Path(flag="-o", alias=["--output"]),
            Flag("-s", alias=["--stable"]),
            Size(flag="-S", alias=["--buffer-size"]),
            Delimiter(flag="-t", alias=["--field-separator"]),
            Path(flag="-T", alias=["--temporary-directory"]),
            Integer(flag="--parallel"),
            Flag("-u", alias=["--unique"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
            Path(flag="--files0-from"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

