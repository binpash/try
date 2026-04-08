FROM try_base_image

# Install necessary packages
RUN apt-get update && apt-get install -y \
    vim \
    time

ARG FIND_TXT_DIRS=100
ARG FIND_TXT_FILES_PER_DIR=10000
ARG SORT_LARGE_FILE_LINES=10000000

WORKDIR /root
COPY directory_exists directory_exists
COPY find_txt find_txt
WORKDIR ./find_txt
RUN chmod +x ./create_data.sh && \
    FIND_TXT_DIRS="$FIND_TXT_DIRS" FIND_TXT_FILES_PER_DIR="$FIND_TXT_FILES_PER_DIR" ./create_data.sh
WORKDIR /root

COPY find_exec_zip find_exec_zip
WORKDIR ./find_exec_zip
RUN chmod +x ./create_data.sh && ./create_data.sh
WORKDIR /root

COPY sort_large_file sort_large_file
WORKDIR ./sort_large_file
RUN chmod +x ./create_data.sh && \
    SORT_LARGE_FILE_LINES="$SORT_LARGE_FILE_LINES" ./create_data.sh
WORKDIR /root

COPY find_exec_touch find_exec_touch 
RUN cp -r ./find_exec_zip/find_exec_zip/data/ ./find_exec_touch/find_exec_touch/

COPY grep_log grep_log
RUN cp ./sort_large_file/sort_large_file/book.txt ./grep_log/grep_log/large_log_file.log
WORKDIR /root

COPY hash_dir.sh hash_dir.sh
