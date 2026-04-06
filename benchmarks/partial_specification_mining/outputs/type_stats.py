import sys
import math
from collections import defaultdict
import glob
from collections import Counter
import re
import json

def main():
    type_counter = Counter()
    type_occurrences = defaultdict(set)
    syntax_files = glob.glob(f"{sys.argv[1]}/*.py")


    # Regex pattern to match object initialization starting with a capital letter
    pattern = re.compile(r'\b([A-Z][a-zA-Z0-9_]*)\s*\(')

    for file in syntax_files:
        with open(file, "r") as syntax_file:
            contents = syntax_file.readlines()

            # Go through each line to match the pattern
            for line in contents:
                matches = pattern.findall(line)
                for match in matches:
                    type_counter[match] += 1
                    type_occurrences[match].add(file)


    type_counter = dict(sorted(type_counter.items(), key=lambda item: item[1], reverse=True))
    type_occurrences_len = { t: len(files) for t, files in type_occurrences.items() }

    # Print the type statistics
    print(json.dumps(type_counter, indent=2))
    print(json.dumps(type_occurrences_len, indent=2))

    # Total number of files
    total_files = len(syntax_files)

  # Calculate total occurrences and distinct file counts
    type_stats = {type_name: {"count": 0, "files": len(files)} for type_name, files in type_occurrences.items()}
    for type_name, files in type_occurrences.items():
        type_stats[type_name]["count"] = sum(
            1 for file in files for line in open(file, "r") if type_name in line
        )

    # Total number of files
    total_files = len(syntax_files)

    # Maximum count of any type for normalization
    max_count = max((stat["count"] for stat in type_stats.values()), default=1)

    # Calculate importance score
    importance_scores = {}
    for type_name, stats in type_stats.items():
        count = stats["count"]
        file_count = stats["files"]
        importance = (count / max_count) * math.log(1 + file_count)
        importance_scores[type_name] = importance

    # Sort by importance score
    importance_scores = dict(sorted(importance_scores.items(), key=lambda item: item[1], reverse=True))

    # Print the importance scores
    print(json.dumps(importance_scores, indent=2))

    # # Remove flag from counter
    type_counter.pop("Flag", None)
    importance_scores.pop("Flag", None)

    # Create a bar graph with the type statistics if there are any types found
    import matplotlib.pyplot as plt
    plt.figure(figsize=(10, 6))
    plt.bar(importance_scores.keys(), importance_scores.values())
    plt.xticks(rotation=90)
    plt.xlabel('Type')
    plt.ylabel('Count')
    plt.title('Type statistics')
    plt.tight_layout()
    plt.savefig('type_stats.png')
    print("Type statistics saved as type_stats.png")

if __name__ == '__main__':
    main()
