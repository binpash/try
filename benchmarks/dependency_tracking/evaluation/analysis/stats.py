import pandas as pd

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

def overheads(data):
    # get the overhead for the first iteration of each benchmark (using incr and using bash in mode column)
    overhead_data = pd.DataFrame(columns=["benchmark", "overhead"])
    for benchmark in BENCHMARKS:
        bash_time = data[(data["benchmark"] == benchmark) & (data["mode"] == "bash")]["time_sec"].values[0]
        incr_time = data[(data["benchmark"] == benchmark) & (data["mode"] == "incr")]["time_sec"].values[0]
        # get the overhead percentage
        overhead = (incr_time / bash_time - 1) * 100
        slowdown = (overhead / 100) + 1
        overhead_data = pd.concat([overhead_data, pd.DataFrame({"benchmark": [benchmark], "overhead": [overhead], "slowdown": [slowdown]})])
    print(overhead_data)
    max_overhead = overhead_data["slowdown"].max()
    avg_overhead = overhead_data["slowdown"].mean()
    min_overhead = overhead_data["slowdown"].min()
    print(f"Max slowdown: {max_overhead:.2f}x")
    print(f"Avg slowdown: {avg_overhead:.2f}x")
    print(f"Min slowdown >1: {overhead_data[overhead_data['slowdown'] > 1]['slowdown'].min():.2f}x")

def speedups(data):
    # get the speedup for each iteration of each benchmark (using incr and using bash in mode column)
    speedup_data = pd.DataFrame(columns=["benchmark", "speedup"])
    for benchmark in BENCHMARKS:
        bash_times = data[(data["benchmark"] == benchmark) & (data["mode"] == "bash")]["time_sec"].values
        incr_times = data[(data["benchmark"] == benchmark) & (data["mode"] == "incr")]["time_sec"].values
        for bash_time, incr_time in zip(bash_times, incr_times):
            speedup = bash_time / incr_time
            speedup_data = pd.concat([speedup_data, pd.DataFrame({"benchmark": [benchmark], "speedup": [speedup]})])

    print(speedup_data)
    print(f"Max speedup: {speedup_data['speedup'].max():.2f}x")
    print(f"Avg speedup: {speedup_data['speedup'].mean():.2f}x")
    print(f"Min speedup larger than 1: {speedup_data[speedup_data['speedup'] > 1]['speedup'].min():.2f}x")

def main():

    all_benchmark_data = pd.DataFrame()
    for benchmark in BENCHMARKS:
        data = pd.read_csv(f"../results/{benchmark}-time.csv")
        data["benchmark"] = benchmark
        all_benchmark_data = pd.concat([all_benchmark_data, data])

    overheads(all_benchmark_data)
    speedups(all_benchmark_data)

if __name__ == "__main__":
    main()
