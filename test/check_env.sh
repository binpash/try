#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

cleanup() {

  if [ -f "$expected" ]; then
    rm "$expected"
  fi

  if [ -f "$out" ]; then
    rm "$out"
  fi

}

out="$(mktemp)"
expected="$(mktemp)"

echo "$OLDPWD" >"$expected"

# shellcheck disable=SC2016
"$TRY" 'echo "$TEMP_OLDPWD"' >"$out" || exit 1

if ! diff -q "$expected" "$out"; then
  exit 2
fi

rm "$out"
rm "$expected"

trap 'cleanup' EXIT
