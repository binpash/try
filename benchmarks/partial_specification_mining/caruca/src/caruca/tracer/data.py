from enum import Enum
from pathlib import Path
from itertools import combinations
from typing import Iterable, Literal, Self, TypeAlias

from pydantic import BaseModel, RootModel

from caruca.annotator.annotator import Parallelizability, RunSpecification
from caruca.ir.environment import CommandConfig


class FSInteraction(Enum):
    REPLACED_WITH_DIRECTORY = "rd"
    CREATED_DIRECTORY = "md"
    MODIFIED_FILE = "mo"
    DELETED_FILE = "de"
    CREATED_FILE = "ad"

    READ_FILE = "rf"
    WRITTEN_FILE = "wf"

    @property
    def modified(self):
        match self:
            case (
                FSInteraction.CREATED_FILE
                | FSInteraction.CREATED_DIRECTORY
                | FSInteraction.WRITTEN_FILE
                | FSInteraction.MODIFIED_FILE
                | FSInteraction.DELETED_FILE
                | FSInteraction.REPLACED_WITH_DIRECTORY
            ):
                return True
            case _:
                return False


Trace: TypeAlias = tuple[FSInteraction, Path | Literal["stdin", "stdout", "stderr"]]


class CommandInvocationTraces(BaseModel):
    """
    The full output from tracing a command with a specific config
    """

    command: CommandConfig
    return_code: int | None
    stdout: str | None
    stderr: str | None
    traces: list[Trace]

    def __input(self, other: Self):
        return (
            other != self
            and other.command.body == self.command.body
            and (
                other.command.stdin.name == self.command.stdin.name + "_1"
                or other.command.stdin.name == self.command.stdin.name + "_2"
            )
            and other.return_code == 0
        )

    def __arg(self, other: Self):
        my_files = (f for f in self.command.file_contents if f != "image")
        other_files = (f for f in other.command.file_contents if f != "image")

        if other is self or other.command.true_string != self.command.true_string:
            return False

        return all(any(map(subf.is_partial_of, my_files)) for subf in other_files)

    def __arg_coarse(self, other: Self):
        """
        Coarsed grained argument splitting used in POSH.
        E.g. cat f1 and cat f2 are partial invocations of cat f1 f2
        """
        if other == self:
            return False

        files = set(self.command.file_contents)
        other_files = set(other.command.file_contents)
        return other_files and files.issuperset(other_files)

    def __is_similar(self, p1, p2):
        return (
            p1.stdout + p2.stdout == self.stdout
            or p1.stdout.strip() + p2.stdout == self.stdout
            or p1.stdout + p2.stdout.strip() == self.stdout
        )

    def __input_lines(self, trace: Self) -> list[str]:
        lines: list[str] = []

        contents = list(trace.command.file_contents)
        if contents:
            for content in contents:
                try:
                    lines.extend(content.value.decode("utf-8", errors="ignore").splitlines())
                except Exception:
                    # If decoding fails, treat as not preserving order.
                    return []
        else:
            try:
                lines.extend(
                    trace.command.stdin.value.decode("utf-8", errors="ignore").splitlines()
                )
            except Exception:
                return []

        return lines

    def __preserves_line_order(self, trace: Self) -> bool:
        output_lines = (trace.stdout or "").splitlines()
        if not output_lines:
            return False

        input_lines = self.__input_lines(trace)
        if not input_lines:
            return False

        it = iter(range(len(input_lines)))
        pos = 0
        for out_line in output_lines:
            found = False
            for idx in it:
                if input_lines[idx] == out_line:
                    pos = idx + 1
                    found = True
                    break
            if not found:
                return False

        return True

    def __is_splittable(self, func, others: Iterable[Self]) -> bool:
        candidates = [c for c in others if func(c)]
        for p1, p2 in combinations(candidates, 2):
            if (
                p1.stdout
                and p2.stdout
                and self.__preserves_line_order(p1)
                and self.__preserves_line_order(p2)
                and (self.__is_similar(p1, p2) or self.__is_similar(p2, p1))
            ):
                return True
        return False

    @property
    def successful(self) -> bool:
        return self.return_code == 0

    def __readwrite(self, sandbox: Path):
        read_from, wrote_to, deleted = set(), set(), set()

        for interaction, path in self.traces:
            if path in ("stdout", "stderr"):
                assert interaction.modified
                wrote_to.add(path)
            elif path == "stdin":
                assert not interaction.modified
                read_from.add(path)
            else:
                resolved = (sandbox / path).resolve()
                is_relative = resolved.is_relative_to(sandbox)

                if interaction.modified:
                    if resolved in ("/dev/null", "/dev/zero"):
                        continue

                    target = (
                        str(resolved.relative_to(sandbox)).removesuffix(".jpg")
                        if is_relative
                        else str(resolved).removesuffix(".jpg")
                    )

                    if interaction is FSInteraction.DELETED_FILE:
                        deleted.add(target)
                        wrote_to.add(target)
                    elif not resolved.is_relative_to("/proc") or is_relative:
                        wrote_to.add(target)
                else:
                    if not path.is_absolute() or (path.is_absolute() and is_relative):
                        read_from.add(
                            str(resolved.relative_to(sandbox)).removesuffix(".jpg")
                        )
        return read_from, wrote_to, deleted

    def to_annotation(
        self, sandbox: Path, full_inputs, partial_inputs
    ) -> RunSpecification:
        stdin_splittable = self.__is_splittable(self.__input, partial_inputs)
        arg_splittable = self.__is_splittable(self.__arg, full_inputs)
        arg_splittable_coarse = self.__is_splittable(self.__arg_coarse, full_inputs)

        output_smaller = self.stdout and len(self.stdout) < len(
            self.command.stdin.value
        )
        read_from, wrote_to, deleted = self.__readwrite(sandbox)
        no_effect = {"stdout", "stderr"}.issuperset(wrote_to)

        splittable = False
        stdin_seen = "stdin" in read_from
        if stdin_seen:
            splittable = stdin_splittable

        input_files = set(filter(None, self.command.pathnames))
        args_seen = input_files and read_from.issuperset(input_files)
        if args_seen:
            # If both stdin and args are read, require both to split; else rely on args only.
            if stdin_seen:
                splittable = splittable and arg_splittable
            else:
                splittable = arg_splittable

        match no_effect, splittable:
            case True, True:
                par = Parallelizability.S
            case True, False:
                par = Parallelizability.N
            case False, _:
                par = Parallelizability.E

        if "." in read_from:
            read_from.remove(".")
            par = Parallelizability.E

        pre, post = self.command.pre_post_conditions(self)
        updates = set(p.name for p in post if p not in pre)

        return RunSpecification(
            inputs=list(read_from),
            outputs=list(wrote_to),
            return_code=self.return_code,
            parallelizability=par,
            preconditions=pre,
            postconditions=post,
            updates=list(updates),
            deletions=list(deleted),
            input_geq_output=bool(output_smaller),
            input_split=stdin_splittable,
            args_split=arg_splittable_coarse,
        )


class CommandInvocationTraceSet(BaseModel):
    command: dict
    true_str: str
    configs: list[CommandInvocationTraces]

    def full_partial_input_traces(
        self,
    ) -> tuple[list[CommandInvocationTraces], list[CommandInvocationTraces]]:
        full, partial = [], []
        for c in (c for c in self.configs if c.successful):
            if c.command.stdin.name.endswith(("_1", "_2")):
                partial.append(c)
            else:
                full.append(c)

        return full, partial

    def to_annotation(self) -> Iterable[RunSpecification]:
        full_inputs, partial_inputs = self.full_partial_input_traces()
        for trace in full_inputs:
            yield trace.to_annotation(
                Path("/tmp/sandbox_outer/sandbox_inner"), full_inputs, partial_inputs
            )


Traces = RootModel[list[CommandInvocationTraceSet]]
