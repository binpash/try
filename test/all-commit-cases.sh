#!/bin/sh

# shellcheck disable=SC2119 # warnings about fail's arguments (put before first command to be global)
TRY_TOP="${TRY_TOP:-$(git rev-parse --show-toplevel --show-superproject-working-tree 2>/dev/null || echo "${0%/*}")}"
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
cd "$try_workspace" || exit 99

# we have a case for every TRYCASE(changed_file, local_file) in the utils
# - first arg is incoming change
# - second arg is local file status
# see utils/README.md for more info

COUNT=0
fail() {
    echo Case $COUNT: "$@"
    exit ${COUNT}
}


# // TRYCASE(opaque, dir)
# // TRYCASE(dir, dir)

: $((COUNT += 1))

! [ -e olddir ] || fail
mkdir olddir || fail
echo hi >olddir/oldfile || fail
[ -d olddir ] || fail
[ -f olddir/oldfile ] || fail
"$TRY" -y "rm -r olddir; mkdir olddir; echo fresh >olddir/newfile" || fail
[ -d olddir ] || fail
[ -f olddir/newfile ] || fail
! [ -e olddir/oldfile ] || fail opaque directories worked incorrectly
[ "$(cat olddir/newfile)" = "fresh" ] || fail
rm -r olddir || fail

# // TRYCASE(dir, nonexist)

: $((COUNT += 1))

! [ -e newdir ] || fail
"$TRY" -y "mkdir newdir" || fail
[ -d newdir ] || fail
rmdir newdir || fail

# // TRYCASE(opaque, file)
# // TRYCASE(dir, file)

: $((COUNT += 1))

! [ -e wasfile ] || fail
echo hi >wasfile || fail
[ -f wasfile ] || fail
"$TRY" -y "mv wasfile stillfile; mkdir wasfile; mv stillfile wasfile" || fail
[ -d wasfile ] || fail
[ -f wasfile/stillfile ] || fail
[ "$(cat wasfile/stillfile)" = "hi" ] || fail
rm -r wasfile || fail

# // TRYCASE(opaque, symlink)
# // TRYCASE(dir, symlink)

: $((COUNT += 1))

! [ -e waslink ] || fail
ln -s "$TRY" waslink || fail
[ -L waslink ] || fail
"$TRY" -y "rm waslink; mkdir waslink; ln -s \"$TRY\" waslink/newlink" || fail
[ -d waslink ] || fail
[ -L waslink/newlink ] || fail
[ "$(readlink waslink/newlink)" = "$TRY" ] || fail
rm -r waslink || fail

# // TRYCASE(whiteout, dir)

: $((COUNT += 1))

mkdir existdir || fail
touch existdir/file || fail
[ -d existdir ] || fail
"$TRY" -y "rm -r existdir" || fail
! [ -d existdir ] || fail

# // TRYCASE(whiteout, file)

: $((COUNT += 1))

! [ -e goner ] || fail
echo alas >goner || fail
[ -f goner ] || fail
"$TRY" -y "rm goner" || fail
! [ -e goner ] || fail

# // TRYCASE(whiteout, symlink)

: $((COUNT += 1))

! [ -e trylink ] || fail
ln -s "$TRY" trylink || fail
[ -L trylink ] || fail
"$TRY" -y "rm trylink" || fail
! [ -e trylink ] || fail

# // TRYCASE(whiteout, nonexist)
# this case is not really possible, but the following _could_ exercise it

: $((COUNT += 1))

! [ -e absent ] || fail
"$TRY" -y "touch absent; sync; rm absent" || fail
! [ -e absent ] || fail

# // TRYCASE(file, symlink)

: $((COUNT += 1))

! [ -e sneaky ] || fail
ln -s "$TRY" sneaky || fail
[ -L sneaky ] || fail
"$TRY" -y "rm sneaky; echo gotcha >sneaky" || fail
[ -f sneaky ] || fail
[ "$(cat sneaky)" = "gotcha" ] || fail
rm sneaky || fail

# // TRYCASE(file, nonexist)

: $((COUNT += 1))

! [ -e missingno ] || fail
"$TRY" -y "echo arceus >missingno" || fail
[ -f missingno ] || fail
[ "$(cat missingno)" = "arceus" ] || fail
rm missingno || fail

# // TRYCASE(file, dir)

: $((COUNT += 1))

! [ -e wasdir ] || fail
mkdir wasdir || fail
mkdir wasdir/inner || fail
touch wasdir/inner/goodbye || fail
[ -d wasdir ] || fail
[ -d wasdir/inner ] || fail
[ -f wasdir/inner/goodbye ] || fail
"$TRY" -y "rm -r wasdir; echo a humble file >wasdir" || fail
[ -f wasdir ] || fail
[ "$(cat wasdir)" = "a humble file" ] || fail

# // TRYCASE(file, file)

: $((COUNT += 1))

! [ -e wasfile ] || fail
echo sup >wasfile || fail
[ -f wasfile ] || fail
"$TRY" -y "echo what is up >wasfile" || fail
[ -f wasfile ] || fail
[ "$(cat wasfile)" = "what is up" ] || fail

# // TRYCASE(symlink, nonexist)

: $((COUNT += 1))

! [ -e linktobe ] || fail
"$TRY" -y "ln -s \"$TRY\" linktobe" || fail
[ -L linktobe ] || fail
[ "$(readlink linktobe)" = "$TRY" ] || fail

# // TRYCASE(symlink, file)

: $((COUNT += 1))

! [ -e gonnago ] || fail
echo so long >gonnago || fail
"$TRY" -y "ln -sf \"$TRY\" gonnago" || fail
[ -L gonnago ] || fail
[ "$(readlink gonnago)" = "$TRY" ] || fail
rm gonnago || fail

# // TRYCASE(symlink, symlink)

: $((COUNT += 1))

! [ -e otherlink ] || fail
ln -s /etc/passwd otherlink || fail
"$TRY" -y "ln -sf \"$TRY\" otherlink" || fail
[ -L otherlink ] || fail
[ "$(readlink otherlink)" = "$TRY" ] || fail
rm otherlink || fail

# // TRYCASE(symlink, dir)

: $((COUNT += 1))

! [ -e formerdir ] || fail
mkdir formerdir || fail
mkdir formerdir/en formerdir/it || fail
echo hello >formerdir/en/file1 || fail
echo goodbye >formerdir/en/file2 || fail
echo buuongiorno >formerdir/it/file1 || fail
echo arrivederci >formerdir/it/file2 || fail
[ -d formerdir ] || fail
[ -d formerdir/en ] || fail
[ -d formerdir/it ] || fail
[ -f formerdir/en/file1 ] || fail
[ -f formerdir/en/file2 ] || fail
[ -f formerdir/it/file1 ] || fail
[ -f formerdir/it/file2 ] || fail
"$TRY" -y "rm -r formerdir; ln -s /this/is/a/broken/symlink formerdir" || fail
[ -L formerdir ] || fail
[ "$(readlink formerdir)" = "/this/is/a/broken/symlink" ] || fail
rm formerdir || fail

# // TRYCASE(fifo, file)

: $((COUNT += 1))

! [ -e newpipe ] || fail
"$TRY" -y "touch newpipe; echo new >newpipe"
[ -f newpipe ] || fail
[ "$(cat newpipe)" = "new" ] || fail
"$TRY" -y "rm newpipe; mkfifo newpipe"
[ -p newpipe ] || fail
rm newpipe

# // TRYCASE(fifo, dir)

: $((COUNT += 1))

! [ -e newpipe ] || fail
"$TRY" -y "mkdir newpipe"
[ -d newpipe ] || fail
"$TRY" -y "rm -r newpipe; mkfifo newpipe"
[ -p newpipe ] || fail
rm newpipe

# // TRYCASE(fifo, symlink)

: $((COUNT += 1))

! [ -e newpipe ] || fail
ln -s "$TRY" newpipe
[ -L newpipe ] || fail
"$TRY" -y "rm newpipe; mkfifo newpipe"
[ -p newpipe ] || fail
rm newpipe

# // TRYCASE(fifo, nonexist)

: $((COUNT += 1))

! [ -e newpipe ] || fail
"$TRY" -y "mkfifo newpipe"
[ -p newpipe ] || fail
rm newpipe

# // TRYCASE(socket, file)

: $((COUNT += 1))

! [ -e newsock ] || fail
"$TRY" -y "touch newsock; echo hello> newsock"
[ -f newsock ] || fail
[ "$(cat newsock)" = "hello" ] || fail
"$TRY" -y "rm newsock; make-socket newsock"
[ -S newsock ] || fail
rm newsock

# // TRYCASE(socket, dir)

: $((COUNT += 1))

! [ -e newsock ] || fail
"$TRY" -y "mkdir newsock"
[ -d newsock ] || fail
"$TRY" -y "rm -r newsock; make-socket newsock"
[ -S newsock ] || fail
rm newsock

# // TRYCASE(socket, symlink)

: $((COUNT += 1))

! [ -e newsock ] || fail
ln -s "$TRY" newsock
[ -L newsock ] || fail
"$TRY" -y "rm newsock; make-socket newsock"
! [ -e newlink ] || fail
[ -S newsock ] || fail
rm newsock

# // TRYCASE(socket, nonexist)

: $((COUNT += 1))

! [ -e newsock ]
"$TRY" -y "make-socket newsock"
[ -S newsock ] || fail
rm newsock
