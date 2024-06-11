#!/bin/sh

SCRIPT_VERSION="$(grep 'TRY_VERSION=' try | cut -d'"' -f 2)"
MANPAGE_VERSION="$(grep 'TRY(1)' docs/try.1.md | cut -d' ' -f 4)"
INCLUDE_VERSION="$(grep '#define TRY_VERSION' utils/version.h | cut -d'"' -f 2)"
CONFIGAC_VERSION="$(grep AC_INIT configure.ac | cut -d'[' -f3 | cut -d']' -f1)"

if [ "$SCRIPT_VERSION" = "$MANPAGE_VERSION" ] &&
       [ "$SCRIPT_VERSION" = "$INCLUDE_VERSION" ] &&
       [ "$SCRIPT_VERSION" = "$CONFIGAC_VERSION" ]
then
    printf "\033[32;1m✓ VERSIONS MATCH (%s) \033[0m\n" "$SCRIPT_VERSION"
else
    echo "  SCRIPT_VERSION = '$SCRIPT_VERSION'"
    echo " MANPAGE_VERSION = '$MANPAGE_VERSION'"
    echo " INCLUDE_VERSION = '$INCLUDE_VERSION'"
    echo "CONFIGAC_VERSION = '$CONFIGAC_VERSION'"
    printf "\n❌ \033[31;1mVERSIONS DO NOT MATCH\033[0m\n"
fi
