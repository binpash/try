use base64::prelude::*;
use serde::{Serialize, Serializer};

pub(crate) fn serialize<S>(bytes: &Option<&[u8]>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    if let Some(bytes) = bytes
        && serializer.is_human_readable()
    {
        let encoded = BASE64_STANDARD.encode(bytes);
        encoded.serialize(serializer)
    } else {
        bytes.serialize(serializer)
    }
}
