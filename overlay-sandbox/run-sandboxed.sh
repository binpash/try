#!/bin/bash

# Usage: ./run-sandboxed.sh <sandbox_label> <script_to_execute>

# TODO: Use $PASH_TOP to specify directory locations

export pt="pash/temp/$1"
export start_dir="$PWD"

mkdir -p $pt/upperdir $pt/workdir $pt/temproot
ls / | xargs -I '{}' mkdir $pt/temproot/'{}' $pt/workdir/'{}' $pt/upperdir/'{}'

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
unshare --mount --map-root-user --user ./mount-and-execute.sh $2

changed_files=`find $PWD/$pt/upperdir/* -type f`

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
