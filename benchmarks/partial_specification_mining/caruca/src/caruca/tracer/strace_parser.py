import os.path
from pathlib import Path
from dataclasses import dataclass
from typing import Literal

R_FIRST_PATH = {
    "execve",
    "stat",
    "lstat",
    "access",
    "statfs",
    "readlink",
    "execve",
    "getxattr",
    "lgetxattr",
}

W_FIRST_PATH = {
    "mkdir",
    "rmdir",
    "truncate",
    "creat",
    "chmod",
    "chown",
    "lchown",
    "utime",
    "mknod",
    "utimes",
    "acct",
}
R_FD_PATH = {
    "fstatat",
    "newfstatat",
    "statx",
    "name_to_handle_at",
    "readlinkat",
    "faccessat",
    "execveat",
    "faccessat2",
}
W_FD_PATH = {
    "utimensat",
    "mkdirat",
    "mknodat",
    "fchownat",
    "futimeat",
    "linkat",
    "fchmodat",
    "utimensat",
}


@dataclass
class ExitStatus:
    exitcode: int


def parse_info(line):
    if "exited" in line:
        start = len("+++ exited with ")
        end = -len(" +++")
        return ExitStatus(int(line[start:end]))
    elif "killed" in line:
        return ExitStatus(-1)
    else:
        raise ValueError


@dataclass
class RFile:
    fname: Path | Literal["stdin", "stdout", "stderr"]

    def __repr__(self):
        return f"rf {self.fname}"


@dataclass
class WFile:
    fname: Path | Literal["stdin", "stdout", "stderr"]

    def __repr__(self):
        return f"wf {self.fname}"


@dataclass
class DFile:
    fname: Path

    def __repr__(self):
        return f"de {self.fname}"


class Parser:
    curdir_fallback: Path
    curdir_dict: dict[int, Path]

    def __init__(self, cwd: Path):
        self.line_dict = {}
        self.curdir_dict = {}
        self.pid_group_dict = {}
        self.curdir_fallback = cwd

    def do_clone(self, parent, child):
        self.pid_group_dict[child] = parent

    def set_dir(self, path: Path, pid=None):
        self.curdir_fallback = path
        if pid and pid in self.pid_group_dict:
            pid = self.pid_group_dict[pid]
        if pid:
            self.curdir_dict[pid] = path

    def get_dir(self, pid: int):
        if pid in self.pid_group_dict:
            pid = self.pid_group_dict[pid]
        if pid not in self.curdir_dict:
            self.curdir_dict[pid] = self.curdir_fallback
        return self.curdir_dict[pid]

    def push_half_line(self, pid: int, line):
        index = line.find("<unfinished")
        self.line_dict[pid] = line[:index].strip()

    def pop_complete_line(self, pid: int, line):
        index = line.find("resumed>") + len("resumed>")
        total_line = self.line_dict[pid] + line[index:].strip()
        del self.line_dict[pid]
        return total_line

    def path_first_path(self, pid: int, args: str) -> Path:
        path = Path(parse_string(args.split(",", maxsplit=1)[0]))
        if path.is_absolute():
            return path
        else:
            return self.get_dir(pid) / path

    def path_at(self, pid: int, positions: list[int], args) -> list[Path]:
        cur_dir = self.get_dir(pid)
        return [
            path if path.is_absolute() else cur_dir / path
            for path in map(Path, map(parse_string, args.split(",")))
        ]

    def path_from_fd_path(self, args):
        from_dir, pathname, *_ = args.split(",", maxsplit=2)
        pathname = Path(parse_string(pathname))
        if pathname.is_absolute():
            return pathname
        else:
            begin, end = between(from_dir, "<", ">")
            return Path(from_dir[begin:end]) / pathname

    def r_first_path(self, pid, args, ret):
        return [RFile(self.path_first_path(pid, args))]

    def w_first_path(self, pid, args, ret):
        path = self.path_first_path(pid, args)
        if is_ret_err(ret):
            return [RFile(path)]
        else:
            return [WFile(path)]

    def r_fd_path(self, pid, args, ret):
        return [RFile(self.path_from_fd_path(args))]

    def w_fd_path(self, pid, args, ret):
        if is_ret_err(ret):
            return [RFile(self.path_from_fd_path(args))]
        else:
            return [WFile(self.path_from_fd_path(args))]

    def rename(self, pid: int, args, ret):
        path_a, path_b = self.path_at(pid, [0, 1], args)
        return [WFile(path_a), WFile(path_b)]

    def link(self, pid: int, args, ret):
        path_a, path_b = self.path_at(pid, [0, 1], args)
        return [RFile(path_a), WFile(path_b)]

    def chdir(self, pid, args, ret):
        new_path = self.path_first_path(pid, args)
        if not is_ret_err(ret):
            self.set_dir(new_path, pid)
        return [RFile(new_path)]

    def open(self, pid, args, ret):
        total_path = self.path_first_path(pid, args)
        flags = args.split(",")[1]
        return handle_open_common(total_path, flags, ret)

    def openat(self, pid, args, ret):
        dfd, path, flags, *_ = args.split(",")
        path = parse_string(path)
        if len(path) == 0:
            return []

        return handle_open_common(path, flags, ret)

    def write(self, pid, args, ret):
        fd, *_buf = args.split(",")
        begin, end = between(fd, "<", ">")
        fd_n = fd[: begin - 1]
        fd_n = int(fd_n)
        fd_dev = fd[begin:end]

        if fd_n == 1:
            return [WFile("stdout")]
        elif fd_n == 2:
            return [WFile("stderr")]
        else:
            return [WFile(fd_dev)]

    def read(self, pid, args, ret):
        fd, buf, *count = args.split(",")
        begin, end = between(fd, "<", ">")
        fd_n = fd[: begin - 1]
        fd_n = int(fd_n)
        fd_dev = fd[begin:end]

        if fd_n == 0:
            return [RFile("stdin")]
        else:
            return [RFile(fd_dev)]

    def renameat(self, pid, args, ret):
        path_a = self.path_from_fd_path(args)
        path_b = self.path_from_fd_path(",".join(args.split(",")[2:]))
        return [WFile(path_a), WFile(path_b)]

    def clone(self, pid, args, ret):
        try:
            child = int(ret)
        except ValueError:
            child = -1

        if child < 0:
            return []
        arg_list = [x.strip() for x in args.split(",")]
        flags = [arg for arg in arg_list if arg.startswith("flags=")][0]
        flags = flags[len("flags=") :]
        if has_clone_fs(flags):
            self.do_clone(pid, child)
        return []

    def symlinkat(self, pid, args, ret):
        _, rest = args.split(sep=",", maxsplit=1)
        return self.w_fd_path(pid, rest, ret)

    def symlink(self, pid, args, ret):
        a0, rest = args.split(sep=",", maxsplit=1)
        return self.w_first_path(pid, rest, ret)

    def unlink(self, pid, args, ret):
        path = self.path_first_path(pid, args)
        if is_ret_err(ret):
            return [RFile(path)]
        return [DFile(path)]

    def _resolve_at_path(self, pid, dirfd: str, path: Path) -> Path:
        if path.is_absolute():
            return path

        if dirfd == "AT_FDCWD":
            return self.get_dir(pid) / path

        if "<" in dirfd and ">" in dirfd:
            begin, end = between(dirfd, "<", ">")
            return Path(dirfd[begin:end]) / path

        return self.get_dir(pid) / path

    def unlinkat(self, pid, args, ret):
        dirfd, path_str, *_ = args.split(",", maxsplit=2)
        path = Path(parse_string(path_str))
        resolved = self._resolve_at_path(pid, dirfd, path)
        if is_ret_err(ret):
            return [RFile(resolved)]
        return [DFile(resolved)]

    def rmdir(self, pid, args, ret):
        path = self.path_first_path(pid, args)
        if is_ret_err(ret):
            return [RFile(path)]
        return [DFile(path)]

    def parse(self, line):
        if len(line) == 0:
            return []
        pid, line = strip_pid(line)
        is_info, info = handle_info(line)
        if is_info:
            return info
        if not len(line):
            return []
        if "<unfinished" in line:
            self.push_half_line(pid, line)
            return []
        elif "resumed>" in line:
            line = self.pop_complete_line(pid, line)
        lparen = line.find("(")
        equals = line.rfind("=")
        rparen = line[:equals].rfind(")")
        if not (lparen >= 0 and equals >= 0 and rparen >= 0):
            return []
        syscall = line[:lparen]
        ret = line[equals + 1 :]
        args = line[lparen + 1 : rparen]
        return self.syscall(syscall, pid, args, ret)

    def syscall(self, syscall: str, *rest):
        match syscall:
            case _ if syscall in R_FIRST_PATH:
                return self.r_first_path(*rest)
            case _ if syscall in W_FIRST_PATH:
                return self.w_first_path(*rest)
            case _ if syscall in R_FD_PATH:
                return self.r_fd_path(*rest)
            case _ if syscall in W_FD_PATH:
                return self.w_fd_path(*rest)
            case "renameat" | "renameat2":
                return self.renameat(*rest)
            case "open":
                return self.open(*rest)
            case "openat":
                return self.openat(*rest)
            case "chdir":
                return self.chdir(*rest)
            case "write":
                return self.write(*rest)
            case "read":
                return self.read(*rest)
            case "rename":
                return self.rename(*rest)
            case "clone":
                return self.clone(*rest)
            case "symlink":
                return self.symlink(*rest)
            case "symlinkat":
                return self.symlinkat(*rest)
            case "unlink":
                return self.unlink(*rest)
            case "unlinkat":
                return self.unlinkat(*rest)
            case "rmdir":
                return self.rmdir(*rest)
            case "getcwd":
                cwd = rest[1].split(sep=",", maxsplit=1)[0].strip('"')
                return [RFile(cwd)]
            case _:
                return []


def parse_string(s: str):
    s = s.strip()
    # handling cases such as utimensat
    # if the open fails we will mark the file
    # as a read when we handle return value anyway so it's fine
    if s == "NULL":
        return ""
    return bytes(s.strip('"'), "utf-8").decode("unicode_escape")


def between(s, d1, d2):
    return s.find(d1) + len(d1), s.rfind(d2)


def is_absolute(path):
    assert len(path)
    return path[0] == "/"


def is_ret_err(ret: str):
    ret = ret.strip()
    return ret[0] == "-"


def get_ret_file_path(ret: str):
    assert not is_ret_err(ret)
    ret = ret.strip()
    start = ret.find("<") + 1
    end = ret.rfind(">")
    return ret[start:end]


def convert_absolute(cur_dir, path):
    if is_absolute(path):
        return path
    else:
        return os.path.join(cur_dir, path)


def handle_open_flag(flags):
    if "O_RDONLY" in flags:
        return "r"
    else:
        return "w"


def handle_open_common(total_path, flags, ret):
    if is_ret_err(ret):
        return [RFile(total_path)]
    elif handle_open_flag(flags) == "r":
        return [RFile(total_path), RFile(Path(get_ret_file_path(ret)))]
    else:
        return [WFile(total_path), WFile(Path(get_ret_file_path(ret)))]


def has_clone_fs(flags):
    if "CLONE_FS" in flags:
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
    arg_list = [x.strip() for x in args.split(",")]
    flags = [arg for arg in arg_list if arg.startswith("flags=")][0]
    flags = flags[len("flags=") :]
    if has_clone_fs(flags):
        ctx.do_clone(pid, child)
    return []


def strip_pid(line):
    if line[0].isdigit():
        pair = line.split(maxsplit=1)
        return int(pair[0]), pair[1]
    else:
        raise ValueError(f"expect pid, found {line}")


def handle_info(line):
    if "+++" in line:
        return True, parse_info(line)
    elif "---" in line:
        return True, None
    else:
        return False, None


def parse(lines):
    ctx = Parser(Path.cwd())
    for line in lines:
        record = ctx.parse(line)
        if record:
            if isinstance(record, ExitStatus):
                continue
            if type(record) is list:
                for r in record:
                    yield r
                continue
            yield record
