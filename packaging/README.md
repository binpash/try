This directory holds the packaging logic used to build distribution packages for `try`.

`build_packages.sh` builds a `.deb` and a `.rpm` from an unpacked `make dist` tarball, using
the native `dpkg-deb` and `rpmbuild` tools. On Debian/Ubuntu, `dpkg-deb` ships as part of the
base `dpkg` package; `rpmbuild` comes from the `rpm` package, which is not installed by
default and needs `apt-get install rpm` (or the equivalent) first.

# Building

From an unpacked `make dist` tarball, on a Debian/Ubuntu machine (or any environment with the
tools above):

```
packaging/build_packages.sh
```

Packages land in `dist-packages/`.

Both packages are built from a single staged tree.

# Why there is no Homebrew formula
`try` is Linux-only (Linux 5.11 or later).

For distributions outside the deb/rpm families, `../package.nix` and `../shell.nix` provide a Nix package, Arch Linux users can install the [AUR package](https://aur.archlinux.org/packages/try), and building from source with `./configure && make && make install` is supported everywhere.
