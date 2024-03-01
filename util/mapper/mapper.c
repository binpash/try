#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void* map_uids(void* args) {
  char *targetpid = argv[1];
  char *outeruid = argv[2];
  char *inneruid = argv[3];
  char *uidcount = argv[4];
  char *outergid = argv[5];
  char *innergid = argv[6];
  char *gidcount = argv[7];

  // Build path strings
  char uid_path[100];
  sprintf(uid_path, "/proc/%s/uid_map", targetpid);

  char gid_path[100];
  sprintf(gid_path, "/proc/%s/gid_map", targetpid);

  // Build mapping strings
  char uid_map[100];
  sprintf(uid_map, "%s %s %s", outeruid, inneruid, uidcount);

  char gid_map[100];
  sprintf(gid_map, "%s %s %s", outergid, innergid, gidcount);

  // Write mappings
  FILE *uid_file = fopen(uid_path, "w");
  fprintf(uid_file, "%s", uid_map);
  fclose(uid_file);

  FILE *gid_file = fopen(gid_path, "w");
  fprintf(gid_file, "%s", gid_map);
  fclose(gid_file);

  return 0;
}

int main(int argc, char* argv[]) {

  char *usage = "Usage: gidmapper targetpid outeruid inneruid uidcount outergid innergid gidcount";

  if(argc < 8) {
    fprintf(stderr, "%s\n", usage);
    exit(1);
  }

  pthread_t mapper_thread;
  pthread_create(&mapper_thread, NULL, map_uids, NULL);

  pthread_join(mapper_thread, NULL);

  return 0;
}
