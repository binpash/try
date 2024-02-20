#!/bin/sh
#
# checking that try works when mergerfs/unionfs are not present (but also not necessary)

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi

    if [ -d "$new_bin_dir" ]
    then
        rm -rf "$new_bin_dir"
    fi
}

trap 'cleanup' EXIT

# particularly important that we run in mktemp: in some test machines,
# the cwd is mounted, hence inaccessable.
try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9

new_bin_dir="$(mktemp -d)"
mkdir "$new_bin_dir/usr"
# -s makes symlinks
cp -rs /usr/bin "$new_bin_dir/usr/bin"

# Delete mergerfs and unionfs and set the new PATH to the temporary directory
rm -f "$new_bin_dir/usr/bin/mergerfs" 2>/dev/null
rm -f "$new_bin_dir/usr/bin/unionfs" 2>/dev/null

echo hi >expected
PATH="$new_bin_dir/usr/bin" "$TRY" -y "echo hi" >target 2>/dev/null || return 1
diff -q expected target || return 2
