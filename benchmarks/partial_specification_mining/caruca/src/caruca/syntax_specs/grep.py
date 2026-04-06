from caruca.ir.syntax import *
from caruca.oracle import select_from

grep_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--help"),
            Flag("-V", alias=["--version"]),
            Flag("-E", alias=["--extended-regexp"]),
            Flag("-F", alias=["--fixed-strings"]),
            Flag("-G", alias=["--basic-regexp"]),
            Flag("-P", alias=["--perl-regexp"]),
            Regex(flag="-e", alias=["--regexp"]),
            Path(flag="-f", alias=["--file"]),
            Flag("-i", alias=["--ignore-case"]),
            Flag("--no-ignore-case"),
            Flag("-v", alias=["--invert-match"]),
            Flag("-w", alias=["--word-regexp"]),
            Flag("-x", alias=["--line-regexp"]),
            Flag("-c", alias=["--count"]),
            Selection(
                flag="--color", alias=["--colour"], choices=["never", "always", "auto"]
            ),
            Flag("-L", alias=["--files-without-match"]),
            Flag("-l", alias=["--files-with-matches"]),
            Integer(flag="-m", alias=["--max-count"]),
            Flag("-o", alias=["--only-matching"]),
            Flag("-q", alias=["--quiet", "--silent"]),
            Flag("-s", alias=["--no-messages"]),
            Flag("-b", alias=["--byte-offset"]),
            Flag("-H", alias=["--with-filename"]),
            Flag("-h", alias=["--no-filename"]),
            String(flag="--label"),
            Flag("-n", alias=["--line-number"]),
            Flag("-T", alias=["--initial-tab"]),
            Flag("-Z", alias=["--null"]),
            Integer(flag="-A", alias=["--after-context"]),
            Integer(flag="-B", alias=["--before-context"]),
            Integer(flag="-C", alias=["--context"]),
            Separator(flag="--group-separator"),
            Flag("--no-group-separator"),
            Flag("-a", alias=["--text"]),
            Selection(
                flag="--binary-files", choices=["binary", "without-match", "text"]
            ),
            Selection(flag="-D", alias=["--devices"], choices=["read", "skip"]),
            Selection(
                flag="-d", alias=["--directories"], choices=["read", "skip", "recurse"]
            ),
            Glob(flag="--exclude"),
            Path(flag="--exclude-from"),
            Glob(flag="--exclude-dir"),
            Flag("-I"),
            String(flag="--include"),
            Flag("-r", alias=["--recursive"]),
            Flag("-R", alias=["--dereference-recursive"]),
            Flag("--line-buffered"),
            Flag("-U", alias=["--binary"]),
            Flag("-z", alias=["--null-data"]),
        ],
        [
            Regex(arity=Arity.EXACTLY_ONE),  # PATTERNS
            Path(arity=Arity.ZERO_OR_MORE, dash_as_stdin=True),  # [FILE...]
        ],
    ]
]
