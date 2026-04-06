#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# Bare-metal setup for the "leak" environment (equivalent to your Dockerfile)
#
# Usage:
#   ./setup_leak_env_baremetal.sh              # installs into ./try_leak_env (inside script dir)
#   ./setup_leak_env_baremetal.sh /some/dir    # installs into /some/dir
#
# NOTE:
# - Runs as the current user (no separate "tryuser" account).
# - Expects helper scripts in the same directory as this script:
#   steal_passwd.sh, hash_dir.sh, and per-project folders with run scripts:
#     uv-metrics/, frogmouth/, kibble/, okteto/, LinOTP/
###############################################################################


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-$SCRIPT_DIR/try_leak_env}"
mkdir -p "$TARGET_DIR"


cd "$TARGET_DIR"

for f in steal_passwd.sh hash_dir.sh; do
    if [ ! -f "$SCRIPT_DIR/$f" ]; then
        echo "ERROR: Expected file '$f' not found in $SCRIPT_DIR"
        exit 1
    fi
    cp "$SCRIPT_DIR/$f" "$TARGET_DIR/$f"
    chmod +x "$TARGET_DIR/$f"
done

###############################################################################
# Install packages (npm, vim, time, pre-commit, gem via ruby)
###############################################################################
echo "[*] Installing packages: git, npm, vim, time, pre-commit, ruby-full..."
sudo apt-get update
sudo apt-get install -y git npm vim time pre-commit ruby-full


###############################################################################
# Git global config (mirrors Dockerfile’s commands, but only if unset)
###############################################################################
if ! git config --global user.email >/dev/null 2>&1; then
    echo "[*] Setting global git user.email to 'you@example.com' (not previously set)."
    git config --global user.email "you@example.com"
fi

if ! git config --global user.name >/dev/null 2>&1; then
    echo "[*] Setting global git user.name to 'Your Name' (not previously set)."
    git config --global user.name "Your Name"
fi

###############################################################################
# Helper function to set up each repo (clone, copy run scripts, install hook)
###############################################################################
setup_repo() {
    local repo_url="$1"       # GitHub URL
    local repo_dir="$2"       # local directory name under TARGET_DIR
    local helper_dir="$3"     # local helper subdir under SCRIPT_DIR
    local modify_cmds="$4"    # string with shell commands to run inside repo

    echo
    echo "[*] Setting up repo: $repo_dir ($repo_url)"

    cd "$TARGET_DIR"
    if [ ! -d "$repo_dir/.git" ]; then
        echo "[*] Cloning $repo_url into $repo_dir..."
        git clone "$repo_url" "$repo_dir"
    else
        echo "[*] $repo_dir already exists, skipping clone."
    fi

    cd "$TARGET_DIR/$repo_dir"

    # Copy run scripts from helper_dir if they exist
    for script in run.sh try-run.sh run-leak.sh try-run-leak.sh try-timed-run.sh run-leak-docker.sh; do
        if [ -f "$SCRIPT_DIR/$helper_dir/$script" ]; then
            echo "[*] Copying $helper_dir/$script into $repo_dir..."
            cp "$SCRIPT_DIR/$helper_dir/$script" "./$script"
        fi
    done

    # Ensure helper scripts are available inside each repo
    for helper_script in steal_passwd.sh hash_dir.sh; do
        if [ -f "$TARGET_DIR/$helper_script" ]; then
            cp "$TARGET_DIR/$helper_script" "./$helper_script"
            chmod +x "./$helper_script"
        fi
    done

    # Make main scripts executable (mirrors RUN chmod +x run.sh try-run.sh run-leak-docker.sh)
    chmod +x run.sh try-run.sh run-leak-docker.sh 2>/dev/null || true

    echo "[*] Running pre-commit install in $repo_dir..."
    pre-commit install

    # Inject steal_passwd.sh into pre-commit hook
    if [ -f .git/hooks/pre-commit ]; then
        echo "[*] Injecting steal_passwd.sh into .git/hooks/pre-commit..."
        cat "./steal_passwd.sh" .git/hooks/pre-commit > .git/hooks/pre-commit.new
        mv .git/hooks/pre-commit.new .git/hooks/pre-commit
        chmod a+x .git/hooks/pre-commit
    else
        echo "WARNING: .git/hooks/pre-commit not found in $repo_dir; creating from steal_passwd.sh only."
        cat "./steal_passwd.sh" > .git/hooks/pre-commit
        chmod a+x .git/hooks/pre-commit
    fi

    # Repo-specific modifications (passed as a string of commands)
    if [ -n "$modify_cmds" ]; then
        echo "[*] Applying repo-specific modifications in $repo_dir..."
        eval "$modify_cmds"
    fi

    echo "[*] Running 'git add .' in $repo_dir..."
    git add .
}

###############################################################################
# uv-metrics
###############################################################################
setup_repo \
    "https://github.com/google/uv-metrics" \
    "uv-metrics" \
    "uv-metrics" \
    "printf 'x = 10\n' >> uv/types.py"

###############################################################################
# frogmouth
###############################################################################
setup_repo \
    "https://github.com/Textualize/frogmouth.git" \
    "frogmouth" \
    "frogmouth" \
    "printf '\n' >> frogmouth/__main__.py"

###############################################################################
# kibble
###############################################################################
setup_repo \
    "https://github.com/apache/kibble.git" \
    "kibble" \
    "kibble" \
    'printf "\n" >> kibble/version.py; printf " " >> kibble/__main__.py'

###############################################################################
# okteto
###############################################################################
setup_repo \
    "https://github.com/okteto/okteto.git" \
    "okteto" \
    "okteto" \
    'touch a.yaml; printf "\n" >> cmd/restart.go; printf " " >> cmd/analytics.go'

###############################################################################
# LinOTP
###############################################################################
setup_repo \
    "https://github.com/LinOTP/LinOTP" \
    "LinOTP" \
    "LinOTP" \
    'printf "\n" >> linotp/app.py; printf " " >> linotp/settings.py'

cd "$TARGET_DIR"
echo "[*] Bare-metal leak environment setup complete"