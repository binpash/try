use std::fmt::{Display, Error as FormatError, Formatter};
use std::path::PathBuf;

pub(crate) const DEFAULT_TRY_PATH: &str = "incr/src/scripts/try.sh";
pub(crate) const STRACE_COMMAND: &str = "strace";
pub(crate) const BASH_COMMAND: &str = "bash";
pub(crate) const DEFAULT_CACHE_PATH: &str = "incr/cache";
pub(crate) const INTROSPECT_DIRECTORY: &str = "introspect";

pub(crate) const DATA_FILE: &str = "data";
pub(crate) const STDOUT_FILE: &str = "stdout.incr";
pub(crate) const STDERR_FILE: &str = "stderr.incr";
pub(crate) const DEBUG_FILE: &str = "debug_info.json";

pub(crate) const TRACE_FILE: &str = "trace.txt";
pub(crate) const SANDBOX_DIRECTORY: &str = "sandbox";
pub(crate) const OUTPUT_DIRECTORY: &str = "outputs";
pub(crate) const COMMIT_DIRECTORY: &str = "commit";

pub(crate) const CHUNK_WORKERS: usize = 4;
pub(crate) const CHUNK_SIZES: ChunkSizes = ChunkSizes {
    minimum: 64,
    average: 256,
    maximum: 1024,
};
pub(crate) const CHUNK_GRANULARITY: usize = 2;
pub(crate) const COMPRESSION_LEVEL: i32 = 1;
pub(crate) const BUFFER_SIZE: usize = 65_536;
pub(crate) const PARALLEL_SIZE: usize = 1000;

pub(crate) const SUDO_SANDBOX: bool = true;
pub(crate) const DEBUG: bool = true;
pub(crate) const DEBUG_LOGS: bool = DEBUG && true;
pub(crate) const DEBUG_LOG_PATH: &str = "incr/debug_log.txt";

pub(crate) const EXCLUDED_VARIABLES: &[&str] = &[
    "GIT_ASKPASS",
    "SHLVL",
    "SSH_CLIENT",
    "SSH_CONNECTION",
    "VSCODE_GIT_ASKPASS_EXTRA_ARGS",
    "VSCODE_GIT_ASKPASS_MAIN",
    "VSCODE_GIT_ASKPASS_NODE",
    "VSCODE_GIT_IPC_HANDLE",
    "VSCODE_IPC_HOOK_CLI",
    "VSCODE_PYTHON_AUTOACTIVATE_GUARD",
    "XDG_RUNTIME_DIR",
    "XDG_SESSION_CLASS",
    "XDG_SESSION_ID",
    "XDG_SESSION_TYPE",
    "_",
];
pub(crate) const EXCLUDED_PATHS: &[&str] = &["/proc", "pipe:"];
pub(crate) const DYNAMIC_EXCLUDED_PATHS: &[&str] = &["/tmp"];

#[derive(Clone, Debug)]
pub(crate) struct Config {
    pub(crate) try_command: String,      // Bash try command string
    pub(crate) cache_directory: PathBuf, // Directory to store cache data
    pub(crate) trace_type: TraceType,    // Type of tracing to use
    pub(crate) complete_execution: bool, // Complete after a downstream failure
    pub(crate) compress: bool,           // Whether to compress cached outputs
    pub(crate) force_cache: bool,        // Do not skip the command
    pub(crate) sandbox_mode: SandboxMode, // How to sandbox command execution
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) enum TraceType {
    Sandbox,
    TraceFile,
    Nothing,
}

impl Display for TraceType {
    fn fmt(&self, formatter: &mut Formatter<'_>) -> Result<(), FormatError> {
        match self {
            Self::Sandbox => write!(formatter, "Sandbox"),
            Self::TraceFile => write!(formatter, "TraceFile"),
            Self::Nothing => write!(formatter, "Nothing"),
        }
    }
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) enum SandboxMode {
    Try,
    Docker,
    None,
}

#[derive(Clone, Debug)]
pub(crate) struct ChunkSizes {
    pub(crate) minimum: usize,
    pub(crate) average: usize,
    pub(crate) maximum: usize,
}
