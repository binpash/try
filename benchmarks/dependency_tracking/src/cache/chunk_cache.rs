use anyhow::Result;
use serde::Serialize;
use std::collections::BTreeMap;
use std::fs;
use std::path::PathBuf;

use crate::cache;
use crate::command::Command;
use crate::config::{Config, DEBUG, STDERR_FILE, STDOUT_FILE};

#[derive(Clone, Debug)]
pub(crate) struct CacheCursor {
    directory: PathBuf,
    debug_info: Option<CacheInfo>,
}

impl CacheCursor {
    pub(crate) fn new(config: &Config, command: &Command) -> Result<Self> {
        let debug_info = if DEBUG {
            Some(CacheInfo {
                name: command.name.clone(),
                arguments: command.arguments.clone(),
                environment: command.environment.clone(),
            })
        } else {
            None
        };
        Ok(Self {
            directory: config.cache_directory.join(format!("chunk_{}", command.hash)),
            debug_info,
        })
    }

    pub(crate) fn get_stdout_file(&self, stdin_hash: u64) -> PathBuf {
        self.get_chunk_directory(stdin_hash).join(STDOUT_FILE)
    }

    pub(crate) fn get_stderr_file(&self, stdin_hash: u64) -> PathBuf {
        self.get_chunk_directory(stdin_hash).join(STDERR_FILE)
    }

    pub(crate) fn chunk_exists(&self, stdin_hash: u64) -> bool {
        self.get_stdout_file(stdin_hash).is_file() && self.get_stderr_file(stdin_hash).is_file()
    }

    pub(crate) fn create_directory(&self) -> Result<()> {
        cache::create_directory(&self.directory, self.debug_info.as_ref())
    }

    pub(crate) fn create_chunk_directory(&self, stdin_hash: u64) -> Result<()> {
        fs::create_dir_all(self.get_chunk_directory(stdin_hash))?;
        Ok(())
    }

    fn get_chunk_directory(&self, stdin_hash: u64) -> PathBuf {
        self.directory.join(format!("chunk_{stdin_hash}"))
    }
}

#[derive(Clone, Debug, Serialize)]
struct CacheInfo {
    name: String,
    arguments: Vec<String>,
    environment: BTreeMap<String, String>,
}
