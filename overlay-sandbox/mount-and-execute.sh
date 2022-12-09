#!/bin/bash

export SANDBOX_DIR=${1?No sandbox dir given}
export script_to_execute=${2?No script is given to execute}

ls / | grep -v "proc" | xargs -I '{}' mount -t overlay overlay -o lowerdir=/'{}',upperdir="$SANDBOX_DIR"/upperdir/'{}',workdir="$SANDBOX_DIR"/workdir/'{}' "$SANDBOX_DIR"/temproot/'{}'

# TODO: use unshare instead of chroot
# Alternatively, have a look at this
# NOTE: installed version of unshare does not support --root option
chroot "$SANDBOX_DIR/temproot" /bin/bash -c "mount -t proc proc /proc && cd $start_dir && source ${script_to_execute}"

