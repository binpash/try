#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

}

trap 'cleanup' EXIT

if ! [ -x "$TRY_TOP/utils/try-commit" ] || ! [ -x "$TRY_TOP/utils/try-parse-trace" ]
then
    echo "Skipping: try utilities are unavailable."
    exit 0
fi

if ! command -v strace >/dev/null 2>&1
then
    echo "Skipping: strace is unavailable."
    exit 0
fi

PATH="$TRY_TOP/utils:$PATH"
export PATH

try_workspace="$(mktemp -d "$TRY_TOP/test.trace_flag.XXXXXX")"
cd "$try_workspace" || exit 9

trace_file="$(mktemp "$try_workspace/trace.XXXXXX")"
rm "$trace_file"

"$TRY" -t "$trace_file" ls >/dev/null || exit 1

[ -f "$trace_file" ] || exit 2
grep -qx "#reads" "$trace_file" || exit 3
grep -qx "#writes" "$trace_file" || exit 4

trace_file_with_write="$(mktemp "$try_workspace/trace-write.XXXXXX")"
rm "$trace_file_with_write"

"$TRY" -y -t "$trace_file_with_write" "echo traced > traced.txt" || exit 5

[ -f traced.txt ] || exit 6
[ "$(cat traced.txt)" = "traced" ] || exit 7
[ -f "$trace_file_with_write" ] || exit 8
grep -qx "#reads" "$trace_file_with_write" || exit 9
grep -qx "#writes" "$trace_file_with_write" || exit 10
grep -qx "$try_workspace/traced.txt" "$trace_file_with_write" || exit 11
