use anyhow::Result;
use std::fs::File;
use std::io::{self, BufReader, ErrorKind, Read, Seek, SeekFrom, Write};
use std::path::Path;
use std::process::ChildStdin;
use std::sync::mpsc::Receiver;
use std::thread::JoinHandle;
use zstd::Decoder;

use super::remove_docker_container;
use crate::cache::batch_cache;
use crate::command::{ChildResult, Runtime, RuntimeType};
use crate::config::BUFFER_SIZE;
use crate::ops;

#[derive(Clone, Debug)]
pub(crate) struct OutputMetadata {
    pub(crate) stdout_length: usize,
    pub(crate) stderr_length: usize,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub(crate) enum OutputResult {
    Completed,
    BrokenPipe,
}

pub(crate) fn forward_stdin<C>(channel: Receiver<C>, mut child_stdin: ChildStdin) -> Result<()>
where
    C: AsRef<[u8]>,
{
    let mut broken = false;
    for chunk in channel {
        if broken {
            continue;
        }
        if let Err(error) = child_stdin.write_all(chunk.as_ref()) {
            if error.kind() != ErrorKind::BrokenPipe {
                return Err(error.into());
            }
            broken = true;
        };
    }
    Ok(())
}

pub(crate) fn join_stream_threads(
    stdin_thread: Option<JoinHandle<Result<()>>>,
    stdout_thread: JoinHandle<Result<ChildResult>>,
    stderr_thread: JoinHandle<Result<ChildResult>>,
) -> Result<Option<OutputMetadata>> {
    if let Some(stdin_thread) = stdin_thread {
        ops::thread::join(stdin_thread)??;
    }
    let stdout_result = ops::thread::join(stdout_thread)??;
    let stderr_result = ops::thread::join(stderr_thread)??;
    match (stdout_result, stderr_result) {
        (ChildResult::Completed(stdout_length), ChildResult::Completed(stderr_length)) => {
            Ok(Some(OutputMetadata {
                stdout_length,
                stderr_length,
            }))
        }
        (ChildResult::BrokenPipe, _) | (_, ChildResult::BrokenPipe) => Ok(None),
    }
}

pub(crate) fn clean_child_runtime(runtime: &Runtime) -> Result<()> {
    ops::file::remove_file(&runtime.stdout_file)?;
    ops::file::remove_file(&runtime.stderr_file)?;
    match &runtime.typ {
        RuntimeType::Sandbox(directory) => batch_cache::remove_sandbox(directory)?,
        RuntimeType::Docker {
            trace_file,
            container,
        } => {
            ops::file::remove_file(trace_file)?;
            remove_docker_container(container)?;
        }
        RuntimeType::TraceFile(file) => ops::file::remove_file(file)?,
        RuntimeType::Nothing => (),
    }
    Ok(())
}

pub(crate) fn output_data<D>(
    data_file: &Path,
    start_index: usize,
    compressed: bool,
    destination: &mut D,
) -> Result<OutputResult>
where
    D: Write,
{
    let mut file = File::open(data_file)?;
    if !compressed {
        let length = file.metadata()?.len() as usize;
        assert!(start_index <= length);
        if start_index == length {
            return Ok(OutputResult::Completed);
        }
    }

    if !compressed {
        file.seek(SeekFrom::Start(start_index as u64))?;
        let mut file_reader = BufReader::with_capacity(BUFFER_SIZE, file);
        output_from_stream(&mut file_reader, destination)
    } else {
        let mut decompressor = Decoder::new(BufReader::with_capacity(BUFFER_SIZE, file))?;
        io::copy(&mut (&mut decompressor).take(start_index as u64), &mut io::sink())?;
        output_from_stream(&mut decompressor, destination)
    }
}

fn output_from_stream<S, D>(source: &mut S, destination: &mut D) -> Result<OutputResult>
where
    S: Read,
    D: Write,
{
    match io::copy(source, destination) {
        Ok(_) => {
            destination.flush()?;
            Ok(OutputResult::Completed)
        }
        Err(error) if error.kind() == ErrorKind::BrokenPipe => Ok(OutputResult::BrokenPipe),
        Err(error) => Err(error.into()),
    }
}
