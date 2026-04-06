import importlib.resources
import logging
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor
from dataclasses import asdict
from itertools import chain
from pathlib import Path
from tempfile import TemporaryDirectory, TemporaryFile
from textwrap import indent
from typing import Iterable, Literal
import shlex
import os

import tqdm

from caruca.ir.environment import CommandConfig
from caruca.ir.string import CommandInvocation
from caruca.tracer import strace_parser
from caruca.tracer.data import (
    CommandInvocationTraces,
    CommandInvocationTraceSet,
    FSInteraction,
    Trace,
)


class Tracer:
    """
    Keeps track of the universal settings for tracing
    """

    prefix: str
    output_dir: Path | None
    logger: logging.Logger
    stdin_variation: Literal["simple", "varied", "split"]
    content_variation: Literal["simple", "varied", "split"]
    timeout: float

    def __init__(
        self,
        parallel: int,
        stdin_variation: Literal["simple", "varied", "split"] = "simple",
        content_variation: Literal["simple", "varied", "split"] = "simple",
        prefix: str = "",
        timeout=2,
    ):
        logging.basicConfig(filename="tracer.log", level=logging.DEBUG, filemode="w")
        self.logger = logging.getLogger("tracer.log")
        self.parallel = parallel
        self.stdin_variation = stdin_variation
        self.content_variation = content_variation
        self.timeout = timeout
        self.env = {
            "PATH": "/usr/bin:/bin:/usr/local/sbin:/usr/local/bin",
            "SHELL": "/bin/sh",
        }
        self.progress_bar = tqdm.tqdm(total=0)
        self.placeholder_sandbox = Path("/tmp/sandbox_outer/sandbox_inner")
        self.prefix = prefix

    @property
    def variations(self):
        return self.stdin_variation, self.content_variation

    def __parse_trace(self, sandbox: Path, traceline: str) -> Trace | None:
        try:
            action, path = traceline.split(" ")
            action = FSInteraction(action)
            if path in ("stderr", "stdout", "stdin"):
                return action, path

            if os.path.isabs(path):
                return action, (
                    self.placeholder_sandbox
                    / Path(os.path.relpath(path, start=sandbox))
                ).resolve()
            else:
                return action, Path(path)
        except ValueError:
            self.logger.error(f"Failed to parse trace: {traceline}")

    def __strace_traces(self, sandbox, try_path, config: CommandConfig):
        with TemporaryFile("w+") as strace_output:
            fd = strace_output.fileno()
            strace = f"timeout {self.timeout} strace -yfo /proc/self/fd/{fd} --trace=%file,%desc,getcwd {config}"
            self.logger.debug(f"strace invocation: {strace}")
            trace_method = os.environ.get("CARUCA_ISOLATION_METHOD", "try").lower()

            match trace_method:
                case "try":
                    trace_cmd = [try_path, "-D", sandbox, strace]
                case "docker":
                    trace_cmd = [
                        "docker", "run", "--rm",
                        "debian:latest",
                        strace ]
                case "none":
                    trace_cmd = shlex.split(strace)
                    # trace_cmd = shlex.split(str(config))

            strace_run = subprocess.run(
                trace_cmd,
                capture_output=True,
                input=config.stdin.value,
                cwd=sandbox,
                pass_fds=[fd],
                env=self.env,
            )
            cmd_stdout = strace_run.stdout
            cmd_stderr = strace_run.stderr
            strace_traces = list(
                map(str, strace_parser.parse(strace_output.readlines()))
            )

        if cmd_stdout is not None:
            try:
                cmd_stdout = cmd_stdout.decode()
            except UnicodeDecodeError:
                cmd_stdout = "Decoding Failed"

        if cmd_stderr is not None:
            try:
                cmd_stderr = cmd_stderr.decode()
            except UnicodeDecodeError:
                cmd_stderr = "Decoding Failed"

        self.logger.info(
            "\n".join(
                (
                    f"Executing `{config}`",
                    f"sandbox: {sandbox}",
                    f"files: {','.join(con.name for con in config.file_contents)}",
                    f"stdin: {config.stdin.name}",
                    f"stdout:\n{indent(cmd_stdout, ' ' * 4)}",
                    f"stderr:\n{indent(cmd_stderr, ' ' * 4)}",
                    f"traces:\n{indent("\n".join(strace_traces), ' ' * 4)}",
                    f"returncode: {strace_run.returncode}",
                    "=" * 16,
                )
            )
        )

        return strace_traces, cmd_stdout, cmd_stderr, strace_run.returncode

    def __exec_in_sandbox(self, config: CommandConfig):
        with config.env() as sandbox:
            with importlib.resources.path("caruca.scripts", "try") as try_path:
                self.progress_bar.total += 1
                try:
                    (
                        strace_traces,
                        stdout,
                        stderr,
                        return_code,
                    ) = self.__strace_traces(sandbox, try_path, config)
                except subprocess.TimeoutExpired:
                    self.logger.error(f"{config} timed out")
                    return CommandInvocationTraces(
                        command=config,
                        return_code=None,
                        stdout=None,
                        stderr=None,
                        traces=[],
                    )
                summary = subprocess.run(
                    [try_path, "summary", sandbox],
                    text=True,
                    capture_output=True,
                    cwd=sandbox,
                    env=self.env,
                )
                try_stdout, try_stderr = summary.stdout, summary.stderr
                if try_stdout:
                    self.logger.info(f"{config} Try's stdout: {try_stdout}")
                if try_stderr:
                    self.logger.info(f"{config} Try's stderr: {try_stderr}")

                try_traces = try_stderr.strip().splitlines()
                traces = list(
                    filter(
                        None,
                        (
                            self.__parse_trace(sandbox, line)
                            for line in chain(strace_traces, try_traces)
                        ),
                    )
                )

                self.progress_bar.update(1)
                return CommandInvocationTraces(
                    command=config,
                    return_code=return_code,
                    stdout=stdout,
                    stderr=stderr,
                    traces=traces,
                )

    def __trace_command(self, command: CommandInvocation):
        return CommandInvocationTraceSet(
            command=asdict(command),
            true_str=str(command),
            configs=list(
                map(
                    self.__exec_in_sandbox,
                    command.to_exec_env(self.prefix, *self.variations),
                )
            ),
        )

    def run(self, invocations: Iterable[CommandInvocation]):
        with TemporaryDirectory("try_garbage") as try_garbage:
            self.env["TMPDIR"] = try_garbage
            with ThreadPoolExecutor() as executor:
                res = executor.map(self.__trace_command, invocations)
            self.progress_bar.refresh()
            return list(res)
