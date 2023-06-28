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

    echo
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

test_untar_D_flag_commit_without_cleanup()
{
    local shell=$1
    cp $RESOURCE_DIR/* "$2/"
    # Will always commit the result in case of try
    if [ "$shell" = "bash" ]; then
        $shell gunzip $2/file.txt.gz
    else
        try_example_dir=$(mktemp -d)
        $shell -D $try_example_dir gunzip $2/file.txt.gz
        if ! [ -d "$try_example_dir" ]; then
            echo "try_example_dir does not exist"
            return 1
        fi
        $shell commit $try_example_dir
        if ! [ -d "$try_example_dir" ]; then
            echo "try_example_dir does not exist"
            return 1
        fi
    fi
}

test_touch_and_rm_with_cleanup()
{
    TMPDIR="/tmp"
    local shell=$1
    cp $RESOURCE_DIR/* "$2/"
    SCRIPT=$(mktemp)
    cat >$SCRIPT <<'EOF'
    touch $1
    cat $2
    rm $3
EOF
    cat $SCRIPT
    # Will always commit the result in case of try
    if [ "$shell" = "bash" ]; then
        $shell $SCRIPT $2/file_1.txt $2/file_2.txt $2/file.txt.gz
    else
        orig_tmp=$(ls $TMPDIR)
        tmp_file_count1=$(ls $TMPDIR | wc -l)
        $shell -y $SCRIPT $2/file_1.txt $2/file_2.txt $2/file.txt.gz
        tmp_file_count2=$(ls $TMPDIR | wc -l)
        echo "original count ${tmp_file_count1} final count ${tmp_file_count2}"
        echo DIFF:
        diff --color -u <(echo "$orig_tmp") <(ls $TMPDIR) 
        # We save try_mount_log in /tmp/ dir
        if [ $tmp_file_count1 -ne $(($tmp_file_count2 - 1)) ]; then
            return 1
        fi
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
    run_test test_touch_and_rm_with_cleanup
    run_test test_untar_D_flag_commit_without_cleanup
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
