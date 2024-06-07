#define _GNU_SOURCE
#include <assert.h>
#include <errno.h>
#include <fcntl.h>
#include <fts.h>
#include <getopt.h>
#include <linux/limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <sys/xattr.h>
#include <unistd.h>

#include "ignores.h"

static int num_errors = 0;
void commit_error(char *changed_file, char *msg) {
  num_errors += 1;

  fprintf(stderr, "try-commit: couldn't commit %s (%s): %s\n", changed_file, msg, strerror(errno));
}

void move(char *changed_file, char *local_file) {
  if (rename(changed_file, local_file) != 0) {
    if (errno != EXDEV) {
      commit_error(changed_file, "rename");
      return;
    }

    // cross-device move... not a simple call. defer to system utility
    pid_t pid = fork();

    if (pid == 0) {
      char *argv[4] = { "mv", changed_file, local_file, NULL };
      execvp("mv", argv);
      return; // unreachable
    }

    int status = -1;
    waitpid(pid, &status, 0);

    if (status != 0) {
      commit_error(changed_file, "mv");
    }
  }
}

int remove_local(char *local_file, int local_exists, struct stat *local_stat) {
  if (!local_exists) {
    return 0;
  }

  if (S_ISDIR(local_stat->st_mode)) {
    // need rm -rf
    pid_t pid = fork();

    if (pid == 0) {
      printf("executing rm -rf %s\n", local_file);
      sleep(5);
      char *argv[4] = { "rm", "-rf", local_file, NULL };
      execvp("rm", argv);
      return -1; // unreachable
    }

    int status = -1;
    waitpid(pid, &status, 0);

    if (status != 0) {
      commit_error(local_file, "rm -rf");
    }
    return -1;
  }

  if (unlink(local_file) != 0) {
    commit_error(local_file, "rm");
    return -1;
  }

  return 0;
}

void usage() {
  fprintf(stderr, "Usage: try-commit [-i IGNORE_FILE] SANDBOX_UPPERDIR\n");
  exit(2);
}

int main(int argc, char *argv[]) {
  int opt;
  while ((opt = getopt(argc, argv, "hi:")) != -1) {
    switch (opt) {
    case 'i':
      load_ignores("try-commit", optarg);
      break;
    case 'h':
    default:
      usage();
    }
  }

  if (argc != optind + 1) {
    usage();
  }

  char *dirs[2] = { argv[optind], NULL };
  size_t prefix_len = strlen(argv[optind]);

  FTS *fts = fts_open(dirs, FTS_PHYSICAL, NULL);

  if (fts == NULL) {
    perror("try-commit: fts_open");
    return 2;
  }

  FTSENT *ent = fts_read(fts);

  // skip first entry (the named directory, corresponds to root)
  if (ent == NULL) {
    perror("try-commit: fts_read");
    return 2;
  }
  assert(strcmp(ent->fts_path, argv[optind]) == 0);

  while ((ent = fts_read(fts)) != NULL) {
    char *local_file = ent->fts_path + prefix_len;

    if (should_ignore(local_file)) { continue; }

    struct stat local_stat;
    int local_exists = lstat(local_file, &local_stat) != -1;

    switch (ent->fts_info) {
    case FTS_D: // preorder (first visit)
      if (!local_exists) {
        // TRYCASE(dir, nonexist)
        move(ent->fts_path, local_file);

        // don't traverse children, we copied the whole thing
        fts_set(fts, ent, FTS_SKIP);
        break;
      }

      // special "OPAQUE" whiteout directory--delete the original
      char xattr_buf[2] = { '\0', '\0' };
      if (getxattr(ent->fts_path, "user.overlay.opaque", xattr_buf, 2) != -1 && xattr_buf[0] == 'y') {
        // TRYCASE(opaque, *)
        // TRYCASE(dir, dir)
        remove_local(local_file, local_exists, &local_stat);

        move(ent->fts_path, local_file);

        // don't traverse children, we copied the whole thing
        fts_set(fts, ent, FTS_SKIP);
        break;
      }

      // non-directory replaced with a directory
      if (!S_ISDIR(local_stat.st_mode)) {
        // TRYCASE(dir, file)
        // TRYCASE(dir, symlink)

        if (unlink(local_file) != 0) {
          commit_error(ent->fts_path, "rm");
        }

        move(ent->fts_path, local_file);

        // don't traverse children, we copied the whole thing
        fts_set(fts, ent, FTS_SKIP);
        break;
      }

      // nothing of interest! directory got made, but modifications must be inside
      break;
    case FTS_F: // regular file
      if (getxattr(ent->fts_path, "user.overlay.whiteout", NULL, 0) != -1) {
        // TRYCASE(whiteout, *)
        remove_local(local_file, local_exists, &local_stat);
        break;
      }

      if (local_exists) {
        // TRYCASE(file, file)
        // TRYCASE(file, dir)
        // TRYCASE(file, symlink)
        remove_local(local_file, local_exists, &local_stat);
      }

      // TRYCASE(file, nonexist)
      move(ent->fts_path, local_file);
      break;

    case FTS_SL: // symbolic link
    case FTS_SLNONE: // dangling symbolic link
      // TRYCASE(symlink, *)
      remove_local(local_file, local_exists, &local_stat);

      // absolute shenanigans: what's the target (and how long is its name)?
      size_t tgt_len = ent->fts_statp->st_size + 1;
      if (tgt_len == 0) { // apparently fancy FS can lie?
        tgt_len = PATH_MAX;
      }

      char *tgt = malloc(sizeof(char) * tgt_len);
      int nbytes = readlink(ent->fts_path, tgt, tgt_len);
      if (nbytes == -1) {
        commit_error(ent->fts_path, "ln -s");
      }

      while (nbytes == tgt_len) {
        tgt_len *= 2;
        tgt = realloc(tgt, sizeof(char) * tgt_len);
        nbytes = readlink(ent->fts_path, tgt, tgt_len);
        if (nbytes == -1) {
          commit_error(ent->fts_path, "ln -s");
        }
      }
      tgt[nbytes] = '\0'; // readlink doesn't put a null byte on the end lol nice work everyone

      if (symlink(tgt, local_file) != 0) {
        commit_error(ent->fts_path, "ln -s");
      }
      free(tgt);
      break;

    case FTS_DEFAULT:
      struct stat *statp = ent->fts_statp;
      if (S_ISCHR(statp->st_mode) && statp->st_size == 0) {
        struct statx statxp;
        if (statx(AT_FDCWD, ent->fts_path, 0, STATX_TYPE | STATX_INO, &statxp) == -1) {
          fprintf(stderr, "try-commit: statx: %s: %s\n", ent->fts_path, strerror(errno));
          break;
        }

        if (statxp.stx_rdev_major == 0 && statxp.stx_rdev_minor == 0) {
          // TRYCASE(whiteout, *)
          remove_local(local_file, local_exists, &local_stat);

          break;
        }
      }

    case FTS_DC: // cycle
    case FTS_DP: // postorder (second visit)
      break;

    case FTS_DNR:
    case FTS_ERR:
    default:
      fprintf(stderr, "try-commit: fts_read: %s: %s\n", ent->fts_path, strerror(errno));
      break; // error with this directory
    }
  }

  if (errno != 0) {
    perror("try-commit: fts_read");
    return 2;
  }

  fts_close(fts);
  free_ignores();

  return num_errors == 0 ? 0 : 1;
}
