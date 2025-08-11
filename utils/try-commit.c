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
#include "version.h"

static int should_copy = 0;

static int num_errors = 0;
void commit_error(char *changed_file, char *msg) {
  num_errors += 1;

  fprintf(stderr, "try-commit: couldn't commit %s (%s): %s\n", changed_file, msg, strerror(errno));
}

void run(char *argv[], char *file) {
    pid_t pid = fork();

    if (pid == 0) {
      execvp(argv[0], argv);
      return; // unreachable
    }

    int status = -1;
    waitpid(pid, &status, 0);

    if (status != 0) {
      commit_error(file, argv[0]);
    }
}

void commit(char *changed_file, char *local_file) {
  if (should_copy) {
    char *argv[5] = { "cp", "-fa", changed_file, local_file, NULL };
    run(argv, changed_file);
    return;
  }

  if (rename(changed_file, local_file) != 0) {
    if (errno != EXDEV) {
      commit_error(changed_file, "rename");
      return;
    }

    // cross-device move... not a simple call. defer to system utility
    char *argv[4] = { "mv", changed_file, local_file, NULL };
    run(argv, changed_file);
  }
}

void remove_local(char *local_file, int local_exists, struct stat *local_stat) {
  if (!local_exists) {
    return;
  }

  if (S_ISDIR(local_stat->st_mode)) {
    char *argv[4] = { "rm", "-rf", local_file, NULL };
    run(argv, local_file);
    return;
  }

  if (unlink(local_file) != 0) {
    commit_error(local_file, "rm");
  }
}

void usage(int status) {
  fprintf(stderr, "Usage: try-commit [-c] [-i IGNORE_FILE] SANDBOX_DIR\n");
  fprintf(stderr, "\t-c\tcopy files instead of moving them\n");
  exit(status);
}

int main(int argc, char *argv[]) {
  int opt;
  while ((opt = getopt(argc, argv, "hvci:")) != -1) {
    switch (opt) {
    case 'i':
      load_ignores("try-commit", optarg);
      break;
    case 'c':
      should_copy = 1;
      break;
    case 'v':
      fprintf(stderr, "try-commit version " TRY_VERSION "\n");
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
    perror("try-commit: could not find sandbox dircteory");
    return 2;
  }

  if (!S_ISDIR(sandbox_stat.st_mode)) {
    perror("try-commit: sandbox is not a directory");
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
    perror("try-commit: fts_open");
    return 2;
  }

  FTSENT *ent = fts_read(fts);

  // skip first entry (the named directory, corresponds to root)
  if (ent == NULL) {
    perror("try-commit: fts_read");
    return 2;
  }
  assert(strcmp(ent->fts_path, upperdir_path) == 0);
  if (ent->fts_info != FTS_D) {
    fprintf(stderr, "try-commit: sandbox upperdir '%s' is not a directory\n", ent->fts_path);
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
        commit(ent->fts_path, local_file);

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

        commit(ent->fts_path, local_file);

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

        commit(ent->fts_path, local_file);

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
      commit(ent->fts_path, local_file);
      break;

    case FTS_SL: // symbolic link
    case FTS_SLNONE: // dangling symbolic link
      // TRYCASE(symlink, *)
      remove_local(local_file, local_exists, &local_stat);

      // absolute shenanigans: what's the target (and how long is its name)?
      size_t tgt_len = ent->fts_statp->st_size + 1;
      if (tgt_len <= 1) { // procfs (and possibly others) return `st_size` of 0 :(
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
      
      if (S_ISFIFO(ent->fts_statp->st_mode) || (S_ISSOCK(ent->fts_statp->st_mode))) {

        if (local_exists) {
          // TRYCASE(fifo, file)
          // TRYCASE(fifo, dir)
          // TRYCASE(fifo, symlink)
          // TRYCASE(socket, file)
          // TRYCASE(socket, dir)
          // TRYCASE(socket, symlink)
          remove_local(local_file, local_exists, &local_stat);
        }

        // TRYCASE(fifo, nonexist)
        // TRYCASE(socket, nonexist)
        commit(ent->fts_path, local_file);
        break;
      }

      if (S_ISCHR(ent->fts_statp->st_mode) && ent->fts_statp->st_size == 0) {
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
