FROM debian

RUN apt update
RUN apt install -y curl zip tar wget binutils gzip vim bc util-linux expect mergerfs

WORKDIR /srv/try

COPY try .
COPY try-timed .
COPY benchmark benchmark
