#define _GNU_SOURCE
#include <assert.h>
#include <errno.h>
#include <fcntl.h>
#include <fts.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/xattr.h>

static int changes_detected = 0;
void show_change(char *local_file, char *msg) {
  if (!changes_detected) {
    changes_detected += 1;
    printf("\nChanges detected in the following files:\n\n");
  }

  printf("%s (%s)\n", local_file, msg);
}

int main(int argc, char *argv[]) {
  char *dirs[2] = { argv[1], NULL };
  size_t prefix_len = strlen(argv[1]);

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
  assert(strcmp(ent->fts_path, argv[1]) == 0);

  while ((ent = fts_read(fts)) != NULL) {
    char *local_file = ent->fts_path + prefix_len;

    struct stat local_stat;
    int local_exists = lstat(local_file, &local_stat) != -1;

    switch (ent->fts_info) {
    case FTS_D: // preorder (first visit)
      if (!local_exists) {
        // new directory in upper
        show_change(local_file, "created dir");

        // TODO(mgree): we can fts_set to not bother exploring
        break;
      }

      // special "OPAQUE" whiteout directory--delete the original
      char xattr_buf[2] = { '\0', '\0' };
      if (getxattr(ent->fts_path, "trusted.overlay.opaque", xattr_buf, 2) != -1 && xattr_buf[0] == 'y') {
        show_change(local_file, "deleted"); // really, recursively deleted
        break;
      }

      // non-directory replaced with a directory
      if (!S_ISDIR(local_stat.st_mode)) {
        show_change(local_file, "replaced with dir");
        break;
      }

      // nothing of interest! directory got made, but modifications must be inside
      break;
    case FTS_F: // regular file
      if (getxattr(ent->fts_path, "trusted.overlay.whiteout", NULL, 0) != -1) {
        show_change(local_file, "deleted");
        break;
      }

      if (local_exists) {
        show_change(local_file, "modified");
        break;
      }

      show_change(local_file, "added");
      break;

    case FTS_SL: // symbolic link
    case FTS_SLNONE: // dangling symbolic link
      show_change(local_file, "symlink");
      break;

    case FTS_DEFAULT:
      struct stat *statp = ent->fts_statp;
      if (S_ISCHR(statp->st_mode) && statp->st_size == 0) {
        struct statx statxp;
        if (statx(AT_FDCWD, ent->fts_path, 0, STATX_TYPE | STATX_INO, &statxp) == -1) {
          fprintf(stderr, "try-summary: statx: %s: %s\n", ent->fts_path, strerror(errno));
          break;
        }

        if (statxp.stx_rdev_major == 0 && statxp.stx_rdev_minor == 0) {
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

  return changes_detected == 0 ? 1 : 0;
}
