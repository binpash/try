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
            Path(flag="--random-source"),
            Flag("-r", alias=["--reverse"]),
            Flag("-V", alias=["--version-sort"]),
            Selection(
                flag="--sort", 
                choices=("general-numeric", "human-numeric", "month", "numeric", "random", "version"),
                flag_followed_by_equals=True
            ),
            Integer(flag="--batch-size", flag_followed_by_equals=True),
            Flag("-c", alias=["--check"]),
            Flag("-C", alias=["--check=quiet", "--check=silent"]),
            Command(flag="--compress-program"),
            Flag("--debug"),
            Path(flag="--files0-from"),
            Other(flag="-k", alias=["--key"], choices=("1", "1.2", "1.2n", "1.2nr", "1n", "1nr")),
            Flag("-m", alias=["--merge"]),
            Path(flag="-o", alias=["--output"]),
            Flag("-s", alias=["--stable"]),
            Integer(flag="-S", alias=["--buffer-size"], flag_followed_by_equals=True),
            Separator(flag="-t", alias=["--field-separator"]),
            Path(flag="-T", alias=["--temporary-directory"]),
            Integer(flag="--parallel", flag_followed_by_equals=True),
            Flag("-u", alias=["--unique"]),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ],
]
