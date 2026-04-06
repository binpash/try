use anyhow::Result;
use bincode::{Decode, Encode};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::fs::{self, File};
use std::io::{BufWriter, Write};
use std::path::{Path, PathBuf};

use crate::config::{BUFFER_SIZE, DEBUG_FILE};

pub(crate) mod batch_cache;
pub(crate) mod chunk_cache;

#[derive(Clone, Debug, Decode, Deserialize, Encode, Serialize)]
pub(crate) struct CacheData {
    pub(crate) exit_code: i32,
    pub(crate) read_dependencies: HashMap<PathBuf, DependencyKey>,
    pub(crate) write_outputs: HashSet<PathBuf>,
    pub(crate) compressed_output: bool,
}

#[derive(Clone, Debug, Decode, Deserialize, Encode, Eq, PartialEq, Serialize)]
pub(crate) enum DependencyKey {
    DoesNotExist,
    Timestamp(u128),
    Hash(u64),
}

pub(crate) fn create_directory<D>(directory: &Path, debug_info: Option<&D>) -> Result<()>
where
    D: Serialize,
{
    if directory.is_dir() {
        return Ok(());
    }
    if directory.is_file() {
        fs::remove_file(directory)?;
    }

    fs::create_dir_all(directory)?;
    if let Some(debug_info) = debug_info {
        let file = File::create(directory.join(DEBUG_FILE))?;
        let mut file_writer = BufWriter::with_capacity(BUFFER_SIZE, file);
        serde_json::to_writer_pretty(&mut file_writer, debug_info)?;
        file_writer.flush()?;
    }

    Ok(())
}
