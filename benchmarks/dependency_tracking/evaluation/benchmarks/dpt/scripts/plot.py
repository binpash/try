#!/usr/bin/env python3
import sys
import re
from collections import defaultdict
import matplotlib.pyplot as plt

if len(sys.argv) != 2:
    print(f"Usage: {sys.argv[0]} predictions.txt", file=sys.stderr)
    sys.exit(1)

path = sys.argv[1]

# Data containers
glyph_confidences = defaultdict(list)
image_data = []

# Expected line format: g: <glyph> c: <confidence> <image_path>
line_re = re.compile(r"g:\s*(\S+)\s+c:\s*([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)\s+(\S+)")

with open(path) as f:
    for line in f:
        m = line_re.search(line)
        if not m:
            continue
        glyph, conf, img = m.groups()
        conf = float(conf)
        glyph_confidences[glyph].append(conf)
        image_data.append((glyph, conf, img))

if not glyph_confidences:
    print("No valid lines found.", file=sys.stderr)
    sys.exit(1)

# --- Compute summary stats ---
glyphs = []
avg_confs = []
counts = []

for g, confs in glyph_confidences.items():
    glyphs.append(g)
    avg_confs.append(sum(confs) / len(confs))
    counts.append(len(confs))

glyphs, avg_confs, counts = zip(*sorted(zip(glyphs, avg_confs, counts), key=lambda x: x[1], reverse=True))

glyph_to_x = {g: i for i, g in enumerate(sorted(glyph_confidences.keys()))}
x_vals = [glyph_to_x[g] for g, _, _ in image_data]
y_vals = [c for _, c, _ in image_data]
labels = [img for _, _, img in image_data]

# --- Create stacked subplots ---
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), height_ratios=[1, 1.2])
fig.suptitle("Glyph Classification Confidence Overview", fontsize=14, weight='bold')

# --- Top: Average confidence per glyph ---
bars = ax1.bar(glyphs, avg_confs, color='steelblue')
ax1.set_ylabel("Average confidence")
ax1.set_ylim(0, 1.05)
for i, n in enumerate(counts):
    ax1.text(i, avg_confs[i] + 0.02, str(n), ha='center', fontsize=8)
ax1.set_title("Average confidence per glyph (with sample counts)")
ax1.grid(axis='y', linestyle=':', alpha=0.5)

# --- Bottom: Scatter plot of all image predictions ---
ax2.scatter(x_vals, y_vals, alpha=0.7, color='darkorange', edgecolors='none')
ax2.set_xticks(list(glyph_to_x.values()))
ax2.set_xticklabels(list(glyph_to_x.keys()))
ax2.set_xlabel("Glyph")
ax2.set_ylabel("Confidence")
ax2.set_title("Per-image confidence scatter")
ax2.set_ylim(0, 1.05)
ax2.grid(axis='y', linestyle=':', alpha=0.5)

# annotate a few points with image names to show variety
for i, (x, y, img) in enumerate(zip(x_vals, y_vals, labels)):
    if i % 3 == 0:  # annotate every 3rd point to avoid clutter
        ax2.text(x, y + 0.02, img, fontsize=6, rotation=45, alpha=0.7, ha='center')

plt.tight_layout(rect=[0, 0, 1, 0.97])
plt.show()
