import json
import sys


def decode_annotation(annotation):
    invocation = annotation["invocation"]
    arguments = {}
    for arg in invocation["args"]:
        arguments[arg["name"]] = {"idx": arg["idx"]}

    conditions = annotation["conditions"]
    for cond in conditions["preconditions"]:
        pass


def decode(s):
    raw_obj = json.loads(s)
    for annotation in raw_obj:
        if len(annotation["conditions"]) > 1:
            print(*annotation["conditions"], sep="\n")


if __name__ == "__main__":
    annotations = "".join(sys.stdin.readlines())
    print(annotations)
    decode(annotations)
