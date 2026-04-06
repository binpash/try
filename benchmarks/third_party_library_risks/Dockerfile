FROM try_base_image

# Install necessary packages
RUN apt-get update && apt-get install -y \
    npm \
    vim \ 
    time \
    python3-pip \
    ruby \
    ruby-dev

# Install pre-commit via pip to get a newer version (3.0.0+) that supports 'pre-commit' stage
RUN pip3 install --break-system-packages 'pre-commit>=3.0.0'

# Set the working directory
WORKDIR /home/tryuser

# Change the ownership of the copied files
RUN chown -R tryuser:tryuser /home/tryuser

# Switch to the new user
USER tryuser

RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"

# Leak
COPY --chown=tryuser:tryuser steal_passwd.sh ./
COPY --chown=tryuser:tryuser hash_dir.sh hash_dir.sh

# uv-metrics
# COPY  --chown=tryuser:tryuser node-sass node-sass
RUN git clone https://github.com/google/uv-metrics
WORKDIR uv-metrics
COPY --chown=tryuser:tryuser uv-metrics/run.sh ./
COPY --chown=tryuser:tryuser uv-metrics/try-run.sh ./
COPY --chown=tryuser:tryuser uv-metrics/run-leak.sh ./
COPY --chown=tryuser:tryuser uv-metrics/try-run-leak.sh ./
COPY --chown=tryuser:tryuser uv-metrics/try-timed-run.sh ./
COPY --chown=tryuser:tryuser uv-metrics/run-leak-docker.sh ./
RUN chmod +x run.sh try-run.sh run-leak-docker.sh
RUN pre-commit install

RUN cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
RUN mv .git/hooks/pre-commit.new .git/hooks/pre-commit
RUN chmod a+x .git/hooks/pre-commit
RUN printf 'x = 10\n' >> uv/types.py
RUN git add .
WORKDIR /home/tryuser

# frogmouth
RUN git clone https://github.com/Textualize/frogmouth.git
WORKDIR frogmouth
COPY --chown=tryuser:tryuser frogmouth/run.sh ./
COPY --chown=tryuser:tryuser frogmouth/try-run.sh ./
COPY --chown=tryuser:tryuser frogmouth/run-leak.sh ./
COPY --chown=tryuser:tryuser frogmouth/try-run-leak.sh ./
COPY --chown=tryuser:tryuser frogmouth/try-timed-run.sh ./
COPY --chown=tryuser:tryuser frogmouth/run-leak-docker.sh ./
RUN chmod +x run.sh try-run.sh run-leak-docker.sh
RUN pre-commit install

RUN cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
RUN mv .git/hooks/pre-commit.new .git/hooks/pre-commit
RUN chmod a+x .git/hooks/pre-commit
RUN printf '\n' >> frogmouth/__main__.py
RUN git add .
WORKDIR /home/tryuser

# kibble
RUN git clone https://github.com/apache/kibble.git
WORKDIR kibble
COPY --chown=tryuser:tryuser kibble/run.sh ./
COPY --chown=tryuser:tryuser kibble/try-run.sh ./
COPY --chown=tryuser:tryuser kibble/run-leak.sh ./
COPY --chown=tryuser:tryuser kibble/try-run-leak.sh ./
COPY --chown=tryuser:tryuser kibble/try-timed-run.sh ./
COPY --chown=tryuser:tryuser kibble/run-leak-docker.sh ./
RUN chmod +x run.sh try-run.sh run-leak-docker.sh
RUN pre-commit install

RUN cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
RUN mv .git/hooks/pre-commit.new .git/hooks/pre-commit
RUN chmod a+x .git/hooks/pre-commit
RUN printf '\n' >> kibble/version.py
RUN printf ' ' >> kibble/__main__.py
RUN git add .
WORKDIR /home/tryuser

# oketo
RUN git clone https://github.com/okteto/okteto.git
WORKDIR okteto
COPY --chown=tryuser:tryuser okteto/run.sh ./
COPY --chown=tryuser:tryuser okteto/try-run.sh ./
COPY --chown=tryuser:tryuser okteto/run-leak.sh ./
COPY --chown=tryuser:tryuser okteto/try-run-leak.sh ./
COPY --chown=tryuser:tryuser okteto/try-timed-run.sh ./
COPY --chown=tryuser:tryuser okteto/run-leak-docker.sh ./
RUN chmod +x run.sh try-run.sh run-leak-docker.sh
RUN pre-commit install

RUN cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
RUN mv .git/hooks/pre-commit.new .git/hooks/pre-commit
RUN chmod a+x .git/hooks/pre-commit
RUN touch a.yaml
RUN printf '\n' >> cmd/restart.go
RUN printf ' ' >> cmd/analytics.go
RUN git add .
WORKDIR /home/tryuser

# LinOTP
RUN git clone https://github.com/LinOTP/LinOTP
WORKDIR LinOTP
COPY --chown=tryuser:tryuser LinOTP/run.sh ./
COPY --chown=tryuser:tryuser LinOTP/try-run.sh ./
COPY --chown=tryuser:tryuser LinOTP/run-leak.sh ./
COPY --chown=tryuser:tryuser LinOTP/try-run-leak.sh ./
COPY --chown=tryuser:tryuser LinOTP/try-timed-run.sh ./
COPY --chown=tryuser:tryuser LinOTP/run-leak-docker.sh ./
RUN chmod +x run.sh try-run.sh run-leak-docker.sh
RUN pre-commit install

RUN cat ../steal_passwd.sh .git/hooks/pre-commit > .git/hooks/pre-commit.new
RUN mv .git/hooks/pre-commit.new .git/hooks/pre-commit
RUN chmod a+x .git/hooks/pre-commit
RUN printf '\n' >> linotp/app.py
RUN printf ' ' >> linotp/settings.py
RUN git add .
WORKDIR /home/tryuser