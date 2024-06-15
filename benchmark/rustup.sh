export TMPDIR=/mnt
export CARGO_HOME=$(mktemp -d)
export RUSTUP_HOME=$(mktemp -d)
echo $CARGO_HOME
echo $RUSTUP_HOME
./timed-csv.sh tests/rustup.sh
du -hs $CARGO_HOME
du -hs $RUSTUP_HOME
