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

run_test()
{
    cleanup
    local test=$1

    if [ "$(type -t $test)" != "function" ]; then
        echo "$test is not a function!   FAIL"
        return 1
    fi

    echo -n "Running $test..."

    # Run test
    $test "$try_workspace"
    test_try_ec=$?
    
    if [ $test_try_ec -eq 0 ]; then
        echo -ne '\t\t\t'
        echo "$test are identical" >> $output_dir/result_status
        echo -e '\tOK'        
    else
        echo -n " (!) EC mismatch"
        echo "$test are not identical" >> $output_dir/result_status
        echo -e '\t\tFAIL'
    fi
}

test_untar_no_flag()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"
    
    ## Set up expected output
    echo 'Hello World!' >expected.out 

    "$try" -y gunzip file.txt.gz
    diff -q expected.out file.txt
}

test_untar_D_flag_commit()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"
    
    ## Set up expected output
    echo 'Hello World!' >expected.out 

    try_example_dir=$(mktemp -d)
    "$try" -D $try_example_dir gunzip file.txt.gz
    $try commit $try_example_dir
    diff -q expected.out file.txt
}

test_touch_and_rm_no_flag()
{
    local try_workspace=$1
    cp $RESOURCE_DIR/file.txt.gz "$try_workspace/"
    cd "$try_workspace/"
    
    ## Set up expected output
    touch expected1.txt
    echo 'test' >expected2.txt 

    "$try" -y "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz"
    
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
    "$try" -D $try_example_dir "touch file_1.txt; echo test > file_2.txt; rm file.txt.gz"
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

    "$try" 'echo test | tr t T' > out.txt
    
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

    "$try" sh script.sh >out.txt

    diff -q expected.out out.txt
}

test_explore()
{
    local try_workspace=$1
    cd "$try_workspace/"

    export SHELL="/bin/bash"

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
    run_test test_untar_no_flag
    run_test test_untar_D_flag_commit
    run_test test_touch_and_rm_no_flag
    run_test test_touch_and_rm_D_flag_commit
    run_test test_pipeline
    run_test test_cmd_sbst_and_var
    run_test test_summary
    run_test test_explore
    run_test test_empty_summary
    run_test test_mkdir_on_file

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

echo -e "\n====================| Test Summary |====================\n"
echo "> Below follow the identical outputs:"
grep "are identical" "$output_dir"/result_status | awk '{print $1}' | tee $output_dir/passed.log

echo "> Below follow the non-identical outputs:"     
grep "are not identical" "$output_dir"/result_status | awk '{print $1}' | tee $output_dir/failed.log
echo "========================================================"
TOTAL_TESTS=$(cat "$output_dir"/result_status | wc -l | xargs)
PASSED_TESTS=$(grep -c "are identical" "$output_dir"/result_status)
echo "Summary: ${PASSED_TESTS}/${TOTAL_TESTS} tests passed." | tee $output_dir/results.log
echo "========================================================"

if [ $PASSED_TESTS -ne $TOTAL_TESTS ]
then
    exit 1
fi
