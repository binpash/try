#!/bin/sh

: "${TRY_TOP=$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"

# something else to try
if ! [ -d "$TRY_TOP/test" ]
then
    TRY_TOP="$PWD"
fi
TEST_DIR="$TRY_TOP/test"

[ -d "$TEST_DIR" ] || {
    echo "Couldn't find test directory (looked in $TEST_DIR)"
    exit 2
}
export TRY_TOP

# set the DEBUG env variable to see detailed output
DEBUG=${DEBUG:-0}

TOTAL_TESTS=0
PASSED_TESTS=0
FAILING_TESTS=""
SKIPPED_TESTS=""

if type try-commit >/dev/null 2>&1
then
    have_utils() { true; }
else
    have_utils() { false; }
fi

run_test()
{
    test="$1"
    name="$(basename "$test")"

    if ! [ -f "$test" ]
    then
        echo "Test '$name' does not exist (at path $test)."
        return 1
    elif ! [ -x "$test" ]
    then
        echo "Test '$name' is not executable (at path $test)."
        return 1
    fi

    # check if we can read from /run dir
    ls /run/systemd >/dev/null || {
        echo "Cannot read from /run/systemd, aborting test '$name'." >&2
        return 1
    }

    printf "\nRunning %s...%$((60 - (8 + ${#name} + 3) ))s" "$name" ""

    if grep -q -e "needs-try-utils" "$test" && ! have_utils
    then
        printf "SKIP (no utils)\n"
        SKIPPED_TESTS="$SKIPPED_TESTS $name"
        return
    fi

    # actually run the test
    out=$(mktemp)
    err=$(mktemp)
    "$test" >"$out" 2>"$err"
    ec="$?"

    : $((TOTAL_TESTS += 1))
    if [ "$ec" -eq 0 ]; then
        : $((PASSED_TESTS += 1))
        printf "PASS\n"
    else
        FAILING_TESTS="$FAILING_TESTS $name"
        printf "FAIL (%d)\n" "$ec"

        printf "=======\n"
        printf "STDOUT:\n"
        printf "=======\n"
        cat "$out"
        printf "=======\n\n"

        printf "=======\n"
        printf "STDERR:\n"
        printf "=======\n"
        cat "$err"
        printf "=======\n\n"
    fi

    rm "$out" "$err"
}

pats="$(mktemp)"
if [ "$#" -eq 0 ]
then
    # if no patterns are specified
    echo '.*' >"$pats"
else
    printf "%s\n" "$@" >>"$pats"
fi

TESTS="$(find "$TEST_DIR" -type f -executable -name '*.sh' | grep -f "$pats")"
rm "$pats"

echo "========================| Try Tests |==========================="
echo "Running $(echo "$TESTS" | wc -l) tests..."
echo "================================================================"

for test in $TESTS
do
    run_test "$test"
done

echo
echo "========================| Test Summary |========================"
echo "Failing tests:${FAILING_TESTS}"
echo "Skipped tests:${SKIPPED_TESTS}"
echo "Summary: ${PASSED_TESTS}/${TOTAL_TESTS} tests passed."
echo "================================================================"

if [ "$PASSED_TESTS" -ne "$TOTAL_TESTS" ]
then
    exit 1
fi
