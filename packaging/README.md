This directory holds the container image used to build distribution packages for `try`.

The `Dockerfile` builds a Debian image with a toolchain plus `dpkg-dev` and `rpm`, which
provide the native `dpkg-deb` and `rpmbuild` packaging tools.
The actual packaging logic lives in `build_packages.sh`, which runs inside that image.

# Building

From an unpacked `make dist` tarball:

```
docker build -t try-packager packaging/
docker run --rm -v "$PWD:/work" -w /work try-packager packaging/build_packages.sh
```

Packages land in `dist-packages/`. The bind mount means the results appear on the host directly, with no copy step out of the container.

Both packages are built from a single staged tree.

# Why there is no Homebrew formula
`try` is Linux-only (Linux 5.11 or later).

For distributions outside the deb/rpm families, `../package.nix` and `../shell.nix` provide a Nix package, and building from source with `./configure && make && make install` is supported everywhere.
