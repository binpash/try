#!/bin/sh

# Builds .deb and .rpm packages from an unpacked try dist tree using fpm.
# Intended to run inside packaging/Dockerfile, against the tarball produced
# by `make dist`.

set -e

VERSION=$(grep '#define TRY_VERSION' utils/version.h | cut -d'"' -f2)
ARCH=$(dpkg --print-architecture)
PKGROOT="$PWD/pkgroot"
OUTDIR="$PWD/dist-packages"

rm -rf "$PKGROOT" "$OUTDIR"
mkdir -p "$OUTDIR"

grep -q '^AC_DEFUN(\[TRY_REQUIRE_PROG\], \[\])$' configure.ac ||
    sed -i '/^AC_DEFUN(\[TRY_REQUIRE_PROG\]/,/^])$/c\AC_DEFUN([TRY_REQUIRE_PROG], [])' configure.ac
autoconf

./configure --prefix=/usr
make
make install prefix="$PKGROOT/usr"

################################################################################
# build one package with fpm
################################################################################

build_pkg() {
    format="$1"
    output="$2"

    fpm -s dir -C "$PKGROOT" -t "$format" -p "$output" \
        --name try \
        --version "$VERSION" \
        --license MIT \
        --url https://github.com/binpash/try \
        --description "Lets you run a command and inspect its effects before changing your live system" \
        --depends attr \
        usr
}

build_pkg deb "$OUTDIR/try_${VERSION}_$ARCH.deb"
build_pkg rpm "$OUTDIR/try-$VERSION-1.$(uname -m).rpm"
