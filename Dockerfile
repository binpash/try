FROM rust:bookworm

WORKDIR /root/try

RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    attr \
    build-essential \
    curl \
    expect \
    git \
    kmod \
    libcap2-bin \
    libtool \
    mergerfs \
    nodejs \
    npm \
    pandoc \
    python3 \
    strace \
    sudo \
    time \
    util-linux \
    vim \
    && rm -rf /var/lib/apt/lists/*

# The npm benchmarks use a local Verdaccio registry that is exposed on the host.
RUN npm config set registry http://localhost:4873

COPY . /root/try

RUN gcc -g -Wall -O2 -c utils/ignores.c -o utils/ignores.o \
    && gcc -g -Wall -O2 -c utils/try-summary.c -o utils/try-summary.o \
    && gcc -g -Wall -O2 -c utils/try-commit.c -o utils/try-commit.o \
    && gcc -g -Wall -O2 -o /usr/local/bin/try-summary utils/ignores.o utils/try-summary.o \
    && gcc -g -Wall -O2 -o /usr/local/bin/try-commit utils/ignores.o utils/try-commit.o

RUN install -m 0755 try /usr/local/bin/try
RUN install -m 0755 scripts/try-timed /usr/local/bin/try-timed
RUN install -m 0755 scripts/try-patched /usr/local/bin/try-patched
RUN install -m 0755 scripts/extract_benchmark_info.sh /usr/local/bin/extract_benchmark_info.sh

RUN useradd -m tryuser
RUN usermod -aG sudo tryuser
RUN echo "tryuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
