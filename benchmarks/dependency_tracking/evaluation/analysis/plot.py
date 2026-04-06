import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import matplotlib
from matplotlib.patches import Patch

BENCHMARKS = [
    "beginner",
    "bio",
    "covid",
    "dpt",
    "file-mod",
    "image-annotation",
    "nginx-analysis",
    "nlp-ngrams",
    "nlp-uppercase",
    "poet",
    "spell",
    "unixfun",
    "weather",
    "word-freq",
]

figure, axes = plt.subplots(figsize=(10, 6))
axes.grid()

width = 0.35  # Bar width
all_colors = matplotlib.colormaps.get_cmap("tab10")

for i, benchmark in enumerate(BENCHMARKS):
    data = pd.read_csv(f"../results/{benchmark}-time.csv")

    # Get per-iteration times
    bash_times = data[data["mode"] == "bash"]["time_sec"].values
    incr_times = data[data["mode"] == "incr"]["time_sec"].values

    num_iters = min(len(bash_times), len(incr_times))
    colors = [all_colors(j % 10) for j in range(num_iters)]

    # X offset for this benchmark
    x_base = i * 3

    # Stack bash (left)
    bash_bottom = 0
    for j in range(num_iters):
        axes.bar(
            x_base - width / 2,
            bash_times[j],
            width,
            bottom=bash_bottom,
            color=colors[j],
            alpha=0.9,
            edgecolor="black",
            linewidth=0.8,
        )
        bash_bottom += bash_times[j]

    # Stack incr (right)
    incr_bottom = 0
    for j in range(num_iters):
        axes.bar(
            x_base + width / 2,
            incr_times[j],
            width,
            bottom=incr_bottom,
            color=colors[j],
            alpha=0.9,
            edgecolor="black",
            linewidth=0.8,
        )
        incr_bottom += incr_times[j]

# X-axis labels
axes.set_xticks([i * 3 for i in range(len(BENCHMARKS))])
axes.set_xticklabels(BENCHMARKS, rotation=30, ha="right")

axes.set_ylabel("Cumulative Time (s)")
axes.set_title("Benchmark Runtimes per Iteration (Stacked)")

# --- Legend setup ---
# Iteration colors
# get the max number of iterations across all benchmarks
num_iters = max(
    pd.read_csv(f"../results/{benchmark}-time.csv")["mode"].value_counts().max()
    for benchmark in BENCHMARKS
)
iter_patches = [
    Patch(facecolor=all_colors(i % 10), edgecolor="black", label=f"Iter {i+1}")
    for i in range(num_iters)
]

# Mode indicators
mode_patches = [
    Patch(facecolor="gray", label="bash (left)"),
    Patch(facecolor="lightgray", label="incr (right)")
]

# Combine legends (iteration colors + mode)
#legend1 = figure.legend(handles=iter_patches, title="Iteration", loc="upper right")
#figure.add_artist(legend1)  # Add iteration legend first
figure.legend(handles=mode_patches, title="Mode", loc="upper right")
figure.tight_layout()
figure.savefig("plot.png", bbox_inches="tight")
