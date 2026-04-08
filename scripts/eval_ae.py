#!/usr/bin/env python3

from __future__ import annotations

import argparse
import csv
import statistics
import subprocess
import sys
from collections import OrderedDict, defaultdict
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_RESULTS_ROOT = ROOT
DEFAULT_OUTPUT_DIR = ROOT / "artifacts" / "paper_eval"


@dataclass(frozen=True)
class Step:
    name: str
    cwd: Path
    cmd: tuple[str, ...]
    note: str = ""


@dataclass(frozen=True)
class Evaluation:
    key: str
    title: str
    section: str
    steps: tuple[Step, ...]
    note: str = ""


EVALUATIONS: "OrderedDict[str, Evaluation]" = OrderedDict(
    [
        (
            "setup",
            Evaluation(
                key="setup",
                title="Evaluation Setup",
                section="Prerequisites",
                steps=(
                    Step(
                        name="base-image",
                        cwd=ROOT,
                        cmd=("/bin/bash", "scripts/setup.sh"),
                        note="Builds the shared try benchmark base image and starts the local Verdaccio registry used by npm benchmarks.",
                    ),
                    Step(
                        name="llm-image",
                        cwd=ROOT / "benchmarks" / "risky_or_cryptic_llm_suggestions",
                        cmd=("/bin/bash", "scripts/setup.sh"),
                    ),
                    Step(
                        name="llm-data",
                        cwd=ROOT / "benchmarks" / "risky_or_cryptic_llm_suggestions",
                        cmd=("/bin/bash", "setup_baremetal.sh"),
                        note="Generates the clean local data copies that the LLM benchmarks restore between iterations.",
                    ),
                    Step(
                        name="npm-image",
                        cwd=ROOT / "benchmarks" / "cautious_software_installation",
                        cmd=("/bin/bash", "scripts/setup.sh"),
                    ),
                    Step(
                        name="pre-commit-image",
                        cwd=ROOT / "benchmarks" / "third_party_library_risks",
                        cmd=("/bin/bash", "scripts/setup.sh"),
                    ),
                    Step(
                        name="micro-image",
                        cwd=ROOT / "benchmarks" / "micro_benchmarks",
                        cmd=("/bin/bash", "scripts/setup.sh"),
                    ),
                    Step(
                        name="spec-caruca",
                        cwd=ROOT / "benchmarks" / "partial_specification_mining" / "caruca",
                        cmd=(
                            "python3",
                            "-m",
                            "pip",
                            "install",
                            "--break-system-packages",
                            ".",
                        ),
                        note="Installs the local caruca CLI used by the partial-specification mining benchmark.",
                    ),
                    Step(
                        name="dependency-python",
                        cwd=ROOT / "benchmarks" / "dependency_tracking",
                        cmd=(
                            "python3",
                            "-m",
                            "pip",
                            "install",
                            "--break-system-packages",
                            "-r",
                            "requirements.txt",
                        ),
                    ),
                    Step(
                        name="dependency-rustup",
                        cwd=ROOT / "benchmarks" / "dependency_tracking",
                        cmd=(
                            "/bin/bash",
                            "-lc",
                            "if [ ! -x \"$HOME/.cargo/bin/cargo\" ]; then "
                            "curl https://sh.rustup.rs -sSf | sh -s -- -y; "
                            "fi && . \"$HOME/.cargo/env\" && rustup update stable",
                        ),
                        note="Installs a current Rust toolchain for the dependency-tracking benchmark, which uses the Rust 2024 edition.",
                    ),
                    Step(
                        name="dependency-build",
                        cwd=ROOT / "benchmarks" / "dependency_tracking",
                        cmd=("/bin/bash", "-lc", ". \"$HOME/.cargo/env\" && cargo build --release"),
                        note="Builds the incremental executor used by the dependency-tracking benchmark harness.",
                    ),
                ),
                note="Run this once in the Debian Vagrant guest before running live evaluations. The `all` target includes it automatically.",
            ),
        ),
        (
            "llm",
            Evaluation(
                key="llm",
                title="Risky or Cryptic LLM Suggestions",
                section="§5.1",
                steps=(
                    Step(
                        name="performance",
                        cwd=ROOT / "benchmarks" / "risky_or_cryptic_llm_suggestions",
                        cmd=("/bin/bash", "run_benchmarks.sh"),
                    ),
                    Step(
                        name="equivalence",
                        cwd=ROOT / "benchmarks" / "risky_or_cryptic_llm_suggestions",
                        cmd=("/bin/bash", "run_compatibility.sh"),
                    ),
                ),
            ),
        ),
        (
            "dependency",
            Evaluation(
                key="dependency",
                title="Dependency Tracking",
                section="§5.2",
                steps=(
                    Step(
                        name="performance",
                        cwd=ROOT / "benchmarks" / "dependency_tracking",
                        cmd=("/bin/bash", "run_benchmarks.sh"),
                    ),
                ),
                note="This group has a benchmark runner but no separate one-shot compatibility script in the repo.",
            ),
        ),
        (
            "pre-commit",
            Evaluation(
                key="pre-commit",
                title="Third-Party Library Risks",
                section="§5.3",
                steps=(
                    Step(
                        name="prepare",
                        cwd=ROOT / "benchmarks" / "third_party_library_risks",
                        cmd=("/bin/bash", "setup-baremetal.sh"),
                        note="Required once to populate the benchmark environments.",
                    ),
                    Step(
                        name="performance",
                        cwd=ROOT / "benchmarks" / "third_party_library_risks",
                        cmd=("/bin/bash", "run_benchmarks.sh"),
                    ),
                    Step(
                        name="equivalence",
                        cwd=ROOT / "benchmarks" / "third_party_library_risks",
                        cmd=("/bin/bash", "run_compatibility.sh"),
                    ),
                ),
            ),
        ),
        (
            "npm",
            Evaluation(
                key="npm",
                title="Cautious Software Installation",
                section="§5.4",
                steps=(
                    Step(
                        name="performance",
                        cwd=ROOT / "benchmarks" / "cautious_software_installation",
                        cmd=("/bin/bash", "run_benchmarks.sh"),
                    ),
                    Step(
                        name="equivalence",
                        cwd=ROOT / "benchmarks" / "cautious_software_installation",
                        cmd=("/bin/bash", "run_compatibility.sh"),
                    ),
                ),
            ),
        ),
        (
            "spec",
            Evaluation(
                key="spec",
                title="Partial-Specification Mining",
                section="§5.5",
                steps=(
                    Step(
                        name="install-caruca",
                        cwd=ROOT / "benchmarks" / "partial_specification_mining" / "caruca",
                        cmd=(
                            "python3",
                            "-m",
                            "pip",
                            "install",
                            "--break-system-packages",
                            ".",
                        ),
                        note="Installs the local caruca CLI required by the partial-specification mining benchmark.",
                    ),
                    Step(
                        name="generation",
                        cwd=ROOT / "benchmarks" / "partial_specification_mining" / "caruca",
                        cmd=("/bin/bash", "run.sh"),
                        note="Runs the paper-style partial-specification timing harness for cp, ls, rm, sed, and xargs.",
                    ),
                ),
            ),
        ),
        (
            "micro",
            Evaluation(
                key="micro",
                title="Microbenchmarks",
                section="§5.6",
                steps=(
                    Step(
                        name="performance",
                        cwd=ROOT / "benchmarks" / "micro_benchmarks",
                        cmd=("/bin/bash", "run_benchmarks.sh"),
                    ),
                ),
                note="Use the plot subcommand to turn the try-timed traces into a Figure 3-style breakdown.",
            ),
        ),
    ]
)


TABLE2_ROWS = (
    {
        "use_case": "Risky or cryptic LLM suggestions",
        "section": "§5.1",
        "results_file": "benchmarks/results/llm_scripts/benchmark_results.csv",
        "name": "crawl",
        "key": "find_exec_touch",
        "description": "LLM-generated shell pipeline (find/exec/touch)",
        "source": "benchmarks/risky_or_cryptic_llm_suggestions/find_exec_touch",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker-high.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Risky or cryptic LLM suggestions",
        "section": "§5.1",
        "results_file": "benchmarks/results/llm_scripts/benchmark_results.csv",
        "name": "fresh",
        "key": "find_exec_zip",
        "description": "LLM-generated shell pipeline (find/exec/gzip)",
        "source": "benchmarks/risky_or_cryptic_llm_suggestions/find_exec_zip",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker-high.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Risky or cryptic LLM suggestions",
        "section": "§5.1",
        "results_file": "benchmarks/results/llm_scripts/benchmark_results.csv",
        "name": "archive",
        "key": "find_txt",
        "description": "LLM-generated shell pipeline (find .txt files)",
        "source": "benchmarks/risky_or_cryptic_llm_suggestions/find_txt",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker-high.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Risky or cryptic LLM suggestions",
        "section": "§5.1",
        "results_file": "benchmarks/results/llm_scripts/benchmark_results.csv",
        "name": "logs",
        "key": "grep_log",
        "description": "LLM-generated shell pipeline (grep log file)",
        "source": "benchmarks/risky_or_cryptic_llm_suggestions/grep_log",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker-high.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Risky or cryptic LLM suggestions",
        "section": "§5.1",
        "results_file": "benchmarks/results/llm_scripts/benchmark_results.csv",
        "name": "order",
        "key": "sort_large_file",
        "description": "LLM-generated shell pipeline (sort large file)",
        "source": "benchmarks/risky_or_cryptic_llm_suggestions/sort_large_file",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker-high.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Dependency tracking",
        "section": "§5.2",
        "results_file": "benchmarks/dependency_tracking/results/incr",
        "name": "covid",
        "key": "covid",
        "description": "Koala benchmark with dependency tracking",
        "source": "benchmarks/dependency_tracking",
        "control": "IASM",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Dependency tracking",
        "section": "§5.2",
        "results_file": "benchmarks/dependency_tracking/results/incr",
        "name": "nlp",
        "key": "nlp",
        "description": "Koala benchmark with dependency tracking",
        "source": "benchmarks/dependency_tracking",
        "control": "IASM",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Dependency tracking",
        "section": "§5.2",
        "results_file": "benchmarks/dependency_tracking/results/incr",
        "name": "spell",
        "key": "spell",
        "description": "Koala benchmark with dependency tracking",
        "source": "benchmarks/dependency_tracking",
        "control": "IASM",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Dependency tracking",
        "section": "§5.2",
        "results_file": "benchmarks/dependency_tracking/results/incr",
        "name": "unixfun",
        "key": "unixfun",
        "description": "Koala benchmark with dependency tracking",
        "source": "benchmarks/dependency_tracking",
        "control": "IASM",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Third-party library risks",
        "section": "§5.3",
        "results_file": "benchmarks/results/pre_commit_hook/benchmark_results.csv",
        "name": "LinOTP",
        "key": "LinOTP",
        "description": "Git repo with risky pre-commit hook",
        "source": "benchmarks/third_party_library_risks/LinOTP",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-leak-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Third-party library risks",
        "section": "§5.3",
        "results_file": "benchmarks/results/pre_commit_hook/benchmark_results.csv",
        "name": "frogmouth",
        "key": "frogmouth",
        "description": "Git repo with risky pre-commit hook",
        "source": "benchmarks/third_party_library_risks/frogmouth",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-leak-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Third-party library risks",
        "section": "§5.3",
        "results_file": "benchmarks/results/pre_commit_hook/benchmark_results.csv",
        "name": "kibble",
        "key": "kibble",
        "description": "Git repo with risky pre-commit hook",
        "source": "benchmarks/third_party_library_risks/kibble",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-leak-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Third-party library risks",
        "section": "§5.3",
        "results_file": "benchmarks/results/pre_commit_hook/benchmark_results.csv",
        "name": "okteto",
        "key": "okteto",
        "description": "Git repo with risky pre-commit hook",
        "source": "benchmarks/third_party_library_risks/okteto",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-leak-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Third-party library risks",
        "section": "§5.3",
        "results_file": "benchmarks/results/pre_commit_hook/benchmark_results.csv",
        "name": "uv-metrics",
        "key": "uv-metrics",
        "description": "Git repo with risky pre-commit hook",
        "source": "benchmarks/third_party_library_risks/uv-metrics",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-leak-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Cautious software installation",
        "section": "§5.4",
        "results_file": "benchmarks/results/npm_pre_postinstall/benchmark_results.csv",
        "name": "eslint-scope",
        "key": "eslint-scope",
        "description": "NPM package with post-install script",
        "source": "benchmarks/cautious_software_installation/eslint-scope",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Cautious software installation",
        "section": "§5.4",
        "results_file": "benchmarks/results/npm_pre_postinstall/benchmark_results.csv",
        "name": "coa",
        "key": "coa",
        "description": "NPM package with post-install script",
        "source": "benchmarks/cautious_software_installation/coa",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Cautious software installation",
        "section": "§5.4",
        "results_file": "benchmarks/results/npm_pre_postinstall/benchmark_results.csv",
        "name": "node-sass",
        "key": "node-sass",
        "description": "NPM package with post-install script",
        "source": "benchmarks/cautious_software_installation/node-sass",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Cautious software installation",
        "section": "§5.4",
        "results_file": "benchmarks/results/npm_pre_postinstall/benchmark_results.csv",
        "name": "ua-parser-js",
        "key": "ua-parser-js",
        "description": "NPM package with post-install script",
        "source": "benchmarks/cautious_software_installation/ua-parser-js",
        "control": "IAM",
        "try_suffix": "try-run.sh",
        "docker_suffix": "run-docker.sh",
        "vanilla_suffix": "run.sh",
    },
    {
        "use_case": "Partial-specification mining",
        "section": "§5.5",
        "results_file": "benchmarks/partial_specification_mining/caruca/results/caruca",
        "name": "cp",
        "key": "cp",
        "description": "Unix utility traced with caruca",
        "source": "benchmarks/partial_specification_mining/caruca",
        "control": "IAS",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Partial-specification mining",
        "section": "§5.5",
        "results_file": "benchmarks/partial_specification_mining/caruca/results/caruca",
        "name": "ls",
        "key": "ls",
        "description": "Unix utility traced with caruca",
        "source": "benchmarks/partial_specification_mining/caruca",
        "control": "IAS",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Partial-specification mining",
        "section": "§5.5",
        "results_file": "benchmarks/partial_specification_mining/caruca/results/caruca",
        "name": "rm",
        "key": "rm",
        "description": "Unix utility traced with caruca",
        "source": "benchmarks/partial_specification_mining/caruca",
        "control": "IAS",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Partial-specification mining",
        "section": "§5.5",
        "results_file": "benchmarks/partial_specification_mining/caruca/results/caruca",
        "name": "sed",
        "key": "sed",
        "description": "Unix utility traced with caruca",
        "source": "benchmarks/partial_specification_mining/caruca",
        "control": "IAS",
        "results_layout": "split_by_provider",
    },
    {
        "use_case": "Partial-specification mining",
        "section": "§5.5",
        "results_file": "benchmarks/partial_specification_mining/caruca/results/caruca",
        "name": "xargs",
        "key": "xargs",
        "description": "Unix utility traced with caruca",
        "source": "benchmarks/partial_specification_mining/caruca",
        "control": "IAS",
        "results_layout": "split_by_provider",
    },
)


MICRO_NAME_MAP = {
    "smallcommands": "echo",
    "smallfiles": "rustup",
    "bigio": "big_file",
}


def load_pyplot():
    try:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "matplotlib is required for plot generation. Install python3-matplotlib "
            "in the Debian Vagrant guest, or rerun without --plot."
        ) from exc
    return plt


def print_header(text: str) -> None:
    print(f"\n== {text} ==")


def run_step(step: Step, dry_run: bool) -> None:
    cmd_display = " ".join(step.cmd)
    print(f"[run] {step.name}: (cd {step.cwd} && {cmd_display})")
    if step.note:
        print(f"      note: {step.note}")
    if dry_run:
        return
    subprocess.run(step.cmd, cwd=step.cwd, check=True)


def list_evaluations() -> None:
    for evaluation in EVALUATIONS.values():
        print(f"{evaluation.key}: {evaluation.title} {evaluation.section}")
        if evaluation.note:
            print(f"  note: {evaluation.note}")
        for step in evaluation.steps:
            print(f"  - {step.name}: {' '.join(step.cmd)}")
            if step.note:
                print(f"    note: {step.note}")


def run_evaluations(selected: list[str], dry_run: bool) -> None:
    keys = list(EVALUATIONS.keys()) if selected == ["all"] else selected
    for key in keys:
        evaluation = EVALUATIONS[key]
        print_header(f"{evaluation.title} {evaluation.section}")
        if evaluation.note:
            print(evaluation.note)
        for step in evaluation.steps:
            run_step(step, dry_run=dry_run)


def read_results_csv(path: Path) -> dict[str, list[float]]:
    rows: dict[str, list[float]] = {}
    with path.open(newline="") as handle:
        for raw in csv.reader(handle):
            if not raw:
                continue
            values: list[float] = []
            for item in raw[1:]:
                if not item:
                    continue
                try:
                    values.append(float(item))
                except ValueError:
                    continue
            if values:
                rows[raw[0]] = values
    return rows


def load_table2_rows(results_root: Path) -> list[dict[str, object]]:
    grouped_cache: dict[Path, dict[str, list[float]]] = {}
    rows: list[dict[str, object]] = []
    for spec in TABLE2_ROWS:
        csv_path = results_root / spec["results_file"]
        key = str(spec["key"])
        if spec.get("results_layout") == "split_by_provider":
            try_path = csv_path / "benchmark_results_try.csv"
            docker_path = csv_path / "benchmark_results_docker.csv"
            vanilla_path = csv_path / "benchmark_results_vanilla.csv"
            for path in (try_path, docker_path, vanilla_path):
                if path not in grouped_cache:
                    grouped_cache[path] = read_results_csv(path)
            try_values = grouped_cache[try_path].get(key, [])
            docker_values = grouped_cache[docker_path].get(key, [])
            vanilla_values = grouped_cache[vanilla_path].get(key, [])
            csv_ref = str(csv_path.relative_to(ROOT))
        else:
            if csv_path not in grouped_cache:
                grouped_cache[csv_path] = read_results_csv(csv_path)
            data = grouped_cache[csv_path]
            try_name = f"{key}_{spec['try_suffix']}"
            docker_name = f"{key}_{spec['docker_suffix']}"
            vanilla_name = f"{key}_{spec['vanilla_suffix']}"
            try_values = data.get(try_name, [])
            docker_values = data.get(docker_name, [])
            vanilla_values = data.get(vanilla_name, [])
            csv_ref = str(csv_path.relative_to(ROOT))
        if not try_values or not docker_values or not vanilla_values:
            missing = []
            if not try_values:
                missing.append("try")
            if not docker_values:
                missing.append("docker")
            if not vanilla_values:
                missing.append("vanilla")
            raise RuntimeError(
                f"Missing {', '.join(missing)} results for {spec['name']} in {csv_ref}"
            )
        try_median = statistics.median(try_values)
        docker_median = statistics.median(docker_values)
        vanilla_median = statistics.median(vanilla_values)
        rows.append(
            {
                **spec,
                "csv_path": csv_ref,
                "try_median": try_median,
                "docker_median": docker_median,
                "vanilla_median": vanilla_median,
                "vs_docker": docker_median / try_median,
                "vs_vanilla": try_median / vanilla_median,
            }
        )
    return rows


def format_ratio(value: float, direction: str) -> str:
    arrow = "↑" if direction == "up" else "↓"
    return f"{value:.1f}× {arrow}"


def write_table2_summary(rows: list[dict[str, object]], out_dir: Path) -> tuple[Path, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    csv_path = out_dir / "table2_summary.csv"
    md_path = out_dir / "table2_summary.md"

    fieldnames = [
        "use_case",
        "section",
        "name",
        "control",
        "vs_docker",
        "vs_vanilla",
        "docker_median",
        "try_median",
        "vanilla_median",
        "description",
        "source",
        "csv_path",
    ]
    with csv_path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(
                {
                    "use_case": row["use_case"],
                    "section": row["section"],
                    "name": row["name"],
                    "control": row["control"],
                    "vs_docker": f"{row['vs_docker']:.4f}",
                    "vs_vanilla": f"{row['vs_vanilla']:.4f}",
                    "docker_median": f"{row['docker_median']:.4f}",
                    "try_median": f"{row['try_median']:.4f}",
                    "vanilla_median": f"{row['vanilla_median']:.4f}",
                    "description": row["description"],
                    "source": row["source"],
                    "csv_path": row["csv_path"],
                }
            )

    header = [
        "| Use Case | Name | Control | vs Docker | vs Vanilla | Description | Source |",
        "| --- | --- | --- | --- | --- | --- | --- |",
    ]
    body = []
    for row in rows:
        body.append(
            "| "
            + " | ".join(
                [
                    str(row["use_case"]),
                    str(row["name"]),
                    str(row["control"]),
                    format_ratio(float(row["vs_docker"]), "up"),
                    format_ratio(float(row["vs_vanilla"]), "down"),
                    str(row["description"]),
                    str(row["source"]),
                ]
            )
            + " |"
        )
    md_path.write_text("\n".join(header + body) + "\n")
    return csv_path, md_path


def plot_table2(rows: list[dict[str, object]], out_dir: Path) -> Path:
    plt = load_pyplot()

    out_dir.mkdir(parents=True, exist_ok=True)
    output = out_dir / "table2_ratios.png"
    labels = [f"{row['name']} ({row['section']})" for row in rows]
    vs_docker = [float(row["vs_docker"]) for row in rows]
    vs_vanilla = [float(row["vs_vanilla"]) for row in rows]
    y_positions = list(range(len(rows)))

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 9), sharey=True)
    ax1.barh(y_positions, vs_docker, color="#4C78A8")
    ax1.set_title("Try Speedup vs Docker")
    ax1.set_xlabel("Docker median / try median")
    ax1.set_yticks(y_positions)
    ax1.set_yticklabels(labels, fontsize=8)
    ax1.invert_yaxis()

    ax2.barh(y_positions, vs_vanilla, color="#F58518")
    ax2.set_title("Try Overhead vs Vanilla")
    ax2.set_xlabel("try median / vanilla median")
    ax2.set_yticks(y_positions)
    ax2.set_yticklabels(labels, fontsize=8)

    for axis in (ax1, ax2):
        axis.grid(axis="x", alpha=0.3)

    fig.tight_layout()
    fig.savefig(output, dpi=200, bbox_inches="tight")
    plt.close(fig)
    return output


def parse_time_log(path: Path) -> list[tuple[float, str]]:
    events: list[tuple[float, str]] = []
    for line in path.read_text().splitlines():
        parts = line.strip().split(" ", 1)
        if len(parts) != 2:
            continue
        try:
            timestamp = float(parts[0])
        except ValueError:
            continue
        events.append((timestamp, parts[1]))
    return events


def micro_stage(event_label: str) -> str | None:
    startup_labels = {
        "Entrypoint",
        "Finish Parseopt",
        "Start of try()",
        "seting try shell",
        "Determining sandboxdir",
        "Docker handling",
        "Enumerating direcotories to mount",
        "EnumDir: find",
        "EnumDir: sort",
        "EnumDir: ExclDir",
        "EnumDir: MultiLowerDir",
    }
    mkdirs_labels = {
        "Making upperdir, workdir, temproot",
        "Prepare sandboxes before unshare",
        "set temproot permission",
        "Writing tempfiles",
        "Disable job control",
        "starting mapper",
    }
    enter_ns_labels = {
        "Outer unshare",
        "triggering mapper",
        "waiting on mapper",
        "mapper: pgrep",
        "mapper: calling mapper bin",
        "mapper: finish",
        "Union helper detection",
    }
    mount_devs_labels = {"Mounting devices", "Inner unshare", "Mounting Inner Proc"}
    exit_ns_labels = {"Exitting inner unshare", "Symlinks cleanup"}
    if event_label in startup_labels:
        return "startup"
    if event_label in mkdirs_labels:
        return "mkdirs"
    if event_label in enter_ns_labels:
        return "enter_ns"
    if event_label == "Mounting overlays":
        return "overlay"
    if event_label in mount_devs_labels:
        return "mount_devs"
    if event_label == "executing final script":
        return "exe"
    if event_label == "unmounting devices":
        return "unmount_devs"
    if event_label in exit_ns_labels:
        return "exit_ns"
    if event_label.startswith("Commit:"):
        return "commit"
    return None


def summarize_micro_logs(times_dir: Path) -> dict[str, dict[str, float]]:
    grouped: dict[str, dict[str, list[float]]] = defaultdict(lambda: defaultdict(list))
    for path in sorted(times_dir.iterdir()):
        if not path.is_file():
            continue
        matched = False
        for token, paper_name in MICRO_NAME_MAP.items():
            if token in path.name:
                matched = True
                events = parse_time_log(path)
                for (ts, label), (next_ts, _) in zip(events, events[1:]):
                    stage = micro_stage(label)
                    if stage is None:
                        continue
                    grouped[paper_name][stage].append(max(0.0, next_ts - ts))
                break
        if not matched:
            continue

    summary: dict[str, dict[str, float]] = {}
    for benchmark, stages in grouped.items():
        summary[benchmark] = {
            stage: statistics.median(values) for stage, values in stages.items() if values
        }
    return summary


def write_micro_breakdown_csv(summary: dict[str, dict[str, float]], out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    output = out_dir / "micro_breakdown.csv"
    stages = [
        "startup",
        "mkdirs",
        "enter_ns",
        "overlay",
        "mount_devs",
        "exe",
        "unmount_devs",
        "exit_ns",
        "commit",
    ]
    with output.open("w", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["benchmark", *stages, "total"])
        for benchmark in ("echo", "rustup", "big_file"):
            row = summary.get(benchmark, {})
            total = sum(row.get(stage, 0.0) for stage in stages)
            writer.writerow([benchmark, *[f"{row.get(stage, 0.0):.6f}" for stage in stages], f"{total:.6f}"])
    return output


def plot_micro_breakdown(summary: dict[str, dict[str, float]], out_dir: Path) -> Path:
    plt = load_pyplot()

    out_dir.mkdir(parents=True, exist_ok=True)
    output = out_dir / "micro_breakdown.png"
    benchmarks = ["echo", "rustup", "big_file"]
    stages = [
        "startup",
        "mkdirs",
        "enter_ns",
        "overlay",
        "mount_devs",
        "exe",
        "unmount_devs",
        "exit_ns",
        "commit",
    ]
    colors = [
        "#4C78A8",
        "#F58518",
        "#E45756",
        "#72B7B2",
        "#54A24B",
        "#EECA3B",
        "#B279A2",
        "#FF9DA6",
        "#9D755D",
    ]

    fig, ax = plt.subplots(figsize=(10, 6))
    bottoms = [0.0] * len(benchmarks)
    x_positions = list(range(len(benchmarks)))
    for stage, color in zip(stages, colors):
        values = []
        for benchmark in benchmarks:
            total = sum(summary.get(benchmark, {}).values())
            value = summary.get(benchmark, {}).get(stage, 0.0)
            values.append((value / total) if total else 0.0)
        ax.bar(x_positions, values, bottom=bottoms, label=stage, color=color)
        bottoms = [bottom + value for bottom, value in zip(bottoms, values)]

    ax.set_xticks(x_positions)
    ax.set_xticklabels(benchmarks)
    ax.set_ylabel("Fraction of try runtime")
    ax.set_title("Approximate Figure 3 Breakdown from try-timed Logs")
    ax.legend(loc="upper right", ncol=2, fontsize=8)
    ax.set_ylim(0, 1.0)
    fig.tight_layout()
    fig.savefig(output, dpi=200, bbox_inches="tight")
    plt.close(fig)
    return output


def cmd_summarize(args: argparse.Namespace) -> int:
    rows = load_table2_rows(args.results_root)
    csv_path, md_path = write_table2_summary(rows, args.output_dir)
    print(f"[ok] wrote {csv_path}")
    print(f"[ok] wrote {md_path}")
    if args.plot:
        plot_path = plot_table2(rows, args.output_dir)
        print(f"[ok] wrote {plot_path}")
    return 0


def cmd_plot_micro(args: argparse.Namespace) -> int:
    summary = summarize_micro_logs(args.times_dir)
    csv_path = write_micro_breakdown_csv(summary, args.output_dir)
    print(f"[ok] wrote {csv_path}")
    if args.plot:
        plot_path = plot_micro_breakdown(summary, args.output_dir)
        print(f"[ok] wrote {plot_path}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Unified interface for reproducing and summarizing the paper evaluation.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_parser = subparsers.add_parser("list", help="List evaluation groups and the commands used to run them.")
    list_parser.set_defaults(handler=lambda args: (list_evaluations(), 0)[1])

    run_parser = subparsers.add_parser("run", help="Run one evaluation group or all groups.")
    run_parser.add_argument(
        "group",
        choices=[*EVALUATIONS.keys(), "all"],
        help="Evaluation group to run.",
    )
    run_parser.add_argument("--dry-run", action="store_true", help="Print commands without executing them.")
    run_parser.set_defaults(handler=lambda args: (run_evaluations([args.group], args.dry_run), 0)[1])

    summary_parser = subparsers.add_parser("summarize", help="Generate a paper-style Table 2 summary from CSV results.")
    summary_parser.add_argument(
        "--results-root",
        type=Path,
        default=DEFAULT_RESULTS_ROOT,
        help=f"Root directory containing benchmark result CSVs. Default: {DEFAULT_RESULTS_ROOT}",
    )
    summary_parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for generated summaries. Default: {DEFAULT_OUTPUT_DIR}",
    )
    summary_parser.add_argument("--plot", action="store_true", help="Also generate a table-ratio plot PNG.")
    summary_parser.set_defaults(handler=cmd_summarize)

    micro_parser = subparsers.add_parser("plot-micro", help="Generate a Figure 3-style microbenchmark breakdown.")
    micro_parser.add_argument(
        "--times-dir",
        type=Path,
        default=ROOT / "benchmarks" / "micro_benchmarks" / "times",
        help="Directory containing try-timed event logs.",
    )
    micro_parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for generated microbenchmark artifacts. Default: {DEFAULT_OUTPUT_DIR}",
    )
    micro_parser.add_argument("--plot", action="store_true", help="Also generate a micro-breakdown PNG.")
    micro_parser.set_defaults(handler=cmd_plot_micro)

    report_parser = subparsers.add_parser(
        "report",
        help="Generate the paper-style table summary and the microbenchmark breakdown plot together.",
    )
    report_parser.add_argument(
        "--results-root",
        type=Path,
        default=DEFAULT_RESULTS_ROOT,
        help=f"Root directory containing benchmark result CSVs. Default: {DEFAULT_RESULTS_ROOT}",
    )
    report_parser.add_argument(
        "--times-dir",
        type=Path,
        default=ROOT / "benchmarks" / "micro_benchmarks" / "times",
        help="Directory containing try-timed event logs.",
    )
    report_parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for generated artifacts. Default: {DEFAULT_OUTPUT_DIR}",
    )

    def handle_report(args: argparse.Namespace) -> int:
        cmd_summarize(
            argparse.Namespace(
                results_root=args.results_root,
                output_dir=args.output_dir,
                plot=True,
            )
        )
        cmd_plot_micro(
            argparse.Namespace(
                times_dir=args.times_dir,
                output_dir=args.output_dir,
                plot=True,
            )
        )
        return 0

    report_parser.set_defaults(handler=handle_report)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.handler(args))
    except RuntimeError as exc:
        print(f"[error] {exc}", file=sys.stderr)
        return 1
    except subprocess.CalledProcessError as exc:
        print(f"[error] command failed with exit code {exc.returncode}: {' '.join(exc.cmd)}", file=sys.stderr)
        return exc.returncode


if __name__ == "__main__":
    raise SystemExit(main())
