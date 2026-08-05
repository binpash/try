#!/bin/sh

REFERENCE_VERSION="$1"

SCRIPT_VERSION="$(grep 'TRY_VERSION=' try | cut -d'"' -f 2)"
MANPAGE_VERSION="$(grep 'TRY(1)' docs/try.1.md | cut -d' ' -f 4)"
INCLUDE_VERSION="$(grep '#define TRY_VERSION' utils/version.h | cut -d'"' -f 2)"
CONFIGAC_VERSION="$(grep AC_INIT configure.ac | cut -d'[' -f3 | cut -d']' -f1)"

if [ -z "$REFERENCE_VERSION" ]
then
    REFERENCE_VERSION="$SCRIPT_VERSION"
fi

if [ "$SCRIPT_VERSION" = "$REFERENCE_VERSION" ] &&
       [ "$MANPAGE_VERSION" = "$REFERENCE_VERSION" ] &&
       [ "$INCLUDE_VERSION" = "$REFERENCE_VERSION" ] &&
       [ "$CONFIGAC_VERSION" = "$REFERENCE_VERSION" ]
then
    printf "\033[32;1m✓ VERSIONS MATCH (%s) \033[0m\n" "$REFERENCE_VERSION"
else
    [ -n "$1" ] && echo "EXPECTED_VERSION = '$REFERENCE_VERSION'"
    echo "   SCRIPT_VERSION = '$SCRIPT_VERSION'"
    echo "  MANPAGE_VERSION = '$MANPAGE_VERSION'"
    echo "  INCLUDE_VERSION = '$INCLUDE_VERSION'"
    echo " CONFIGAC_VERSION = '$CONFIGAC_VERSION'"
    printf "\n❌ \033[31;1mVERSIONS DO NOT MATCH\033[0m\n"
    exit 1
fi
