#!/usr/bin/env python3
import os
import difflib

def generate_diff(script1_path, script2_path):
    """Return a unified diff between two text files."""
    with open(script1_path, 'r') as f1, open(script2_path, 'r') as f2:
        lines1 = f1.readlines()
        lines2 = f2.readlines()

    diff = difflib.unified_diff(
        lines1,
        lines2,
        fromfile=os.path.basename(script1_path),
        tofile=os.path.basename(script2_path),
        lineterm=""
    )
    return "".join(diff)


def process_benchmarks(root_dir):
    """Traverse benchmarks, diff consecutive scripts, and print LaTeX output."""
    for benchmark in sorted(os.listdir(root_dir)):
        bench_path = os.path.join(root_dir, benchmark)
        scripts_path = os.path.join(bench_path, "scripts")
        if not os.path.isdir(scripts_path):
            continue

        scripts = sorted(
            [f for f in os.listdir(scripts_path) if (os.path.isfile(os.path.join(scripts_path, f)) and f.endswith('.sh'))]
        )
        if len(scripts) < 2:
            continue

        print(rf"\heading{{{benchmark}}}")
        for i in range(len(scripts) - 1):
            s1 = scripts[i]
            s2 = scripts[i + 1]
            path1 = os.path.join(scripts_path, s1)
            path2 = os.path.join(scripts_path, s2)

            diff_text = generate_diff(path1, path2)
            if not diff_text.strip():
                continue  # skip empty diffs

            print(r"\begin{minted}[fontsize=\small]{diff}")
            print(diff_text)
            print("\\end{minted}")
            print()  # blank line between diffs


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python generate_diffs.py <benchmarks_dir>")
        sys.exit(1)

    root_dir = sys.argv[1]
    process_benchmarks(root_dir)
