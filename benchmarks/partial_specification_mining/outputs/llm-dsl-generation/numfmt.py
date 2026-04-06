from caruca.ir.syntax import *

numfmt_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Flag("--debug"),
            Delimiter(flag="-d", alias=["--delimiter"]),
            Range(flag="--field"),
            PrintfFormat(flag="--format"),
            Selection(flag="--from", choices=("none", "auto", "si", "iec", "iec-i")),
            Integer(flag="--from-unit"),
            Flag("--grouping"),
            Integer(flag="--header"),
            Selection(flag="--invalid", choices=("abort", "fail", "warn", "ignore")),
            Integer(flag="--padding"),
            Selection(flag="--round", choices=("up", "down", "from-zero", "towards-zero", "nearest")),
            String(flag="--suffix"),
            Selection(flag="--to", choices=("none", "auto", "si", "iec", "iec-i")),
            Integer(flag="--to-unit"),
            Flag("-z", alias=["--zero-terminated"]),
            Flag("--help"),
            Flag("--version"),
        ],
        [Number(arity=Arity.ZERO_OR_MORE)],
    ]
]

