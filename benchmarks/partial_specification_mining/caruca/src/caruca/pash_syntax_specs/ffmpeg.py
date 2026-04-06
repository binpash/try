from caruca.ir.syntax import *

ffmpeg_syntax_spec: list[SyntaxSpecification] = [
    [[Flag("-y"), Path("-i", arity=1)], [Path(arity=1)]]
]
