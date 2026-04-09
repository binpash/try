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

With `-h`, `try` prints a friendlier summary instead of raw effect codes, so you should see a readable description of creating `hello.txt` and then deleting it.

Creation, name current effect group `-N`:

```sh
SEMISOLATE=$(try -N sh -c 'echo "named" > named.txt')
echo "$SEMISOLATE"
```

With `-N`, `try` keeps the effect group instead of committing it, so you should get back a semisolate directory path and no `named.txt` should appear in your working tree yet.

Ignore specific paths `-i`:

```sh
try -i '/ignored.txt$' -y sh -c 'echo "shown" > shown.txt; echo "ignored" > ignored.txt'
```

With `-i`, `try` drops matching paths from the effect set, so `shown.txt` should be created but `ignored.txt` should not be committed.

Disable the network `-x`:

```sh
try curl https://example.com
try -x curl https://example.com
```

With `-x`,`try` runs the command without network access, so the first `curl` should work normally and the second should fail to reach the network.

Create an ordered filesystem trace `-t`:

```sh
touch {1..5}.txt
try -t trace.log -y 'rm 1.txt 3.txt 2.txt 4.txt 5.txt'
```

With `-t`, `try` records a filesystem trace while applying the effects, so the files should be removed and `trace.log` should contain an ordered log of the invocation's read and write effects.

Collect effect delta `--diff`:

```sh
try --diff "$SEMISOLATE"
```

Using `--diff`, `try` prints the raw effect delta for a saved semisolate, so you should see coded effect lines for the uncommitted changes stored in `$SEMISOLATE`.

Discard all effects `-n`:

```sh
try -n 'echo "data" > discarded.txt'
[ ! -f discarded.txt ] && echo "effect was discarded"
try -y 'echo "data" > discarded.txt'
[ -f discarded.txt ] && echo "effect was kept"
```

With `-n`, `try` discards the pending effects while with `-y` it applies them, so the first command should leave no file behind and the second should create `discarded.txt`.

Inspect and selectively apply effects `-e`:

```sh
try -e 'echo "keep" > keep.txt; echo "drop" > drop.txt'
```

With `-e`, `try` opens an editor with one effect per line, so after you delete some lines and save, only the remaining effects should be applied.

Include and exclude specific paths with `-I`, `-E`:

```sh
try -I kept.txt:kept-dir -y 'touch kept.txt dropped.txt; mkdir -p kept-dir; touch kept-dir/file.txt'
try -E /etc/hostname 'if [ -e /etc/hostname ]; then echo "visible"; else echo "hidden"; fi'
```

With `-I`, `try` keeps only the listed paths in the effect set and with `-E` it hides paths from the invoked command, so `kept.txt` and `kept-dir/file.txt` should be applied while `dropped.txt` is filtered out, and `/etc/hostname` should appear missing inside the `-E` run.

Stack over prior effects with `-L`:

```sh
sudo rm -rf /tmp/try-lower-a /tmp/try-lower-b
mkdir -p /tmp/try-lower-a /tmp/try-lower-b
try -D /tmp/try-lower-a 'echo "A" > a.txt'
try -D /tmp/try-lower-b 'echo "B" > b.txt'
try summary /tmp/try-lower-a
try summary /tmp/try-lower-b
try -L /tmp/try-lower-b:/tmp/try-lower-a 'cat a.txt b.txt'
```

With `-L`, `try` stacks prior semisolate environments as lower layers, so the final command should be able to read both `a.txt` and `b.txt` and print `A` followed by `B`.
