# Benchmarks Overview

This directory contains the evaluation workloads used by the `try` paper and invoked by [`scripts/eval_ae.py`](../scripts/eval_ae.py).

## Layout

- [`risky_or_cryptic_llm_suggestions`](./risky_or_cryptic_llm_suggestions): LLM-generated shell programs: `find_exec_touch`, `find_exec_zip`, `find_txt`, `grep_log`, and `sort_large_file` (§5.1).
- [`dependency_tracking`](./dependency_tracking): dependency-tracking workloads sourced from the [Koala benchmarks](https://github.com/kbensh/koala): `covid`, `nlp`, `spell`, and `unixfun` (§5.2).
- [`third_party_library_risks`](./third_party_library_risks): malicious pre-commit hooks: `LinOTP`, `frogmouth`, `kibble`, `okteto`, and `uv-metrics` (§5.3).
- [`cautious_software_installation`](./cautious_software_installation): malicious npm installations: `coa`, `eslint-scope`, `node-sass`, and `ua-parser-js` (§5.4).
- [`partial_specification_mining`](./partial_specification_mining): partial-specification mining on opaque commands: `cp`, `ls`, `rm`, `sed`, `xargs` (§5.5).
- [`micro_benchmarks`](./micro_benchmarks): several microbenchmarks (§5.6).
- [`precomputed_results`](./precomputed_results): precomputed results to be used when live results are unavailable or too time-consuming to generate.

The benchmark groups follow a similar structure: they have per-case subdirectories containing the actual workloads and run harness scripts.

## Orchestration

The recommended entry point is [`scripts/eval_ae.py`](../scripts/eval_ae.py):

```sh
python3 scripts/eval_ae.py list
python3 scripts/eval_ae.py run setup
python3 scripts/eval_ae.py run llm
python3 scripts/eval_ae.py run dependency
python3 scripts/eval_ae.py run pre-commit
python3 scripts/eval_ae.py run npm
python3 scripts/eval_ae.py run spec
python3 scripts/eval_ae.py run micro
python3 scripts/eval_ae.py report
```

To do a quick smoke run, set:

```sh
export ITERATIONS=1
```

before invoking `eval_ae.py run ...`.

## Where Results Go

- §5.1 LLM: [`results/llm_scripts`](./results/llm_scripts)
- §5.2 dependency tracking: [`dependency_tracking/results/incr`](./dependency_tracking/results/incr)
- §5.3 third-party library risks: [`results/pre_commit_hook`](./results/pre_commit_hook)
- §5.4 cautious software installation: [`results/npm_pre_postinstall`](./results/npm_pre_postinstall)
- §5.5 partial-specification mining: [`partial_specification_mining/caruca/results/caruca`](./partial_specification_mining/caruca/results/caruca)
- §5.6 microbenchmarks: [`results/micro_benchmarks`](./results/micro_benchmarks)

The compiled summary and plot outputs are written to [`artifacts/paper_eval`](../artifacts/paper_eval).
