use anyhow::Result;
use bincode::Encode;
use serde::Serialize;
use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command as ShellCommand, Stdio};

use crate::cache::{self, CacheData};
use crate::command::Command;
use crate::config::{
    COMMIT_DIRECTORY, Config, DATA_FILE, DEBUG, OUTPUT_DIRECTORY, SANDBOX_DIRECTORY, STDERR_FILE,
    STDOUT_FILE, SUDO_SANDBOX, TRACE_FILE,
};
use crate::ops;

#[derive(Clone, Debug)]
pub(crate) struct CacheCursor<'c> {
    directory: PathBuf,
    try_command: String,
    debug_info: CacheInfo<'c>,
}

impl<'c> CacheCursor<'c> {
    pub(crate) fn from_stdin(config: &Config, command: &'c Command, stdin: &'c [u8]) -> Result<Self> {
        let stdin_hash = ops::data::hash_bytes(stdin);
        let debug_info = CacheInfo {
            name: &command.name,
            arguments: &command.arguments,
            environment: &command.environment,
            stdin_hash,
            stdin: Some(stdin),
        };
        Self::with_info(config, command, stdin_hash, debug_info)
    }

    pub(crate) fn from_hash(config: &Config, command: &'c Command, stdin_hash: u64) -> Result<Self> {
        let debug_info = CacheInfo {
            name: &command.name,
            arguments: &command.arguments,
            environment: &command.environment,
            stdin_hash,
            stdin: None,
        };
        Self::with_info(config, command, stdin_hash, debug_info)
    }

    fn with_info(
        config: &Config,
        command: &'c Command,
        stdin_hash: u64,
        debug_info: CacheInfo<'c>,
    ) -> Result<Self> {
        let key_data = ops::data::encode_to_bytes(&CacheKey {
            name: &command.name,
            arguments: &command.arguments,
            environment: &command.environment,
            stdin_hash,
        })?;
        let hash = ops::data::hash_bytes(&key_data);
        Ok(Self {
            directory: config.cache_directory.join(format!("batch_{hash}")),
            try_command: config.try_command.clone(),
            debug_info,
        })
    }

    pub(crate) fn get_stdout_file(&self) -> PathBuf {
        self.directory.join(STDOUT_FILE)
    }

    pub(crate) fn get_stderr_file(&self) -> PathBuf {
        self.directory.join(STDERR_FILE)
    }

    pub(crate) fn get_sandbox_directory(&self) -> PathBuf {
        self.directory.join(SANDBOX_DIRECTORY)
    }

    pub(crate) fn get_trace_file(&self) -> PathBuf {
        self.directory.join(TRACE_FILE)
    }

    pub(crate) fn data_outputs_exist(&self) -> bool {
        self.get_stdout_file().is_file() && self.get_stderr_file().is_file()
    }

    pub(crate) fn file_outputs_exist(&self) -> bool {
        let output_directory = self.directory.join(OUTPUT_DIRECTORY);
        output_directory.is_dir()
    }

    pub(crate) fn create_directory(&self) -> Result<()> {
        let debug_info = if DEBUG { Some(&self.debug_info) } else { None };
        cache::create_directory(&self.directory, debug_info)
    }

    pub(crate) fn extract_sandbox_output(&self) -> Result<()> {
        let sandbox_directory = self.directory.join(SANDBOX_DIRECTORY);
        let output_directory = self.directory.join(OUTPUT_DIRECTORY);

        fs::create_dir_all(&output_directory)?;
        fs::rename(
            sandbox_directory.join("upperdir"),
            output_directory.join("upperdir"),
        )?;
        fs::rename(sandbox_directory.join("ignore"), output_directory.join("ignore"))?;
        remove_sandbox(&sandbox_directory)?;

        Ok(())
    }

    pub(crate) fn commit_output(&self) -> Result<()> {
        let output_directory = self.directory.join(OUTPUT_DIRECTORY);
        let commit_directory = self.directory.join(COMMIT_DIRECTORY);

        ShellCommand::new("cp")
            .args([
                "-rp",
                ops::file::path_to_string(&output_directory)?,
                ops::file::path_to_string(&commit_directory)?,
            ])
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()?
            .wait()?;
        ShellCommand::new(&self.try_command)
            .args(["commit", ops::file::path_to_string(&commit_directory)?])
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()?
            .wait()?;
        fs::remove_dir_all(&commit_directory)?;

        Ok(())
    }

    pub(crate) fn clean(&self) -> Result<()> {
        let data_file = ops::file::add_data_extension(DATA_FILE.to_owned());
        ops::file::remove_file(Path::new(&data_file))?;
        ops::file::remove_directory(&self.directory.join(OUTPUT_DIRECTORY))?;
        ops::file::remove_directory(&self.directory.join(COMMIT_DIRECTORY))?;
        remove_sandbox(&self.get_sandbox_directory())?;
        Ok(())
    }

    pub(crate) fn load_data(&self) -> Result<Option<CacheData>> {
        ops::data::decode_from_file(&self.directory, DATA_FILE.to_owned())
    }

    pub(crate) fn save_data(&self, data: &CacheData) -> Result<()> {
        ops::data::encode_to_file(data, &self.directory, DATA_FILE.to_owned())
    }
}

#[derive(Clone, Debug, Serialize)]
struct CacheInfo<'c> {
    name: &'c str,
    arguments: &'c [String],
    environment: &'c BTreeMap<String, String>,
    stdin_hash: u64,
    #[serde(with = "ops::serialize_bytes")]
    stdin: Option<&'c [u8]>,
}

#[derive(Clone, Debug, Encode)]
struct CacheKey<'c> {
    name: &'c str,
    arguments: &'c [String],
    environment: &'c BTreeMap<String, String>,
    stdin_hash: u64,
}

pub(crate) fn remove_sandbox(sandbox_directory: &Path) -> Result<()> {
    if SUDO_SANDBOX {
        if !sandbox_directory.exists() {
            return Ok(());
        }
        ShellCommand::new("sudo")
            .args(["rm", "-rf", ops::file::path_to_string(sandbox_directory)?])
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()?
            .wait()?;
    } else {
        ops::file::remove_directory(sandbox_directory)?;
    }
    Ok(())
}
