#!/bin/bash
  
ls / | xargs -I '{}' mount -t overlay overlay -o lowerdir=/'{}',upperdir=$PWD/$pt/upperdir/'{}',workdir=$PWD/$pt/workdir/'{}' $PWD/$pt/temproot/'{}'

# TODO: use unshare instead of chroot
# Alternatively, have a look at this
# NOTE: installed version of unshare does not support --root option
chroot "$PWD/$pt/temproot" /bin/bash -c "cd $start_dir && source $2"

