use anyhow::Result;
use bytes::{Bytes, BytesMut};
use rand::Rng;
use std::collections::VecDeque;
use std::fs;
use std::io;
use std::process::ChildStdin;
use std::sync::Arc;
use std::sync::mpsc::{self, Receiver, SyncSender};
use std::thread::{self, JoinHandle};
use xxhash_rust::xxh3::Xxh3;

use crate::cache::chunk_cache::CacheCursor;
use crate::command::{self, ChildContext, Command, Runtime, RuntimeType};
use crate::config::{CHUNK_GRANULARITY, CHUNK_SIZES, CHUNK_WORKERS, Config, TraceType};
use crate::execution::run::{self, OutputMetadata, OutputResult};
use crate::ops::chunk::{LineChunker, LineReader};
use crate::ops::thread::{SignalReceiver, SignalSender};
use crate::ops::{self, BROKEN_PIPE_CODE, ExitCode, debug_log};

#[derive(Debug)]
struct WorkerPool {
    context: Arc<WorkerContext>,
    max_workers: usize,
    channel_capacity: usize,

    processing: VecDeque<JoinHandle<Result<ChunkResult>>>,
    current_thread: Option<JoinHandle<Result<ChunkResult>>>,
    current_channel: Option<SyncSender<Bytes>>,
    next_signal: Option<SignalReceiver>,
    data: BytesMut,
}

impl WorkerPool {
    fn new(context: WorkerContext, max_workers: usize, channel_capacity: usize) -> Self {
        assert!(max_workers > 0 && channel_capacity > 0);
        Self {
            context: Arc::new(context),
            max_workers,
            channel_capacity,

            processing: VecDeque::with_capacity(max_workers),
            current_thread: None,
            current_channel: None,
            next_signal: None,
            data: BytesMut::new(),
        }
    }

    fn send_lines(&mut self, lines: &[u8]) -> Result<()> {
        let channel = self.current_channel.as_ref().unwrap();
        self.data.extend_from_slice(lines);
        let lines = self.data.split();
        channel.send(lines.freeze())?;
        Ok(())
    }

    fn start_worker(&mut self) -> Result<StartResult> {
        assert!(self.current_thread.is_none() && self.current_channel.is_none());
        assert!(self.processing.len() <= self.max_workers);

        if self.processing.len() == self.max_workers {
            let worker_thread = self.processing.pop_front().unwrap();
            if ops::thread::join(worker_thread)?? == ChunkResult::BrokenPipe {
                return Ok(StartResult::BrokenPipe);
            }
        }
        let (send_channel, receive_channel) = mpsc::sync_channel(self.channel_capacity);
        let (send_signal, receive_signal) = ops::thread::create_signal();

        self.current_thread = Some(thread::spawn({
            let context = Arc::clone(&self.context);
            let receive_signal = self.next_signal.take();
            move || {
                process_chunk(
                    &context.config,
                    &context.command,
                    &context.cache,
                    receive_channel,
                    receive_signal,
                    send_signal,
                )
            }
        }));
        self.current_channel = Some(send_channel);
        self.next_signal = Some(receive_signal);

        Ok(StartResult::Started)
    }

    fn detach_worker(&mut self) {
        assert!(self.current_thread.is_some() && self.current_channel.is_some());
        self.processing.push_back(self.current_thread.take().unwrap());
        self.current_channel.take();
    }

    fn join(self) -> Result<ChunkResult> {
        assert!(self.current_thread.is_none() && self.current_channel.is_none());
        for worker_thread in self.processing {
            if ops::thread::join(worker_thread)?? == ChunkResult::BrokenPipe {
                return Ok(ChunkResult::BrokenPipe);
            }
        }
        Ok(ChunkResult::Completed)
    }
}

#[derive(Clone, Debug)]
struct WorkerContext {
    config: Config,
    command: Command,
    cache: CacheCursor,
}

#[derive(Clone, Debug, Eq, PartialEq)]
enum ChunkResult {
    Completed,
    BrokenPipe,
}

#[derive(Clone, Debug, Eq, PartialEq)]
enum StartResult {
    Started,
    BrokenPipe,
}

#[derive(Debug)]
struct StdinContext {
    hash: u64,
    thread: JoinHandle<Result<()>>,
}

pub(crate) fn execute(config: Config, command: Command) -> Result<ExitCode> {
    let cache = CacheCursor::new(&config, &command)?;
    cache.create_directory()?;

    let context = WorkerContext {
        config,
        command,
        cache,
    };
    let channel_capacity = CHUNK_SIZES.average / (2 * CHUNK_GRANULARITY);
    let mut worker_pool = WorkerPool::new(context, CHUNK_WORKERS, channel_capacity);
    worker_pool.start_worker()?;

    {
        let mut stdin_reader = LineReader::new(io::stdin().lock(), CHUNK_GRANULARITY);
        let mut stdin_chunker = LineChunker::new(CHUNK_SIZES);
        let mut stdin_closed = false;

        while !stdin_closed {
            stdin_closed = stdin_reader.read()?;
            while let Some(lines) = stdin_reader.next_lines() {
                worker_pool.send_lines(lines)?;
                if !stdin_chunker.update(lines) {
                    continue;
                }
                worker_pool.detach_worker();
                if worker_pool.start_worker()? == StartResult::BrokenPipe {
                    return Ok(BROKEN_PIPE_CODE);
                }
            }
            stdin_reader.drain();
        }
        worker_pool.detach_worker();
    }

    match worker_pool.join()? {
        ChunkResult::Completed => Ok(ExitCode(0)),
        ChunkResult::BrokenPipe => Ok(BROKEN_PIPE_CODE),
    }
}

fn process_chunk(
    config: &Config,
    command: &Command,
    cache: &CacheCursor,
    stdin_channel: Receiver<Bytes>,
    receive_signal: Option<SignalReceiver>,
    send_signal: SignalSender,
) -> Result<ChunkResult> {
    let runtime = create_child_runtime(config)?;
    let ChildContext {
        mut child,
        stdout_thread,
        stderr_thread,
    } = match receive_signal {
        Some(signal) => command::spawn_with_signal(config, command, &runtime, signal)?,
        None => command::spawn(config, command, &runtime)?,
    };

    let stdin_context = forward_stdin(stdin_channel, child.stdin.take().unwrap())?;
    let cache_valid = cache.chunk_exists(stdin_context.hash);
    if cache_valid {
        if child.try_wait()?.is_none() {
            command::kill_child(&child)?;
            child.wait()?;
        }
        run::clean_child_runtime(&runtime)?;
    } else {
        child.wait()?;
    }

    let outputs = match run::join_stream_threads(Some(stdin_context.thread), stdout_thread, stderr_thread)? {
        Some(outputs) => outputs,
        None => {
            run::clean_child_runtime(&runtime)?;
            return Ok(ChunkResult::BrokenPipe);
        }
    };

    if cache_valid {
        debug_log!(
            "Chunk cache valid: {} {:?} {}",
            command.name,
            command.arguments,
            stdin_context.hash,
        );
        output_cached_data(config, cache, send_signal, stdin_context.hash, &outputs)
    } else {
        debug_log!(
            "Chunk cache invalid: {} {:?} {}",
            command.name,
            command.arguments,
            stdin_context.hash,
        );
        send_signal.signal_ready();
        save_chunk_data(cache, stdin_context.hash, &runtime)
    }
}

fn create_child_runtime(config: &Config) -> Result<Runtime> {
    assert!(config.trace_type == TraceType::Nothing);
    let key = rand::rng().random_range(0..u64::MAX);
    let stdout_file = config.cache_directory.join(format!("stdout_{key}.incr"));
    let stderr_file = config.cache_directory.join(format!("stderr_{key}.incr"));
    Ok(Runtime {
        typ: RuntimeType::Nothing,
        stdout_file,
        stderr_file,
    })
}

fn forward_stdin(stdin_channel: Receiver<Bytes>, child_stdin: ChildStdin) -> Result<StdinContext> {
    let channel_capacity = CHUNK_SIZES.average / (2 * CHUNK_GRANULARITY);
    let (send_channel, receive_channel) = mpsc::sync_channel::<Bytes>(channel_capacity);
    let stdin_thread = thread::spawn(|| run::forward_stdin(receive_channel, child_stdin));

    let mut hasher = Xxh3::new();
    for lines in stdin_channel {
        hasher.update(&lines);
        send_channel.send(lines)?;
    }

    Ok(StdinContext {
        hash: hasher.digest(),
        thread: stdin_thread,
    })
}

fn output_cached_data(
    config: &Config,
    cache: &CacheCursor,
    send_signal: SignalSender,
    stdin_hash: u64,
    outputs: &OutputMetadata,
) -> Result<ChunkResult> {
    let stdout_file = cache.get_stdout_file(stdin_hash);
    let stderr_file = cache.get_stderr_file(stdin_hash);

    let stdout_completed = run::output_data(
        &stdout_file,
        outputs.stdout_length,
        false, // TODO: load
        &mut io::stdout().lock(),
    )? == OutputResult::Completed;
    let stderr_completed = run::output_data(
        &stderr_file,
        outputs.stderr_length,
        false, // TODO: load
        &mut io::stderr().lock(),
    )? == OutputResult::Completed;

    if !config.complete_execution && (!stdout_completed || !stderr_completed) {
        Ok(ChunkResult::BrokenPipe)
    } else {
        send_signal.signal_ready();
        Ok(ChunkResult::Completed)
    }
}

fn save_chunk_data(cache: &CacheCursor, stdin_hash: u64, runtime: &Runtime) -> Result<ChunkResult> {
    cache.create_chunk_directory(stdin_hash)?;
    fs::rename(&runtime.stdout_file, cache.get_stdout_file(stdin_hash))?;
    fs::rename(&runtime.stderr_file, cache.get_stderr_file(stdin_hash))?;
    Ok(ChunkResult::Completed)
}
