#ifndef __TRY_EXCLUDES_H
#define __TRY_EXCLUDES_H

#include <regex.h>
#include <stddef.h>

void load_excludes(char *progname, char *exclude_file);
int should_exclude(char *filename);
void load_includes(char *progname, char *include_file);
int should_include(char *filename);
void free_excludes();
void free_includes();

#endif
