use anyhow::{Result, anyhow};
use std::fs;
use std::io::{Error as IoError, ErrorKind};
use std::path::Path;

use crate::config::DEBUG;

pub(crate) fn add_data_extension(mut file_name: String) -> String {
    if !DEBUG {
        file_name.push_str(".incr");
    } else {
        file_name.push_str(".json");
    }
    file_name
}

pub(crate) fn path_to_string(path: &Path) -> Result<&str> {
    path.to_str().ok_or_else(|| anyhow!("Could not format path"))
}

pub(crate) fn remove_file(path: &Path) -> Result<()> {
    ignore_missing(fs::remove_file(path))
}

pub(crate) fn remove_directory(path: &Path) -> Result<()> {
    ignore_missing(fs::remove_dir_all(path))
}

fn ignore_missing(result: Result<(), IoError>) -> Result<()> {
    match result {
        Ok(()) => Ok(()),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(()),
        Err(error) => Err(error.into()),
    }
}
