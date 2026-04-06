import os
import json
import subprocess

# Path to the ground-truth folder
ground_truth_folder = "ground-truth"

# Path to the man folder
man_folder = "removed"

# Create the man folder if it doesn't already exist
os.makedirs(man_folder, exist_ok=True)

# Get the list of commands
cmd_files = os.listdir(ground_truth_folder)
commands = [os.path.splitext(f)[0] for f in cmd_files if f.endswith(".json")]


# Iterate over each command
for cmd in commands:
    # Construct the command to invoke
    full_cmd = f"busybox {cmd} --help"

    # Run the command and read the stdout only if exit code is 0
    result = subprocess.run(full_cmd, shell=True, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"Failed to run {cmd}")
        continue

    output = result.stderr

    # remove first line
    output = output[output.find("\n\n") + 2:]

    # add command name at the beginning
    output = f"{cmd}\n\n{output}"

    # Write the output to a file in the man folder
    output_file = os.path.join(man_folder, f"{cmd}.txt")
    with open(output_file, "w") as f:
        f.write(output)