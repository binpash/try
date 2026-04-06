from caruca.ir.syntax import *

uglifyjs_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("-h", alias=["--help"]),
            Flag("-V", alias=["--version"]),
            Selection(
                flag="-p", alias=["--parse"],
                choices=["acorn", "bare_returns", "spidermonkey"],
                flag_followed_by_equals=True
            ),
            Other(flag="-c", alias=["--compress"]), # List of functions
            Other(flag="-m", alias=["--mangle"]), # Reserved names
            Other(flag="--mangle-props"), 
            Other(flag="-b", alias=["--beautify"]),
            Other(flag="-O", alias=["--output-opts"]),
            Path(flag="-o", alias=["--output"]),
            Flag("--annotations"),
            Flag("--no-annotations"),
            Other(flag="--comments"),
            Path(flag="--config-file"),
            Other(flag="-d", alias=["--define"]),
            Other(flag="-e", alias=["--enclose"]),
            Flag("--expression"),
            Flag("--ie"),
            Flag("--keep-fargs"),
            Flag("--keep-fnames"),
            Flag("--module"),
            Flag("--no-module"),
            Path(flag="--name-cache"),
            Flag("--self"),
            Other(flag="--source-map"),
            Flag("--timings"),
            Flag("--toplevel"),
            Flag("--v8"),
            Flag("--verbose"),
            Flag("--warn"),
            Flag("--webkit"),
            String(flag="--wrap"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]
