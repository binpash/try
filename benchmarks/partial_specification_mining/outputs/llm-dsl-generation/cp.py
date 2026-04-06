from caruca.ir.syntax import *

cp_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-a", alias=["--archive"]),
            Flag("--attributes-only"),
            Selection(
                flag="--backup",
                choices=(
                    "none",
                    "off",
                    "simple",
                    "numbered",
                    "t",
                    "existing",
                    "nil",
                    "simple",
                    "never",
                ),
            ),
            Flag("-b"),
            Flag("--copy-contents"),
            Flag("-d"),
            Flag("-f", alias=["--force"]),
            Flag("-i", alias=["--interactive"]),
            Flag("-H"),
            Flag("-l", alias=["--link"]),
            Flag("-L", alias=["--dereference"]),
            Flag("-n", alias=["--no-clobber"]),
            Flag("-P", alias=["--no-dereference"]),
            Flag("-p"),
            Selection(
                flag="--preserve",
                choices=("mode", "ownership", "timestamps", "context", "links", "xattr", "all"),
                flag_followed_by_equals=True,
            ),
            Selection(
                flag="--no-preserve",
                choices=("mode", "ownership", "timestamps", "context", "links", "xattr", "all"),
                flag_followed_by_equals=True,
            ),
            Flag("--parents"),
            Flag("-R", alias=["-r", "--recursive"]),
            Selection(
                flag="--reflink",
                choices=("always", "auto", "never"),
                flag_followed_by_equals=True,
            ),
            Flag("--remove-destination"),
            Selection(
                flag="--sparse",
                choices=("auto", "always", "never"),
                flag_followed_by_equals=True,
            ),
            Flag("--strip-trailing-slashes"),
            Flag("-s", alias=["--symbolic-link"]),
            String(flag="-S", alias=["--suffix"]),
            Path(flag="-t", alias=["--target-directory"]),
            Flag("-T", alias=["--no-target-directory"]),
            Flag("-u", alias=["--update"]),
            Flag("-v", alias=["--verbose"]),
            Flag("-x", alias=["--one-file-system"]),
            Flag("-Z"),
            Selection(
                flag="--context",
                choices=("default", "user_u:object_r:user_tmp_t:s0"),
                flag_followed_by_equals=True,
            ),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.AT_LEAST_ONE), Path(arity=Arity.EXACTLY_ONE)],
    ]
]

