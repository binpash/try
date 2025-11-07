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

check_case() {
  try_shell="$1"
  shell="$2"
  expected_output="$3"
  case="$4"

  expected="$(mktemp)"
  out="$(mktemp)"
  echo "$expected_output" >"$expected"
  TRY_SHELL="$try_shell" SHELL="$shell" "$TRY" 'realpath /proc/$$/exe' >"$out" || exit "$case"

  if ! diff "$expected" "$out"; then
    exit "$case"
  fi

  rm "$expected"
  rm "$out"

}

trap 'cleanup' EXIT

check_case "/bin/bash" "/bin/sh" "$(realpath "/bin/bash")" "1"

check_case "" "/bin/bash" "$(realpath "/bin/bash")" "2"
