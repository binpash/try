use anyhow::Result;
use rand::Rng;
use std::io::{self, ErrorKind, IsTerminal, Read, Write};

use crate::cache::CacheData;
use crate::cache::batch_cache::CacheCursor;
use crate::command::{self, ChildContext, Command, Runtime, RuntimeType};
use crate::config::{Config, SandboxMode, TraceType};
use crate::execution;
use crate::execution::dependency;
use crate::execution::run::{self, OutputResult};
use crate::ops::{BROKEN_PIPE_CODE, ExitCode, debug_log};

#[derive(Clone, Debug)]
enum CommandResult {
    Completed(CacheData),
    BrokenPipe,
}

pub(crate) fn execute(config: &Config, command: &Command) -> Result<ExitCode> {
    let mut stdin = Vec::new();
    {
        let mut process_stdin = io::stdin().lock();
        if !process_stdin.is_terminal() {
            process_stdin.read_to_end(&mut stdin)?;
        }
    }

    let cache = CacheCursor::from_stdin(config, command, &stdin)?;
    cache.create_directory()?;
    if let Some(cached_data) = cache.load_data()?
        && dependency::check_cache_valid(&cache, &cached_data)?
    {
        debug_log!("Cache valid: {} {:?}", command.name, command.arguments);
        return output_cached_data(config, &cache, &cached_data);
    }
    debug_log!("Cache invalid: {} {:?}", command.name, command.arguments);

    cache.clean()?;
    let cache_data = match run_command(config, command, &cache, &stdin)? {
        CommandResult::Completed(data) => data,
        CommandResult::BrokenPipe => return Ok(BROKEN_PIPE_CODE),
    };
    cache.save_data(&cache_data)?;
    dependency::save_introspection(config, command, &cache_data)?;

    Ok(ExitCode(cache_data.exit_code))
}

fn run_command(
    config: &Config,
    command: &Command,
    cache: &CacheCursor<'_>,
    stdin: &[u8],
) -> Result<CommandResult> {
    let runtime = create_child_runtime(config, cache);
    let ChildContext {
        mut child,
        stdout_thread,
        stderr_thread,
    } = command::spawn(config, command, &runtime)?;

    {
        let mut child_stdin = child.stdin.take().unwrap();
        if let Err(error) = child_stdin.write_all(stdin)
            && error.kind() != ErrorKind::BrokenPipe
        {
            return Err(error.into());
        }
    }

    let exit_code = child.wait()?.code().unwrap_or(1);
    if run::join_stream_threads(None, stdout_thread, stderr_thread)?.is_none() {
        run::clean_child_runtime(&runtime)?;
        return Ok(CommandResult::BrokenPipe);
    }

    let (read_set, mut write_set) = execution::parse_trace(&runtime)?;
    let mut read_dependencies = dependency::get_read_dependencies(&read_set, &write_set)?;
    match &runtime.typ {
        RuntimeType::Sandbox(_) => {
            cache.extract_sandbox_output()?;
            if !write_set.is_empty() {
                cache.commit_output()?;
            }
        }
        RuntimeType::Docker { container, .. } => {
            execution::copy_docker_outputs(container, &write_set)?;
            execution::remove_docker_container(container)?;
        }
        _ => {}
    }
    dependency::filter_dependencies(&mut read_dependencies, &mut write_set)?;

    Ok(CommandResult::Completed(CacheData {
        exit_code,
        read_dependencies,
        write_outputs: write_set,
        compressed_output: config.compress,
    }))
}

fn create_child_runtime(config: &Config, cache: &CacheCursor<'_>) -> Runtime {
    Runtime {
        typ: match config.trace_type {
            TraceType::Sandbox => {
                if config.sandbox_mode == SandboxMode::Docker {
                    let container = format!("incr_docker_{}", rand::rng().random_range(0..u64::MAX));
                    RuntimeType::Docker {
                        trace_file: cache.get_trace_file(),
                        container,
                    }
                } else {
                    RuntimeType::Sandbox(cache.get_sandbox_directory())
                }
            }
            TraceType::TraceFile => RuntimeType::TraceFile(cache.get_trace_file()),
            TraceType::Nothing => RuntimeType::Nothing,
        },
        stdout_file: cache.get_stdout_file(),
        stderr_file: cache.get_stderr_file(),
    }
}

fn output_cached_data(config: &Config, cache: &CacheCursor<'_>, data: &CacheData) -> Result<ExitCode> {
    let stdout_completed = run::output_data(
        &cache.get_stdout_file(),
        0,
        data.compressed_output,
        &mut io::stdout().lock(),
    )? == OutputResult::Completed;
    let stderr_completed = run::output_data(
        &cache.get_stderr_file(),
        0,
        data.compressed_output,
        &mut io::stderr().lock(),
    )? == OutputResult::Completed;

    if !config.complete_execution && (!stdout_completed || !stderr_completed) {
        return Ok(BROKEN_PIPE_CODE);
    }
    if !data.write_outputs.is_empty() {
        cache.commit_output()?;
    }

    Ok(ExitCode(data.exit_code))
}
