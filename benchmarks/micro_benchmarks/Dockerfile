FROM try_base_image

RUN apt update && apt install -y curl time
USER tryuser
WORKDIR /home/tryuser
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/home/tryuser/.cargo/bin:$PATH"

COPY --chown=tryuser:tryuser small_files small_files
COPY --chown=tryuser:tryuser small_command small_command
COPY --chown=tryuser:tryuser big_io big_io
COPY --chown=tryuser:tryuser create_files create_files
WORKDIR create_files
RUN cargo build --release
RUN cargo install --path .
WORKDIR /home/tryuser
