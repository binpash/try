#!/bin/bash

# docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash small_files/run.sh
# docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash small_files/try-run.sh
# docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash small_command/run.sh
# docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash small_command/try-run.sh
docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash big_io/run.sh
docker run --rm --privileged -v /tmp:/tmp try/micro_benchmarks /bin/bash big_io/try-run.sh
