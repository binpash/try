#!/usr/bin/env python3

import datetime
import io
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np
import sys
import os
from pathlib import Path

import warnings
warnings.filterwarnings("ignore", message="No artists with labels found to put in legend.*")

plot_dir = os.getenv("plot_dir")
cntr = 0
def save_sofar(plt, filename):
    global cntr
    plt.legend(loc='upper left')
    plt.savefig(f"{plot_dir}/tmp/{cntr}_{filename}.png", bbox_inches='tight')
    out_dir = Path(f"{plot_dir}/tmp")
    out_dir.mkdir(parents=True, exist_ok=True)

    plt.legend(loc="upper left")
    plt.savefig(out_dir / f"{cntr}_{filename}.png", bbox_inches="tight")
    cntr += 1

# Read data from stdin
data = sys.stdin
year = sys.argv[1]
city = sys.argv[2]

# Transform data from string to datetime and float
to_dt = lambda x: datetime.datetime.strptime(f"{year}-{x}", "%Y-%m-%d")
data = [ line.strip().replace("\r", "") for line in data ]
data = [ (to_dt(date),
          float(_min),
          float(_max),
          float(normal_range_low),
          float(normal_range_high),
          float(temp),
          float(record_min),
          float(record_max)
          ) for date, _min, _max, normal_range_low, normal_range_high, temp, record_min, record_max in [ line.split() for line in data if line ] ]
data = { key: [ x for x in values ] for key, values in \
        zip(["date", "min", "max", "normal_min", "normal_max", "temp", "record_min", "record_max"], zip(*data)) }

# List of dates
dates = data["date"]
# Max temperature across all years
historic_max = data["max"]
# Min temperature across all years
historic_min = data["min"]
# Temperature for the year
temps = data["temp"]
# Normal range
normal_min = data["normal_min"]
normal_max = data["normal_max"]
# Historic max and min
record_max = data["record_max"]
record_min = data["record_min"]

# Plotting
plt.figure(figsize=(15, 5))

# Labels and titles
plt.title(f"{city} Temperature Records for {year}")
# Convert dates to months for x-axis
months = mdates.MonthLocator()  # every month
months_fmt = mdates.DateFormatter('%B')
midpoints = [(mdates.date2num(dates[i]) + mdates.date2num(dates[i+1])) / 2 
             for i in range(len(dates) - 1) if dates[i].month != dates[i+1].month]
midpoints.append((mdates.date2num(dates[-1]) + mdates.date2num(dates[-2])) / 2)
# Generate corresponding month names
month_names = [dates[i].strftime('%B') for i in range(len(dates) - 1) if dates[i].month != dates[i+1].month]
month_names.append(dates[-1].strftime('%B'))
plt.xticks(midpoints, month_names)


# Format the x-axis to show months
plt.gca().xaxis.set_major_locator(months)
plt.gca().xaxis.set_major_formatter(months_fmt)
plt.xlim([dates[0], dates[-1]])  # Start at the first date and end at the last date
plt.ylim(0, 100)

# Remove the top, left, and right spines (axes)
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().spines['left'].set_visible(False)

# Keep y-ticks visible but hide the y-axis spine
plt.gca().tick_params(axis='y', which='both', length=0)  # Keep y-ticks visible
plt.gca().yaxis.set_visible(True)  # Ensure y-ticks remain visible

save_sofar(plt, f"{year}_init")


# Plot the normal temperature range. This should be a line going from the minimum to the maximum temperature
for i in range(len(dates)):
    plt.plot([dates[i], dates[i]], [normal_min[i], normal_max[i]], color="black", alpha=0.6)

plt.plot([], [], color="black", alpha=0.7, label="Normal Range")
save_sofar(plt, f"{year}_normal_range")

# Plot the mimimum and maximum temperature range
for i in range(len(dates)):
    plt.plot([dates[i], dates[i]], [historic_min[i], historic_max[i]], color="tan", alpha=0.6)
plt.plot([], [], color="tan", alpha=0.6, label="Historical Min-Max Range")

save_sofar(plt, f"{year}_minmax_range")

# Plot given year's temperature
plt.plot(dates, temps, color="black")
plt.plot([], [], color="black", label=f"{year} temperature")


save_sofar(plt, f"{year}_temp")

# Draw the historic min and max as scatter points
plt.scatter(dates, record_max, color="red", alpha=0.6)
plt.scatter(dates, record_min, color="blue", alpha=0.6)
plt.scatter([], [], color="red", alpha=0.6, label="Historic Max")
plt.scatter([], [], color="blue", alpha=0.6, label="Historic Min")

save_sofar(plt, f"{year}_record")

save_sofar(plt, f"{year}_final")

buf = io.BytesIO()
plt.savefig(buf, format='png', bbox_inches='tight')
plt.close()
sys.stdout.buffer.write(buf.getvalue())
