from caruca.ir.syntax import *

numfmt_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--debug"),
            Delimiter(flag="-d", alias=["--delimiter"]),
            Other(flag="--field", choices=("1", "1-2")),  # Fields (cut(1) style fields)
            PrintfFormat(flag="--format"),
            Other(flag="--from", choices=("none", "auto", "si", "iec", "iec-i", "iec-si")),  # From (UNIT options)
            Integer(flag="--from-unit"),  # Use this option when the input numbers represent other units (e.g., if the input number ‘10’ represents 10 units of 512 bytes, use ‘--from-unit=512’).
            Flag("--grouping"),  # Grouping (grouping of digits)
            Integer(flag="--header"),  # Header (number of header lines to skip)
            Selection(flag="--invalid", choices=("abort", "fail", "warn", "ignore")),  # Invalid (how to handle invalid numbers)
            Integer(flag="--padding"),  # Padding (pad the output to this width)
            Selection(flag="--round", choices=("up", "down", "from-zero", "towards-zero", "nearest")),  # Round (rounding method)
            String(flag="--suffix"),
            Selection(flag="--to", choices=("none", "auto", "si", "iec", "iec-i"), flag_followed_by_equals=True),
            Integer(flag="--to-unit"),
            Flag("-z", alias=["--zero-terminated"]),

            Flag("--help"),
            Flag("--version"),
        ],
        [Number(arity=Arity.ZERO_OR_MORE)],
    ]
]
