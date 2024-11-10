#define _GNU_SOURCE
#include <dlfcn.h>
#include <stdio.h>
#include <errno.h>
#include <unistd.h>
#include <sys/stat.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>

int rename(const char *oldpath, const char *newpath) {
    // Get the original `rename` function
    int (*orig_rename)(const char*, const char*) = dlsym(RTLD_NEXT, "rename");

    // Try the original rename function
    int ret = orig_rename(oldpath, newpath);
    if (ret == 0 || errno != EXDEV) {
        if (ret != 0) {
            fprintf(stderr, "Error renaming '%s' to '%s': %s\n", oldpath, newpath, strerror(errno));
        }
        return ret; // Return if successful or if an error other than EXDEV
    }

    // If EXDEV is encountered, use `mv` to perform the operation
    pid_t pid = fork();
    if (pid == -1) {
        perror("fork failed");
        return -1;
    }

    if (pid == 0) {
        // Child process to execute `mv`
        execlp("mv", "mv", oldpath, newpath, (char *)NULL);
        // If execlp fails
        perror("execlp failed");
        _exit(1);
    }

    // Parent process waits for `mv` to complete
    int status;
    if (waitpid(pid, &status, 0) == -1) {
        perror("waitpid failed");
        return -1;
    }

    if (WIFEXITED(status) && WEXITSTATUS(status) == 0) {
        return 0; // `mv` succeeded
    } else {
        fprintf(stderr, "mv command failed for '%s' to '%s'\n", oldpath, newpath);
        return -1; // Indicate failure if `mv` failed
    }
}
