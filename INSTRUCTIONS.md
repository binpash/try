# Overview

_Note_: Due to double-blind requirements, in the original submission, the subsystem presented in the paper was referred to as `ef`.
The artifact uses the name `try`, as will the published paper.

The paper makes the following claims on pg. 2 (Comments to AEC reviewers after `:`):

1. **Several case studies for which current effect-control is insufficient**: the paper presents are five use cases with accompanying programs that motivate the semisolate abstraction (§2)
2. **A new effect-control abstraction and subsystem**: the paper presents semisolates (§3) and `try` (§4), a Linux subsystem for controlling filesystem-related effects of opaque components.
3. **Correctness and performance characterization**: the paper presents results by applying `try` to the five use cases, characterizing its correctness and performance relative to try-free execution and Docker-contained execution (§5).

This artifact targets the following badge:

* [ ] [Artifact available](#artifact-available): Reviewers are expected to confirm that the code, paper, and artifact materials are publicly available (about 10 minutes).

# Artifact Available (10 minutes)

Confirm that the paper, code, and automation scripts are all publicly available:

1. The artifact code is hosted at: [https://github.com/binpash/try-ae](https://github.com/binpash/try-ae)
2. The artifact is hosted in [Zenodo's permanent archive](https://zenodo.org/records/19444649).
3. Additional scripts are available in the `scripts` directory in this repository.

> [!IMPORTANT]
> AEC Reviewers: From this point on, the instructions assume you have cloned the repository locally. **All following steps are optional.**

# Getting Started Instructions (5 minutes)

These steps set up a working Debian-based `try` environment and run the test suite inside a Vagrant virtual machine.

Install:

1. Vagrant
2. VirtualBox

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
6. Run the test suite during provisioning

The first run may take several minutes (depending on your network speed).

## Verify The VM

Check that the VM is running:

```sh
vagrant status debian
```

Enter the VM:

```sh
vagrant ssh debian
```

To rerun the test suite manually inside the guest:

```sh
cd /home/vagrant/try && scripts/run_tests.sh
```

The test suite should report:

```text
Summary: 32/32 tests passed.
```

**Optional**: To futher explore `try`'s capabilities, you can go over the short [TUTORIAL](TUTORIAL.md) document.

# Detailed Instructions (3 hours)

These steps reproduce the live evaluation from inside the Debian Vagrant guest and then generate the final paper-style outputs.

## Enter The Guest

From the repository root on the host:

```sh
vagrant up debian
vagrant ssh debian
```

Inside the guest, move to the shared checkout:

```sh
cd /vagrant
```

Run the one-time setup step:

```sh
python3 scripts/eval_ae.py run setup
```

This prepares the Docker images, installs the local `caruca` package for the specification-mining benchmark, and builds the dependency-tracking components used by the later steps.

Run the paper sections one by one:

```sh
# §5.1 Risky or Cryptic LLM Suggestions
python3 scripts/eval_ae.py run llm
# §5.2 Dependency Tracking
python3 scripts/eval_ae.py run dependency
# §5.3 Third-Party Library Risks
python3 scripts/eval_ae.py run pre-commit
# §5.4 Cautious Software Installation
python3 scripts/eval_ae.py run npm
# §5.5 Partial-Specification Mining
python3 scripts/eval_ae.py run spec
# §5.6 Microbenchmarks
python3 scripts/eval_ae.py run micro
```
Once all six sections have completed, generate the aggregated artifacts:

```sh
python3 scripts/eval_ae.py report
```

This writes the final outputs:

1. `artifacts/paper_eval/table2_summary.csv`
2. `artifacts/paper_eval/table2_summary.md`
3. `artifacts/paper_eval/table2_ratios.png`
4. `artifacts/paper_eval/micro_breakdown.csv`
5. `artifacts/paper_eval/micro_breakdown.png`

Open the generated summary and plot files:

1. Table 2 summary:
   `artifacts/paper_eval/table2_summary.md`
2. Table 2 chart:
   `artifacts/paper_eval/table2_ratios.png`
3. Figure 3 data:
   `artifacts/paper_eval/micro_breakdown.csv`
4. Figure 3 plot:
   `artifacts/paper_eval/micro_breakdown.png`

Once you are done: inside the guest, exit back to the host:

```sh
exit
```

From the repository root on the host, run:

```sh
./scripts/cleanup-ae.sh
```

# Contact

For questions or bug reports, please contact `evangelos_lamprou@brown.edu` or open an issue on GitHub.

# Step Log

- 2026-04-07: Read [try.pdf](/Users/vagozino/wrk/try/try.pdf), extracted the evaluation section, and mapped the paper's experiments and benchmark names to the runner scripts and benchmark directories in this repository.
