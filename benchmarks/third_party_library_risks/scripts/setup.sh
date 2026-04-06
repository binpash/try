prefix=$(realpath $(dirname "${BASH_SOURCE[0]}")/..)

cd $prefix
docker build . -t try_pre_commit_benchmarks
