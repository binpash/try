#!/bin/bash

export SANDBOX_DIR=${1?No sandbox dir given}

## Assumes that the sandbox dir is called upperdir
export upperdir=upperdir
## Note: We are ignoring changes in the rikerfiles
ignore_patterns="-e .rkr -e Rikerfile"
echo "Ignoring changes in: $ignore_patterns"
changed_files=`find ${SANDBOX_DIR}/${upperdir}/* -type f | grep -v ${ignore_patterns}`

if [ !  -z  "$changed_files"  ]; then
    echo "Changes detected in the following files:"
    echo "$changed_files"
    # echo -n "Commit changes? [y/n]: "
    
    ## TODO: Hardcoding always commit for now. Later 
    ##       we need to include this logic in the prototype.
    # read commit
    commit="y"

    # commit fails in directories the user does not has access
    # even though it ran successfully in unshare
    if [ "$commit" == "y" ]; then
        # attempt to copy each changed file in the current working directory
        while IFS= read -r changed_file; do
                # echo "Attempting to copy: $changed_file"
                # echo "  to ${changed_file#$SANDBOX_DIR/$upperdir}"
                ## TODO: Add error handling if cp failed
                cp "$changed_file" "${changed_file#$SANDBOX_DIR/$upperdir}"
        done <<< "$changed_files"
        echo "Changes commited"
    else
        echo "Changes not commited"
    fi
else
    echo "No changes detected"
fi
