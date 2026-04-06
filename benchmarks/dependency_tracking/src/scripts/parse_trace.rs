#![allow(warnings)]
#![allow(clippy::all)]

// src/trace_rw.rs
use std::collections::{HashMap, HashSet};
use std::fs;
use std::path::{Component, Path, PathBuf};

type Result<T> = std::result::Result<T, String>;

// ---------- tiny helpers for parity with the Python ----------

fn is_absolute(p: &str) -> bool {
    p.starts_with('/')
}
fn is_ret_err(ret: &str) -> bool {
    ret.trim_start().starts_with('-')
}

fn extract_between<'a>(s: &'a str, open: &str, close: &str) -> Option<&'a str> {
    let start = s.find(open)? + open.len();
    let end = s.rfind(close)?;
    (end >= start).then(|| &s[start..end])
}

fn normalize_path<P: AsRef<Path>>(p: P) -> PathBuf {
    // Build directly, avoiding lifetime issues with Component<'_> vectors.
    let mut out = PathBuf::new();
    for c in p.as_ref().components() {
        match c {
            Component::CurDir => {}
            Component::ParentDir => {
                let _ = out.pop();
            }
            other => out.push(other.as_os_str()),
        }
    }
    if out.as_os_str().is_empty() {
        PathBuf::from(".")
    } else {
        out
    }
}

/// Split syscall arg list by commas, but *not* when inside quotes or <> or {}.
/// Mirrors the Python `arg_regex` behavior, without regex.
fn split_args(args: &str) -> Vec<String> {
    let mut out = Vec::new();
    let mut cur = String::new();
    let mut in_quotes = false;
    let mut angle = 0usize; // depth for <>
    let mut curly = 0usize; // depth for {}
    let mut chars = args.chars().peekable();

    while let Some(ch) = chars.next() {
        match ch {
            '"' => {
                cur.push(ch);
                in_quotes = !in_quotes;
            }
            '<' if !in_quotes => {
                angle += 1;
                cur.push(ch);
            }
            '>' if !in_quotes && angle > 0 => {
                angle -= 1;
                cur.push(ch);
            }
            '{' if !in_quotes => {
                curly += 1;
                cur.push(ch);
            }
            '}' if !in_quotes && curly > 0 => {
                curly -= 1;
                cur.push(ch);
            }
            ',' if !in_quotes && angle == 0 && curly == 0 => {
                out.push(cur.trim().to_string());
                cur.clear();
            }
            _ => cur.push(ch),
        }
    }
    if !cur.is_empty() {
        out.push(cur.trim().to_string());
    }
    out
}

/// Like the Python `take_first_arg`: returns (first_arg, rest_string).
fn take_first_arg(args: &str) -> (String, String) {
    let parts = split_args(args);
    if parts.is_empty() {
        return (String::new(), String::new());
    }
    let first = parts[0].clone();
    let rest = if parts.len() > 1 {
        parts[1..].join(",")
    } else {
        String::new()
    };
    (first, rest)
}

/// Expect a C-quoted string or "NULL". Applies light unescaping akin to Python's `unicode_escape`.
fn parse_string(s: &str) -> Result<String> {
    let mut s = s.trim().to_string();
    if s == "NULL" {
        return Ok(String::new());
    }
    if s.ends_with("...") {
        s.truncate(s.len() - 3);
    }
    if !(s.starts_with('"') && s.ends_with('"')) {
        return Err(format!("expected quoted string, got: {s}"));
    }
    Ok(unescape_like_python(&s[1..s.len() - 1]))
}

fn unescape_like_python(s: &str) -> String {
    // Simple \n \t \r \" \\ and \xHH \uXXXX \UXXXXXXXX handling; otherwise leave escapes as-is.
    let mut out = String::with_capacity(s.len());
    let b = s.as_bytes();
    let mut i = 0;
    while i < b.len() {
        if b[i] != b'\\' {
            out.push(b[i] as char);
            i += 1;
            continue;
        }
        i += 1;
        if i >= b.len() {
            out.push('\\');
            break;
        }
        match b[i] as char {
            'n' => {
                out.push('\n');
                i += 1;
            }
            'r' => {
                out.push('\r');
                i += 1;
            }
            't' => {
                out.push('\t');
                i += 1;
            }
            '"' => {
                out.push('"');
                i += 1;
            }
            '\\' => {
                out.push('\\');
                i += 1;
            }
            'x' => {
                i += 1;
                if i + 1 < b.len() {
                    if let Ok(v) = u8::from_str_radix(&s[i..i + 2], 16) {
                        out.push(v as char);
                        i += 2;
                    } else {
                        out.push_str("\\x");
                    }
                } else {
                    out.push_str("\\x");
                }
            }
            'u' => {
                i += 1;
                if i + 3 < b.len() {
                    if let Ok(v) = u32::from_str_radix(&s[i..i + 4], 16) {
                        if let Some(ch) = char::from_u32(v) {
                            out.push(ch);
                            i += 4;
                        } else {
                            out.push_str("\\u");
                        }
                    } else {
                        out.push_str("\\u");
                    }
                } else {
                    out.push_str("\\u");
                }
            }
            'U' => {
                i += 1;
                if i + 7 < b.len() {
                    if let Ok(v) = u32::from_str_radix(&s[i..i + 8], 16) {
                        if let Some(ch) = char::from_u32(v) {
                            out.push(ch);
                            i += 8;
                        } else {
                            out.push_str("\\U");
                        }
                    } else {
                        out.push_str("\\U");
                    }
                } else {
                    out.push_str("\\U");
                }
            }
            other => {
                out.push('\\');
                out.push(other);
                i += 1;
            }
        }
    }
    out
}

fn get_ret_file_path(ret: &str) -> Result<PathBuf> {
    if is_ret_err(ret) {
        return Err("get_ret_file_path on error code".into());
    }
    let ret = ret.trim();
    let start = ret.find('<').ok_or("no < in ret")? + 1;
    let end = ret.rfind('>').ok_or("no > in ret")?;
    Ok(PathBuf::from(&ret[start..end]))
}

fn convert_absolute(cur_dir: &Path, path: &str) -> PathBuf {
    normalize_path(if is_absolute(path) {
        PathBuf::from(path)
    } else {
        cur_dir.join(path)
    })
}

// ---------- RFile / WFile and their "closure" ----------

#[derive(Clone)]
struct RFile {
    fname: PathBuf,
}
impl RFile {
    fn new<P: Into<PathBuf>>(p: P) -> Self {
        Self {
            fname: normalize_path(p.into()),
        }
    }
    fn closure(&self) -> Vec<FileRecord> {
        let mut all = vec![FileRecord::Read(self.fname.clone())];
        if self.fname.to_string_lossy().starts_with('/') {
            let mut current = self.fname.clone();
            let mut i = 0usize;
            while current != Path::new("/") {
                if let Some(dir) = current.parent() {
                    all.push(FileRecord::Read(dir.to_path_buf()));
                    current = dir.to_path_buf();
                    i += 1;
                    if i > 512 {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        all
    }
}

#[derive(Clone)]
struct WFile {
    fname: PathBuf,
}
impl WFile {
    fn new<P: Into<PathBuf>>(p: P) -> Self {
        Self {
            fname: normalize_path(p.into()),
        }
    }
    fn closure(&self) -> Vec<FileRecord> {
        let mut all = vec![FileRecord::Write(self.fname.clone())];
        if self.fname.to_string_lossy().starts_with('/') {
            let mut current = self.fname.clone();
            let mut i = 0usize;
            while current != Path::new("/") {
                if let Some(dir) = current.parent() {
                    all.push(FileRecord::Read(dir.to_path_buf())); // parents marked R (Python behavior)
                    current = dir.to_path_buf();
                    i += 1;
                    if i > 512 {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        all
    }
}

#[derive(Clone)]
enum FileRecord {
    Read(PathBuf),
    Write(PathBuf),
}

// ---------- Context (cwd + unfinished/resumed + CLONE_FS groups) ----------

#[derive(Default)]
struct Context {
    line_dict: HashMap<i32, String>,
    curdir_dict: HashMap<i32, PathBuf>,
    pid_group_dict: HashMap<i32, i32>,
    curdir_fallback: PathBuf,
}

impl Context {
    fn new() -> Self {
        Self {
            curdir_fallback: std::env::current_dir().unwrap_or_else(|_| PathBuf::from("/")),
            ..Default::default()
        }
    }

    fn do_clone(&mut self, parent: i32, child: i32) {
        self.pid_group_dict.insert(child, parent);
    }

    fn set_dir(&mut self, path: PathBuf, pid: Option<i32>) {
        self.curdir_fallback = path.clone();
        let mut k = pid;
        if let Some(p) = pid {
            if let Some(&leader) = self.pid_group_dict.get(&p) {
                k = Some(leader);
            }
        }
        if let Some(key) = k {
            self.curdir_dict.insert(key, path);
        }
    }

    fn get_dir(&mut self, pid: i32) -> PathBuf {
        let k = self.pid_group_dict.get(&pid).copied().unwrap_or(pid);
        self.curdir_dict
            .entry(k)
            .or_insert_with(|| self.curdir_fallback.clone());
        self.curdir_dict.get(&k).unwrap().clone()
    }

    fn push_half_line(&mut self, pid: i32, l: &str) {
        if let Some(idx) = l.find("<unfinished") {
            self.line_dict.insert(pid, l[..idx].trim().to_string());
        }
    }

    fn pop_complete_line(&mut self, pid: i32, l: &str) -> Option<String> {
        let idx = l.find("resumed>")? + "resumed>".len();
        let head = self.line_dict.remove(&pid)?;
        Some(format!("{}{}", head, l[idx..].trim()))
    }
}

// ---------- syscall group membership (no lazy statics) ----------

fn is_r_first_path(s: &str) -> bool {
    matches!(
        s,
        "execve"
            | "stat"
            | "lstat"
            | "access"
            | "statfs"
            | "readlink"
            | "getxattr"
            | "lgetxattr"
            | "llistxattr"
    )
}
fn is_w_first_path(s: &str) -> bool {
    matches!(
        s,
        "mkdir"
            | "rmdir"
            | "truncate"
            | "creat"
            | "chmod"
            | "chown"
            | "lchown"
            | "utime"
            | "mknod"
            | "utimes"
            | "acct"
            | "unlink"
            | "setxattr"
            | "removexattr"
    )
}
fn is_r_fd_path(s: &str) -> bool {
    matches!(
        s,
        "fstatat"
            | "newfstatat"
            | "statx"
            | "name_to_handle_at"
            | "readlinkat"
            | "faccessat"
            | "execveat"
            | "faccessat2"
    )
}
fn is_w_fd_path(s: &str) -> bool {
    matches!(
        s,
        "unlinkat" | "utimensat" | "mkdirat" | "mknodat" | "fchownat" | "futimeat" | "linkat" | "fchmodat"
    )
}
fn is_ignored(s: &str) -> bool {
    matches!(s, "getpid" | "getcwd")
}

// ---------- parsing primitives ----------

fn strip_pid(line: &str) -> Result<(i32, &str)> {
    let line = line.trim();
    let (pid_str, rest) = line.split_once(' ').ok_or("expect pid")?;
    let pid = pid_str.parse::<i32>().map_err(|_| "expect pid".to_string())?;
    Ok((pid, rest))
}

fn handle_info(l: &str) -> (bool, Option<i32>) {
    if l.ends_with("+++") {
        if let Some(s) = l.strip_prefix("+++ exited with ") {
            if let Some(s2) = s.strip_suffix(" +++") {
                if let Ok(code) = s2.trim().parse::<i32>() {
                    return (true, Some(code));
                }
            }
        }
        if l.contains("killed") {
            return (true, Some(-1));
        }
        (true, None)
    } else if l.ends_with("---") {
        (true, None)
    } else {
        (false, None)
    }
}

fn get_path_first_path(pid: i32, args: &str, ctx: &mut Context) -> Result<PathBuf> {
    let first = split_args(args).get(0).cloned().ok_or("no arg")?;
    let a = parse_string(&first)?;
    Ok(convert_absolute(&ctx.get_dir(pid), &a))
}

fn parse_r_first_path(pid: i32, args: &str, _ret: &str, ctx: &mut Context) -> Option<RFile> {
    match get_path_first_path(pid, args, ctx) {
        Ok(p) => Some(RFile::new(p)),
        Err(_) => None,
    }
}

fn parse_w_first_path(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Option<FileRecord> {
    match get_path_first_path(pid, args, ctx) {
        Ok(p) => {
            if is_ret_err(ret) {
                Some(FileRecord::Read(p))
            } else {
                Some(FileRecord::Write(p))
            }
        }
        Err(_) => None,
    }
}

fn get_path_at(pid: i32, positions: &[usize], args: &str, ctx: &mut Context) -> Result<Vec<PathBuf>> {
    let parts = split_args(args);
    let mut out = Vec::new();
    for &pos in positions {
        if let Some(x) = parts.get(pos) {
            let s = parse_string(x)?;
            out.push(convert_absolute(&ctx.get_dir(pid), &s));
        }
    }
    Ok(out)
}

fn parse_rename(pid: i32, args: &str, _ret: &str, ctx: &mut Context) -> Result<Vec<FileRecord>> {
    let v = get_path_at(pid, &[0, 1], args, ctx)?;
    if v.len() == 2 {
        Ok(vec![
            FileRecord::Write(v[0].clone()),
            FileRecord::Write(v[1].clone()),
        ])
    } else {
        Ok(vec![])
    }
}

fn parse_link(pid: i32, args: &str, _ret: &str, ctx: &mut Context) -> Result<Vec<FileRecord>> {
    let v = get_path_at(pid, &[0, 1], args, ctx)?;
    if v.len() == 2 {
        Ok(vec![
            FileRecord::Read(v[0].clone()),
            FileRecord::Write(v[1].clone()),
        ])
    } else {
        Ok(vec![])
    }
}

fn parse_chdir(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Result<Option<RFile>> {
    let new_path = get_path_first_path(pid, args, ctx)?;
    if !is_ret_err(ret) {
        ctx.set_dir(new_path.clone(), Some(pid));
    }
    Ok(Some(RFile::new(new_path)))
}

fn handle_open_flag(flags: &str) -> &'static str {
    if flags.contains("O_RDONLY") { "r" } else { "w" }
}

fn handle_open_common(total_path: PathBuf, flags: &str, ret: &str) -> Result<Vec<FileRecord>> {
    if is_ret_err(ret) {
        Ok(vec![FileRecord::Read(total_path)])
    } else if handle_open_flag(flags) == "r" {
        Ok(vec![
            FileRecord::Read(total_path),
            FileRecord::Read(get_ret_file_path(ret)?),
        ])
    } else {
        Ok(vec![
            FileRecord::Write(total_path),
            FileRecord::Write(get_ret_file_path(ret)?),
        ])
    }
}

fn parse_openat(args: &str, ret: &str) -> Result<Vec<FileRecord>> {
    let parts = split_args(args); // bind to extend lifetime
    if parts.len() < 2 {
        return Ok(vec![]);
    }
    let dfd = &parts[0];
    let path = parse_string(&parts[1]).unwrap_or_default();
    if path.is_empty() {
        return Ok(vec![]);
    }
    let total_path = if is_absolute(&path) {
        PathBuf::from(path)
    } else if let Some(inside) = extract_between(dfd, "<", ">") {
        normalize_path(Path::new(inside).join(path))
    } else {
        PathBuf::from(path)
    };
    let flags = parts.get(2).map(|s| s.as_str()).unwrap_or("");
    handle_open_common(total_path, flags, ret)
}

fn parse_open(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Result<Vec<FileRecord>> {
    let total_path = match get_path_first_path(pid, args, ctx) {
        Ok(p) => p,
        Err(_) => return Ok(vec![]),
    };
    let parts = split_args(args); // bind to extend lifetime
    let flags = parts.get(1).map(|s| s.as_str()).unwrap_or("");
    handle_open_common(total_path, flags, ret)
}

fn get_path_from_fd_path(args: &str) -> Result<PathBuf> {
    let parts = split_args(args);
    let a0 = parts.get(0).cloned().unwrap_or_default();
    let a1 = parts.get(1).cloned().unwrap_or_default();
    let a1s = parse_string(&a1)?;
    if !a1s.is_empty() && is_absolute(&a1s) {
        return Ok(normalize_path(a1s));
    }
    let pwd = extract_between(&a0, "<", ">").unwrap_or("");
    Ok(normalize_path(Path::new(pwd).join(a1s)))
}

fn parse_renameat(_pid: i32, args: &str, _ret: &str, _ctx: &mut Context) -> Result<Vec<FileRecord>> {
    let path_a = get_path_from_fd_path(args)?;
    let rest = split_args(args).into_iter().skip(2).collect::<Vec<_>>().join(",");
    let path_b = get_path_from_fd_path(&rest)?;
    Ok(vec![FileRecord::Write(path_a), FileRecord::Write(path_b)])
}

fn parse_r_fd_path(args: &str, _ret: &str) -> Result<RFile> {
    Ok(RFile::new(get_path_from_fd_path(args)?))
}
fn parse_w_fd_path(args: &str, ret: &str) -> Result<FileRecord> {
    let p = get_path_from_fd_path(args)?;
    Ok(if is_ret_err(ret) {
        FileRecord::Read(p)
    } else {
        FileRecord::Write(p)
    })
}

fn has_clone_fs(flags: &str) -> bool {
    // flags look like flags=CLONE_FS|CLONE_SIGHAND|...
    flags.split('|').any(|f| f.trim() == "CLONE_FS")
}

fn parse_clone(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Result<()> {
    let child: i32 = ret.trim().parse().unwrap_or(-1);
    if child < 0 {
        return Ok(());
    }
    if let Some(idx) = args.find("flags=") {
        let flags = &args[idx + "flags=".len()..];
        if has_clone_fs(flags) {
            ctx.do_clone(pid, child);
        }
    }
    Ok(())
}

fn parse_symlinkat(_pid: i32, args: &str, ret: &str) -> Result<FileRecord> {
    let (_a0, rest) = take_first_arg(args);
    parse_w_fd_path(&rest, ret)
}
fn parse_symlink(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Result<Option<FileRecord>> {
    let (_a0, rest) = take_first_arg(args);
    Ok(parse_w_first_path(pid, &rest, ret, ctx))
}
fn parse_inotify_add_watch(pid: i32, args: &str, ret: &str, ctx: &mut Context) -> Result<Option<RFile>> {
    let (_fd, rest) = take_first_arg(args);
    Ok(parse_r_first_path(pid, &rest, ret, ctx))
}

// ---------- syscall router ----------

fn parse_syscall(
    pid: i32,
    syscall: &str,
    args: &str,
    ret: &str,
    ctx: &mut Context,
) -> Result<Vec<FileRecord>> {
    if is_r_first_path(syscall) {
        if let Some(rf) = parse_r_first_path(pid, args, ret, ctx) {
            return Ok(vec![FileRecord::Read(rf.fname)]);
        }
        return Ok(vec![]);
    }
    if is_w_first_path(syscall) {
        if let Some(fr) = parse_w_first_path(pid, args, ret, ctx) {
            return Ok(vec![fr]);
        }
        return Ok(vec![]);
    }

    match syscall {
        "openat" => parse_openat(args, ret),
        "chdir" => Ok(parse_chdir(pid, args, ret, ctx)?
            .map(|rf| FileRecord::Read(rf.fname))
            .into_iter()
            .collect()),
        "open" => parse_open(pid, args, ret, ctx),
        s if is_r_fd_path(s) => Ok(vec![FileRecord::Read(parse_r_fd_path(args, ret)?.fname)]),
        s if is_w_fd_path(s) => Ok(vec![parse_w_fd_path(args, ret)?]),
        "rename" => parse_rename(pid, args, ret, ctx),
        "renameat" | "renameat2" => parse_renameat(pid, args, ret, ctx),
        "symlinkat" => Ok(vec![parse_symlinkat(pid, args, ret)?]),
        "symlink" | "link" => Ok(parse_symlink(pid, args, ret, ctx)?.into_iter().collect()),
        "clone" => {
            parse_clone(pid, args, ret, ctx)?;
            Ok(vec![])
        }
        "inotify_add_watch" => Ok(parse_inotify_add_watch(pid, args, ret, ctx)?
            .map(|rf| FileRecord::Read(rf.fname))
            .into_iter()
            .collect()),
        s if is_ignored(s) => Ok(vec![]),
        other => Ok(vec![]),
    }
}

fn parse_line(l: &str, ctx: &mut Context) -> Result<Option<Vec<FileRecord>>> {
    let ll = l.trim();
    if ll.is_empty() {
        return Ok(Some(vec![]));
    }
    let (pid, rest) = strip_pid(ll)?;
    let (is_info, _exit_opt) = handle_info(rest);
    if is_info {
        return Ok(None);
    }

    let mut line = rest.to_string();
    if line.contains("<unfinished") {
        ctx.push_half_line(pid, &line);
        return Ok(Some(vec![]));
    } else if line.contains("resumed>") {
        if let Some(total) = ctx.pop_complete_line(pid, &line) {
            line = total;
        }
    }
    line = line.trim().to_owned();

    let lparen = match line.find('(') {
        Some(i) => i,
        None => return Ok(Some(vec![])),
    };
    let equals = match line.rfind('=') {
        Some(i) => i,
        None => return Ok(Some(vec![])),
    };
    let rparen = match line[..equals].rfind(')') {
        Some(i) => i,
        None => return Ok(Some(vec![])),
    };
    let syscall = &line[..lparen];
    let args = &line[lparen + 1..rparen];
    let ret = &line[equals + 1..];

    parse_syscall(pid, syscall, args, ret, ctx).map(Some)
}

fn parse_and_gather_cmd_rw_sets(
    lines: &[String],
    ctx: &mut Context,
) -> Result<(HashSet<PathBuf>, HashSet<PathBuf>)> {
    let mut read_set = HashSet::<PathBuf>::new();
    let mut write_set = HashSet::<PathBuf>::new();

    for l in lines {
        let recs_opt = parse_line(l, ctx)?;
        if let Some(recs) = recs_opt {
            // filter like Python
            let filtered = recs.into_iter().filter(|r| {
                let p = match r {
                    FileRecord::Read(p) | FileRecord::Write(p) => p,
                };
                let s = p.to_string_lossy();
                !(s.starts_with("/tmp/pash_spec") || s.starts_with("/dev"))
            });
            for rec in filtered {
                let closure: Vec<FileRecord> = match &rec {
                    FileRecord::Read(p) => RFile::new(p.clone()).closure(),
                    FileRecord::Write(p) => WFile::new(p.clone()).closure(),
                };
                for c in closure {
                    match c {
                        FileRecord::Read(p) => {
                            if p.to_string_lossy() != "/dev/tty" {
                                read_set.insert(p);
                            }
                        }
                        FileRecord::Write(p) => {
                            if p.to_string_lossy() != "/dev/tty" {
                                write_set.insert(p);
                            }
                        }
                    };
                }
            }
        }
    }

    for entry in &write_set {
        read_set.insert(entry.to_owned());
    }

    Ok((read_set, write_set))
}

// ---------- public entry point ----------

/// Read a trace file and return (read_set, write_set), both as `HashSet<PathBuf>`.
pub fn parse_trace(trace_path: &Path) -> Result<(HashSet<PathBuf>, HashSet<PathBuf>)> {
    let data = fs::read_to_string(trace_path).map_err(|e| format!("read {:?}: {e}", trace_path))?;
    let lines: Vec<String> = data.lines().map(|s| s.to_string()).collect();

    let mut ctx = Context::new();
    // match Python: seed context cwd to current process cwd
    let cwd = std::env::current_dir().unwrap_or_else(|_| PathBuf::from("/"));
    ctx.set_dir(cwd, None);

    parse_and_gather_cmd_rw_sets(&lines, &mut ctx)
}
