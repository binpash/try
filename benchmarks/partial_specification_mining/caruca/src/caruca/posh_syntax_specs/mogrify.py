from caruca.ir.syntax import *

mogrify_syntax_spec = [
    [
        [
            Selection("-format", choices=["jpg", "tiff"]),
            Path("-path"),
            String("-thumbnail"),
        ],
        [Path(arity=Arity.ONE_OR_MORE)],
    ]
]
