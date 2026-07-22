FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        autoconf \
        ruby-dev \
        rpm \
        ca-certificates && \
    gem install --no-document fpm && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /work
