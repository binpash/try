FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        autoconf \
        dpkg-dev \
        rpm \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /work
