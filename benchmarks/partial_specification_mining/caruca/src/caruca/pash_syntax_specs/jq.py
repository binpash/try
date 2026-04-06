from caruca.ir.syntax import *

jq_syntax_spec = [
    [
        [Flag("-c")], 
        [String(choices=(".age",))],
        [Path()]
    ]
]
