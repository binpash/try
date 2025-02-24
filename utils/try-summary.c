#define _GNU_SOURCE
#include <assert.h>
#include <errno.h>
#include <fcntl.h>
#include <fts.h>
#include <getopt.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/xattr.h>

#include "ignores.h"
#include "version.h"

static int changes_detected = 0;
void show_change(char *local_file, char *msg) {
  if (!changes_detected) {
    changes_detected += 1;
    fputs("\nChanges detected in the following files:\n\n", stdout);
  }

  fputs(local_file, stdout);
  fputs(" (", stdout);
  fputs(msg, stdout);
  fputs(")\n", stdout);
}

void usage(int status) {
  fprintf(stderr, "Usage: try-summary [-i IGNORE_FILE] SANDBOX_DIR\n");
  exit(status);
}

int main(int argc, char *argv[]) {
  int opt;
  while ((opt = getopt(argc, argv, "hvi:")) != -1) {
    switch (opt) {
    case 'i':
      load_ignores("try-summary", optarg);
      break;
    case 'v':
      fprintf(stderr, "try-summary version " TRY_VERSION "\n");
      exit(0);
    case 'h':
      usage(0);
    default:
      usage(2);
    }
  }

  if (argc != optind + 1) {
    usage(2);
  }

  struct stat sandbox_stat;
  if (stat(argv[optind], &sandbox_stat) == -1) {
    perror("try-summary: could not find sandbox dircteory");
    return 2;
  }

  if (!S_ISDIR(sandbox_stat.st_mode)) {
    perror("try-summary: sandbox is not a directory");
    return 2;
  }

  size_t prefix_len = strlen(argv[optind]);

  // trim final slashes
  while (argv[optind][prefix_len-1] == '/') {
    argv[optind][prefix_len-1] = '\0';
    prefix_len -= 1;
  }

  char upperdir_path[prefix_len + 10];
  strncpy(upperdir_path, argv[optind], prefix_len);
  strncpy(upperdir_path + prefix_len, "/upperdir", 10);
  prefix_len += 9;

  char *dirs[2] = { upperdir_path, NULL };

  FTS *fts = fts_open(dirs, FTS_PHYSICAL, NULL);

  if (fts == NULL) {
    perror("try-summary: fts_open");
    return 2;
  }

  FTSENT *ent = fts_read(fts);

  // skip first entry (the named directory, corresponds to root)
  if (ent == NULL) {
    perror("try-summary: fts_read");
    return 2;
  }
  assert(strcmp(ent->fts_path, upperdir_path) == 0);
  if (ent->fts_info != FTS_D) {
    fprintf(stderr, "try-summary: %s is not a directory\n", ent->fts_path);
    return 1;
  }

  while ((ent = fts_read(fts)) != NULL) {
    char *local_file = ent->fts_path + prefix_len;

    if (should_ignore(local_file)) { continue; }

    struct stat local_stat;
    int local_exists = lstat(local_file, &local_stat) != -1;

    switch (ent->fts_info) {
    case FTS_D: // preorder (first visit)
      if (!local_exists) {
        // TRYCASE(dir, nonexist)
        show_change(local_file, "created dir");

        // don't traverse children, we copied the whole thing
        fts_set(fts, ent, FTS_SKIP);
        break;
      }

      // special "OPAQUE" whiteout directory--delete the original
      char xattr_buf[2] = { '\0', '\0' };
      if (getxattr(ent->fts_path, "user.overlay.opaque", xattr_buf, 2) != -1 && xattr_buf[0] == 'y') {
        // TRYCASE(opaque, *)
        // TRYCASE(dir, dir)
        show_change(local_file, "replaced with dir");
        break;
      }

      // non-directory replaced with a directory
      if (!S_ISDIR(local_stat.st_mode)) {
        // TRYCASE(dir, file)
        // TRYCASE(dir, symlink)
        show_change(local_file, "replaced with dir");
        break;
      }

      // nothing of interest! directory got made, but modifications must be inside
      break;
    case FTS_F: // regular file
      if (getxattr(ent->fts_path, "user.overlay.whiteout", NULL, 0) != -1) {
        // TRYCASE(whiteout, *)
        show_change(local_file, "deleted");
        break;
      }

      if (local_exists) {
        // TRYCASE(file, file)
        // TRYCASE(file, dir)
        // TRYCASE(file, symlink)
        show_change(local_file, "modified");
        break;
      }

      // TRYCASE(file, nonexist)
      show_change(local_file, "added");
      break;

    case FTS_SL: // symbolic link
    case FTS_SLNONE: // dangling symbolic link
      // TRYCASE(symlink, *)
      show_change(local_file, "symlink");
      break;

    case FTS_DEFAULT:
      if (S_ISCHR(ent->fts_statp->st_mode) && ent->fts_statp->st_size == 0) {
        struct statx statxp;
        if (statx(AT_FDCWD, ent->fts_path, 0, STATX_TYPE | STATX_INO, &statxp) == -1) {
          fprintf(stderr, "try-summary: statx: %s: %s\n", ent->fts_path, strerror(errno));
          break;
        }

        if (statxp.stx_rdev_major == 0 && statxp.stx_rdev_minor == 0) {
          // TRYCASE(whiteout, *)
          show_change(local_file, "deleted");
          break;
        }
      }

    case FTS_DC: // cycle
    case FTS_DP: // postorder (second visit)
      break;

    case FTS_DNR:
    case FTS_ERR:
    default:
      fprintf(stderr, "try-summary: fts_read: %s: %s\n", ent->fts_path, strerror(errno));
      break; // error with this directory
    }
  }

  if (errno != 0) {
    perror("try-summary: fts_read");
    return 2;
  }

  fts_close(fts);
  free_ignores();

  return changes_detected == 0 ? 1 : 0;
}
