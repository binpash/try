use anyhow::Result;
use bincode::config::{Configuration, Fixint, LittleEndian, NoLimit};
use bincode::{Decode, Encode};
use serde::Serialize;
use serde::de::DeserializeOwned;
use std::fs::File;
use std::io::{self, BufReader, BufWriter, ErrorKind, Read, Write};
use std::path::Path;
use xxhash_rust::xxh3::Xxh3;

use crate::config::{BUFFER_SIZE, DEBUG};
use crate::ops;

const BINCODE_CONFIG: Configuration<LittleEndian, Fixint, NoLimit> = bincode::config::standard()
    .with_little_endian()
    .with_fixed_int_encoding();

pub(crate) fn hash_bytes(bytes: &[u8]) -> u64 {
    let mut hasher = Box::new(Xxh3::new());
    hasher.update(bytes);
    hasher.digest()
}

pub(crate) fn hash_stream<S>(stream: &mut S) -> Result<u64>
where
    S: Read,
{
    let mut hasher = Box::new(Xxh3::new());
    io::copy(stream, &mut hasher)?;
    Ok(hasher.digest())
}

pub(crate) fn encode_to_bytes<T>(value: &T) -> Result<Vec<u8>>
where
    T: Encode,
{
    Ok(bincode::encode_to_vec(value, BINCODE_CONFIG)?)
}

pub(crate) fn encode_to_file<T>(value: &T, directory: &Path, file_name: String) -> Result<()>
where
    T: Encode + Serialize,
{
    let file_name = ops::file::add_data_extension(file_name);
    let file = File::create(directory.join(file_name))?;
    let mut file_writer = BufWriter::with_capacity(BUFFER_SIZE, file);
    if !DEBUG {
        bincode::encode_into_std_write(value, &mut file_writer, BINCODE_CONFIG)?;
    } else {
        serde_json::to_writer_pretty(&mut file_writer, value)?;
    }
    file_writer.flush()?;
    Ok(())
}

pub(crate) fn decode_from_file<T>(directory: &Path, file_name: String) -> Result<Option<T>>
where
    T: Decode<()> + DeserializeOwned,
{
    let file_name = ops::file::add_data_extension(file_name);
    let file = match File::open(directory.join(file_name)) {
        Ok(file) => file,
        Err(error) if error.kind() == ErrorKind::NotFound => return Ok(None),
        Err(error) => return Err(error.into()),
    };
    let mut file_reader = BufReader::with_capacity(BUFFER_SIZE, file);

    let value = if !DEBUG {
        match bincode::decode_from_std_read(&mut file_reader, BINCODE_CONFIG) {
            Ok(value) => value,
            Err(_) => return Ok(None),
        }
    } else {
        match serde_json::from_reader(file_reader) {
            Ok(value) => value,
            Err(_) => return Ok(None),
        }
    };

    Ok(Some(value))
}
