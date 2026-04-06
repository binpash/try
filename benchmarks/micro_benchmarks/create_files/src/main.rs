use std::env;
use std::fs::File;
use std::io::{self, Write};
use std::error::Error;

const WRITE_SIZE: usize = 0x1000;

fn create_files(size: usize, fnum: u32) -> io::Result<()> {
    let buffer = vec![0u8; WRITE_SIZE];
    for i in 0..fnum {
	let fname = format!("outputfile_{}", i);
	let mut file = File::create(fname)?;
	let mut remain_size = size;
	while remain_size > WRITE_SIZE {
	    file.write_all(&buffer)?;
	    remain_size = remain_size - WRITE_SIZE;
	}
	file.write_all(&buffer[0..remain_size])?;
    }
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
	return Err("Wrong argument size".into());
    }
    let size: usize = args[1].parse().expect("size not an int");
    let fnum: u32 = args[2].parse().expect("num not an int");
    create_files(size, fnum)?;
    Ok(())
}
