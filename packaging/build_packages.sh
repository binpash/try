#!/bin/sh

# Builds .deb and .rpm packages from an unpacked try dist tree using
# native packaging tools (dpkg-deb, rpmbuild), against the tarball
# produced by `make dist`.

set -e

VERSION=$(grep '#define TRY_VERSION' utils/version.h | cut -d'"' -f2)
ARCH=$(dpkg --print-architecture)
RPMARCH=$(uname -m)
PKGROOT="$PWD/pkgroot"
OUTDIR="$PWD/dist-packages"
RPMTOPDIR="$PWD/rpmbuild"

DESCRIPTION="Lets you run a command and inspect its effects before changing your live system"

for d in "$PKGROOT" "$OUTDIR" "$RPMTOPDIR"; do
    if [ -e "$d" ]; then
        echo "error: $d already exists; refusing to overwrite" >&2
        exit 1
    fi
done
mkdir -p "$OUTDIR"

grep -q '^AC_DEFUN(\[TRY_REQUIRE_PROG\], \[\])$' configure.ac ||
    sed -i '/^AC_DEFUN(\[TRY_REQUIRE_PROG\]/,/^])$/c\AC_DEFUN([TRY_REQUIRE_PROG], [])' configure.ac
autoconf

./configure
make
make install prefix="$PKGROOT/usr"

# build .deb with dpkg-deb
build_deb() {
    output="$1"

    mkdir -p "$PKGROOT/DEBIAN"
    size=$(du -sk "$PKGROOT/usr" | cut -f1)

    cat > "$PKGROOT/DEBIAN/control" <<EOF
Package: try
Version: $VERSION
Section: utils
Priority: optional
Architecture: $ARCH
Installed-Size: $size
Depends: attr
Maintainer: try maintainers <https://github.com/binpash/try>
Homepage: https://github.com/binpash/try
Description: $DESCRIPTION
EOF

    dpkg-deb --build --root-owner-group "$PKGROOT" "$output"
}

# build .rpm with rpmbuild
build_rpm() {
    output="$1"

    mkdir -p "$RPMTOPDIR/BUILD" "$RPMTOPDIR/RPMS" "$RPMTOPDIR/SOURCES" \
        "$RPMTOPDIR/SPECS" "$RPMTOPDIR/SRPMS" "$RPMTOPDIR/BUILDROOT"

    filelist=$(cd "$PKGROOT" && find usr \( -type f -o -type l \) | sed 's|^|/|')

    {
        echo "Name: try"
        echo "Version: $VERSION"
        echo "Release: 1"
        echo "Summary: $DESCRIPTION"
        echo "License: MIT"
        echo "URL: https://github.com/binpash/try"
        echo "BuildArch: $RPMARCH"
        echo "Requires: attr"
        echo "%undefine _enable_debug_packages"
        echo "%global debug_package %{nil}"
        echo "%global __os_install_post %{nil}"
        echo "%global _build_id_links none"
        echo ""
        echo "%description"
        echo "$DESCRIPTION"
        echo ""
        echo "%install"
        echo "cp -a '$PKGROOT'/usr %{buildroot}/usr"
        echo ""
        echo "%files"
        echo "$filelist"
    } > "$RPMTOPDIR/SPECS/try.spec"

    rpmbuild --define "_topdir $RPMTOPDIR" -bb "$RPMTOPDIR/SPECS/try.spec"
    cp "$RPMTOPDIR/RPMS/$RPMARCH"/*.rpm "$output"
}

build_deb "$OUTDIR/try_${VERSION}_$ARCH.deb"
build_rpm "$OUTDIR/try-$VERSION-1.$RPMARCH.rpm"
