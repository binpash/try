sudo apt remove -y mergerfs

echo "echo, nomerger" > csv
for i in $(seq 1 10)
do
        echo nomerger $i
        ./echo.sh >> csv
done

echo "rustup, nomerger" >> csv
export TMPDIR="/home/ezri/tmp"
for i in $(seq 1 10)
do
        echo nomerger $i
        ./rustup.sh >> csv
done

sudo apt install -y mergerfs
echo "echo, merger" >> csv
for i in $(seq 1 10)
do
        echo nomerger $i
        ./echo.sh >> csv
done

echo "rustup, merger" >> csv

export TMPDIR="/mnt"
for i in $(seq 1 10)
do
        echo merger $i
        ./rustup.sh >> csv
done

