#!/usr/bin/env python3

import os
import json
import sys
from enum import Enum

class Parallelizability(Enum):
    S = "stateless"
    P = "pure"
    N = "non-pure"
    E = "side-effectful"

    def __gt__(self, other):
        if other is self:
            return False
        else:
            return self >= other

    def __ge__(self, other):
        match self:
            case Parallelizability.S:
                return True
            case Parallelizability.P:
                return other is not Parallelizability.S
            case Parallelizability.N:
                return other is self or other is Parallelizability.E
            case Parallelizability.E:
                return other is self



def aggregate_invocations(data):
    """
    Aggregate invocations with the same operands.
    If a dictionary contains 'predicate' with 'operands', group them by operands.
    """
    aggregated = {}
    default_case = None
    for case in data["cases"]:
        if case["predicate"] == "default":
            default_case = case
        if "predicate" in case and isinstance(case["predicate"], dict):
            operands = tuple(case["predicate"].get("operands", []))
            if operands not in aggregated:
                aggregated[operands] = []
            aggregated[operands].append(case)
    
    # Convert the aggregation back to a list
    aggregated_cases = []
    for operands, cases in aggregated.items():
        # Find the minimum class
        parallelizability_class = min([Parallelizability(case['class']) for case in cases])
        # Combine all matching cases into one
        combined_case = cases[0].copy()
        combined_case['class'] = parallelizability_class.value
        # combined_case["aggregated_cases"] = cases
        aggregated_cases.append(combined_case)
    if default_case:
        aggregated_cases.append(default_case)
    return aggregated_cases


def update_json_files(directory, file):
    """
    Iterate through all JSON files in the given directory,
    replace "pclass" with "class", and update "non-parallelizable-pure" to "non-pure".
    """
    if file:
        files = [file]
    else:
        files = os.listdir(directory)

    for filename in files:
        if filename.endswith('.json'):
            filepath = os.path.join(directory, filename)
            
            # Open and load the JSON file
            with open(filepath, 'r') as file:
                try:
                    data = json.load(file)
                except json.JSONDecodeError:
                    print(f"Skipping invalid JSON file: {filename}")
                    continue
            
            # Update "pclass" to "class" and replace "non-parallelizable-pure" with "non-pure"
            updated_data = update_json_structure(data)
            aggregated_cases = aggregate_invocations(updated_data)
            updated_data["cases"] = aggregated_cases
            
            # Save the updated JSON back to the file
            with open(filepath, 'w') as file:
                json.dump(updated_data, file, indent=2)
            print(f"Updated: {filename}")

def update_json_structure(data):
    """
    Recursively update the JSON structure, replacing "pclass" with "class"
    and changing "non-parallelizable-pure" to "non-pure".
    """
    if isinstance(data, dict):
        updated_data = {}
        for key, value in data.items():
            # Replace "pclass" with "class"
            new_key = "class" if key == "pclass" else key
            
            # Recursively update the value
            updated_data[new_key] = update_json_structure(value)
            
            # Replace "non-parallelizable-pure" with "non-pure"
            if new_key == "class" and updated_data[new_key] == "nonparallelizable pure":
                updated_data[new_key] = "non-pure"
        return updated_data
    
    elif isinstance(data, list):
        # Update each item in the list
        return [update_json_structure(item) for item in data]

    # Merge invocations together
    return data

# Replace 'your_directory_path' with the path to your directory containing JSON files
directory_path = '.'
file = sys.argv[1] if len(sys.argv) > 1 else None
update_json_files(directory_path, file)
