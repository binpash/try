AC_PREREQ(2.71)
AC_INIT([try], [0.2.0], [https://github.com/binpash/try/issues])

# make sure we're in the right place
AC_CONFIG_SRCDIR([try])
AC_REQUIRE_AUX_FILE([docs/try.1.md])

AC_ARG_ENABLE([utils], [AS_HELP_STRING([--disable-utils], [don't compile C utilities for summarizing and committing changes (default is yes)])], [enable_utils=${enableval}], [enable_utils=yes])

if test "$enable_utils" = "yes"
then
        AC_REQUIRE_AUX_FILE([utils/try-commit.c])

        # build tools
        AC_PROG_CC
        AC_PROG_INSTALL

        # CFLAGS and CPPFLAGGS
	if test -z "$CFLAGS"
	then
	        AUTO_CFLAGS="-g -Wall -O2"
	else
	        AUTO_CFLAGS=""
	fi
	AUTO_CPPFLAGS=""

	CFLAGS=${CFLAGS-"$AUTO_CFLAGS"}
	CPPFLAGS=${CPPFLAGS-"$AUTO_CPPFLAGS"}

	AC_SUBST(CFLAGS)
	AC_SUBST(CPPFLAGS)

	# needed C types
	AC_TYPE_PID_T
	AC_TYPE_SIZE_T
	AC_TYPE_SSIZE_T

	# needed C functions
	AC_FUNC_MALLOC
	AC_FUNC_REALLOC
	AC_FUNC_FORK
	AC_FUNC_LSTAT_FOLLOWS_SLASHED_SYMLINK

	AC_CHECK_HEADERS([fcntl.h unistd.h fts.h])
	AC_CHECK_FUNCS([regcomp perror strerror getline getxattr fts_open])

        missing_funs=""
        for fun in regcomp perror strerror getline getxattr fts_open
        do
                varname="\$ac_cv_func_$fun"
                if test "$(eval "echo ${varname-no}")" != "yes"
                then
                        missing_funs="$missing_funs $fun"
                fi
        done


        if ! test -z "$missing_funs"
        then
                AC_MSG_NOTICE([
---------------------------------------------------------------------
Some critical functions are missing, so utilities cannot be compiled.
Missing functions:$missing_funs
---------------------------------------------------------------------]);
                enable_utils=no
        fi
fi

# symlinks
AC_PROG_LN_S
if test "$LN_S" != "ln -s"
then
        AC_MSG_NOTICE([Your system seems to not have a working implementation of symbolic links. `try` may behave strangely.])
fi

# awk
AC_PROG_AWK
AC_MSG_CHECKING([whether awk is gawk])
if test "$(stat -L -c %i "$(type -p "$AWK")")" != "$(stat -L -c %i "$(type -p awk)")"
then
        AC_MSG_RESULT([no; some tests may behave strangely.])
else
        AC_MSG_RESULT([yes])
fi

#mktemp
AC_CHECK_PROG([MKTEMP], [mktemp], [yes], [no])
if test "$MKTEMP" = "no"
then
        AC_MSG_ERROR([try needs mktemp to work, but it could not be found.])
fi
AC_MSG_CHECKING([whether mktemp -d works])
d=$(mktemp -d 2>/dev/null)
if test "$?" != 0 || ! test -d "$d"
then
        AC_MSG_RESULT([no])
        AC_MSG_ERROR([try needs mktemp -d to work, but your mktemp does not support the -d option.])
else
        rmdir "$d"
        AC_MSG_RESULT([yes])
fi

AC_CHECK_PROG([DF], [df], [yes], [no])
if test "$MKTEMP" = "no"
then
        AC_MSG_ERROR([try needs mktemp to work, but it could not be found.])
fi

AC_CONFIG_FILES([Makefile:Makefile.in])
AC_OUTPUT

cat <<EOF
------------------------------------------------------------------------
${PACKAGE_NAME} version ${PACKAGE_VERSION}

Prefix: ${prefix}
Compiling utilities: $enable_utils

To build and install, run:

  make && make install
------------------------------------------------------------------------
EOF
