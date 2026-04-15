# Overview

_Note_: Due to double-blind requirements, in the original submission, the submitted paper refers to the semisolate subsystem as `ef`.
The artifact uses the name `try`, as will the published paper.

The paper makes the following claims on pg. 2 (Comments to AEC reviewers after `:`):

1. **Several case studies for which current effect-control is insufficient**: the paper presents five use cases with accompanying programs that motivate a new effect-control abstraction (§2).
2. **A new effect-control abstraction and subsystem**: the paper presents semisolates (§3) and `try` (§4), a Linux subsystem for controlling the effects of opaque components.
3. **Correctness and performance characterization**: the paper presents the results of applying `try` to the five use cases, characterizing its correctness and performance relative to typical isolation mechanisms like Docker containers (§5).

This artifact targets the following USENIX badges:

* [ ] [Artifact available](#artifact-available): Reviewers are expected to confirm that the artifact materials are publicly available (about 10 minutes).
* [ ] [Artifact functional](#artifact-functional): Reviewers are expected to confirm sufficient documentation, key components as described in the paper, and execution across a comprehensive test suite (about 20 minutes).
* [ ] [Results reproducible](#results-reproducible): Reviewers are expected to confirm the key results of section 5 of the paper (about 5 hours).

<a id="artifact-available"></a>
# Artifact Available (10 minutes)

Confirm that the paper, code, and automation scripts are all publicly available:

1. The artifact code is hosted on [GitHub; `osdi26-ae` branch](https://github.com/binpash/try/tree/osdi26-ae).
2. The artifact is hosted in [Zenodo's permanent archive](https://zenodo.org/records/19444649).

Both repositories contain the `try` subsystem, its
[documentation](https://github.com/binpash/try/tree/osdi26-ae/docs);
its [test suite](https://github.com/binpash/try/tree/osdi26-ae/test);
[five use cases, a set of microbenchmarks](https://github.com/binpash/try/tree/osdi26-ae/benchmarks) with [accompanying utilities](https://github.com/binpash/try/tree/osdi26-ae/scripts), as presented in the paper; and
two [external modules](https://github.com/binpash/try/tree/osdi26-ae/utils)
that enhance `try`'s correctness and usability (`try-summarize` and `try-gidmapper`).

<a id="artifact-functional"></a>
# Artifact Functional (20 minutes)

Confirm sufficient documentation, key components as described in the paper, and execution across `try`'s test suite (about 20 minutes):

* Documentation: The top-level [README](README.md) and [docs folder](https://github.com/binpash/try/tree/osdi26-ae/docs) contain detailed information about `try`'s interface and capabilities.
                 After installation, the manual page is also available via `man try`.
* Key components: The [try subsystem](https://github.com/binpash/try/tree/osdi26-ae/try) and [several optional subsystems](https://github.com/binpash/try/tree/osdi26-ae/utils) that enhance its correctness, and usability (`try-summarize` and `try-gidmapper`).
* Exercisability: The instructions below set up a Docker-based environment and run `try`'s test suite, which covers a wide range of `try`'s functionality and serves as a sanity check for the artifact's executability.
                  The artifact also includes a tutorial that walks through `try`'s key features and capabilities.


_Note_: After the evaluation, if you would like to use `try` on your own machine, you can follow the [installation instructions](https://github.com/binpash/try/tree/osdi26-ae?tab=readme-ov-file#installing).
        For the artifact evaluation, we recommend using the provided Docker-based environment.

**Quickstart (Docker):** These steps set up the Docker-based artifact environment and run `try`'s test suite.

Requirements:
1. [Docker](https://www.docker.com/)

Download the repository with all sub-modules:

```sh
git clone https://github.com/binpash/try
cd try
git switch osdi26-ae
git submodule update --init --recursive
```

From the repository root, run:

```sh
./scripts/run_eval_in_docker.sh run setup
```

This will:

1. Build the evaluation container
2. Mount the repository into it
3. Install dependencies
4. Build `try`
5. Prepare the evaluation environment

The first run may take several minutes (depending on your network speed).
After it is complete, run the following:

```sh
./scripts/run_eval_in_docker.sh run tests
```

The test suite should report:

```text
Summary: 32/32 tests passed.
```

_Note_: Keep in mind that when `try` uses `tmpfs` for the sandbox root instead of mounting an overlay filesystem when run inside a Docker container.
This avoids nested overlayfs issues, but it also means the sandbox contents are memory-backed, which can lead to different performance characteristics compared to running `try` on bare metal.

**Quickstart (Vagrant alternative):** If you using a full-fledged virtual-machine, you can follow the Vagrant-based instructions instead (not recommended for AEC reviewers, but available for completeness).
[Vagrant](https://developer.hashicorp.com/vagrant) and
[VirtualBox](https://www.virtualbox.org/), then run:

```sh
vagrant up debian
vagrant ssh debian
cd /home/vagrant/try && scripts/run_tests.sh
```

**Complete exploration:** To further explore `try`'s capabilities, you can go through the short [TUTORIAL](TUTORIAL.md) document.

<a id="results-reproducible"></a>
# Results Reproducible (about 5 hours)

The key results of `try`'s evaluation are the following:
- The summary of `try`'s performance and correctness across the five use cases. (§5, Table 2)
- The breakdown of `try`'s overhead across the microbenchmarks. (§5.6, Figure 3)

**Preparation (Docker):**
These steps assume you have a working Docker-based artifact environment with the
`try` test suite passing, as described in the previous section.
You should have at least 100 GB of free disk space on your host.
The following steps walk through reproducing `try`'s evaluation:

From the repository root on the host, run the one-time setup step:

```sh
./scripts/run_eval_in_docker.sh run setup
```

This builds the evaluation container if needed, mounts the repository into it,
mounts the host Docker socket for benchmark image builds and Docker baselines,
and installs the dependencies for all five use cases.

**Preparation (Vagrant alternative):** Inside the guest, run:

```sh
cd /home/vagrant/try && python3 scripts/eval_ae.py run setup
```

_Note_: The following steps will take several hours to complete.
AEC reviewers may inspect pre-computed artifacts in the [`benchmarks/precomputed_results`](benchmarks/precomputed_results) folder and jump to the report generation step.

**Full evaluation (Docker):**
After this is complete, run:

```sh
./scripts/run_eval_in_docker.sh run all
```

Once all six sections have completed, generate the aggregated artifacts:

```sh
./scripts/run_eval_in_docker.sh report
```

**Full evaluation (Vagrant alternative):** Inside the guest, run:

```sh
python3 scripts/eval_ae.py run all
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

**Cleanup (Vagrant only):**
If you used the VM-based flow, exit back to the host and run the cleanup script:

```sh
exit
# From the repository root on the host
./scripts/cleanup-ae.sh
```

# Contact

For questions or bug reports, please contact `evangelos_lamprou@brown.edu` or, better yet, [open an issue on GitHub](https://github.com/binpash/try/issues/new).
