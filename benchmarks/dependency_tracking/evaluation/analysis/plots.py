import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import matplotlib
from matplotlib.patches import Patch
import argparse
import os
import seaborn as sns

BENCHMARKS = [
    "beginner",
    "covid",
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

sysname = "SaSh"
figsize = (7, 4)
color_scheme = ["#AA4465", "#FFA69E", "#998650", "#93E1D8"]

figure, axes = plt.subplots(figsize=figsize)

def plot_speedup_ridgeline(output_path="speedup_ridgeline.pdf"):
    sns.set_theme(style="white", rc={"axes.facecolor": (0, 0, 0, 0)})

    all_data = []
    for benchmark in BENCHMARKS:
        df = pd.read_csv(f"../results/{benchmark}-time.csv")

        # Separate and align by order — assume same order of scripts for bash and incr
        bash_df = df[df["mode"] == "bash"].reset_index(drop=True)
        incr_df = df[df["mode"] == "incr"].reset_index(drop=True)

        # Sanity check: ensure lengths match
        num_iters = min(len(bash_df), len(incr_df))
        bash_df = bash_df.iloc[:num_iters]
        incr_df = incr_df.iloc[:num_iters]

        # Build combined dataframe
        data = pd.DataFrame({
            "iteration": range(1, num_iters + 1),
            "bash_time": bash_df["time_sec"].values,
            "incr_time": incr_df["time_sec"].values,
            "benchmark": benchmark
        })
        data["speedup"] = data["bash_time"] / data["incr_time"]
        all_data.append(data)

    data = pd.concat(all_data, ignore_index=True)

    # Ridgeline plot config
    pal = sns.cubehelix_palette(len(data["iteration"].unique()), rot=-0.25, light=0.7)
    g = sns.FacetGrid(
        data,
        row="iteration",
        hue="iteration",
        aspect=8,
        height=0.6,
        palette=pal
    )

    # KDE curves
    g.map(
        sns.kdeplot,
        "speedup",
        fill=True,
        alpha=0.7,
        linewidth=1.2,
    )
    g.map(plt.axhline, y=0, lw=1, clip_on=False)

    # Label each iteration on its ridge
    def label(x, color, label):
        ax = plt.gca()
        ax.text(0, 0.2, f"Iter {label}", fontweight="bold",
                color=color, ha="left", va="center", fontsize=9)

    g.map(label, "speedup")

    # Clean aesthetics
    g.figure.subplots_adjust(hspace=-0.4)
    g.set_titles("")
    g.set(yticks=[], ylabel="")
    g.set_xlabels("Speedup (bash / incremental)")
    g.despine(bottom=True, left=True)

    plt.savefig(output_path, bbox_inches="tight", dpi=300, format="pdf")
    plt.close()


def plot_runtime(output_path):

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
    axes.set_title(None)

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
    plt.savefig(output_path, format="pdf")



def plot_speedup_pdf(output_path="speedup_pdf_all.pdf"):
    sns.set_theme(
        style="white",
        rc={
            "axes.facecolor": "white",
            "axes.edgecolor": "0.7",
            "axes.linewidth": 0.8,
            "font.family": "serif",
        },
    )

    all_data = []
    for benchmark in BENCHMARKS:
        df = pd.read_csv(f"../results/{benchmark}-time.csv")

        # Align bash/incr by order (iteration index = row order)
        bash_df = df[df["mode"] == "bash"].reset_index(drop=True)
        incr_df = df[df["mode"] == "incr"].reset_index(drop=True)
        num_iters = min(len(bash_df), len(incr_df))

        # Compute speedups
        speedup = bash_df["time_sec"].iloc[:num_iters].values / incr_df["time_sec"].iloc[:num_iters].values
        tmp = pd.DataFrame({"benchmark": benchmark, "speedup": speedup})
        all_data.append(tmp)

    data = pd.concat(all_data, ignore_index=True)

    # Create a single combined PDF plot
    plt.figure(figsize=(6, 3.5))
    palette = sns.color_palette("mako", len(BENCHMARKS))

    for i, benchmark in enumerate(BENCHMARKS):
        subset = data[data["benchmark"] == benchmark]
        sns.kdeplot(
            subset["speedup"],
            fill=True,
            alpha=0.3,
            lw=1.8,
            color=palette[i],
            label=benchmark,
            bw_adjust=0.7,
        )

    # Baseline at speedup = 1
    plt.axvline(1.0, color="0.4", linestyle="--", linewidth=1)

    # Labels & aesthetics
    plt.xlabel("Speedup (bash / incremental)", fontsize=11)
    plt.ylabel("Density", fontsize=11)
    plt.title("Speedup Distributions Across Benchmarks", fontsize=12, fontweight="bold", pad=8)
    plt.legend(frameon=False, fontsize=9, loc="upper right")

    plt.grid(True, linestyle="--", alpha=0.2)
    sns.despine(left=False, bottom=False)
    plt.tight_layout(pad=0.6)
    plt.savefig(output_path, bbox_inches="tight", dpi=300, format="pdf")
    plt.close()

def plot_speedup_dots(output_path="speedup_dots.pdf"):
    sns.set_theme(
        style="white",
        rc={
            "axes.facecolor": "white",
            "axes.edgecolor": "0.7",
            "axes.linewidth": 0.8,
            "font.family": "serif",
        },
    )

    all_data = []
    for benchmark in BENCHMARKS:
        df = pd.read_csv(f"../results/{benchmark}-time.csv")
        bash_df = df[df["mode"] == "bash"].reset_index(drop=True)
        incr_df = df[df["mode"] == "incr"].reset_index(drop=True)
        num_iters = min(len(bash_df), len(incr_df))

        speedup = bash_df["time_sec"].iloc[:num_iters].values / incr_df["time_sec"].iloc[:num_iters].values
        iters = np.arange(1, num_iters + 1)

        tmp = pd.DataFrame({
            "benchmark": benchmark,
            "iteration": iters,
            "speedup": speedup
        })
        all_data.append(tmp)

    data = pd.concat(all_data, ignore_index=True)

    # Create scatter plot
    plt.figure(figsize=(7, 3.5))
    palette = sns.color_palette("mako", len(BENCHMARKS))

    for i, benchmark in enumerate(BENCHMARKS):
        subset = data[data["benchmark"] == benchmark]
        plt.scatter(
            subset["iteration"],
            subset["speedup"],
            s=40,
            label=benchmark,
            color=palette[i],
            alpha=0.8,
            edgecolor="0.25",
            linewidth=0.6
        )

        # Label iteration numbers directly on dots
        for _, row in subset.iterrows():
            plt.text(
                row["iteration"],
                row["speedup"],
                str(int(row["iteration"])),
                fontsize=7,
                color="black",
                ha="center",
                va="center",
                weight="bold"
            )

    # Baseline and styling
    plt.axhline(1.0, color="0.5", linestyle="--", linewidth=1.0)
    plt.xlabel("Iteration index", fontsize=11)
    plt.ylabel("Speedup (bash / incremental)", fontsize=11)
    plt.title("Per-iteration Speedup Across Benchmarks", fontsize=12, fontweight="bold", pad=8)
    plt.legend(frameon=False, fontsize=9, loc="upper right")
    plt.grid(True, linestyle="--", alpha=0.25)
    sns.despine()
    plt.tight_layout(pad=0.6)
    plt.savefig(output_path, bbox_inches="tight", dpi=300, format="pdf")
    plt.close()

def plot_stacked_runtime_grid(output_path="stacked_runtime_grid.pdf"):
    sns.set_theme(
        style="white",
        rc={
            "axes.facecolor": "white",
            "grid.color": "0.92",
            "axes.edgecolor": "0.8",
            "axes.linewidth": 0.8,
            "font.family": "serif",
        },
    )

    n_bench = len(BENCHMARKS)
    n_cols = min(3, n_bench)
    n_rows = (n_bench + n_cols - 1) // n_cols

    fig, axes = plt.subplots(
        n_rows, n_cols,
        figsize=(4.0 * n_cols, 1.6 * n_rows),
        squeeze=False,
        sharex=True, sharey=False
    )

    cmap = sns.color_palette("viridis", 10)

    # Track global x-limit to share across subplots
    global_xmax = 0

    for idx, benchmark in enumerate(BENCHMARKS):
        df = pd.read_csv(f"../results/{benchmark}-time.csv")
        bash_df = df[df["mode"] == "bash"].reset_index(drop=True)
        incr_df = df[df["mode"] == "incr"].reset_index(drop=True)
        num_iters = min(len(bash_df), len(incr_df))

        bash_times = bash_df["time_sec"].iloc[:num_iters].values
        incr_times = incr_df["time_sec"].iloc[:num_iters].values

        r, c = divmod(idx, n_cols)
        ax = axes[r, c]

        # Very thin bars and minimal spacing
        height = 0.15
        y_bash, y_incr = 0.15, -0.15
        colors = [cmap[j % len(cmap)] for j in range(num_iters)]

        bash_bottom, incr_bottom = 0, 0
        for j in range(num_iters):
            ax.barh(
                y_bash, bash_times[j],
                height=height,
                left=bash_bottom,
                color=colors[j],
                edgecolor="0.25",
                linewidth=0.5,
                alpha=0.9
            )
            ax.barh(
                y_incr, incr_times[j],
                height=height,
                left=incr_bottom,
                color=colors[j],
                edgecolor="0.25",
                linewidth=0.5,
                alpha=0.9
            )
            bash_bottom += bash_times[j]
            incr_bottom += incr_times[j]

        # Annotations
        ax.text(
            bash_bottom, y_bash, f"{bash_bottom:.1f}s",
            va="center", ha="left", fontsize=7, color="0.25"
        )
        ax.text(
            incr_bottom, y_incr, f"{incr_bottom:.1f}s",
            va="center", ha="left", fontsize=7, color="0.25"
        )

        # Aesthetics
        ax.set_title(benchmark, fontsize=10, fontweight="bold", pad=2)
        ax.set_yticks([y_bash, y_incr])
        ax.set_yticklabels(["bash", "incr"], fontsize=8)
        ax.grid(True, axis="x", linestyle="--", alpha=0.35)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.spines["left"].set_visible(False)
        ax.tick_params(axis="x", labelsize=8)
        ax.tick_params(axis="y", length=0)

        xmax = max(bash_bottom, incr_bottom)
        global_xmax = max(global_xmax, xmax)
        ax.set_xlim(0, xmax * 1.1)

        # Hide x labels except for the bottom row
        if r < n_rows - 1:
            ax.set_xlabel("")
            ax.set_xticklabels([])
        else:
            ax.set_xlabel("Cumulative runtime (s)", fontsize=9, labelpad=4)

    # Apply shared x-limit for consistency
    for ax_row in axes:
        for ax in ax_row:
            ax.set_xlim(0, global_xmax * 1.1)

    # Remove unused panels
    total_subplots = n_rows * n_cols
    for j in range(len(BENCHMARKS), total_subplots):
        r, c = divmod(j, n_cols)
        fig.delaxes(axes[r, c])

    # Very compact layout
    plt.tight_layout(pad=0.4, w_pad=0.25, h_pad=0.15)
    plt.savefig(output_path, bbox_inches="tight", dpi=300, format="pdf")
    plt.close()

def plot_program_change_graph(output_path="program_change_graphs.pdf"):
    sns.set_theme(style="white", font="serif")

    # Placeholder categories
    node_types = ["I/O change", "control-flow", "refactor", "misc"]
    arrow_reasons = ["bug fix", "feature", "performance", "cleanup"]

    node_colors = sns.color_palette("Set2", len(node_types))
    edge_colors = sns.color_palette("Dark2", len(arrow_reasons))

    # Mapping placeholders
    node_color_map = {t: node_colors[i] for i, t in enumerate(node_types)}
    edge_color_map = {r: edge_colors[i] for i, r in enumerate(arrow_reasons)}

    n_bench = len(BENCHMARKS)
    n_cols = min(3, n_bench)
    n_rows = (n_bench + n_cols - 1) // n_cols

    fig, axes = plt.subplots(
        n_rows, n_cols,
        figsize=(4.5 * n_cols, 3.0 * n_rows),
        squeeze=False,
    )

    for idx, benchmark in enumerate(BENCHMARKS):
        # For now, just generate placeholder graph (chain of N versions)
        num_versions = 6  # ← change to actual number of versions later
        G = nx.DiGraph()

        # Create nodes with dummy types
        for i in range(1, num_versions + 1):
            node_type = node_types[i % len(node_types)]
            G.add_node(i, label=f"v{i}", type=node_type)

        # Create edges with dummy reasons
        for i in range(1, num_versions):
            reason = arrow_reasons[i % len(arrow_reasons)]
            G.add_edge(i, i + 1, reason=reason)

        # Layout: simple horizontal chain layout
        pos = {i: (i, 0) for i in range(1, num_versions + 1)}

        r, c = divmod(idx, n_cols)
        ax = axes[r, c]

        # Draw edges (arrows)
        for (u, v, d) in G.edges(data=True):
            reason = d["reason"]
            color = edge_color_map.get(reason, "gray")
            nx.draw_networkx_edges(
                G, pos,
                edgelist=[(u, v)],
                edge_color=color,
                arrowstyle="-|>",
                arrowsize=10,
                ax=ax,
                width=1.8,
                connectionstyle="arc3,rad=0.0",
            )

        # Draw nodes
        node_colors_used = [node_color_map[G.nodes[n]["type"]] for n in G.nodes()]
        nx.draw_networkx_nodes(
            G, pos,
            node_color=node_colors_used,
            node_size=500,
            edgecolors="black",
            linewidths=0.6,
            ax=ax,
        )

        # Draw labels (version numbers)
        nx.draw_networkx_labels(
            G, pos,
            labels={n: G.nodes[n]["label"] for n in G.nodes()},
            font_size=9,
            font_weight="bold",
            ax=ax,
        )

        # Titles and styling
        ax.set_title(benchmark, fontsize=11, fontweight="bold", pad=6)
        ax.axis("off")

    # Remove unused panels
    for j in range(idx + 1, n_rows * n_cols):
        r, c = divmod(j, n_cols)
        fig.delaxes(axes[r, c])

    plt.tight_layout(pad=1.0, w_pad=0.4, h_pad=0.4)
    plt.savefig(output_path, bbox_inches="tight", dpi=300, format="pdf")
    plt.close()

def main():
    parser = argparse.ArgumentParser(
        description="Create plots"
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        help="Directory to save plots",
        default="plots",
    )
    args = parser.parse_args()

    # Ensure the output directory exists
    os.makedirs(args.output_dir, exist_ok=True)

    plt.rcParams.update({
        #"text.usetex": True, # doesnt work in container
        "font.family": "serif",
        #"font.serif": ["Times New Roman"], # doesnt work in container
        "font.size": 12,
    })

    plot_runtime(os.path.join(args.output_dir, "runtime.pdf"))
    plot_speedup_ridgeline(os.path.join(args.output_dir, "speedup_ridgeline.pdf"))
    plot_speedup_pdf(os.path.join(args.output_dir, "speedup_grid.pdf"))
    plot_stacked_runtime_grid(os.path.join(args.output_dir, "absolute_time_bars.pdf"))
    plot_speedup_dots(os.path.join(args.output_dir, "speedup_dots.pdf"))
    plot_program_change_graph(os.path.join(args.output_dir, "program_change_graphs.pdf"))

if __name__ == "__main__":
    main()
