Try Profiling
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

#. Debian
#. Debian with LVM
#. Debian with ZFS
#. Rocky Linux
#. OCI CT

Machines
========

Sherlock
--------

* AMD Ryzen 7 3700X 8-Core Processor (16)
* 16GB 3200 MT/s
* M.2 Nvme SSD

box0wash
--------

* Intel(R) Xeon(R) CPU E3-1230 v5 @ 3.40GHz (8)
* 64GB 2400 MT/s configured at 2133 MT/s
* Hardware RAID1 on two SATA 2 SSDs

box0thtp
--------

* Intel(R) Xeon(R) CPU E5-2680 v2 @ 2.80GHz (40)
* 128GB 1600 MT/s
* 8 SATA SSD & option for raid

Omega
-----

TBD

Pi Cluster
----------

TBD
