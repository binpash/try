#!/bin/bash

export TRY_TOP=${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}
export WORKING_DIR="$TRY_TOP/test"
export RESOURCE_DIR="$WORKING_DIR/resources"

echo "=================| Try Tests |==================="
echo "Test directory:           $WORKING_DIR"
echo "Resource directory:       $RESOURCE_DIR"

## Set the DEBUG env variable to see detailed output
DEBUG=${DEBUG:-0}


try="$TRY_TOP/try"

try_workspace="$TRY_TOP/test/try_workspace"

# Results saved here
output_dir="$TRY_TOP/test/results"

echo "try test workspace:       $try_workspace"
echo "Results saved at:         $output_dir"
echo "================================================="

# Clear previous test results
rm -rf "$output_dir"
mkdir -p "$output_dir"
touch "$output_dir/result_status"

cleanup()
{
    rm -rf "$try_workspace"
    mkdir "$try_workspace"
}

TOTAL_TESTS=0
PASSED_TESTS=0
FAILING_TESTS=""

test_read_from_run_dir()
{
    ls /run/systemd > /dev/null
    if [ $? -ne 0 ]; then
        echo "Cannot read from /run/systemd."
        return 1
    fi
}

run_test()
{
    cleanup
    local test=$1

    if [ "$(type -t $test)" != "function" ]; then
        echo "$test is not a function!   FAIL"
        return 1
    fi

    # Check if we can read from /run dir
    test_read_from_run_dir

    echo
    echo -n "Running $test..."

    # Run test
    : $((TOTAL_TESTS += 1))
    $test "$try_workspace"
    test_try_ec=$?

    if [ $test_try_ec -eq 0 ]; then
        : $((PASSED_TESTS += 1))
        echo -ne '\t\t\t'
        echo "$test passed" >> $output_dir/result_status
        echo -e '\tOK'
    else
        FAILING_TESTS="$FAILING_TESTS $test"
        echo -n " non-zero ec ($test_try_ec)"
        echo "$test failed" >> $output_dir/result_status
        echo -e '\t\tFAIL'
    fi
}

test_unzip_no_flag()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    echo 'Hello World!' >expected.out

    "$try" -y gunzip file.txt.gz || return 1
    diff -q expected.out file.txt
}

test_unzip_D_flag_commit()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    echo 'Hello World!' >expected.out

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir gunzip file.txt.gz || return 1
    $try commit $try_example_dir
    diff -q expected.out file.txt
}

test_unzip_D_flag_commit_without_cleanup()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/* "$try_workspace/"
    cd "$try_workspace/"

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir gunzip file.txt.gz || return 1
    if ! [ -d "$try_example_dir" ]; then
        echo "try_example_dir disappeared with no commit"
        return 1
    fi
    "$try" commit $try_example_dir || return 1
    if ! [ -d "$try_example_dir" ]; then
        echo "try_example_dir disappeared after manual commit"
        return 1
    fi
}

# KK 2023-07-06 This test checks whether try has correctly cleaned up its temporary directories
#               but is not working now. I am leaving it in so that its logic can be reused for a new test.
#
# test_touch_and_rm_with_cleanup()
# {
#     local try_workspace=$1
#     cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
#     cd "$try_workspace/"

#     : ${TMPDIR=/tmp}

#     orig_tmp=$(ls "$TMPDIR")
#     "$try" -y -- "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1
#     new_tmp=$(ls "$TMPDIR")

#     if ! diff -q <(echo "$orig_tmp") <(echo "$new_tmp")
#     then
#         echo "temporary directory was not cleaned up; diff:"
#         diff --color -u <(echo "$orig_tmp") <(echo "$new_tmp")
#         return 1
#     fi
# }

test_touch_and_rm_no_flag()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    touch expected1.txt
    echo 'test' >expected2.txt

    "$try" -y "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1

    diff -q expected1.txt file_1.txt &&
        diff -q expected2.txt file_2.txt &&
        [ ! -f file.txt.gz ]
}

test_touch_and_rm_D_flag_commit()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    touch expected1.txt
    echo 'test' >expected2.txt

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1
    $try commit $try_example_dir

    diff -q expected1.txt file_1.txt &&
        diff -q expected2.txt file_2.txt &&
        [ ! -f file.txt.gz ]
}

test_reuse_sandbox()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    echo 'test' >expected2.txt
    echo 'test2' >>expected2.txt
    touch expected3.out

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz"
    "$try" -D $try_example_dir "rm file_1.txt; echo test2 >> file_2.txt; touch file.txt.gz"
    $try commit $try_example_dir

    [ ! -f file_1.txt ] &&
        diff -q expected2.txt file_2.txt &&
        diff -q expected3.out file.txt.gz
}

test_reuse_problematic_sandbox()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    echo 'test' >expected2.txt
    echo 'test2' >>expected2.txt
    touch expected3.out

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz"

    ## KK 2023-06-29 This test is meant to modify the sandbox directory in an illegal way,
    ##               at the moment, this modification will be caught as illegal by `try`,
    ##               but it doesn't seem to both overlayfs at all.
    ## TODO: Extend this with more problematic overlayfs modifications.
    touch "$try_example_dir/temproot/bin/foo"
    ! "$try" -D $try_example_dir "rm file_1.txt; echo test2 >> file_2.txt; touch file.txt.gz" 2> /dev/null
}

test_non_existent_sandbox()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    try_example_dir="non-existent"
    ! "$try" -D $try_example_dir "touch file_1.txt" 2>/dev/null &&
    ! "$try" summary $try_example_dir 2>/dev/null &&
    ! "$try" commit $try_example_dir 2>/dev/null &&
    ! "$try" explore $try_example_dir 2>/dev/null
}

test_pipeline()
{
    local try_workspace=$1
    cd "$try_workspace/"

    ## Set up expected output
    echo 'TesT' >expected.out

    "$try" 'echo test | tr t T' > out.txt || return 1

    diff -q expected.out out.txt
}

test_cmd_sbst_and_var()
{
    local try_workspace=$1
    cd "$try_workspace/"

    ## Set up expected output
    echo $(pwd) >expected.out

    cat >script.sh <<"EOF"
echo $(pwd)
EOF

    "$try" sh script.sh >out.txt || return 1

    diff -q expected.out out.txt
}

test_explore()
{
    local try_workspace=$1
    cd "$try_workspace/"

    SHELL="/bin/bash --norc"
    export SHELL
    PS1="# "
    export PS1

    echo hi >expected.out

    cat >explore.exp <<EOF
#!/usr/bin/expect

set timeout 3

spawn "$try" explore
expect {
    ## Ignore the warnings
    "Warning*" {
        exp_continue
    }
    ## When we get the prompt, send the command
    "#*" {
        send -- "echo hi>test.txt\r"
    }
  }
expect "#"
## Send `exit`
send \x04

## Ignore all output and just send a y at the end
expect ""
expect "Commit*"
send -- "y\r"
expect eof
EOF
    ## Debug using the -d flag
    expect explore.exp >/dev/null

    diff -q expected.out test.txt
}

test_summary()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    touch expected1.txt
    echo 'test' >expected2.txt

    echo 'fail' >file_2.txt
    touch target

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz; rm target; mkdir target; mkdir new_dir"
    "$try" summary $try_example_dir > summary.out

    ## Check that the summary correctly identifies every change
    grep -qx "$PWD/file_1.txt (added)" <summary.out &&
        grep -qx "$PWD/file_2.txt (modified)" <summary.out &&
        grep -qx "$PWD/file.txt.gz (deleted)" <summary.out &&
        grep -qx "$PWD/target (replaced with dir)" <summary.out &&
        grep -qx "$PWD/new_dir (created dir)" <summary.out
}

test_empty_summary()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir "echo hi" > /dev/null
    "$try" summary $try_example_dir > summary.out

    ## We want to return true if the following line is not found!
    ! grep -q "Changes detected in the following files:" <summary.out
}

test_mkdir_on_file()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    touch target
    mkdir expected

    "$try" -y "rm target; mkdir target"
    diff -qr expected target
}

test_ignore_flag()
{
    local try_workspace=$1
    cd "$try_workspace/"

    touch expected.bar

    ## Ignore changes to foo
    "$try" -y -i foo1 -i foo2 "touch foo1.txt; touch foo2.txt; touch bar.txt"

    diff -q expected.bar bar.txt &&
        [ ! -f foo1.txt ] &&
        [ ! -f foo2.txt ]
}

test_dev()
{
    local try_workspace=$1
    cd "$try_workspace/"

    "$try" -y "head -c 5 /dev/urandom > target"
    [ -s target ]
}

## This test is checking if try works when mergerfs/unionfs are not present (but also not necessary)
test_echo_no_unionfs_mergerfs()
{
    local try_workspace=$1
    cd "$try_workspace/"

    ## Create a new /bin and /usr/bin without mergerfs and unionfs
    new_bin_dir=$(mktemp -d)
    mkdir "$new_bin_dir/usr"
    cp -rs /usr/bin "$new_bin_dir/usr/bin"

    ## Delete mergerfs and unionfs and set the new PATH to the temporary directory
    rm -f "$new_bin_dir/usr/bin/mergerfs" 2>/dev/null
    rm -f "$new_bin_dir/usr/bin/unionfs" 2>/dev/null
    export PATH="$new_bin_dir/usr/bin"

    cd $(mktemp -d)
    echo hi >expected
    "$try" -y "echo hi" >target 2>/dev/null
    diff -q expected target
}

test_exit_status() {
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    "$try" exit 3

    [ "$?" -eq 3 ]
}

test_hidden_variables() {
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    ## Set up expected output
    echo 'no sandbox' >expected.out

    "$try" 'echo ${SANDBOX_DIR-no sandbox}' >got.out

    [ "$?" -eq 0 ] && diff -q expected.out got.out

}

# a test that deliberately fails (for testing CI changes)
test_fail() {
    if [ "$1" = "$bash" ]
    then
        (exit 1)
    else
        (exit 2)
    fi
}

# We run all tests composed with && to exit on the first that fails
if [ "$#" -eq 0 ]; then
    run_test test_unzip_no_flag
    run_test test_unzip_D_flag_commit
    run_test test_touch_and_rm_no_flag
    run_test test_touch_and_rm_D_flag_commit
    run_test test_exit_status
    # run_test test_touch_and_rm_with_cleanup
    run_test test_unzip_D_flag_commit_without_cleanup
    run_test test_reuse_sandbox
    run_test test_reuse_problematic_sandbox
    run_test test_non_existent_sandbox
    run_test test_pipeline
    run_test test_cmd_sbst_and_var
    run_test test_summary
    run_test test_explore
    run_test test_empty_summary
    run_test test_mkdir_on_file
    run_test test_ignore_flag
    run_test test_dev
    run_test test_echo_no_unionfs_mergerfs
    run_test test_hidden_variables

# uncomment this to force a failure
#    run_test test_fail

else
    for testname in $@
    do
        run_test "$testname" "$2"
    done
fi

if type lsb_release > /dev/null ; then
   distro=$(lsb_release -i -s)
elif [ -e /etc/os-release ] ; then
   distro=$(awk -F= '$1 == "ID" {print $2}' /etc/os-release)
fi

distro=$(printf '%s\n' "$distro" | LC_ALL=C tr '[:upper:]' '[:lower:]')
# do different things depending on distro
case "$distro" in
    freebsd*)
        # change sed to gsed
        sed () {
            gsed $@
        }
        ;;
    *)
        ;;
esac

echo
echo "====================| Test Summary |===================="
echo "Failing tests:${FAILING_TESTS}"
echo "Summary: ${PASSED_TESTS}/${TOTAL_TESTS} tests passed."
echo "========================================================"

if [ $PASSED_TESTS -ne $TOTAL_TESTS ]
then
    exit 1
fi
