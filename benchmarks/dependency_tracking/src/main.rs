#![deny(rust_2018_idioms)]

mod annotation;
mod cache;
mod command;
mod config;
mod execution;
mod ops;
mod scripts;

use anyhow::{Result, anyhow};
use clap::Parser;
use std::collections::HashMap;
use std::env;
use std::path::PathBuf;
use std::process;

use crate::command::Command;
use crate::config::{Config, SandboxMode, TraceType};
use crate::config::{DEFAULT_CACHE_PATH, DEFAULT_TRY_PATH};
use crate::execution::{batch_executor, chunk_executor, skip_executor, stream_executor};
use crate::ops::{ExitCode, FAILURE_CODE, SUCCESS_CODE};

const EXECUTOR: Executor = Executor::Stream;

#[allow(unused)]
#[derive(Clone, Debug)]
enum Executor {
    Stream,
    Batch,
}

#[derive(Clone, Debug, Parser)]
struct Arguments {
    #[arg(short = 't', long = "try")]
    try_command: Option<String>,
    #[arg(short = 'c', long = "cache")]
    cache_directory: Option<String>,
    #[arg(short = 'f', long = "force_cache")]
    force_cache: bool,
    #[arg(trailing_var_arg = true)]
    command: Vec<String>,
}

#[derive(Clone, Debug)]
struct Input {
    config: Config,
    command: Command,
    environment: HashMap<String, String>,
}

fn main() {
    ops::initialize_log_file();
    match run() {
        Ok(exit_code) => process::exit(exit_code.0),
        Err(error) => {
            eprintln!("Error: {error}");
            process::exit(FAILURE_CODE.0);
        }
    }
}

fn run() -> Result<ExitCode> {
    let (config, command, environment) = match parse_input()? {
        Some(input) => (input.config, input.command, input.environment),
        None => return Ok(SUCCESS_CODE),
    };
    if !config.force_cache && annotation::skip_command(&command, &environment) {
        return Err(skip_executor::execute(&command));
    }

    let command_string = command.join_string()?;
    let result = if annotation::check_stateless(&command) && config.trace_type == TraceType::Nothing {
        chunk_executor::execute(config, command)
    } else {
        match EXECUTOR {
            Executor::Stream => stream_executor::execute(&config, &command),
            Executor::Batch => batch_executor::execute(&config, &command),
        }
    };

    match result {
        Ok(code) => Ok(code),
        Err(error) => Err(anyhow!("({command_string}) {error}")),
    }
}

fn parse_input() -> Result<Option<Input>> {
    let arguments = Arguments::parse();
    if arguments.command.is_empty() {
        return Ok(None);
    }

    let (try_command, cache_directory) = match (arguments.try_command, arguments.cache_directory) {
        (Some(try_command), Some(cache_directory)) => (try_command, PathBuf::from(cache_directory)),
        (try_command, cache_directory) => {
            let home_directory =
                env::home_dir().ok_or_else(|| anyhow!("Could not resolve home directory"))?;
            let default_try_command = format!(
                "{}/{}",
                ops::file::path_to_string(&home_directory)?,
                DEFAULT_TRY_PATH,
            );
            (
                try_command.unwrap_or(default_try_command),
                home_directory.join(cache_directory.unwrap_or_else(|| DEFAULT_CACHE_PATH.to_owned())),
            )
        }
    };

    let environment = env::vars().collect::<HashMap<_, _>>();
    let command = command::create(arguments.command, &environment)?;

    let sandbox_mode = env::var("INCR_ISOLATION_MODE")
        .ok()
        .and_then(|value| {
            let normalized = value.to_ascii_lowercase();
            match normalized.as_str() {
                "docker" => Some(SandboxMode::Docker),
                "none" => Some(SandboxMode::None),
                "try" => Some(SandboxMode::Try),
                _ => None,
            }
        })
        .unwrap_or(SandboxMode::Try);

    let base_trace_type = execution::get_trace_type(&cache_directory, &command);
    let trace_type = match sandbox_mode {
        SandboxMode::None => TraceType::Nothing,
        _ => base_trace_type,
    };
    let config = Config {
        try_command,
        cache_directory,
        trace_type,
        complete_execution: true, // TODO: add a flag
        compress: false,          // TODO: add a flag
        force_cache: arguments.force_cache,
        sandbox_mode,
    };

    Ok(Some(Input {
        config,
        command,
        environment,
    }))
}
