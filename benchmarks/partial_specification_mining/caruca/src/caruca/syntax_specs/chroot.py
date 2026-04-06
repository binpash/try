from caruca.ir.syntax import *

chroot_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Group(flag="--groups", flag_followed_by_equals=True),
            OwnerGroup(flag="--userspec", flag_followed_by_equals=True),
            Flag("--skip-chdir"),
            Flag("--help"),
            Flag("--version"),
        ],
        [Path(arity=Arity.EXACTLY_ONE), Command(arity=Arity.ZERO_OR_MORE)],
    ]
]
