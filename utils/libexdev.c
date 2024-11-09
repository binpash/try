#define _GNU_SOURCE
#include <dlfcn.h>
#include <stdio.h>
#include <errno.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

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

    // Check if the oldpath is a directory
    struct stat statbuf;
    if (stat(oldpath, &statbuf) == 0 && S_ISDIR(statbuf.st_mode)) {
        // Handle EXDEV by copying the directory and its contents to the new path
        DIR *src_dir = opendir(oldpath);
        if (!src_dir) {
            fprintf(stderr, "Error opening source directory '%s': %s\n", oldpath, strerror(errno));
            return -1;  // Return failure for opendir of source directory
        }

        // Create the destination directory
        if (mkdir(newpath, statbuf.st_mode) != 0) {
            fprintf(stderr, "Error creating destination directory '%s': %s\n", newpath, strerror(errno));
            closedir(src_dir);
            return -1;  // Return failure for mkdir
        }

        struct dirent *entry;
        char old_entry_path[4096], new_entry_path[4096];
        while ((entry = readdir(src_dir)) != NULL) {
            // Skip "." and ".." directories
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }

            snprintf(old_entry_path, sizeof(old_entry_path), "%s/%s", oldpath, entry->d_name);
            snprintf(new_entry_path, sizeof(new_entry_path), "%s/%s", newpath, entry->d_name);

            // Recursively rename the directory contents
            ret = rename(old_entry_path, new_entry_path);
            if (ret != 0) {
                fprintf(stderr, "Error renaming directory contents from '%s' to '%s': %s\n", old_entry_path, new_entry_path, strerror(errno));
                closedir(src_dir);
                return -1;  // Return failure for recursive rename
            }
        }

        closedir(src_dir);

        // After copying, remove the original directory
        if (rmdir(oldpath) != 0) {
            fprintf(stderr, "Error removing original directory '%s': %s\n", oldpath, strerror(errno));
            return -1;  // Return failure for rmdir
        }

        return 0;  // Success
    }

    // If it's not a directory, fall back to file-based handling
    FILE *src = fopen(oldpath, "rb");
    if (!src) {
        fprintf(stderr, "Error opening source file '%s': %s\n", oldpath, strerror(errno));
        return -1;  // Return failure for fopen of source file
    }

    FILE *dest = fopen(newpath, "wb");
    if (!dest) {
        fprintf(stderr, "Error opening destination file '%s': %s\n", newpath, strerror(errno));
        fclose(src);
        return -1;  // Return failure for fopen of destination file
    }

    // Get the size of the source file
    struct stat stat_buf;
    if (fstat(src, &stat_buf) == -1) {
        fprintf(stderr, "Error getting file size for '%s': %s\n", oldpath, strerror(errno));
        close(src);
        close(dest);
        return -1;
    }

    // Use sendfile to copy data
    off_t offset = 0;
    ssize_t bytes_sent = sendfile(dest, src, &offset, stat_buf.st_size);
    if (bytes_sent == -1) {
        fprintf(stderr, "Error copying file from '%s' to '%s': %s\n", oldpath, newpath, strerror(errno));
        close(dest);
        close(src);
        return -1;
    }

    if (ferror(src)) {
        fprintf(stderr, "Error reading from source file '%s': %s\n", oldpath, strerror(errno));
        fclose(src);
        fclose(dest);
        return -1;  // Return failure for fread
    }

    fclose(src);
    fclose(dest);

    // After copying, remove the original file
    if (unlink(oldpath) != 0) {
        perror("Error unlinking the original file");
        return -1;  // Return failure for unlink
    }

    return 0; 
}
