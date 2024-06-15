#ifndef __TRY_IGNORES_H
#define __TRY_IGNORES_H

#include <regex.h>
#include <stddef.h>

void load_ignores(char *progname, char *ignore_file);
int should_ignore(char *filename);
void free_ignores();

#endif
