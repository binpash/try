#!/usr/bin/env bash

top=$(git rev-parse --show-toplevel)
base="$top/benchmarks/micro_benchmarks/dry_run_commands"
results_dir="$base/results"
try_bin="$top/try"
rm -rf "$results_dir"
mkdir -p "$results_dir"

require_commands() {
  local cmd
  for cmd in git rsync stow patch rename; do
    command -v "$cmd" >/dev/null 2>&1 || {
      echo "missing required command: $cmd" >&2
      apt-get update && apt-get install -y "$cmd"
    }
  done
}

run_rsync_issue_582_case() {
  rm -rf rsync_issue_582_case
  mkdir -p rsync_issue_582_case/source rsync_issue_582_case/dest
  printf 'one\n' > rsync_issue_582_case/source/testfile1.txt
  printf 'two\n' > rsync_issue_582_case/source/testfile2.txt
  printf 'three\n' > rsync_issue_582_case/source/testfile3.txt

  rsync -n -i -r -t -p -l -H -s \
    --log-file=rsync_issue_582_case/dry.log \
    rsync_issue_582_case/source/ \
    rsync_issue_582_case/dest/ \
    > "$results_dir/rsync_issue_582.txt" 2>&1
  printf '\n--- log file ---\n' >> "$results_dir/rsync_issue_582.txt"
  cat rsync_issue_582_case/dry.log >> "$results_dir/rsync_issue_582.txt"

  rm -rf rsync_issue_582_case/dest
  mkdir -p rsync_issue_582_case/dest
  "$try_bin" -y rsync -i -r -t -p -l -H -s \
    --log-file=rsync_issue_582_case/try.log \
    rsync_issue_582_case/source/ \
    rsync_issue_582_case/dest/ \
    > "$results_dir/rsync_issue_582_try.txt" 2>&1
  printf '\n--- log file ---\n' >> "$results_dir/rsync_issue_582_try.txt"
  cat rsync_issue_582_case/try.log >> "$results_dir/rsync_issue_582_try.txt"
}

run_git_case() {
  rm -rf git_case
  mkdir -p git_case/repo/src git_case/repo/build/cache
  (
    cd git_case/repo || exit 1
    git init -q
    git config user.email benchmark@example.com
    git config user.name "Dry Run Benchmark"
    printf 'tracked source\n' > src/app.txt
    git add src/app.txt
    git commit -qm "initial commit"
    printf 'compiled artifact\n' > build/output.log
    printf 'stale cache\n' > build/cache/index.tmp
    git clean -nd -- build/ &> "$results_dir/git.txt"
    semisolate=$("$try_bin" -n git clean -fd -- build/ | tail -n 1)
    "$try_bin" --diff "$semisolate" &> "$results_dir/git_try.txt"
  )
}

run_rsync_case() {
  rm -rf rsync_case
  mkdir -p rsync_case/source/assets rsync_case/dest/assets
  printf '<html>new build</html>\n' > rsync_case/source/index.html
  printf 'logo-v2\n' > rsync_case/source/assets/logo.txt
  printf '<html>old build</html>\n' > rsync_case/dest/index.html
  printf 'orphaned file\n' > rsync_case/dest/obsolete.txt
  { rsync -anv --delete rsync_case/source/ rsync_case/dest/ > "$results_dir/rsync.txt"; } 2>&1
  semisolate=$("$try_bin" -n rsync -av --delete rsync_case/source/ rsync_case/dest/ | tail -n 1)
  "$try_bin" --diff "$semisolate" &> "$results_dir/rsync_try.txt"
}

run_stow_case() {
  rm -rf stow_case
  mkdir -p stow_case/dotfiles/git/.config/git stow_case/home
  printf '[user]\n\tname = Example User\n' > stow_case/dotfiles/git/.config/git/config
  stow --no -v -d stow_case/dotfiles -t stow_case/home git &> "$results_dir/stow.txt"
  semisolate=$("$try_bin" -n stow -d stow_case/dotfiles -t stow_case/home git | tail -n 1)
  "$try_bin" --diff "$semisolate" &> "$results_dir/stow_try.txt"
}

run_patch_case() {
  rm -rf patch_case
  mkdir -p patch_case/project
  printf 'theme=light\ntimeout=30\n' > patch_case/project/app.conf
  cat > patch_case/update.patch <<'EOF'
--- a/project/app.conf
+++ b/project/app.conf
@@ -1,2 +1,2 @@
-theme=light
+theme=dark
 timeout=30
EOF
  cd patch_case || exit 1
  patch --dry-run -p1 < update.patch &> "$results_dir/patch.txt" 
  semisolate=$($try_bin -n patch -p1 < update.patch | tail -n 1)
  $try_bin --diff "$semisolate" &> "$results_dir/patch_try.txt"
}

run_rename_case() {
  rm -rf rename_case
  mkdir -p rename_case/incoming
  printf 'daily summary\n' > rename_case/incoming/report.tmp
  printf 'weekly summary\n' > rename_case/incoming/summary.tmp
  rename -n -v 's/\.tmp$/.txt/' rename_case/incoming/*.tmp &> "$results_dir/rename.txt";
  semisolate=$($try_bin -n rename 's/\.tmp$/.txt/' rename_case/incoming/*.tmp)
  $try_bin --diff "$semisolate" &> "$results_dir/rename_try.txt"
}

cd "$base" || exit 1
run_git_case
cd "$base" || exit 1
run_rsync_case
cd "$base" || exit 1
run_rsync_issue_582_case
cd "$base" || exit 1
run_stow_case
cd "$base" || exit 1
run_patch_case
cd "$base" || exit 1
run_rename_case

rm -rf git_case rsync_case rsync_issue_582_case stow_case patch_case rename_case
