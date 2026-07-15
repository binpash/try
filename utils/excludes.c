#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>

#include "excludes.h"

static regex_t *excludes = NULL;
static size_t excludes_len = 0;
static int num_excludes = 0;
static regex_t *includes = NULL;
static size_t includes_len = 0;
static int num_includes = 0;

int should_exclude(char *filename) {
  for (int i = 0; i < num_excludes; i += 1) {
    if (regexec(&excludes[i], filename, 0, NULL, 0) == 0) {
      return 1;
    }
  }

  return 0;
}

int should_include(char *filename) {
  if (num_includes == 0) {
    return 1;
  }

  for (int i = 0; i < num_includes; i += 1) {
    if (regexec(&includes[i], filename, 0, NULL, 0) == 0) {
      return 1;
    }
  }

  return 0;
}

void load_excludes(char *progname, char *exclude_filename) {
  FILE *exclude_file = fopen(exclude_filename, "r");
  if (exclude_file == NULL) {
    fprintf(stderr, "%s: couldn't load exclude file '%s'\n", progname, exclude_filename);
    return;
  }

  excludes_len = 4;
  excludes = (regex_t *) malloc(sizeof(regex_t) * excludes_len);
  num_excludes = 0;

  char *line = NULL;
  size_t len = 0;
  ssize_t nread;

  while ((nread = getline(&line, &len, exclude_file)) != -1) {
    if (num_excludes == excludes_len) {
      excludes_len *= 2;
      excludes = realloc(excludes, sizeof(regex_t) * excludes_len);
    }

    line[nread-1] = '\0'; // kill newline before compilation
    int errcode = 0;
    if ((errcode = regcomp(&excludes[num_excludes], line, REG_EXTENDED | REG_NOSUB)) != 0) {
      size_t err_len = regerror(errcode, &excludes[num_excludes], NULL, 0);
      char err[err_len];
      regerror(errcode, &excludes[num_excludes], err, err_len);

      fprintf(stderr, "%s: couldn't process regex '%s': %s\n", progname, line, err);
      continue;
    }

    num_excludes += 1;
  }

  free(line);
  fclose(exclude_file);
}

void load_includes(char *progname, char *include_filename) {
  FILE *include_file = fopen(include_filename, "r");
  if (include_file == NULL) {
    fprintf(stderr, "%s: couldn't load include file '%s'\n", progname, include_filename);
    return;
  }

  includes_len = 4;
  includes = (regex_t *) malloc(sizeof(regex_t) * includes_len);
  num_includes = 0;

  char *line = NULL;
  size_t len = 0;
  ssize_t nread;

  while ((nread = getline(&line, &len, include_file)) != -1) {
    if (includes_len == num_includes) {
      includes_len *= 2;
      includes = realloc(includes, sizeof(regex_t) * includes_len);
    }

    line[nread-1] = '\0'; // kill newline before compilation
    int errcode = 0;
    if ((errcode = regcomp(&includes[num_includes], line, REG_EXTENDED | REG_NOSUB)) != 0) {
      size_t err_len = regerror(errcode, &includes[num_includes], NULL, 0);
      char err[err_len];
      regerror(errcode, &includes[num_includes], err, err_len);

      fprintf(stderr, "%s: couldn't process regex '%s': %s\n", progname, line, err);
      continue;
    }

    num_includes += 1;
  }

  free(line);
  fclose(include_file);
}

void free_excludes() {
  for (int i = 0; i < num_excludes; i += 1) {
    regfree(&excludes[i]);
  }
  free(excludes);
  excludes = NULL;
  num_excludes = 0;
  excludes_len = 0;
}

void free_includes() {
  for (int i = 0; i < num_includes; i += 1) {
    regfree(&includes[i]);
  }
  free(includes);
  includes = NULL;
  num_includes = 0;
  includes_len = 0;
}
