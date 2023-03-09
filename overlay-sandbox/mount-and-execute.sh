#!/bin/bash

export SANDBOX_DIR=${1?No sandbox dir given}
export script_to_execute=${2?No script is given to execute}

## TODO: Figure out if we need these directories and if we do, we need to get them some other way than the overlay
ignore_directories="-e proc -e dev -e proj -e run -e sys -e snap -e swap.img"
ls / | grep -v ${ignore_directories} | xargs -I '{}' mount -t overlay overlay -o lowerdir=/'{}',upperdir="$SANDBOX_DIR"/upperdir/'{}',workdir="$SANDBOX_DIR"/workdir/'{}' "$SANDBOX_DIR"/temproot/'{}'

# TODO: use unshare instead of chroot
# Alternatively, have a look at this
# NOTE: installed version of unshare does not support --root option
chroot "$SANDBOX_DIR/temproot" /bin/bash -c "mount -t proc proc /proc && cd $start_dir && source ${script_to_execute}"

