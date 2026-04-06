import operator
import os
from abc import ABC
from collections.abc import Generator
from contextlib import contextmanager
from enum import Enum
from itertools import chain, starmap, zip_longest
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Annotated, Iterable, Literal, TypeAlias

from pydantic import BaseModel, Field, computed_field

from caruca.annotator.sash import FileSystemPredicate
from caruca.ir.contents import Content, SerializableContent
from caruca.ir.mixin import (
    PrintableArgumentSequence,
    PrintableCommandInvocation,
    PrintableValueWrapper,
)


# TODO: Move this from here
class Arity(Enum):
    ZERO_OR_MORE = "*"
    EXACTLY_ONE = "1"
    EXACTLY_TWO = 2
    AT_LEAST_ONE = "+"
    ONE_OR_MORE = "+"
    OPTIONAL = "?"
    ZERO_OR_ONE = "?"


ROOT_DIR = os.getcwd()


class FrozenBaseModel(BaseModel):
    @computed_field
    @property
    def true_string(self) -> str:
        return str(self)

    def get_content(self) -> Content | None:
        return None

    def to_predicate(self) -> FileSystemPredicate | None:
        return None

    def to_postcondition(self, trace_set) -> list[FileSystemPredicate]:
        return []

    def to_logic_formula(self):
        return {}


class NoEnvironmentModification(PrintableValueWrapper, FrozenBaseModel):
    value: str
    arg_type: Literal["no_env"] = "no_env"

    def prepare_env(self, sandbox: Path) -> None:
        return

    def to_predicate(self) -> FileSystemPredicate | None:
        return None


class LazyPath(FrozenBaseModel, ABC):
    value: str
    relative: bool
    sandbox: Path = Path("sandbox_placeholder")

    def __str__(self):
        return self.value if self.relative else str(self.sandbox / self.value)

    def _prepare_path(self, sandbox: Path):
        self.sandbox = sandbox
        return Path(sandbox / str(self) if self.relative else str(self))


class AlreadyExistantPath(LazyPath):
    arg_type: Literal["already"] = "already"

    def prepare_env(self, sandbox: Path):
        path = self._prepare_path(sandbox)
        if not path.exists():
            raise Exception(f"File system object with path {path} does not exist")


class NonexistentPath(LazyPath):
    parent_exists: bool
    arg_type: Literal["nonexistent"] = "nonexistent"

    def prepare_env(self, sandbox: Path):
        path = self._prepare_path(sandbox)
        if path.exists():
            raise Exception(f"File system object with path {path} exists")

    def to_predicate(self) -> FileSystemPredicate:
        return FileSystemPredicate(
            name=self.value,
            type="nonexistent",
            relative=self.relative,
            parent_exists=self.parent_exists,
        )

    def to_postcondition(self, trace_set) -> list[FileSystemPredicate] | None:
        postconditions = []
        for action, path in trace_set.traces:
            action = action.value
            if action == "ad" and str(path) == self.value:
                postconditions.append(
                    FileSystemPredicate(
                        name=self.value, type="file", relative=self.relative
                    )
                )
            if action == "md" and str(path) == self.value:
                postconditions.append(
                    FileSystemPredicate(
                        name=self.value, type="directory", relative=self.relative
                    )
                )

        if not postconditions:
            return [
                FileSystemPredicate(
                    name=self.value, type="nonexistent", relative=self.relative
                )
            ]
        return postconditions


class File(LazyPath):
    content: SerializableContent
    arg_type: Literal["file"] = "file"

    def get_content(self):
        return self.content

    def __str__(self):
        if self.content is Content.IMAGE:
            return super().__str__() + ".jpg"
        else:
            return super().__str__()

    def prepare_env(self, sandbox: Path):
        path = self._prepare_path(sandbox)
        try:
            with open(path, "xb+") as f:
                f.write(self.content.value)
        except FileExistsError:
            pass

    def to_predicate(self) -> FileSystemPredicate:
        return FileSystemPredicate(name=self.value, type="file", relative=self.relative)

    def to_postcondition(self, trace_set) -> list[FileSystemPredicate] | None:
        # If the file was deleted, it's nonexistent, otherwise it's a file
        deleted = False
        postconditions = []
        for action, path in trace_set.traces:
            action = action.value
            if action == "de" and path.name == self.value:
                deleted = True
                postconditions.append(
                    FileSystemPredicate(
                        name=self.value, type="nonexistent", relative=self.relative
                    )
                )
            if action == "ad" and self.value == path.name:
                postconditions.append(
                    FileSystemPredicate(
                        name=str(path), type="file", relative=self.relative
                    )
                )
        if not postconditions:
            return [
                FileSystemPredicate(
                    name=self.value, type="file", relative=self.relative
                )
            ]
        if not deleted:
            postconditions.append(
                FileSystemPredicate(
                    name=self.value, type="file", relative=self.relative
                )
            )
        return postconditions


class Directory(LazyPath):
    arg_type: Literal["directory_empty"] = "directory_empty"

    def prepare_env(self, sandbox: Path):
        path = self._prepare_path(sandbox)
        try:
            os.mkdir(path)
        except FileExistsError:
            return

    def to_predicate(self) -> FileSystemPredicate:
        return FileSystemPredicate(
            name=self.value, type="directory_empty", relative=self.relative
        )

    def to_postcondition(self, trace_set) -> list[FileSystemPredicate] | None:
        postconditions = []
        for action, path in trace_set.traces:
            action = action.value
            if action == "de" and path.name == self.value:
                postconditions.append(
                    FileSystemPredicate(
                        name=self.value, type="nonexistent", relative=self.relative
                    )
                )
            if action == "ad" and path.parent == Path(self.value):
                postconditions.append(
                    FileSystemPredicate(
                        name=self.value,
                        type="directory_nonempty",
                        relative=self.relative,
                    )
                )
        if not postconditions:
            return [
                FileSystemPredicate(
                    name=self.value, type="directory_empty", relative=self.relative
                )
            ]
        return postconditions


class NonEmptyDirectory(LazyPath):
    arg_type: Literal["directory_nonempty"] = "directory_nonempty"

    def prepare_env(self, sandbox: Path):
        path = self._prepare_path(sandbox)
        try:
            os.mkdir(path)
            with open(Path(path) / "file", "x") as f:
                f.write("")
        except FileExistsError:
            return

    def to_predicate(self) -> FileSystemPredicate:
        return FileSystemPredicate(
            name=self.value, type="directory_nonempty", relative=self.relative
        )

    def to_postcondition(self, trace_set) -> list[FileSystemPredicate] | None:
        for action, path in trace_set.traces:
            action = action.value
            if action == "de" and path == self.value:
                return [
                    FileSystemPredicate(
                        name=self.value, type="nonexistent", relative=self.relative
                    )
                ]
            elif action == "ad" and path.parent == Path(self.value):
                return [
                    FileSystemPredicate(
                        name=self.value,
                        type="directory_nonempty",
                        relative=self.relative,
                    )
                ]
            elif action == "de" and path == Path(self.value) / "file":
                return [
                    FileSystemPredicate(
                        name=self.value, type="directory_empty", relative=self.relative
                    )
                ]
        return [
            FileSystemPredicate(
                name=self.value, type="directory_nonempty", relative=self.relative
            )
        ]


EnvironmentArgument: TypeAlias = Annotated[
    (
        AlreadyExistantPath
        | File
        | Directory
        | NonexistentPath
        | NoEnvironmentModification
        | NonEmptyDirectory
    ),
    Field(discriminator="arg_type"),
]


class ArgumentSequenceWithEnv(PrintableArgumentSequence, FrozenBaseModel):
    flag: str | None
    args: tuple[EnvironmentArgument, ...]
    flag_followed_by_equals: bool
    node_type: Literal["args"] = "args"
    arity: Arity | int
    symbol: str = Field(kw_only=True, default="")

    def get_pathnames(self) -> Iterable[str]:
        for arg in self.args:
            yield arg.value

    def get_contents(self) -> Iterable[Content]:
        for arg in self.args:
            if content := arg.get_content():
                yield content

    def prepare(self, sandbox: Path):
        for arg in self.args:
            arg.prepare_env(sandbox)

    def predicates(self) -> list[FileSystemPredicate]:
        return list(filter(None, map(lambda arg: arg.to_predicate(), self.args)))

    def postconditions(self, trace_set) -> list[FileSystemPredicate]:
        return list(
            chain.from_iterable(
                filter(
                    None, map(lambda arg: arg.to_postcondition(trace_set), self.args)
                )
            )
        )

    def get_args(self):
        return self.args

    def __eq__(self, other):
        if not isinstance(other, ArgumentSequenceWithEnv):
            return False

        return other.flag == self.flag and all(
            starmap(operator.eq, zip_longest(self.args, other.args))
        )

    def uses_flag(self, flag: str, contains_equals: bool = False) -> bool:
        if contains_equals and not self.flag_followed_by_equals:
            return False

        if self.flag is None:
            return False
        else:
            return self.flag == flag


class Flag(PrintableValueWrapper, FrozenBaseModel):
    value: str
    node_type: Literal["flag"] = "flag"
    alias: tuple[str, ...] = Field(kw_only=True, default_factory=tuple)

    def get_pathnames(self):
        return []

    def get_contents(self):
        return []

    def prepare(self, sandbox: Path) -> None:
        return

    def predicates(self) -> list[FileSystemPredicate]:
        return []

    def postconditions(self, trace_set) -> list[FileSystemPredicate]:
        return []

    def get_args(self):
        return tuple()

    def uses_flag(self, flag: str, contains_equals: bool = False) -> bool:
        if contains_equals:
            return False
        return self.value == flag


EnvironmentNode: TypeAlias = Annotated[
    ArgumentSequenceWithEnv | Flag, Field(discriminator="node_type")
]


class CommandConfig(PrintableCommandInvocation, FrozenBaseModel):
    name: str
    body: tuple[EnvironmentNode, ...]
    string: (
        dict  # this is a bit of a misnomer because it's actually invocation metadata
    )
    stdin: SerializableContent

    @property
    def pathnames(self) -> Iterable[str]:
        for node in self.body:
            yield from node.get_pathnames()

    @property
    def file_contents(self) -> Iterable[Content]:
        for node in self.body:
            yield from node.get_contents()

    def pre_post_conditions(
        self, trace_set
    ) -> tuple[list[FileSystemPredicate], list[FileSystemPredicate]]:
        pre = chain.from_iterable(el.predicates() for el in self.body)
        post = chain.from_iterable(el.postconditions(trace_set) for el in self.body)
        return list(pre), list(post)

    def __eq__(self, other):
        if not isinstance(other, CommandConfig):
            return False

        return other.name == self.name and all(
            starmap(operator.eq, zip_longest(self.body, other.body))
        )

    @contextmanager
    def env(self) -> Generator[Path, None, None]:
        with TemporaryDirectory(prefix="toplevel_", dir="/tmp") as tl:
            with TemporaryDirectory(prefix="sandbox_", dir=tl) as sandbox:
                sandbox = Path(sandbox)
                for seq in self.body:
                    seq.prepare(sandbox)
                yield sandbox
