#!/usr/bin/env python3

import re
import sys
from decimal import Decimal, ROUND_HALF_UP


PNG_LINE_PATTERN = re.compile(r'^"\S+\.png"(?:\s.+)?$')

FULL_LINE_PATTERN = re.compile(r'''
    ^"(?P<name>\S+\.png)"         # "pl-06-P_F-A_N-1.png"
    \s+(?P<x>\d+)\s+(?P<y>\d+)    # bbox x y
    \s+(?P<w>\d+)\s+(?P<h>\d+)    # bbox w h
    \s+(?P<label>\S+)             # label
    \s+(?P<score>[-+]?\d*\.\d+(?:[eE][-+]?\d+)?)$
''', re.VERBOSE)

ANSI_ESCAPE = re.compile(r'\x1B\[[0-?]*[ -/]*[@-~]')
BACKSPACE   = re.compile(r'\x08')

def round_score(line: str, decimals: int = 2) -> str:

    m = FULL_LINE_PATTERN.match(line)
    if not m:
        return line
    gd = m.groupdict()
    score = Decimal(gd['score']).quantize(
        Decimal('1.' + '0' * decimals),
        rounding=ROUND_HALF_UP
    )
    return (f"\"{gd['name']}\" {gd['x']} {gd['y']} {gd['w']} {gd['h']} "
            f"{gd['label']} {score:.{decimals}f}")

def clean_output_file(input_path: str, output_path: str, decimals: int = 2) -> None:
    with open(input_path, 'r', encoding='utf-8', errors='ignore') as infile, \
         open(output_path, 'w', encoding='utf-8', newline='\n') as outfile:
        for raw in infile:
            line = ANSI_ESCAPE.sub('', raw)
            line = BACKSPACE.sub('', line).strip()

            if PNG_LINE_PATTERN.match(line):
                outfile.write(round_score(line, decimals) + '\n')

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python clean_output.py <input_file> <output_file>")
        sys.exit(1)

    clean_output_file(sys.argv[1], sys.argv[2])
