# Short `try` Tutorial (5 minutes)

Inside the Vagrant guest:

```sh
cd /vagrant
mkdir -p /tmp/try-tour
cd /tmp/try-tour
```

Creation, stack over prior effects `-L`:

```sh
rm -rf /tmp/try-lower-a /tmp/try-lower-b
try -D /tmp/try-lower-a sh -c 'printf "A\n" > a.txt'
try -D /tmp/try-lower-b sh -c 'printf "B\n" > b.txt'
try -L /tmp/try-lower-b:/tmp/try-lower-a sh -c 'cat a.txt b.txt'
```

Creation, name current effect group `-N`:

```sh
SANDBOX=$(try -N sh -c 'printf "named\n" > named.txt')
echo "$SANDBOX"
```

Creation, ignore specific paths `-i`:

```sh
try -i '/ignored.txt$' -y sh -c 'printf "shown\n" > shown.txt; printf "ignored\n" > ignored.txt'
```

Execution, disable the network `-x`:

```sh
try -x sh -c 'printf "offline\n" > offline.txt'
```

Execution, create filesystem trace `-t`:

```sh
scripts/try-timed -t trace.log -y sh -c 'printf "trace\n" > trace.txt'
```

Execution, collect effect delta `--diff`:

```sh
try --diff "$SANDBOX"
```

Conclusion, apply all effects `-y`:

```sh
try -y sh -c 'printf "yes\n" > applied.txt'
```

Conclusion, discard all effects `-n`:

```sh
try -n sh -c 'printf "no\n" > discarded.txt'
```

Conclusion, inspect effects `-e`:

```sh
try -e sh -c 'printf "keep\n" > keep.txt; printf "drop\n" > drop.txt'
```

Conclusion, include and exclude specific paths `-I`, `-E`:

```sh
# `-I` is not wired in the main `try` script yet.
try -E /etc/hostname sh -c 'if [ -e /etc/hostname ]; then printf "visible\n"; else printf "hidden\n"; fi'
```

Conclusion, summarize effects `-s`:

```sh
# `-s` is not wired in the main `try` script yet.
try summary "$SANDBOX"
```

Conclusion, offer friendlier summary `-h`:

```sh
try -h summary "$SANDBOX"
```


