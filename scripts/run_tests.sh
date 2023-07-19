#!/bin/sh

: "${TRY_TOP=$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TEST_DIR="$TRY_TOP/test"

# set the DEBUG env variable to see detailed output
DEBUG=${DEBUG:-0}

# results saved here; clear out previous results
OUTPUT_DIR="$TRY_TOP/test/results"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"
touch "$OUTPUT_DIR/result_status"

TOTAL_TESTS=0
PASSED_TESTS=0
FAILING_TESTS=""

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

    echo
    printf "Running %s..." "$name"

    # actually run the test
    "$test"
    ec="$?"

    : $((TOTAL_TESTS += 1))
    if [ "$ec" -eq 0 ]; then
        : $((PASSED_TESTS += 1))
        printf '\t\t\t'
        echo "Test $name passed" >>"$OUTPUT_DIR/result_status"
        printf '\tOK\n'
    else
        FAILING_TESTS="$FAILING_TESTS $name"
        printf " non-zero exit status (%d)" "$ec"
        echo "Test $name failed" >>"$OUTPUT_DIR/result_status"
        printf '\t\tFAIL\n'
    fi
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

echo "=================| Try Tests |==================="
echo "Test directory:           $WORKING_DIR"
echo "Results saved at:         $OUTPUT_DIR"
echo
echo "Running $(echo "$TESTS" | wc -l) tests"
echo "================================================="

for test in $TESTS
do
    run_test "$test"
done

echo
echo "====================| Test Summary |===================="
echo "Failing tests:${FAILING_TESTS}"
echo "Summary: ${PASSED_TESTS}/${TOTAL_TESTS} tests passed."
echo "========================================================"

if [ $PASSED_TESTS -ne $TOTAL_TESTS ]
then
    exit 1
fi
