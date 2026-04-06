Here we have examples of annotations our system should be able  to generate.
As a guiding principle, we use published or under development systems that will be consumers of the annotations that our system generates.

## PaSh

Includes the old PaSh annotations (.json files) as well some of the newer ones (.py files).
PaSh has many annotations, here we are only placing a sample that includes all the main features of the annotation language.
Annotations are from [here](https://github.com/binpash/annotations).

Annotations need to include the following information:

**Input files (and the order they are read from)**

**Output files (and their order they are written to)**

**The parallelizability class of the command.**
PaSh introduces four major parallelizability classes:

* _Stateless Commands:_
The first class, `stateless`, contains commands that operate on individual line
elements of their input, without maintaining state across invocations. These
are commands that can be expressed as a purely functional `map` or `filter` --
_e.g.,_ `grep` filters out individual lines and `basename` removes a path
prefix from a string. They may produce multiple elements -- _e.g.,_ `tr` may
insert `NL` tokens -- but always return empty output for empty input. Workloads
that use only stateless commands are trivial to parallelize: they do not
require any synchronization to maintain correctness, nor caution about where to
split inputs.

* _Parallelizable Pure Commands:_
The second class, `parallelizable_pure`, contains commands that respect
functional purity -- _i.e.,_ same outputs for same inputs -- but maintain
internal state across their entire pass. The details of this state and its
propagation during element processing affect their parallelizability
characteristics. Some commands are easy to parallelize, because they maintain
trivial state and are commutative -- _e.g.,_ `wc` simply maintains a counter.
Other commands, such as `sort`, maintain more complex invariants that have to
be taken into account when merging partial results.

* _Non-parallelizable Pure Commands:_
The third class, `pure`, contains commands that, while purely functional,
cannot be parallelized within a single data stream. This is because their
internal state depends on prior state in non-trivial ways over the same pass.
For example, hashing commands
such as `sha1sum` maintain complex state that has to be updated sequentially.
If parallelized on a single input, each stage would need to wait on the results
of all previous stages, foregoing any parallelism benefits.

* _Side-effectful Commands:_
The last class, `side-effectful`, contains commands that have side-effects
across the system -- for example, updating environment variables, interacting
with the filesystem, and accessing the network. Such commands are not
parallelizable without finer-grained concurrency control mechanisms that can
detect side-effects across the system.


## POSH

Includes the POSH annotations: a single txt file with one annotation per line.
Annotations taken from [here](https://github.com/deeptir18/posh/tree/master/config) (used files `annotations.txt`, `ann2.txt` and `eval_annotations.txt`).
More info [here](https://github.com/deeptir18/posh/blob/master/ANNOTATIONS.md).

Annotations need to include the following information:

### Parameter-level annotations

**Input files**

**Output files**

**If an argument is splittable**
If the command can be split in a data-parallel way across this argument. This is only allowed for up to a single argument

### Command-level annotations

**Whether the command relies on the current working directory** (e.g., `git status`)

**Whether the command is data parallel across its standard input** (e.g., `grep`)

**Whether the command is likely to have a smaller output than input** (e.g., `grep`)


## Shseer

Includes an example of annotations Shseer will use. Example taken from [here](https://github.com/binpash/Shseer/blob/4d03a9c68ca38e6420168445db05f46f8bcdf98a/src/shseer/smt_timeout_example1.py).

Annotations need to include the following information:

**Command Pre-conditions**

What needs to hold for a command to succesfuly execute.

Some examples:
* `rm foo.txt` has the pre-condition that `foo.txt` exists and is a regular file (not a directory).
* `rm -r foo` has the pre-condition that `foo` exists (it can be a regular file and also a directory).
* [More examples](https://github.com/binpash/Shseer/blob/master/examples.md)

**Command Pre-conditions**

What needs to hold after a command executes.

Some examples:
* `rm foo.txt` has the post-condition that `foo.txt` does not exist.
* `mv foo.txt bar.txt` has the post-condition that `foo.txt` does not exist and `bar.txt` exists.
* `touch foo.txt` has the post-condition that `foo.txt` exists and is a regular file.
