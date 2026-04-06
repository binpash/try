# Busybox Benchmark

### Note on Removed Commands
- `find` has ACTIONS which are ambiguous (should we classify them as options or "actions"?).
- `ps` has an ambiguous argument format (`-o COL1,COL2=HEADER`); we have removed the command.
- `su` has ambiguous flag format (`-, -l`)
- `umount` has an option (`-t`) with an unspecified number of arguments
- `systctl` (`-p`) similar to `umount`
- `md5sum` (`-c`) similar to `umount`
