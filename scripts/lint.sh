#!/bin/sh

NUM_WARNINGS=0

################################################################################
# issue a warning
################################################################################

warn() {
    msg="$1"

    printf "%s\n" "$msg" >&2
}

################################################################################
# pluralize a word
################################################################################

plural() {
    if [ "$1" -eq 1 ]
    then
        echo ""
    else
        echo "s"
    fi
}

################################################################################
# check for a trailing newline
################################################################################

trailing_newline() {
    file="$1"

    [ -f "$file" ] || warn "trailing_newline: '$file' is not a normal file"

    # empty file is fine
    [ -s "$file" ] || return

    last="$(tail -c1 "$file")"
    if [ "$last" != "$(printf '\n')" ]
    then
        warn "$file: missing a trailing newline"
    fi
}

################################################################################
# check for trailing whitespace on a line
################################################################################

trailing_whitespace() {
    file="$1"

    [ -f "$file" ] || warn "trailing_whitespace: '$file' is not a normal file"

    # empty file is fine
    [ -s "$file" ] || return

    if grep -lq -e '[[:blank:]]$' "$file"
    then
        warn "$file: trailing whitespace"
        grep --line-number -e '[[:blank:]]$' "$file" | sed 's/[[:blank:]]\+$/\o33[41m&\o033[0m/'
    fi
}

################################################################################
# entry point
################################################################################

if [ "$#" -eq 0 ]
then
    FILES=$(find . -type f -a \( \! -path "./.git/*" \) -a \! \( -name "*.png" -o -name "*.gif" \))
else
    # shellcheck disable=SC2124
    FILES="$@"
fi


num_files="$(echo "$FILES" | wc -l)"
printf "Linting %s file%s in parallel..." "$num_files" "$(plural "$num_files")"
OUTPUTS=""
for file in $FILES
do
    out=$(mktemp)
    printf "."

    ( trailing_whitespace "$file"
      trailing_newline "$file" ) >"$out" 2>&1 &

    OUTPUTS="$OUTPUTS $out"
done

wait
printf "done.\n"

for out in $OUTPUTS
do
    [ -s "$out" ] && : $((NUM_WARNINGS += 1)) && echo
    cat "$out"
    rm "$out"
done

if [ "$NUM_WARNINGS" -eq 0 ]
then
    printf "✓ \033[32;1mLINT CHECK PASSED\033[0m\n"
else
    printf "\n❌ \033[31;1mLINT CHECK FAILED (%d warning%s)\033[0m\n" "$NUM_WARNINGS" "$(plural "$NUM_WARNINGS")"
    exit 1
fi
