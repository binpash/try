# try

<img src="docs/try_logo.png" alt="try logo" width="100" height="130">

"Do, or do not. There is no try."

We're setting out to change that.

## Description

`try` lets you run a command inside an overlay without modifying the state of the filesystem. While using `try` you can choose to commit the result to the filesystem or completely ignore it without any side-effect to the main file system.

## Getting Started

### Dependencies

* `Ubuntu 18.04 LTS` or later

### Installing

Clone this repository:

```
git clone https://github.com/binpash/try.git
```

Optionally, consider adding the `try` directory to *PATH*.

```
echo 'export PATH="<path_to_try_directory>:$PATH"' >> ~/.bashrc
```

## Example Usage

The general workflow is to *try* a command before commiting its results to your workspace. 

To uncompress a gzip file, you can invoke *try* as follows:

```
try gunzip file.txt.gz
```

By default, *try* will ask you to commit the changes made at the end of its execution.

```
Changes detected in the following files:

/tmp/tmp.0caZdxnHuR/upperdir/home/me/file.txt
/tmp/tmp.0caZdxnHuR/upperdir/home/me/file.txt.gz

Commit these changes? [y/N] y
```

Sometimes, you might want to pre-execute a command and commit its result at a later time. Invoking *try* with the -n flag will return the overlay directory, wothout committing the result.

```
try -n gunzip file.txt.gz
```

Alternatively, you can specify your own overlay directory as follows (note that *try_dir* already exists):

```
try -D try_dir gunzip file.txt.gz
```

You can inspect the changhes made inside a given overlay directory:

```
try summary try_dir
```

You can also choose to commit the overlay directory contents:

```
try commit try_dir
```

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see LICENSE.md for details.

Copyright (c) 2023 The PaSh Authors.
