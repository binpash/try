from caruca.ir.syntax import *

split_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Integer(flag="-a", alias=["--suffix-length"]),
            String(flag="--additional-suffix"),
            Size(flag="-b", alias=["--bytes"]),  # IntBytes
            Size(flag="-C", alias=["--line-bytes"]),
            Flag("-d"),
            Integer(flag="--numeric-suffixes"),
            Flag("-x"),
            Integer(flag="--hex-suffixes"),
            Flag("-e", alias=["--elide-empty-files"]),
            Command(flag="--filter"),
            Integer(flag="-l", alias=["--lines"]),
            Integer(flag="-n", alias=["--number"]), # TODO: This is more complex that a number
            Separator(flag="-t", alias=["--separator"]),
            Flag("-u", alias=["--unbuffered"]),

            Flag("--verbose"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE), String()],
     ],
]
