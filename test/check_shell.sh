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
  echo "case: $case"

  expected="$(mktemp)"
  out="$(mktemp)"
  echo "$expected_output" >"$expected"
  TRY_SHELL="$try_shell" SHELL="$shell" "$TRY" "echo \"\$TRY_SHELL\"" >"$out" || exit 1

  if ! diff -q "$expected" "$out"; then
    exit "$case"
  fi

  rm "$expected"
  rm "$out"

}

trap 'cleanup' EXIT

check_case "/bin/bash" "/bin/sh" "/bin/bash" "1"

check_case "" "/bin/bash" "/bin/bash" "2"

username="$(whoami)"
#saved_shell=$(grep -e "^$username" /etc/passwd | cut -d: -f7)

if [ "$CI" = "true" ]; then

  #sudo apt-get install -y zsh
  sudo chsh "$username" --shell=/usr/bin/zsh
  sudo chmod +x "/usr/bin/zsh"

  check_case "" "" "/usr/bin/zsh" "3"

  sudo chmod -x "/usr/bin/zsh"
fi

check_case "" "" "/bin/sh" "4"

#if [ "$CI" = "true" ]; then
#sudo chmod +x "/usr/bin/zsh"
# sudo chsh "$username" --shell="$saved_shell"
#fi
