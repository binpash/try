#!/usr/bin/python3
import re
import logging
import os.path
import sys
from typing import Tuple
from dataclasses import dataclass

# Global TODOs:
# handle pwd, such that open and stat can work

# not handled: getxattr, pivot_root, mount, umount2
# setxattr lsetxattr removexattr lremovexattr, fanotify_mark, renameat2, chroot, quotactl
# TODO: link, symlink, renameat

# handled individually openat, open, chdir, clone, rename, symlinkat, link
r_first_path_set = set(['execve', 'stat', 'lstat', 'access', 'statfs',
                        'readlink', 'execve', 'getxattr', 'lgetxattr', 'llistxattr'])
w_first_path_set = set(['mkdir', 'rmdir', 'truncate', 'creat', 'chmod', 'chown',
                        'lchown', 'utime', 'mknod', 'utimes', 'acct', 'unlink', 'setxattr', 'removexattr'])
r_fd_path_set = set(['fstatat', 'newfstatat', 'statx', 'name_to_handle_at',
                     'readlinkat', 'faccessat', 'execveat', 'faccessat2'])
w_fd_path_set = set(['unlinkat', 'utimensat', 'mkdirat', 'mknodat', 'fchownat', 'futimeat',
                     'unlinkat', 'linkat', 'fchmodat', 'utimensat'])
ignore_set = set(['getpid', 'getcwd'])

# This matches strings that do not include newline or commas, unless the commas are surrounded
# by quotes or brackets
arg_regex = r"((?:\"[^\"\n]*\"|<[^>\n]*>|{[^}\n]*}|[^,\n])+)"

# assumption here is that we are only dealing with strings inside the parans
def split_args(args):
    return re.findall(arg_regex, args)

def take_first_arg(args):
    match = re.search(arg_regex, args)
    arg = match.group(0)
    rest = args[match.end()+len(','):]
    return arg, rest

@dataclass
class ExitStatus:
    exitcode: int
    
def parse_info(l):
    if "exited" in l:
        start = len("+++ exited with ")
        end = -len(" +++")
        return ExitStatus(int(l[start:end]))
    elif 'killed' in l:
        return ExitStatus(-1)
    else:
        raise ValueError

@dataclass
class RFile:
    fname: str
    def __init__(self, fname):
        self.fname = os.path.normpath(fname)

    def closure(self):
        all_files = [self]
        if not self.fname.startswith('/'):
            return all_files
        current_name = self.fname
        i = 0
        while current_name != '/':
            dir, _ = os.path.split(current_name)
            all_files.append(RFile(dir))
            current_name = dir
            i += 1
            if i > 512:
                assert False
        return all_files
        
@dataclass
class WFile:
    fname: str
    def __init__(self, fname):
        self.fname = os.path.normpath(fname)

    def closure(self):
        all_files = [self]
        current_name = self.fname
        if not self.fname.startswith('/'):
            return all_files
        i = 0
        while current_name != '/':
            dir, _ = os.path.split(current_name)
            all_files.append(RFile(dir))
            current_name = dir
            i += 1
            if i > 512:
                assert False
        return all_files
        
class Context:
    def __init__(self):
        self.line_dict = {}
        self.curdir_dict = {}
        self.pid_group_dict = {}

    def do_clone(self, parent, child):
        self.pid_group_dict[child] = parent
        
    def set_dir(self, path, pid=None):
        self.curdir_fallback = path
        if pid and pid in self.pid_group_dict:
            pid = self.pid_group_dict[pid]
        if pid:
            self.curdir_dict[pid] = path

    def get_dir(self, pid: int):
        if pid in self.pid_group_dict:
            pid = self.pid_group_dict[pid]
        if not pid in self.curdir_dict:
            self.curdir_dict[pid] = self.curdir_fallback
        return self.curdir_dict[pid]

    def push_half_line(self, pid: int, l):
        index = l.find('<unfinished')
        self.line_dict[pid] = l[:index].strip()

    def pop_complete_line(self, pid: int, l):
        index = l.find('resumed>') + len('resumed>')
        total_line = self.line_dict[pid] + l[index:].strip()
        del self.line_dict[pid]
        return total_line

def parse_string(s):
    s = s.strip()
    # handling cases such as utimensat
    # if the open fails we will mark the file
    # as a read when we handle return value anyway so it's fine
    if s == 'NULL':
        return ''
    if s.endswith('...'):
        s = s[:-len('...')]
    if not (s[0] == '"' and s[-1] == '"'):
        breakpoint()
    assert s[0] == '"' and s[-1] == '"'
    return bytes(s[1:-1], "utf-8").decode("unicode_escape")

def between(s, d1, d2):
    return s.find(d1) + len(d1), s.rfind(d2)

def is_absolute(path):
    return len(path) > 0 and path[0] == '/'

def is_ret_err(ret: str):
    ret = ret.strip()
    return ret[0] == '-'

def get_ret_file_path(ret: str):
    assert not is_ret_err(ret)
    ret = ret.strip()
    start = ret.find('<') + 1
    end = ret.rfind('>')
    return ret[start:end]

def convert_absolute(cur_dir, path):
    if is_absolute(path):
        return path
    else:
        return os.path.join(cur_dir, path)

def get_path_first_path(pid, args, ctx):
    a = parse_string(split_args(args)[0])
    return convert_absolute(ctx.get_dir(pid), a)

def parse_r_first_path(pid, args, ret, ctx):
    try:
        return RFile(get_path_first_path(pid, args, ctx))
    except AssertionError:
        return []

def parse_w_first_path(pid, args, ret, ctx):
    try:
        path = get_path_first_path(pid, args, ctx)
    except AssertionError:
        return []
    if is_ret_err(ret):
        return RFile(path)
    else:
        return WFile(path)

def get_path_at(pid, positions, args, ctx):
    args = split_args(args)
    if isinstance(positions, list):
        rets = []
        for x in args:
            rets.append(convert_absolute(ctx.get_dir(pid), parse_string(x)))
        return rets
    else:
        return convert_absolute(ctx.get_dir(pid), parse_string(x))

def parse_rename(pid, args, ret, ctx):
    path_a, path_b = get_path_at(pid, [0, 1], args, ctx)
    return [WFile(path_a), WFile(path_b)]

def parse_link(pid, args, ret, ctx):
    path_a, path_b = get_path_at(pid, [0, 1], args, ctx)
    return [RFile(path_a), WFile(path_b)]


def parse_chdir(pid, args, ret, ctx):
    new_path = get_path_first_path(pid, args, ctx)
    if not is_ret_err(ret):
        ctx.set_dir(new_path, pid)
    return RFile(new_path)

def handle_open_flag(flags):
    if 'O_RDONLY' in flags:
        return 'r'
    else:
        return 'w'

def handle_open_common(total_path, flags, ret):
    if is_ret_err(ret):
        return RFile(total_path)
    elif handle_open_flag(flags) == 'r':
        return [RFile(total_path), RFile(get_ret_file_path(ret))]
    else:
        return [WFile(total_path), WFile(get_ret_file_path(ret))]

def parse_openat(args, ret):
    dfd, path, flags, *_ = split_args(args)
    path = parse_string(path)
    if len(path) == 0:
        return []
    if is_absolute(path):
        total_path = path
    else:
        begin, end = between(dfd, '<', '>')
        pwd = dfd[begin:end]
        total_path = os.path.join(pwd, path)
    return handle_open_common(total_path, flags, ret)

def parse_open(pid, args, ret, ctx):
    try:
        total_path = get_path_first_path(pid, args, ctx)
    except AssertionError:
        return []
    flags = split_args(args)[1]
    return handle_open_common(total_path, flags, ret)
    
def get_path_from_fd_path(args):
    a0, a1, *_ = split_args(args)
    a1 = parse_string(a1)
    if len(a1) and a1[0] == '/':
        return a1
    else:
        begin, end = between(a0, '<', '>')
        a0 = a0[begin:end]
        return os.path.join(a0, a1)

def parse_renameat(pid, args, ret, ctx):
    path_a = get_path_from_fd_path(args)
    path_b = get_path_from_fd_path(','.join(split_args(args)[2:]))
    return [WFile(path_a), WFile(path_b)]

def parse_r_fd_path(args, ret):
    return RFile(get_path_from_fd_path(args))

def parse_w_fd_path(args, ret):
    if is_ret_err(ret):
        return RFile(get_path_from_fd_path(args))
    else:
        return WFile(get_path_from_fd_path(args))

def has_clone_fs(flags):
    if 'CLONE_FS' in flags:
        return True
    else:
        return False

def parse_clone(pid, args, ret, ctx):
    try:
        child = int(ret)
    except ValueError:
        child = -1
    if child < 0:
        return
    arg_list = [x.strip() for x in split_args(args)]
    flags = [arg for arg in arg_list if arg.startswith('flags=')][0]
    flags = flags[len('flags='):]
    if has_clone_fs(flags):
        ctx.do_clone(pid, child)
    return []

def parse_symlinkat(pid, args, ret):
    a0, rest = take_first_arg(args)
    return parse_w_fd_path(rest, ret)

def parse_symlink(pid, args, ret, ctx):
    a0, rest = take_first_arg(args)
    return parse_w_first_path(pid, rest, ret, ctx)

def parse_inotify_add_watch(pid, args, ret, ctx):
    _, rest = take_first_arg(args)
    return parse_r_first_path(pid, rest, ret, ctx)

def parse_syscall(pid, syscall, args, ret, ctx):
    if syscall in r_first_path_set:
        return parse_r_first_path(pid, args, ret, ctx)
    elif syscall in w_first_path_set:
        return parse_w_first_path(pid, args, ret, ctx)
    elif syscall == 'openat':
        return parse_openat(args, ret)
    elif syscall == 'chdir':
        return parse_chdir(pid, args, ret, ctx)
    elif syscall == 'open':
        return parse_open(pid, args, ret, ctx)
    elif syscall in r_fd_path_set:
        return parse_r_fd_path(args, ret)
    elif syscall in w_fd_path_set:
        return parse_w_fd_path(args, ret)
    elif syscall == 'rename':
        return parse_rename(pid, args, ret, ctx)
    elif syscall in ['renameat', 'renameat2']:
        return parse_renameat(pid, args, ret, ctx)
    elif syscall == 'symlinkat':
        return parse_symlinkat(pid, args, ret)
    elif syscall in ['symlink', 'link']:
        return parse_symlink(pid, args, ret, ctx)
    elif syscall == 'clone':
        return parse_clone(pid, args, ret, ctx)
    elif syscall == 'inotify_add_watch':
        return parse_inotify_add_watch(pid, args, ret, ctx)
    elif syscall in ignore_set:
        return []
    else:
        raise ValueError('Unclassified syscall ' + syscall)

def strip_pid(l):
    if l[0].isdigit():
        pair = l.split(maxsplit=1)
        return int(pair[0]), pair[1]
    else:
        raise ValueError('expect pid')

def handle_info(l):
    if l.endswith('+++'):
        return True, parse_info(l)
    elif l.endswith('---'):
        return True, None
    else:
        return False, None

def parse_line(l, ctx):
    if len(l) == 0:
        return []
    pid, l = strip_pid(l)
    is_info, info = handle_info(l)
    if is_info:
        return info
    if not len(l):
        return []
    if "<unfinished" in l:
        ctx.push_half_line(pid, l)
        return []
    elif "resumed>" in l:
        l = ctx.pop_complete_line(pid, l)
    lparen = l.find('(')
    equals = l.rfind('=')
    rparen = l[:equals].rfind(')')
    if not (lparen >= 0 and equals >= 0 and rparen >= 0):
        return []
    syscall = l[:lparen]
    ret = l[equals+1:]
    args = l[lparen+1:rparen]
    return parse_syscall(pid, syscall, args, ret, ctx)

def parse_exit_code(trace_object) -> int:
    if len(trace_object) == 0 or trace_object[0] == '':
        return None
    l = trace_object[0]
    first_pid, _ = strip_pid(l)
    for l in trace_object:
        pid, tmpl = strip_pid(l)
        is_info, info = handle_info(tmpl)
        if is_info and pid == first_pid and isinstance(info, ExitStatus):
            return info.exitcode
    raise ValueError("No exitcode")

def parse_and_gather_cmd_rw_sets(trace_object, ctx: Context) -> Tuple[set, set]:
    read_set = set()
    write_set = set()
    for l in trace_object:
        try:
            records = parse_line(l, ctx)
        except Exception:
            logging.debug(l)
            raise ValueError("error while parsing trace")
        if records is None or isinstance(records, ExitStatus):
            continue
        if not isinstance(records, list):
            records = [records]
        records = [r for r in records if not (r.fname.startswith('/tmp/pash_spec') or r.fname.startswith('/dev'))]
        all_records = [r for record in records for r in record.closure()]
        for record in all_records:
            if type(record) is RFile and record.fname != '/dev/tty':
                read_set.add(record.fname)
            elif type(record) is WFile and record.fname != '/dev/tty':
                write_set.add(record.fname)
    return read_set, write_set

def main(fname):
    ctx = Context()
    ctx.set_dir(os.getcwd())
    with open(fname) as f:
        r_set, w_set = parse_and_gather_cmd_rw_sets(f, ctx)
        print("#reads")
        for r in r_set:
            print(r)
        print("#writes")
        for w in w_set:
            print(w)

if __name__ == '__main__':
    main(sys.argv[1])
