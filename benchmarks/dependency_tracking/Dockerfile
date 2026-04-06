FROM ubuntu:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    strace \
    python3-dev \
    python3-pip \
    python3-venv \
    rustup \
    software-properties-common \
    wget \
    curl \
    libstdc++6  \
    libtool \
    m4 \ 
    automake \
    mergerfs \
    sudo

# Add deadsnakes PPA and install Python 3.10
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.10 python3.10-venv

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1
RUN python3 -m ensurepip --upgrade
RUN pip3 install uv
RUN rustup default nightly 

COPY . /app
WORKDIR /app

RUN uv pip install --system -r pyproject.toml
RUN cargo build --release

CMD ["/bin/bash"]