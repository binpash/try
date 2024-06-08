#!/bin/sh

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

check_file() {
    trycase="$(mktemp -d)"

    for cf in file dir symlink opaque whiteout
    do
        mkdir "$trycase/$cf"
        for lf in file dir symlink nonexist
        do
            touch "$trycase/$cf/$lf"
        done
    done
    rm "$trycase/opaque/nonexist" # this case cannot occur

    ERRORS=0

    grep -e "// TRYCASE" "$1" | cut -d'/' -f3 | cut -c10- | while IFS="" read -r c
    do
        cf="${c%,*}"
        lf="${c#*, }"
        lf="${lf%)}"

        case "$cf" in
            (file|dir|symlink|nonexist|opaque|whiteout);;
            (*) printf "ERROR: $1: invalid changed file: %s\n" "$cf"
                : $((ERRORS += 1))
                ;;
        esac
        case "$lf" in
            (file|dir|symlink|nonexist|"*");;
            (*) printf "ERROR: $1: invalid local file: %s\n" "$lf"
                : $((ERRORS += 1))
                ;;
        esac

        rm $trycase/$cf/$lf 2>/dev/null
    done

    for cf in $(ls "$trycase")
    do
        for lf in $(ls "$trycase/$cf")
        do
            printf "ERROR: $1: missing TRYCASE(%s, %s)\n" "$cf" "$lf"
            : $((ERRORS += 1))
        done
    done
    rm -r "$trycase"

    if [ "$ERRORS" -eq 0 ]
    then
        printf "\033[32;1m✓ %s PASSED\033[0m\n" "$1"
    else
        printf "\n❌ \033[31;1m%s FAILED (%d error%s)\033[0m\n" "$1" "$ERRORS" "$(plural "$ERRORS")"
        FOUND_ERROR=1
    fi
}

TRY_TOP="${TRY_TOP-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"

FOUND_ERROR=0
check_file "$TRY_TOP/try"
check_file "$TRY_TOP/utils/try-summary.c"
check_file "$TRY_TOP/utils/try-commit.c"
check_file "$TRY_TOP/test/all-commit-cases.sh"
exit "$FOUND_ERROR"
