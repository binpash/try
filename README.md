# try

"Do, or do not. There is no try."

We're setting out to change that.

## Overlay backward dependency proof of concept

An example usage is shown here:

```sh
## First generate a test file with ~1MB to then modify in the sandbox
./test/misc/prepare_test_file.sh 1000000

## Run the sandboxed command
./overlay-sandbox/run-sandboxed.sh ./test/misc/append_a_line.sh

## In the end if you accept the changes, the following command should return "new line"
tail -n 1 test.txt
```
