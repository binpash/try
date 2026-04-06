FROM debian:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends strace wamerican bsdextrautils && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["bash", "-c"]

