#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
TRY="$TRY_TOP/try"

initial_count="$(ls "${TMPDIR-/tmp}" | grep -e "^.*\.try-[0-9]*$" | wc -l)"

sandbox=$($TRY -n "touch $HOME/foo")
[ $? -eq 0 ] || exit 2

post_count="$(ls "${TMPDIR-/tmp}" | grep -e "^.*\.try-[0-9]*$" | wc -l)"

# just one new tempfile
[ "$((initial_count + 1))" -eq "$post_count" ] || exit 3
[ -f "$sandbox/upperdir$HOME/foo" ] || exit 4

# deliberately not the pattern of try sandboxes
sandbox="$(mktemp -d --suffix "custom-XXXXXX")"
$TRY -D "$sandbox" "touch $HOME/bar" || exit 5
[ $? -eq 0 ] || exit 6

final_count="$(ls "${TMPDIR-/tmp}" | grep -e "^.*\.try-[0-9]*$" | wc -l)"

# no new tempfiles!
echo $post_count $final_count
[ "$post_count" -eq "$final_count" ] || exit 7
[ -f "$sandbox/upperdir$HOME/bar" ] || exit 8
