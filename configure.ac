AC_PREREQ(2.70)
AC_INIT([try], [0.2.0], [https://github.com/binpash/try/issues])

# make sure we're in the right place
AC_CONFIG_SRCDIR([try])
AC_REQUIRE_AUX_FILE([docs/try.1.md])

AC_ARG_ENABLE([utils],
              [AS_HELP_STRING([--disable-utils],
                              [don't compile C utilities for summarizing and committing changes (default is yes)])],
              [enable_utils=${enableval}], [enable_utils=yes])

if test "$enable_utils" = "yes"
then
        AC_REQUIRE_AUX_FILE([utils/try-commit.c])

        # build tools
        AC_PROG_CC

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
------------------------------------------------------------------------
WARNING:

Some critical functions are missing, so utilities cannot be compiled.
Missing functions:$missing_funs

Continuing as if --disable-utils was passed.
------------------------------------------------------------------------
]);
                enable_utils=no
        fi
fi
AC_SUBST(enable_utils)

# install
AC_PROG_INSTALL

dnl TRY_REQUIRE_PROG(progname, checking_msg, pre, true_if_failed, post, fail_msg)
AC_DEFUN([TRY_REQUIRE_PROG], [
AC_MSG_CHECKING([ifelse([$2], [], [for $1], [$2])])
$3
if ifelse([$4], [], [! type -p $1 >/dev/null 2>&1], [$4])
then
        AC_MSG_RESULT([no])
        AC_MSG_ERROR([try needs $1 to work, but ifelse([$6], [], [it could not be found], [$6]).])
else
        AC_MSG_RESULT([yes])
        $5
fi
])

# symlinks
AC_PROG_LN_S
if test "$LN_S" != "ln -s"
then
        AC_MSG_NOTICE([
----------------------------------------------------------------------
WARNING

Your system seems to not have a working implementation of symbolic
links. `try` may behave strangely.
----------------------------------------------------------------------
])
fi

#mktemp
TRY_REQUIRE_PROG([mktemp])
TRY_REQUIRE_PROG([mktemp -d], [whether mktemp -d works], [d=$(mktemp -d 2>/dev/null)], [test "$?" != 0 || ! test -d "$d"], [rmdir "$d"], [your mktemp does not support the -d option])

TRY_REQUIRE_PROG([df])
TRY_REQUIRE_PROG([find])
TRY_REQUIRE_PROG([grep])
TRY_REQUIRE_PROG([findmnt])
TRY_REQUIRE_PROG([sort])
TRY_REQUIRE_PROG([getfattr])

TRY_REQUIRE_PROG([overlayfs],[for overlayfs],[],[! lsmod | grep -q overlay], [], [the overlay module did not appear in the output of lsmod])

AC_CHECK_PROG([mergerfs], [mergerfs], [yes], [no])
AC_CHECK_PROG([unionfs], [unionfs], [yes], [no])

AC_MSG_CHECKING([for union helpers (unionfs or mergerfs)])
if test "$ac_cv_prog_mergerfs" = "no" && test "$ac_cv_prog_unionfs" = "no"
then
        AC_MSG_RESULT([no; try may issue warnings and error messages])
else
        AC_MSG_RESULT([yes])
fi

TRY_REQUIRE_PROG([readlink])
TRY_REQUIRE_PROG([unshare], [for unshare], [
res=$(unshare --mount --map-root-user --user --pid --fork -- ls $PWD/try 2>/dev/null)
], [
test "$?" != 0 || test "$res" != "$PWD/try"
], [], [could not run unshare])

# for manpages
if test -f man/try.1.gz
then
        need_manpage=no
else
        need_manpage=yes
fi
AC_ARG_ENABLE([manpage],
              [AS_HELP_STRING([--enable-manpage],
                              [generate the manpage instead of using the cached version (requires pandoc, default is no when man/try.1.gz is present)])],
              [enable_manpage=${enableval}], [enable_manpage=${need_manpage}])
if test "$enable_manpage" = "yes"
then
        AC_MSG_CHECKING([for pandoc (for manpage)])
        if ! type -p pandoc >/dev/null 2>&1
        then
                AC_MSG_RESULT([no])
                enable_manpage="no"
        else
                AC_MSG_RESULT([yes])
        fi

        AC_MSG_CHECKING([for gzip (for manpage)])
        if ! type -p gzip >/dev/null 2>&1
        then
                AC_MSG_RESULT([no])
                enable_manpage="no"
        else
                AC_MSG_RESULT([yes])
        fi

        if test "$enable_manpage" = no
        then
                if test -f man/try.1.gz
                then
                        AC_MSG_NOTICE([
------------------------------------------------------------------------
WARNING

Your system is missing some programs used to generate the manpage, so
the cached version will be used instead.
------------------------------------------------------------------------
])
                else
                        AC_MSG_ERROR([
------------------------------------------------------------------------
WARNING

Your system is missing some programs used to generate the manpage and
no cached manpage is available.
------------------------------------------------------------------------
])
                fi
        fi
fi
AC_SUBST(enable_manpage)


# programs just used in tests
missing_test_programs=0

AC_PROG_AWK
AC_MSG_CHECKING([whether awk is gawk (for tests)])
if test "$(stat -L -c %i "$(type -p "$AWK")")" != "$(stat -L -c %i "$(type -p awk)")"
then
        AC_MSG_RESULT([no; some tests may behave strangely])
        : $((missing_test_programs += 1))
else
        AC_MSG_RESULT([yes])
fi

dnl TRY_REQUIRE_PROG(progname)
AC_DEFUN([TRY_TEST_PROG], [
AC_MSG_CHECKING([for $1 (for tests)])
if ! type -p $1 >/dev/null 2>&1
then
        AC_MSG_RESULT([no; some tests may fail])
        : $((missing_test_programs += 1))
else
        AC_MSG_RESULT([yes])
fi
])

TRY_TEST_PROG([expect])
TRY_TEST_PROG([curl])
TRY_TEST_PROG([diff])
TRY_TEST_PROG([touch])
TRY_TEST_PROG([gunzip])

if test "$missing_test_programs" -ne 0
then
        AC_MSG_NOTICE([
------------------------------------------------------------------------
WARNING

Your system is missing some programs used in tests, so some tests may
fail.
------------------------------------------------------------------------
])

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
