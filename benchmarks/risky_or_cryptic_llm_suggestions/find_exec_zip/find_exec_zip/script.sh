#!/bin/bash

# Set the directory to search
directory="./data"

# Use find to locate files and execute a command on each
find "$directory" -type f -size +1k -exec sh -c 'gzip "{}"' \;