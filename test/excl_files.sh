#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {
    cd ..

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

# try -E fails in /tmp on too many overlays
try_workspace="$(mktemp -d -p .)"

cd "$try_workspace" || exit 9

echo secret > hidden1
echo notsecret >  nonhidden2

! "$TRY" -n -E hidden1 cat hidden1 | grep secret
