#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

control=$(id -Gn)
testing=$("$TRY" -D "$(mktemp -d)" id -Gn 2>/dev/null)

if [ "$control" = "$testing" ]
then
    exit 0
else
    exit 1
fi
