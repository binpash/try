export TRY_TOP=${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}
if read -r
then
    exit 1
fi < "$TRY_TOP/test/results/failed.log"
