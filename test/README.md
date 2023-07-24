This directory holds tests and testing resources.

`scripts/run_tests.sh` will run all of the tests in this directory
(and subdirectories); to be a test, a file must be:

  - a regular file
  - executable
  - end in `.sh`

You can select a specific test by running `scripts/run_tests.sh a b`;
this will run tests that pass `a` _or_ `b` as grep patterns.

Some files are named `.sh.skip`---these will always be skipped. Rename
them if you need to run them.

Tests have a pretty standard preamble that should handle basic cleanup
functions.
