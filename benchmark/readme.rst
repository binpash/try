Try Profilings
#############

For profiling try, we care about a few things.

* Total try time with commit
* Time it takes to run without commit
* Time it takes to commit (lots of files vs lots of directories)
* The different steps that it take
* Performance with everything in ramdisk

Throughout the optimization process, we will run and store the result for
everything.

Benchmarks
==========

#. rustup (write heavy)
#. try tests
#. debootstrap
#. microbenchmarks (large files, many files)
#. something that can reuse sandbox, perhaps hs integration?
#. test for a larger amount of lowerdir layers

OS Setups
=========

#. Debian with ext4 (no mergerfs)
#. Debian with LVM (mergerfs)
#. Debian with Btrfs (reflinks)
#. Rocky Linux (same three setup as above)
#. OCI CT

Machines
========

box0wash
--------

* Intel(R) Xeon(R) CPU E3-1230 v5 @ 3.40GHz (8)
* 64GB 2400 MT/s configured at 2133 MT/s
* 2x SATA SSDs

