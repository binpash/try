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
pip install  llm
pip install  llm-interpolate
pip install  llm-clap
pip install  llm-ollama

# check if ollama is installed
if ! command -v ollama &> /dev/null
then
    echo "Ollama could not be found, installing..."
    curl -fsSL https://ollama.com/install.sh | sh
else
    echo "Ollama is already installed."
fi
ollama serve > /dev/null 2>&1 &
sleep 5
ollama pull moondream:latest

ollama_pid=$(pgrep ollama)
kill $ollama_pid
