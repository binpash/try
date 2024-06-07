#include <stdio.h>
#include <stdlib.h>

#include "ignores.h"

static regex_t *ignores = NULL;
static size_t ignores_len = 0;
static int num_ignores = 0;

int should_ignore(char *filename) {
  for (int i = 0; i < num_ignores; i += 1) {
    if (regexec(&ignores[i], filename, 0, NULL, 0) == 0) {
      return 1;
    }
  }

  return 0;
}

void load_ignores(char *progname, char *ignore_filename) {
  FILE *ignore_file = fopen(ignore_filename, "r");
  if (ignore_file == NULL) {
    fprintf(stderr, "%s: couldn't load ignore file '%s'\n", progname, ignore_file);
    return;
  }

  ignores_len = 4;
  ignores = (regex_t *) malloc(sizeof(regex_t) * ignores_len);
  num_ignores = 0;

  char *line = NULL;
  size_t len = 0;
  ssize_t nread;

  while ((nread = getline(&line, &len, ignore_file)) != -1) {
    if (num_ignores == ignores_len) {
      ignores_len *= 2;
      ignores = realloc(ignores, sizeof(regex_t) * ignores_len);
    }

    line[nread-1] = '\0'; // kill newline before compilation
    int errcode = 0;
    if ((errcode = regcomp(&ignores[num_ignores], line, REG_EXTENDED | REG_NOSUB)) != 0) {
      size_t err_len = regerror(errcode, &ignores[num_ignores], NULL, 0);
      char err[err_len];
      regerror(errcode, &ignores[num_ignores], err, err_len);

      fprintf(stderr, "%s: couldn't process regex '%s': %s\n", progname, line, err);
      continue;
    }

    num_ignores += 1;
  }

  free(line);
  fclose(ignore_file);
}

void free_ignores() {
  for (int i = 0; i < num_ignores; i += 1) {
    regfree(&ignores[i]);
  }
  free(ignores);
  ignores = NULL;
  num_ignores = 0;
  ignores_len = 0;
}
