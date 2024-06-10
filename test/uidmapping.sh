#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

control=$(id -un)
testing=$(sudo "$TRY" -D "$(mktemp -d)" -u "$USER" id -un)

if [ "$control" = "$testing" ]
then
    exit 0
else
    exit 1
fi
