import os
import json

man_folder = "man"
ground_truth_folder = "ground-truth"

# read contents of ground-truth/acpid.json
with open(os.path.join(ground_truth_folder, "[.json")) as f:
    default = json.load(f)

for filename in os.listdir(man_folder):
    if filename.endswith(".txt"):
        json_filename = os.path.splitext(filename)[0] + ".json"
        json_filepath = os.path.join(ground_truth_folder, json_filename)
        with open(json_filepath, "w") as json_file:
            json.dump(default, json_file)
            