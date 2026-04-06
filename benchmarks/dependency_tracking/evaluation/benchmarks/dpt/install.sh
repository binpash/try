#!/bin/bash

sudo apt-get update

sudo apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    libgl1 \
    libglib2.0-0 \
    libjpeg-dev \
    zstd \
    ffmpeg \
    coreutils findutils wget sed unzip curl jq coreutils findutils sed unzip curl imagemagick

pip install  --upgrade pip

pip install numpy \
    torch \
    torchvision \
    Pillow \
    segment-anything \
    tensorflow \
    opencv-python
