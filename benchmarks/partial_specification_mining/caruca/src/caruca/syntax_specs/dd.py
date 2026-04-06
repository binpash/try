from caruca.ir.syntax import *

from caruca.ir.syntax import *

dd_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Size(flag="bs"),
            Size(flag="cbs"),
            Selection(flag="conv", choices=("ascii", "ebcdic", "ibm", "block", "unblock", "lcase", "ucase", "sparse", "swab", "sync", "excl", "nocreat", "notrunc", "noerror", "fdatasync", "fsync"), flag_followed_by_equals=True),
            Int(flag="count"),
            Size(flag="ibs"),
            Path(flag="if"),
            Selection(flag="iflag", choices=("append", "direct", "directory", "dsync", "sync", "fullblock", "nonblock", "noatime", "nocache", "noctty", "nofollow", "count_bytes", "skip_bytes"), flag_followed_by_equals=True),
            Size(flag="obs"),
            Path(flag="of"),
            Selection(flag="oflag", choices=("append", "direct", "directory", "dsync", "sync", "fullblock", "nonblock", "noatime", "nocache", "noctty", "nofollow", "seek_bytes"), flag_followed_by_equals=True),
            Int(flag="seek"),
            Int(flag="skip"),
            Selection(flag="status", choices=("none", "noxfer", "progress"), flag_followed_by_equals=True),
            Flag("--help"),
            Flag("--version"),
        ],
        [],
    ]
]
