#!/bin/bash

# Usage: ./run-sandboxed.sh <script_to_execute>

# TODO: Use $PASH_TOP to specify directory locations

export script_to_execute=${1?Script to execute not given}

## Find the source code top directory
export PASH_SPEC_TOP=${PASH_SPEC_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}

## Generate a temporary directory to store the workfiles
mkdir -p /tmp/pash_spec
export SANDBOX_DIR="$(mktemp -d /tmp/pash_spec/sandbox_XXXXXXX)/"

export start_dir="$PWD"

echo "Overlay directory: ${SANDBOX_DIR}"

mkdir -p "${SANDBOX_DIR}/upperdir" "${SANDBOX_DIR}/workdir" "${SANDBOX_DIR}/temproot"
ls / | xargs -I '{}' mkdir "${SANDBOX_DIR}"/temproot/'{}' "${SANDBOX_DIR}"/workdir/'{}' "${SANDBOX_DIR}"/upperdir/'{}'

# Me overlay-mount each root directory separately 
# (instead of all at once) because some directories cannot be overlayed. 
# 
# TODO: we will need to fix this issue as we progress by e.g.
# managing to mount overlay on root

# --mount: mounting and unmounting filesystems will not affect the rest
#          of the system inside the unshare
# --map-root-user: map to the superuser UID and GID in
#                  the newly created user namespace.
# --user: The process will have a distinct set of UIDs, GIDs and
#         capabilities.
unshare --mount --map-root-user --user "${PASH_SPEC_TOP}/overlay-sandbox/mount-and-execute.sh" "${SANDBOX_DIR}" "${script_to_execute}"

changed_files=`find ${SANDBOX_DIR}/upperdir/* -type f`

if [ !  -z  "$changed_files"  ]; then
    echo "Changes detected in the following files:"
    echo "$changed_files"
    echo -n "Commit changes? [y/n]: "
    read commit
    # commit fails in directories the user does not has access
    # even though it ran successfully in unshare
    if [ "$commit" == "y" ]; then
        # attempt to copy each changed file in the current working directory
        # currently the cut command depends on the pash directory location
        # TODO: change it to do this dynamically based on $PASH_HOME location
        while IFS= read -r changed_file; do
                cp $changed_file `cut -d'/' -f8- $changed_file | sed 's/^/\//'`
        done <<< "$changed_files"
        echo "Changes commited"
    else
        echo "Changes not commited"
    fi
else
    echo "No changes detected"
fi
