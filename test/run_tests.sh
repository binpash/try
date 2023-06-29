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
PASSED_TEST=0
FAILING_TESTS=""
run_test()
{
    cleanup
    local test=$1

    if [ "$(type -t $test)" != "function" ]; then
        echo "$test is not a function!   FAIL"
        return 1
    fi

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

test_touch_and_rm_with_cleanup()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"

    : ${TMPDIR=/tmp}

    orig_tmp=$(ls "$TMPDIR")
    "$try" -y -- "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz" || return 1
    new_tmp=$(ls "$TMPDIR")
    
    if ! diff -q <(echo "$orig_tmp") <(echo "$new_tmp")
    then
        echo "temporary directory was not cleaned up; diff:"
        diff --color -u <(echo "$orig_tmp") <(echo "$new_tmp")
        return 1
    fi
}

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

# a test that deliberately fails (for testing CI changes)
test_fail()
{
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
    run_test test_touch_and_rm_with_cleanup
    run_test test_unzip_D_flag_commit_without_cleanup
    run_test test_pipeline
    run_test test_cmd_sbst_and_var

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
