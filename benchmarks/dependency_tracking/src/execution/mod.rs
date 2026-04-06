pub(crate) mod batch_executor;
pub(crate) mod chunk_executor;
pub(crate) mod dependency;
pub(crate) mod run;
pub(crate) mod skip_executor;
pub(crate) mod stream_executor;

use anyhow::{Result, anyhow};
use std::collections::HashSet;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command as ShellCommand, Stdio};

use crate::annotation;
use crate::command::{Command, Runtime, RuntimeType};
use crate::config::{EXCLUDED_PATHS, TRACE_FILE, TraceType};
use crate::ops;
use crate::scripts;

pub(crate) fn get_trace_type(cache_directory: &Path, command: &Command) -> TraceType {
    if annotation::check_pure(command) {
        return TraceType::Nothing;
    }
    if annotation::check_stateless(command) || annotation::check_read_only(command) {
        return TraceType::TraceFile;
    }
    if dependency::get_introspect_file(cache_directory, command.hash).exists() {
        return TraceType::TraceFile;
    }
    TraceType::Sandbox
}

pub(crate) fn parse_trace(runtime: &Runtime) -> Result<(HashSet<PathBuf>, HashSet<PathBuf>)> {
    let trace_file = match &runtime.typ {
        RuntimeType::Sandbox(directory) => directory.join("upperdir").join("tmp").join(TRACE_FILE),
        RuntimeType::Docker { trace_file, container } => {
            ensure_docker_trace_file(container, trace_file)?;
            trace_file.clone()
        }
        RuntimeType::TraceFile(trace_file) => trace_file.clone(),
        RuntimeType::Nothing => return Ok((HashSet::new(), HashSet::new())),
    };
    let (mut read_set, mut write_set) = scripts::parse_trace(&trace_file).map_err(|e| anyhow!("{e}"))?;
    fs::remove_file(&trace_file)?;

    read_set.retain(|p| {
        !EXCLUDED_PATHS.iter().any(|e| {
            ops::file::path_to_string(p)
                .map(|p| p.starts_with(e))
                .unwrap_or(true)
        })
    });
    write_set.retain(|p| {
        !EXCLUDED_PATHS.iter().any(|e| {
            ops::file::path_to_string(p)
                .map(|p| p.starts_with(e))
                .unwrap_or(true)
        })
    });

    Ok((read_set, write_set))
}

fn ensure_docker_trace_file(container: &str, trace_file: &Path) -> Result<()> {
    if trace_file.exists() {
        return Ok(());
    }
    if let Some(parent) = trace_file.parent() {
        fs::create_dir_all(parent)?;
    }
    if docker_cp_path(container, trace_file, trace_file)? {
        return Ok(());
    }
    if let Some(file_name) = trace_file.file_name().and_then(|name| name.to_str()) {
        let fallback = Path::new("/tmp").join(file_name);
        if docker_cp_path(container, &fallback, trace_file)? {
            return Ok(());
        }
    }
    Err(anyhow!(
        "docker cp failed for trace file {}",
        ops::file::path_to_string(trace_file)?
    ))
}

fn docker_cp_path(container: &str, container_path: &Path, destination: &Path) -> Result<bool> {
    let container_str = ops::file::path_to_string(container_path)?;
    let destination_str = ops::file::path_to_string(destination)?.to_owned();
    let status = ShellCommand::new("docker")
        .args(["cp", &format!("{container}:{container_str}"), &destination_str])
        .status()?;
    Ok(status.success())
}

pub(crate) fn copy_docker_outputs(container: &str, write_set: &HashSet<PathBuf>) -> Result<()> {
    for path in write_set {
        let path_str = ops::file::path_to_string(path)?;
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }
        let status = ShellCommand::new("docker")
            .args(["cp", &format!("{container}:{path_str}"), &path_str])
            .status()?;
        if !status.success() {
            return Err(anyhow!("docker cp failed for {path_str}"));
        }
    }
    Ok(())
}

pub(crate) fn remove_docker_container(container: &str) -> Result<()> {
    let _ = ShellCommand::new("docker")
        .args(["rm", "-f", container])
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()?;
    Ok(())
}
