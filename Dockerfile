FROM rust:bookworm

WORKDIR /root/try

ENV DEBIAN_FRONTEND=noninteractive
ENV PIP_BREAK_SYSTEM_PACKAGES=1

RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    attr \
    bsdextrautils \
    build-essential \
    ca-certificates \
    curl \
    docker.io \
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
    python3-matplotlib \
    python3-pip \
    python3-venv \
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
RUN install -m 0755 utils/parse_trace.py /usr/local/bin/parse_trace.py

RUN cargo build --manifest-path utils/gidmapper/Cargo.toml --release \
    && install -m 0755 utils/gidmapper/target/release/try-gidmapper /usr/local/bin/try-gidmapper \
    && setcap 'CAP_SETGID=ep' /usr/local/bin/try-gidmapper

RUN rm -f benchmarks/micro_benchmarks/create_files/Cargo.lock \
    && cargo build --manifest-path benchmarks/micro_benchmarks/create_files/Cargo.toml --release \
    && install -m 0755 benchmarks/micro_benchmarks/create_files/target/release/create_files /usr/local/bin/create_files

RUN useradd -m tryuser
RUN usermod -aG sudo tryuser
RUN echo "tryuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
