# Short `try` Tutorial (10 minutes)

Inside the Vagrant guest:

```sh
mkdir -p ~/try-tour
cd ~/try-tour
```

Basic effect inspection and selective application:
```sh
try -h 'echo hello > hello.txt' 
try -h 'rm hello.txt' 
```

Creation, name current effect group `-N`:

```sh
SANDBOX=$(try -N sh -c 'echo "named" > named.txt')
echo "$SANDBOX"
```

Creation, ignore specific paths `-i`:

```sh
try -i '/ignored.txt$' -y sh -c 'echo "shown" > shown.txt; echo "ignored" > ignored.txt'
```

Execution, disable the network `-x`:

```sh
try curl https://example.com
try -x curl https://example.com
```

Execution, create filesystem trace `-t`:

```sh
touch {1..5}.txt
try -t trace.log -y 'rm 1.txt 3.txt 2.txt 4.txt 5.txt'
```

Execution, collect effect delta `--diff`:

```sh
try --diff "$SANDBOX"
```

Conclusion, discard all effects `-n`:

```sh
try -n 'echo "data" > discarded.txt'
[ ! -f discarded.txt ] && echo "effect was discarded"
try -y 'echo "data" > discarded.txt'
[ -f discarded.txt ] && echo "effect was kept"
```

Inspect and selectively apply effects `-e`:

```sh
try -e 'echo "keep" > keep.txt; echo "drop" > drop.txt'
```

Conclusion, include and exclude specific paths `-I`, `-E`:

```sh
try -I kept.txt:kept-dir -y 'touch kept.txt dropped.txt; mkdir -p kept-dir; touch kept-dir/file.txt'
try -E /etc/hostname 'if [ -e /etc/hostname ]; then echo "visible"; else echo "hidden"; fi'
```

Creation, stack over prior effects `-L`:

```sh
sudo rm -rf /tmp/try-lower-a /tmp/try-lower-b
mkdir -p /tmp/try-lower-a /tmp/try-lower-b
try -D /tmp/try-lower-a 'echo "A" > a.txt'
try -D /tmp/try-lower-b 'echo "B" > b.txt'
try summary /tmp/try-lower-a
try summary /tmp/try-lower-b
try -L /tmp/try-lower-b:/tmp/try-lower-a 'cat a.txt b.txt'
```
