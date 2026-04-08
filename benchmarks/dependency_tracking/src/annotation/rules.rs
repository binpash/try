#[derive(Clone, Debug)]
pub(crate) struct Condition {
    pub(crate) name: &'static str,
    pub(crate) disallowed_flags: &'static [&'static str],
    pub(crate) max_arguments: usize,
}

impl Condition {
    #[allow(unused)]
    const fn with_name(name: &'static str) -> Self {
        Self {
            name,
            disallowed_flags: &[],
            max_arguments: usize::MAX,
        }
    }

    #[allow(unused)]
    const fn with_disallowed_flags(name: &'static str, disallowed_flags: &'static [&'static str]) -> Self {
        Self {
            name,
            disallowed_flags,
            max_arguments: usize::MAX,
        }
    }

    #[allow(unused)]
    const fn with_conditions(
        name: &'static str,
        disallowed_flags: &'static [&'static str],
        max_arguments: usize,
    ) -> Self {
        Self {
            name,
            disallowed_flags,
            max_arguments,
        }
    }
}

pub(crate) const IGNORE_COMMANDS: &[&str] = &[
    // Built-in commands from `compgen -b`
    "alias",
    "bg",
    "bind",
    "break",
    "builtin",
    "caller",
    "cd",
    "command",
    "compgen",
    "complete",
    "compopt",
    "continue",
    "declare",
    "dirs",
    "disown",
    "echo",
    "enable",
    "eval",
    "exec",
    "exit",
    "export",
    "false",
    "fc",
    "fg",
    "getopts",
    "hash",
    "help",
    "history",
    "jobs",
    "kill",
    "let",
    "local",
    "logout",
    "mapfile",
    "popd",
    "printf",
    "pushd",
    "pwd",
    "read",
    "readarray",
    "readonly",
    "return",
    "set",
    "shift",
    "shopt",
    "source",
    "suspend",
    "test",
    "times",
    "trap",
    "true",
    "type",
    "typeset",
    "ulimit",
    "umask",
    "unalias",
    "unset",
    "wait",
    // Additional untraced metadata commands
    "chgrp",
    "chmod",
    "chown",
    "env",
    "ln",
    "mount",
    "printenv",
    "sleep",
    "stat",
    "stty",
    "sync",
    "touch",
    "umount",
    "yes",
];

pub(crate) const PURE_COMMANDS: &[Condition] = &[];

// These benchmark workloads are dominated by standard streaming filters.
// Routing them through plain strace avoids spinning up a full `try` sandbox for
// every pipeline stage, which is unreliable under heavy parallelism in the VM.
pub(crate) const STATELESS_COMMANDS: &[Condition] = &[
    Condition::with_name("awk"),
    Condition::with_name("cat"),
    Condition::with_name("col"),
    Condition::with_name("comm"),
    Condition::with_name("cut"),
    Condition::with_name("find"),
    Condition::with_name("grep"),
    Condition::with_name("head"),
    Condition::with_name("perl"),
    Condition::with_name("rev"),
    Condition::with_name("sed"),
    Condition::with_name("sort"),
    Condition::with_name("tr"),
    Condition::with_name("uniq"),
    Condition::with_name("wc"),
];

pub(crate) const READ_ONLY_COMMANDS: &[Condition] = &[];
