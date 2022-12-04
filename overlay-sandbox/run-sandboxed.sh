#!/bin/bash

# Usage: ./run-sandboxed.sh <sandbox_label> <cmd_to_execute>

# TODO: Use $PASH_TOP to specify directory locations

export pt="pash/temp/$1"
export start_dir="$PWD"

echo "#!/bin/bash" > execute-cmd.sh
echo "$2" >> execute-cmd.sh

mkdir -p $pt/upperdir $pt/workdir $pt/temproot
ls / | xargs -I '{}' mkdir $pt/temproot/'{}' $pt/workdir/'{}' $pt/upperdir/'{}'

unshare -rmU ./mount-and-execute.sh


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

