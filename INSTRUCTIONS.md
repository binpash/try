# Overview

_Note_: Due to double-blind requirements, in the original submission, the subsystem presented in the paper was referred to as `ef`.
The artifact uses the name `try`, as will the published paper.

The paper makes the following claims on pg. 2 (Comments to AEC reviewers after `:`):

1. **Several case studies for which current effect-control is insufficient**: the paper presents five use cases with accompanying programs that motivate a new effect-control abstraction (§2)
2. **A new effect-control abstraction and subsystem**: the paper presents semisolates (§3) and `try` (§4), a Linux subsystem for controlling the effects of opaque components.
3. **Correctness and performance characterization**: the paper presents the results of applying `try` to the five use cases, characterizing its correctness and performance relative to typical isolation mechanisms like Docker containers (§5).

This artifact targets the following USENIX badges:

* [ ] [Artifact available](#artifact-available): Reviewers are expected to confirm that the artifact materials are publicly available (about 10 minutes).
* [ ] [Artifact functional](#artifact-functional): Reviewers are expected to confirm sufficient documentation, key components as described in the paper, and execution across a comprehensive test suite (about 20 minutes).
* [ ] [Results reproducible](#results-reproducible): Reviewers are expected to confirm the key results of section 5 of the paper (about 5 hours).

<a id="artifact-available"></a>
# Artifact Available (10 minutes)

Confirm that the paper, code, and automation scripts are all publicly available:

1. The artifact code is hosted on [GitHub](https://github.com/binpash/try/blob/osdi26-ae).
2. The artifact is hosted in [Zenodo's permanent archive](https://zenodo.org/records/19444649).

Both repositories contain the `try` subsystem, its
[documentation](https://github.com/binpash/try/tree/osdi26-ae/docs);
its [test suite](https://github.com/binpash/try/tree/osdi26-ae/test);
five [use cases and a set of microbenchmarks](https://github.com/binpash/try/tree/osdi26-ae/benchmarks) as presented in the paper and
[accompanying utilities](https://github.com/binpash/try/tree/osdi26-ae/scripts); and
[several optional subsystems](https://github.com/binpash/try/tree/osdi26-ae/utils)
that enhance `try`'s performance, correctness, and usability.

<a id="artifact-functional"></a>
# Artifact Functional (20 minutes)

Confirm sufficient documentation, key components as described in the paper, and execution across a comprehensive test suite (about 20 minutes):

* Documentation: The top-level [README](README.md) and [docs folder](https://github.com/binpash/try/tree/osdi26-ae/docs) contain detailed information about `try`'s interface and capabilities.
                 After installation, the manual page is also available via `man try`.
* Key components: The [try subsystem](https://github.com/binpash/try/tree/osdi26-ae/try) and [several optional subsystems](https://github.com/binpash/try/tree/osdi26-ae/utils) that enhance its performance, correctness, and usability.
* Exercisability: The instructions below set up a Debian-based virtual machine and run `try`'s test suite, which covers a wide range of `try`'s functionality and serves as a sanity check for the artifact's executability.
                  The artifact also includes a tutorial that walks through `try`'s key features and capabilities.

**Quickstart: Running the `try` test suite:** These steps walk through setting up a working Debian-based environment inside a Vagrant virtual machine and running `try`'s test suite.

Requirements:
1. [Vagrant](https://developer.hashicorp.com/vagrant)
2. [VirtualBox](https://www.virtualbox.org/)

Download the repository with all submodules:

```sh
git clone https://github.com/binpash/try
cd try
git switch osdi26-ae
git submodule update --init --recursive
```

From the repository root, run:

```sh
vagrant up debian
```

This will:

1. Download the Debian Vagrant box
2. Create the VM
3. Copy the repository into the guest
4. Install dependencies
5. Build `try`

The first run may take several minutes (depending on your network speed).
After it is complete, run the following:

```sh
# Check that the VM is running
vagrant status debian
# Enter the VM
vagrant ssh debian
```

To run the test suite inside the guest:

```sh
cd /home/vagrant/try && scripts/run_tests.sh
```

The test suite should report:

```text
Summary: 32/32 tests passed.
```

**Complete exploration:** To further explore `try`'s capabilities, you can go through the short [TUTORIAL](TUTORIAL.md) document.

<a id="results-reproducible"></a>
# Results Reproducible (about 5 hours)

The key results of `try`'s evaluation are the following:
- The summary of `try`'s performance and correctness across the five use cases. (§5, Table 2)
- The breakdown of `try`'s overhead across the microbenchmarks. (§5.6, Figure 3)

**Preparation:**
These steps assume you have a working Debian Vagrant guest with the `try` test suite passing, as described in the previous section.
You should have at least 100 GB of free disk space on your host.
The following steps walk through reproducing `try`'s evaluation:

Inside the VM, run the one-time setup step:

```sh
cd /home/vagrant/try && python3 scripts/eval_ae.py run setup
```

**Full evaluation:**
This installs the dependencies for all five use cases.
After this is complete, run each step of the evaluation:

```sh
# Risky or Cryptic LLM Suggestions (§5.1)
python3 scripts/eval_ae.py run llm
# Dependency Tracking (§5.2)
python3 scripts/eval_ae.py run dependency
# Third-Party Library Risks (§5.3)
python3 scripts/eval_ae.py run pre-commit
# Cautious Software Installation (§5.4)
python3 scripts/eval_ae.py run npm
# Partial-Specification Mining (§5.5)
python3 scripts/eval_ae.py run spec
# Microbenchmarks (§5.6)
python3 scripts/eval_ae.py run micro
```
Once all six sections have completed, generate the aggregated artifacts:

```sh
python3 scripts/eval_ae.py report
```

This writes the final outputs:

1. `artifacts/paper_eval/table2_summary.csv`
2. `artifacts/paper_eval/table2_summary.md`
3. `artifacts/paper_eval/micro_breakdown.csv`
4. `artifacts/paper_eval/micro_breakdown.png`

Open the generated summary and plot files:

1. Table 2 data:
   `artifacts/paper_eval/table2_summary.csv`
2. Table 2 summary:
   `artifacts/paper_eval/table2_summary.md`
3. Figure 3 data:
   `artifacts/paper_eval/micro_breakdown.csv`
4. Figure 3 plot:
   `artifacts/paper_eval/micro_breakdown.png`

**Cleanup**:
Inside the guest, exit back to the host and run the cleanup script:

```sh
exit
# From the repository root on the host
./scripts/cleanup-ae.sh
```

# Contact

For questions or bug reports, please contact `evangelos_lamprou@brown.edu` or, better yet, [open an issue on GitHub](https://github.com/binpash/try/issues/new).
