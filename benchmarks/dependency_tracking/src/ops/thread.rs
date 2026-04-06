use anyhow::{Result, anyhow};
use std::sync::{Arc, Condvar, Mutex};
use std::thread::{self, JoinHandle};

use crate::config::PARALLEL_SIZE;

pub(crate) trait ReadySignal {
    fn check_ready(&self) -> bool;
    fn wait_until_ready(&self);
}

#[derive(Clone, Debug)]
pub(crate) struct AlwaysReady;

impl ReadySignal for AlwaysReady {
    fn check_ready(&self) -> bool {
        true
    }

    fn wait_until_ready(&self) {}
}

#[derive(Clone, Debug)]
pub(crate) struct SignalSender {
    state: Arc<SignalState>,
}

impl SignalSender {
    pub(crate) fn signal_ready(&self) {
        *self.state.ready.lock().unwrap() = true;
        self.state.condition.notify_all();
    }
}

#[derive(Clone, Debug)]
pub(crate) struct SignalReceiver {
    state: Arc<SignalState>,
}

impl ReadySignal for SignalReceiver {
    fn check_ready(&self) -> bool {
        *self.state.ready.lock().unwrap()
    }

    fn wait_until_ready(&self) {
        let mut ready = self.state.ready.lock().unwrap();
        while !*ready {
            ready = self.state.condition.wait(ready).unwrap();
        }
    }
}

#[derive(Debug)]
struct SignalState {
    ready: Mutex<bool>,
    condition: Condvar,
}

pub(crate) fn create_signal() -> (SignalSender, SignalReceiver) {
    let state = Arc::new(SignalState {
        ready: Mutex::new(false),
        condition: Condvar::new(),
    });
    (
        SignalSender {
            state: Arc::clone(&state),
        },
        SignalReceiver { state },
    )
}

pub(crate) fn join<T>(thread: JoinHandle<T>) -> Result<T> {
    thread.join().map_err(|e| anyhow!("{e:?}"))
}

pub(crate) fn parallel_process<T, F, O>(data: &[T], function: F) -> Result<Vec<O>>
where
    T: Sync,
    F: Fn(&[T]) -> Result<O> + Sync,
    O: Send,
{
    let num_chunks = data.len().div_ceil(PARALLEL_SIZE);
    if num_chunks <= 1 {
        return Ok(vec![function(data)?]);
    }

    thread::scope(|scope| {
        let mut threads = Vec::with_capacity(num_chunks);
        let mut results = Vec::with_capacity(num_chunks);
        for chunk in data.chunks(PARALLEL_SIZE) {
            threads.push(scope.spawn(|| function(chunk)));
        }
        for thread in threads {
            results.push(thread.join().map_err(|e| anyhow!("{e:?}"))??);
        }
        Ok(results)
    })
}
