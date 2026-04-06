#!/bin/bash

incr_shell=${INCR_SHELL:-bash}

while getopts "c:" opt; do
    case "$opt" in
        c) cmd_str="$OPTARG" ;;
        *) echo "Usage: $0 [-c 'cmd'] <script> <cache_dir>" >&2; exit 1 ;;
    esac
done
shift $((OPTIND - 1))

if [ -n "$cmd_str" ]; then
    exec "$incr_shell" -c "$cmd_str" "$@"
fi

if [ $# -eq 0 ] && [ ! -t 0 ]; then
    # When no script is provided but stdin is piped, run an interactive shell on stdin.
    exec -a bash "$incr_shell" -s
fi

script=$1
cache_dir=/tmp/incr
mkdir -p "$cache_dir"

[ -z "$script" ] && echo "Usage: $0 <script>" && exit 1
[ -z "$cache_dir" ] && echo "Usage: $0 <script>" && exit 1

TOP=$(git rev-parse --show-toplevel)
TRY_PATH="$TOP/src/scripts/try.sh"
tmp_incr=$(mktemp "$(dirname $script)/incr_script_$(basename $script).XXXXXXXX.sh")
tmp_orig=$(mktemp)

# Ensure cleanup and preserve the right exit status.
rc=
cleanup() {
    # If we recorded the temp script's status, use it; otherwise use last command's.
    local st=${rc:-$?}
    # Restore the original script.
    cp "$tmp_orig" "$script"
    rm -f "$tmp_orig"
    rm -f "$tmp_incr"
    exit $st
}
trap cleanup EXIT INT TERM

python3 ${TOP}/src/scripts/insert.py --sys-path ${TOP}/target/release/incr --try $TRY_PATH --cache "$cache_dir" "$script" > "$tmp_incr"

# Swap the original script with the incrementalized one.
cp "$script" "$tmp_orig"
cp "$tmp_incr" "$script"

# $script now is $tmp_incr
$incr_shell "$script" 2>/dev/null
rc=$?
