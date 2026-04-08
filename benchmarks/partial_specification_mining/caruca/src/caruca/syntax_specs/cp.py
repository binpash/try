from caruca.ir.syntax import *

cp_syntax_spec: list[SyntaxSpecification] = [
    [
#        [
#            Flag("-a", alias=["--archive"]),
#            Flag("--attributes-only"),
#            Selection(
#                flag="--backup",
#                choices=(
#                    "none",
#                    "off",
#                    "simple",
#                    "numbered",
#                    "t",
#                    "existing",
#                    "nil",
#                    "simple",
#                    "never",
#                ),
#            ),
#            Flag("-b"),
#            Flag("--copy-contents"),
#            Flag("-d"),
#            Flag("-f", alias=["--force"]),
#            Flag("-i", alias=["--interactive"]),
#            Flag("-H"),
#            Flag("-l", alias=["--link"]),
#            Flag("-L", alias=["--dereference"]),
#            Flag("-n", alias=["--no-clobber"]),
#            Flag("-P", alias=["--no-dereference"]),
#            Flag("-p"),
#            List(
#                flag="--preserve",
#                choices=(
#                    "mode",
#                    "ownership",
#                    "timestamps",
#                    "links",
#                    "context",
#                    "xattr",
#                    "all",
#                ),
#            ),  # List
#            List(
#                flag="--no-preserve",
#                choices=(
#                    "mode",
#                    "ownership",
#                    "timestamps",
#                    "links",
#                    "context",
#                    "xattr",
#                    "all",
#                ),
#            ),  # List
#            Flag("--parents"),
#            Flag("-R", alias=["--recursive", "-r"]),
#            Selection(flag="--reflink", choices=("auto", "always", "never")),
#            Flag("--remove-destination"),
#            Selection(flag="--sparse", choices=("auto", "always", "never")),
#            Flag("--strip-trailing-slashes"),
#            Flag("-s", alias=["--symbolic-link"]),
#            String(flag="-S", alias=["--suffix"]),
#            Path(flag="-t", alias=["--target-directory"]),
#            Flag("-T", alias=["--no-target-directory"]),
#            Flag("-u", alias=["--update"]),
#            Flag("-v", alias=["--verbose"]),
#            Flag("-x", alias=["--one-file-system"]),
#            Flag("-Z"),
#            SecurityContext(flag="--context"),  # SecurityContext
#            Flag("--help"),
#            Flag("--version"),
#        ],
        [
            Path(arity=Arity.AT_LEAST_ONE),  # Source
            Path(arity=Arity.EXACTLY_ONE),  # Destination
        ],
    ],
]
