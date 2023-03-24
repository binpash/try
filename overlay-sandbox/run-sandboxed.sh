#!/bin/bash

# Usage: ./run-sandboxed.sh <script_to_execute>

# TODO: Use $PASH_TOP to specify directory locations

export script_to_execute=${1?Script to execute not given}

## Find the source code top directory
export PASH_SPEC_TOP=${PASH_SPEC_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}

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
# --pid: Create a new process namespace
#        KK: As far as I understand this is necessary so that 
#            procfs can be mounted and internal commands see it properly.
# --fork: Seems necessary if we do --pid
#        KK: Not sure why!
unshare --mount --map-root-user --user --pid --fork "${PASH_SPEC_TOP}/overlay-sandbox/mount-and-execute.sh" "${SANDBOX_DIR}" "${script_to_execute}"

## TODO: Instead of running this code here always, we need to run
##       it inside orch.py and essentially find the W dependencies
##       of each command (which should also in theory be given by Riker).
##
##       Then, we need to commit changes only if these write dependencies are
##       independent from: 
##       (1)  the readset of the main command that was run without
##            the sandbox (the first command in the workset)   
##       (2)  the writeset of the main command (actually if they are
##            the same, we could just make sure to commit them in order).

# We now commit at a later stage
# "${PASH_SPEC_TOP}/overlay-sandbox/commit-sandbox.sh" "${SANDBOX_DIR}"
