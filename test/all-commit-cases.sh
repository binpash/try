#!/bin/sh

TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree)}"
TRY="$TRY_TOP/try"

cleanup() {
    cd /

    if [ -d "$try_workspace" ]
    then
        rm -rf "$try_workspace" >/dev/null 2>&1
    fi
}

trap 'cleanup' EXIT

try_workspace="$(mktemp -d)"
cd "$try_workspace" || return 9

# we have a case for every TRYCASE(changed_file, local_file) in the utils
# - first arg is incoming change
# - second arg is local file status
# see utils/README.md for more info

COUNT=0

# // TRYCASE(dir, nonexist)

: $((COUNT += 1))

! [ -e newdir ] || return "$COUNT"
"$TRY" -y "mkdir newdir" || return "$COUNT"
[ -d newdir ] || return "$COUNT"
rmdir newdir || return "$COUNT"

# // TRYCASE(dir, file)

: $((COUNT += 1))

! [ -e wasfile ] || return "$COUNT"
echo hi >wasfile || return "$COUNT"
[ -f wasfile ] || return "$COUNT"
"$TRY" -y "mv wasfile stillfile; mkdir wasfile; mv stillfile wasfile" || return "$COUNT"
[ -d wasfile ] || return "$COUNT"
[ -f wasfile/stillfile ] || return "$COUNT"
[ "$(cat wasfile/stillfile)" = "hi" ] || return "$COUNT"
rm -r wasfile || return "$COUNT"

# it seems like overlayfs is behaving in a buggy way; see https://github.com/binpash/try/issues/163
# // TRYCASE(dir, dir)
# 
# : $((COUNT += 1))
# 
# ! [ -e olddir ] || return "$COUNT"
# mkdir olddir || return "$COUNT"
# echo hi >olddir/oldfile || return "$COUNT"
# [ -d olddir ] || return "$COUNT"
# [ -f olddir/oldfile ] || return "$COUNT"
# "$TRY" -y "rm -r olddir; mkdir olddir; echo fresh >olddir/newfile"  || return "$COUNT"
# [ -d olddir ] || return "$COUNT"
# [ -f olddir/newfile ] || return "$COUNT"
# ! [ -e olddir/oldfile ] || return "$COUNT"
# [ "$(cat olddir/newfile)" = "fresh" ] || return "$COUNT"
# rm -r olddir || return "$COUNT"

# // TRYCASE(dir, symlink)

: $((COUNT += 1))

! [ -e waslink ] || return "$COUNT"
ln -s "$TRY" waslink || return "$COUNT"
[ -L waslink ] || return "$COUNT"
"$TRY" -y "rm waslink; mkdir waslink; ln -s \"$TRY\" waslink/newlink" || return "$COUNT"
[ -d waslink ] || return "$COUNT"
[ -L waslink/newlink ] || return "$COUNT"
[ "$(readlink waslink/newlink)" = "$TRY" ] || return "$COUNT"
rm -r waslink || return "$COUNT"

# // TRYCASE(whiteout, dir)

: $((COUNT += 1))

mkdir existdir || return "$COUNT"
touch existdir/file || return "$COUNT"
[ -d existdir ] || return "$COUNT"
"$TRY" -y "rm -r existdir" || return "$COUNT"
! [ -d existdir ] || return "$COUNT" 

# // TRYCASE(whiteout, file)

: $((COUNT += 1))

! [ -e goner ] || return "$COUNT"
echo alas >goner || return "$COUNT"
[ -f goner ] || return "$COUNT"
"$TRY" -y "rm goner" || return "$COUNT"
! [ -e goner ] || return "$COUNT"

# // TRYCASE(whiteout, symlink)

: $((COUNT += 1))

! [ -e trylink ] || return "$COUNT"
ln -s "$TRY" trylink || return "$COUNT"
[ -L trylink ] || return "$COUNT"
"$TRY" -y "rm trylink" || return "$COUNT"
! [ -e trylink ] || return "$COUNT"

# // TRYCASE(whiteout, nonexist)
# this case is not really possible, but the following _could_ exercise it

: $((COUNT += 1))

! [ -e absent ] || return "$COUNT"
"$TRY" -y "touch absent; sync; rm absent" || return "$COUNT"
! [ -e absent ] || return "$COUNT"

# // TRYCASE(file, symlink)

: $((COUNT += 1))

! [ -e sneaky ] || return "$COUNT"
ln -s "$TRY" sneaky || return "$COUNT"
[ -L sneaky ] || return "$COUNT"
"$TRY" -y "rm sneaky; echo gotcha >sneaky" || return "$COUNT"
[ -f sneaky ] || return "$COUNT"
[ "$(cat sneaky)" = "gotcha" ] || return "$COUNT"
rm sneaky || return "$COUNT"

# // TRYCASE(file, nonexist)

: $((COUNT += 1))

! [ -e missingno ] || return "$COUNT"
"$TRY" -y "echo arceus >missingno" || return "$COUNT"
[ -f missingno ] || return "$COUNT"
[ "$(cat missingno)" = "arceus" ] || return "$COUNT"
rm missingno || return "$COUNT"

# // TRYCASE(file, dir)

: $((COUNT += 1))

! [ -e wasdir ] || return "$COUNT"
mkdir wasdir || return "$COUNT"
mkdir wasdir/inner || return "$COUNT"
touch wasdir/inner/goodbye || return "$COUNT"
[ -d wasdir ] || return "$COUNT"
[ -d wasdir/inner ] || return "$COUNT"
[ -f wasdir/inner/goodbye ] || return "$COUNT"
"$TRY" -y "rm -r wasdir; echo a humble file >wasdir" || return "$COUNT"
[ -f wasdir ] || return "$COUNT"
[ "$(cat wasdir)" = "a humble file" ] || return "$COUNT"

# // TRYCASE(file, file)

: $((COUNT += 1))

! [ -e wasfile ] || return "$COUNT"
echo sup >wasfile || return "$COUNT"
[ -f wasfile ] || return "$COUNT"
"$TRY" -y "echo what is up >wasfile" || return "$COUNT"
[ -f wasfile ] || return "$COUNT"
[ "$(cat wasfile)" = "what is up" ] || return "$COUNT"

# // TRYCASE(symlink, nonexist)

: $((COUNT += 1))

! [ -e linktobe ] || return "$COUNT"
"$TRY" -y "ln -s \"$TRY\" linktobe" || return "$COUNT"
[ -L linktobe ] || return "$COUNT"
[ "$(readlink linktobe)" = "$TRY" ] || return "$COUNT"

# // TRYCASE(symlink, file)

: $((COUNT += 1))

! [ -e gonnago ] || return "$COUNT"
echo so long >gonnago || return "$COUNT"
"$TRY" -y "ln -sf \"$TRY\" gonnago" || return "$COUNT"
[ -L gonnago ] || return "$COUNT"
[ "$(readlink gonnago)" = "$TRY" ] || return "$COUNT"
rm gonnago || return "$COUNT"

# // TRYCASE(symlink, file)

: $((COUNT += 1))

! [ -e otherlink ] || return "$COUNT"
ln -s /etc/passwd otherlink || return "$COUNT"
"$TRY" -y "ln -sf \"$TRY\" otherlink" || return "$COUNT"
[ -L otherlink ] || return "$COUNT"
[ "$(readlink otherlink)" = "$TRY" ] || return "$COUNT"
rm otherlink || return "$COUNT"

# // TRYCASE(symlink, dir)

: $((COUNT += 1))

! [ -e formerdir ] || return "$COUNT"
mkdir formerdir || return "$COUNT"
mkdir formerdir/en formerdir/it || return "$COUNT"
echo hello >formerdir/en/file1 || return "$COUNT"
echo goodbye >formerdir/en/file2 || return "$COUNT"
echo buuongiorno >formerdir/it/file1 || return "$COUNT"
echo arrivederci >formerdir/it/file2 || return "$COUNT"
[ -d formerdir ] || return "$COUNT"
[ -d formerdir/en ] || return "$COUNT"
[ -d formerdir/it ] || return "$COUNT"
[ -f formerdir/en/file1 ] || return "$COUNT"
[ -f formerdir/en/file2 ] || return "$COUNT"
[ -f formerdir/it/file1 ] || return "$COUNT"
[ -f formerdir/it/file2 ] || return "$COUNT"
"$TRY" -y "rm -r formerdir; ln -s /this/is/a/broken/symlink formerdir" || return "$COUNT"
[ -L formerdir ] || return "$COUNT"
[ "$(readlink formerdir)" = "/this/is/a/broken/symlink" ] || return "$COUNT"
rm formerdir || return "$COUNT"
