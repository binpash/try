use anyhow::Result;
use std::collections::{HashMap, HashSet};
use std::fs::{self, File};
use std::io::{BufReader, ErrorKind};
use std::path::{Path, PathBuf};
use std::time::UNIX_EPOCH;

use crate::cache::batch_cache::CacheCursor;
use crate::cache::{CacheData, DependencyKey};
use crate::command::Command;
use crate::config::{BUFFER_SIZE, Config, DYNAMIC_EXCLUDED_PATHS, INTROSPECT_DIRECTORY};
use crate::ops;

pub(crate) fn check_cache_valid(cache: &CacheCursor<'_>, data: &CacheData) -> Result<bool> {
    if !cache.data_outputs_exist() || !check_read_dependencies(&data.read_dependencies)? {
        return Ok(false);
    }
    if !data.write_outputs.is_empty() && !cache.file_outputs_exist() {
        return Ok(false);
    }
    Ok(true)
}

pub(crate) fn get_read_dependencies(
    read_set: &HashSet<PathBuf>,
    write_set: &HashSet<PathBuf>,
) -> Result<HashMap<PathBuf, DependencyKey>> {
    let paths = read_set.iter().collect::<Vec<_>>();
    let results = ops::thread::parallel_process(&paths, |chunk| {
        let mut dependencies = Vec::with_capacity(chunk.len());
        for &path in chunk {
            if !path.exists() {
                dependencies.push((path.clone(), DependencyKey::DoesNotExist));
                continue;
            }
            if !path.is_file() {
                continue;
            }
            if !write_set.contains(path) {
                if let Some(timestamp) = get_modified_timestamp(path)? {
                    dependencies.push((path.clone(), DependencyKey::Timestamp(timestamp)));
                }
            } else if let Some(hash) = get_file_hash(path)? {
                dependencies.push((path.clone(), DependencyKey::Hash(hash)));
            }
        }
        Ok(dependencies)
    })?;

    let mut dependencies = HashMap::with_capacity(read_set.len());
    for chunk in results {
        dependencies.extend(chunk);
    }

    Ok(dependencies)
}

pub(crate) fn filter_dependencies(
    read_dependencies: &mut HashMap<PathBuf, DependencyKey>,
    write_set: &mut HashSet<PathBuf>,
) -> Result<()> {
    let removed = read_dependencies
        .iter()
        .filter_map(|(p, k)| {
            let excluded = DYNAMIC_EXCLUDED_PATHS.iter().any(|e| {
                ops::file::path_to_string(p)
                    .map(|p| p.starts_with(e))
                    .unwrap_or(false)
            });
            if excluded && k == &mut DependencyKey::DoesNotExist && !p.exists() {
                Some(p.clone())
            } else {
                None
            }
        })
        .collect::<Vec<_>>();
    for path in &removed {
        read_dependencies.remove(path);
        write_set.remove(path);
    }
    Ok(())
}

fn check_read_dependencies(dependencies: &HashMap<PathBuf, DependencyKey>) -> Result<bool> {
    let dependencies = dependencies.iter().collect::<Vec<_>>();
    let results = ops::thread::parallel_process(&dependencies, |chunk| {
        for (path, key) in chunk {
            match key {
                DependencyKey::DoesNotExist => {
                    if path.exists() {
                        return Ok(false);
                    }
                }
                DependencyKey::Timestamp(timestamp) => {
                    if !path.is_file() || get_modified_timestamp(path)? != Some(*timestamp) {
                        return Ok(false);
                    }
                }
                DependencyKey::Hash(hash) => {
                    if !path.is_file() || get_file_hash(path)? != Some(*hash) {
                        return Ok(false);
                    }
                }
            }
        }
        Ok(true)
    })?;
    Ok(results.into_iter().all(|r| r))
}

fn get_modified_timestamp(file_path: &Path) -> Result<Option<u128>> {
    let metadata = match fs::metadata(file_path) {
        Ok(metadata) => metadata,
        Err(error) if error.kind() == ErrorKind::PermissionDenied => return Ok(None),
        Err(error) => return Err(error.into()),
    };
    let timestamp = metadata.modified()?.duration_since(UNIX_EPOCH)?.as_micros();
    Ok(Some(timestamp))
}

fn get_file_hash(file_path: &Path) -> Result<Option<u64>> {
    let file = match File::open(file_path) {
        Ok(file) => file,
        Err(error) if error.kind() == ErrorKind::PermissionDenied => return Ok(None),
        Err(error) => return Err(error.into()),
    };
    let mut file_reader = BufReader::with_capacity(BUFFER_SIZE, file);
    Ok(Some(ops::data::hash_stream(&mut file_reader)?))
}

pub(crate) fn save_introspection(config: &Config, command: &Command, cache_data: &CacheData) -> Result<()> {
    let introspect_file = get_introspect_file(&config.cache_directory, command.hash);
    if let Some(parent) = introspect_file.parent() {
        fs::create_dir_all(parent)?;
    }
    if cache_data.write_outputs.is_empty() {
        File::create(&introspect_file)?;
    } else if introspect_file.exists() {
        ops::file::remove_file(&introspect_file)?;
    }
    Ok(())
}

pub(crate) fn get_introspect_file(cache_directory: &Path, command_hash: u64) -> PathBuf {
    cache_directory
        .join(INTROSPECT_DIRECTORY)
        .join(format!("command_{command_hash}.incr"))
}
