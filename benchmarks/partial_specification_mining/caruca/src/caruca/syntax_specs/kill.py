from caruca.ir.syntax import *

kill_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Signal(flag="-"),
            Signal(flag="-s", alias=["--signal"]),
            Integer(flag="-q", alias=["--queue"]),
            Signal(
                flag="-l",
                alias=["--list"],
                flag_followed_by_equals=False,
                arity=Arity.ZERO_OR_ONE
            ),
            Flag("-L", alias=["--table"]),
        ],
        [Pid(arity=Arity.AT_LEAST_ONE)],  # PID list
    ]
]
