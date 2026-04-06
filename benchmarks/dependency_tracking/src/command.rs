use anyhow::{Result, anyhow};
use bincode::Encode;
use std::collections::{BTreeMap, HashMap, HashSet};
use std::env;
use std::fs::{self, File};
use std::io::{self, BufWriter, Error as IoError, ErrorKind, Read, Write};
use std::iter;
use std::os::unix::process::CommandExt;
use std::path::{Path, PathBuf};
use std::process::{Child, Command as ShellCommand, Stdio};
use std::thread::{self, JoinHandle};
use zstd::Encoder;

use crate::config::{
    BUFFER_SIZE, COMPRESSION_LEVEL, Config, EXCLUDED_VARIABLES, STRACE_COMMAND, SandboxMode, TRACE_FILE,
};
use crate::ops::thread::{AlwaysReady, ReadySignal};
use crate::ops::{self, debug_log};

#[derive(Clone, Debug)]
pub(crate) struct Command {
    pub(crate) name: String,
    pub(crate) arguments: Vec<String>,
    pub(crate) environment: BTreeMap<String, String>,
    pub(crate) hash: u64,
}

impl Command {
    pub(crate) fn join_string(&self) -> Result<String> {
        Ok(shlex::try_join(self.join_sequence())?)
    }

    pub(crate) fn join_sequence(&self) -> impl Iterator<Item = &str> {
        iter::once(self.name.as_str()).chain(self.arguments.iter().map(|a| a.as_str()))
    }
}

#[derive(Clone, Debug, Encode)]
struct CommandKey<'c> {
    name: &'c str,
    arguments: &'c [String],
    environment: &'c BTreeMap<String, String>,
}

#[derive(Clone, Debug)]
pub(crate) struct Runtime {
    pub(crate) typ: RuntimeType,
    pub(crate) stdout_file: PathBuf,
    pub(crate) stderr_file: PathBuf,
}

#[derive(Clone, Debug)]
pub(crate) enum RuntimeType {
    Sandbox(PathBuf),
    Docker { trace_file: PathBuf, container: String },
    TraceFile(PathBuf),
    Nothing,
}

#[derive(Debug)]
pub(crate) struct ChildContext {
    pub(crate) child: Child,
    pub(crate) stdout_thread: JoinHandle<Result<ChildResult>>,
    pub(crate) stderr_thread: JoinHandle<Result<ChildResult>>,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) enum ChildResult {
    Completed(usize),
    BrokenPipe,
}

pub(crate) fn create(mut arguments: Vec<String>, environment: &HashMap<String, String>) -> Result<Command> {
    assert!(!arguments.is_empty());
    if arguments.len() == 1 {
        let command_string = arguments.pop().unwrap();
        arguments = shlex::split(&command_string).ok_or_else(|| anyhow!("Could not split command"))?
    }
    let name = arguments.remove(0);

    let excluded_variables = EXCLUDED_VARIABLES.iter().copied().collect::<HashSet<_>>();
    let environment = environment
        .iter()
        .filter_map(|(variable, value)| {
            if !excluded_variables.contains(variable.as_str())
                && (!variable.starts_with("BASH_FUNC_") || !variable.ends_with("%%"))
            {
                Some((variable.clone(), value.clone()))
            } else {
                None
            }
        })
        .collect::<BTreeMap<_, _>>();

    let key_data = ops::data::encode_to_bytes(&CommandKey {
        name: &name,
        arguments: &arguments,
        environment: &environment,
    })?;
    let hash = ops::data::hash_bytes(&key_data);

    Ok(Command {
        name,
        arguments,
        environment,
        hash,
    })
}

const DOCKER_IMAGE: &str = "incr";

pub(crate) fn spawn(config: &Config, command: &Command, runtime: &Runtime) -> Result<ChildContext> {
    spawn_with_signal(config, command, runtime, AlwaysReady)
}

pub(crate) fn spawn_with_signal<R>(
    config: &Config,
    command: &Command,
    runtime: &Runtime,
    destination_ready: R,
) -> Result<ChildContext>
where
    R: Clone + ReadySignal + Send + 'static,
{
    if let RuntimeType::Sandbox(directory) = &runtime.typ {
        fs::create_dir_all(directory)?;
    } else if let RuntimeType::TraceFile(file) | RuntimeType::Docker { trace_file: file, .. } = &runtime.typ
        && let Some(parent) = file.parent()
    {
        fs::create_dir_all(parent)?;
    }

    let mut child = spawn_child(config, command, runtime)?;
    let mut child_stdout = child.stdout.take().unwrap();
    let mut child_stderr = child.stderr.take().unwrap();
    let config = config.clone();
    let destination_ready = destination_ready.clone();

    let stdout_thread = thread::spawn({
        let config = config.clone();
        let stdout_file = runtime.stdout_file.clone();
        let destination_ready = destination_ready.clone();
        move || {
            capture_stream(
                &config,
                &mut child_stdout,
                &mut io::stdout(),
                &stdout_file,
                &destination_ready,
            )
        }
    });
    let stderr_thread = thread::spawn({
        let stderr_file = runtime.stderr_file.clone();
        move || {
            capture_stream(
                &config,
                &mut child_stderr,
                &mut io::stderr(),
                &stderr_file,
                &destination_ready,
            )
        }
    });

    Ok(ChildContext {
        child,
        stdout_thread,
        stderr_thread,
    })
}

fn spawn_child(config: &Config, command: &Command, runtime: &Runtime) -> Result<Child> {
    let mut child = match &runtime.typ {
        RuntimeType::Sandbox(_) => ShellCommand::new(&config.try_command),
        RuntimeType::Docker { .. } => ShellCommand::new("docker"),
        RuntimeType::TraceFile(_) => ShellCommand::new(STRACE_COMMAND),
        RuntimeType::Nothing => ShellCommand::new(&command.name),
    };

    match &runtime.typ {
        RuntimeType::Sandbox(directory) => {
            debug_assert_eq!(config.sandbox_mode, SandboxMode::Try);
            child.args([
                "-D",
                ops::file::path_to_string(directory)?,
                STRACE_COMMAND,
                "-yf",
                "--trace=fork,clone,%file",
                "-o",
                &format!("/tmp/{TRACE_FILE}"),
                &command.join_string()?,
            ]);
        }
        RuntimeType::Docker {
            trace_file,
            container,
        } => {
            let mut arguments = vec![
                STRACE_COMMAND.to_owned(),
                "-yf".to_owned(),
                "--trace=fork,clone,%file".to_owned(),
                "-o".to_owned(),
                ops::file::path_to_string(trace_file)?.to_string(),
            ];
            let command_string = command.join_string()?;
            debug_log!(
                "Docker runtime initial strace args for {} {:?}: {:?}",
                command.name,
                command.arguments,
                arguments,
            );
            arguments.push("/bin/bash".to_owned());
            arguments.push("-lc".to_owned());
            arguments.push(command_string);
            debug_log!(
                "Docker runtime final strace args for {} {:?}: {:?}",
                command.name,
                command.arguments,
                arguments,
            );
            configure_docker_run(&mut child, &config.cache_directory, command, container, arguments)?;
        }
        RuntimeType::TraceFile(file) => {
            let mut arguments = vec![
                "-yf".to_owned(),
                "--seccomp-bpf".to_owned(),
                "--trace=fork,clone,%file".to_owned(),
                "-o".to_owned(),
                ops::file::path_to_string(file)?.to_string(),
            ];
            let command_string = command.join_string()?;
            arguments.push("/bin/bash".to_owned());
            arguments.push("-lc".to_owned());
            arguments.push(command_string);
            child.args(&arguments);
        }
        RuntimeType::Nothing => {
            child.args(&command.arguments);
        }
    };

    child
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    unsafe {
        child.pre_exec(|| {
            if libc::setpgid(0, 0) == -1 {
                Err(IoError::last_os_error())
            } else {
                Ok(())
            }
        });
    }

    Ok(child.spawn()?)
}

fn capture_stream<S, D, R>(
    config: &Config,
    source: &mut S,
    destination: &mut D,
    capture_file: &Path,
    destination_ready: &R,
) -> Result<ChildResult>
where
    S: Read,
    D: Write,
    R: ReadySignal,
{
    if let Some(parent) = capture_file.parent() {
        fs::create_dir_all(parent)?;
    }
    let file = File::create(capture_file)?;
    let mut file_writer = BufWriter::with_capacity(BUFFER_SIZE, file);

    if !config.compress {
        let output = capture_into_stream(config, source, destination, &mut file_writer, destination_ready);
        file_writer.flush()?;
        output
    } else {
        let mut compressor = Encoder::new(file_writer, COMPRESSION_LEVEL)?;
        let output = capture_into_stream(config, source, destination, &mut compressor, destination_ready);
        compressor.finish()?.flush()?;
        output
    }
}

fn capture_into_stream<S, D, W, R>(
    config: &Config,
    source: &mut S,
    destination: &mut D,
    stream: &mut W,
    destination_ready: &R,
) -> Result<ChildResult>
where
    S: Read,
    D: Write,
    W: Write,
    R: ReadySignal,
{
    let mut chunk = [0; BUFFER_SIZE];
    let mut pending = Vec::new();
    let mut destination_broken = false;
    let mut length = 0;

    loop {
        let count = match source.read(&mut chunk) {
            Ok(0) => break,
            Ok(count) => count,
            Err(error) if error.kind() == ErrorKind::Interrupted => continue,
            Err(error) => return Err(error.into()),
        };

        if !destination_ready.check_ready() {
            pending.extend_from_slice(&chunk[..count]);
            continue;
        }
        let outputs = if pending.is_empty() {
            &[&chunk[..count]] as &[_]
        } else {
            &[&pending, &chunk[..count]]
        };

        for output in outputs {
            if !destination_broken && let Err(error) = destination.write_all(output) {
                if error.kind() != ErrorKind::BrokenPipe {
                    return Err(error.into());
                }
                destination_broken = true;
            }
            stream.write_all(output)?;
            length += output.len();
            if destination_broken && !config.complete_execution {
                return Ok(ChildResult::BrokenPipe);
            }
        }
        pending.clear();
    }

    if !pending.is_empty() {
        assert!(!destination_broken && length == 0);
        destination_ready.wait_until_ready();
        if let Err(error) = destination.write_all(&pending) {
            if error.kind() != ErrorKind::BrokenPipe {
                return Err(error.into());
            }
            destination_broken = true;
        }
        stream.write_all(&pending)?;
        length += pending.len();
        if destination_broken && !config.complete_execution {
            return Ok(ChildResult::BrokenPipe);
        }
    }

    Ok(ChildResult::Completed(length))
}

fn configure_docker_run(
    child: &mut ShellCommand,
    cache_directory: &Path,
    command: &Command,
    container: &str,
    container_args: Vec<String>,
) -> Result<()> {
    fs::create_dir_all(cache_directory)?;
    let workspace = env::current_dir()?;
    let workspace = ops::file::path_to_string(&workspace)?;
    let cache_path = ops::file::path_to_string(cache_directory)?;
    let workspace_mount = format!("{workspace}:{workspace}");
    let cache_mount = format!("{cache_path}:{cache_path}");
    // Share the host /tmp so intermediate scratch files (e.g., script-generated tmp files)
    // survive across container invocations in Docker isolation mode.
    let tmp_mount = "/tmp:/tmp";
    // Provide host locale data so LC_ALL/LANG from the parent environment work inside the container.
    let locale_mount = "/usr/lib/locale:/usr/lib/locale:ro";
    // Some core utilities (e.g., `col`) may be missing from the base image; bind the host binary if present.
    let col_path = "/usr/bin/col";

    child.arg("run");
    // Keep STDIN attached so pipelines can stream into the containerized command.
    child.arg("-i");

    // --- ADD THIS SECTION ---
    // Explicitly override the entrypoint to ensure arguments are passed
    // directly to the executable (strace) rather than being consumed
    // by a shell wrapper or existing entrypoint.
    child.arg("--entrypoint");
    child.arg("");
    // ------------------------

    child.arg("--name");
    child.arg(container);
    child.arg("-v");
    child.arg(&workspace_mount);
    if cache_mount != workspace_mount {
        child.arg("-v");
        child.arg(&cache_mount);
    }
    if Path::new(col_path).exists() {
        child.arg("-v");
        child.arg(format!("{col_path}:{col_path}:ro"));
    }
    child.arg("--cap-add");
    child.arg("SYS_PTRACE");
    child.arg("--security-opt");
    child.arg("seccomp=unconfined");
    child.arg("-v");
    child.arg(tmp_mount);
    child.arg("-v");
    child.arg(locale_mount);
    child.arg("-w");
    child.arg(&workspace);
    for (variable, value) in &command.environment {
        child.arg("-e");
        child.arg(format!("{variable}={value}"));
    }
    child.arg(DOCKER_IMAGE);
    for arg in container_args {
        child.arg(arg);
    }
    Ok(())
}

pub(crate) fn kill_child(child: &Child) -> Result<()> {
    let group_id = child.id() as i32;
    let kill_result = unsafe { libc::kill(-group_id, libc::SIGKILL) };
    if kill_result == -1 {
        Err(IoError::last_os_error().into())
    } else {
        Ok(())
    }
}
