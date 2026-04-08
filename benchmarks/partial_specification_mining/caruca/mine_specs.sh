#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

mkdir -p save outputs
commands="${COMMANDS:-}"

if [ -n "$commands" ]; then
    files=()
    for cmd in $commands; do
        files+=("src/caruca/pash_syntax_specs/${cmd}.py")
    done
else
    files=(src/caruca/pash_syntax_specs/*.py)
fi

for file in "${files[@]}"; do
    cmd=$(basename "$file" .py)

    echo "Running command with argument $cmd"
    caruca trace --pash --stdin split --content split "$cmd"
    caruca annotate pash "$cmd" > save/"$cmd".json
done
