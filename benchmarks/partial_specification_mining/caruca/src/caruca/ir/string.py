from enum import Enum
import functools
import operator
import itertools
from abc import ABC, abstractmethod
from collections.abc import Iterable
from dataclasses import asdict, dataclass, field
from itertools import product
from typing import ClassVar, Optional
from caruca.ir.contents import Content, ContentLevel
import caruca.ir.environment as with_env
from caruca.ir.environment import (
    AlreadyExistantPath,
    ArgumentSequenceWithEnv,
    Arity,
    CommandConfig,
    Directory,
    EnvironmentArgument,
    EnvironmentNode,
    File,
    NonEmptyDirectory,
    NonexistentPath,
)
from caruca.ir.mixin import (
    PrintableArgumentSequence,
    PrintableCommandInvocation,
    PrintableValueWrapper,
)


@dataclass(frozen=True)
class RawArgument(PrintableValueWrapper, ABC):
    content_variation: ClassVar[ContentLevel]

    value: str

    @abstractmethod
    def attach_env(self) -> Iterable[EnvironmentArgument]:
        pass


@dataclass(frozen=True)
class FlagSet(RawArgument):
    value: str = field(init=False, default="")  # always set to empty string

    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


@dataclass(frozen=True)
class Int(RawArgument):
    value: str

    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


@dataclass(frozen=True)
class String(RawArgument):
    value: str

    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


@dataclass(frozen=True)
class Selection(RawArgument):
    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


@dataclass(frozen=True)
class DateTime(RawArgument):
    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


@dataclass(frozen=True)
class Permission(RawArgument):
    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return [with_env.NoEnvironmentModification(value=self.value)]


class Relation(Enum):
    CHILD = "child"
    SIBLING = "sibling"
    CWD = "cwd"
    PARENT = "parent"


@dataclass(frozen=True)
class Path(RawArgument):
    relative: bool
    relation: Relation = Relation.CHILD

    def attach_env(self) -> Iterable[EnvironmentArgument]:
        match self.relation:
            case Relation.CWD:
                yield AlreadyExistantPath(value=".", relative=self.relative)
                return
            case Relation.PARENT:
                yield AlreadyExistantPath(value="..", relative=self.relative)
                return
            case Relation.CHILD:
                true_val = self.value
            case Relation.SIBLING:
                true_val = f"../{self.value}"

        yield from (
            File(value=true_val, relative=self.relative, content=c)
            for c in Content.variation(self.content_variation)
        )

        yield from (
            Directory(value=true_val, relative=self.relative),
            NonEmptyDirectory(value=true_val, relative=self.relative),
            NonexistentPath(
                value=f"nonexistent_path/{true_val}",
                relative=self.relative,
                parent_exists=False,
            ),
            NonexistentPath(value=true_val, relative=self.relative, parent_exists=True),
        )


@dataclass(frozen=True)
class List(RawArgument):
    items: Iterable[RawArgument]
    separator: str

    def attach_env(self) -> Iterable[EnvironmentArgument]:
        return itertools.product(*[x.attach_env() for x in self.items])


@dataclass(frozen=True)
class ArgumentSequence(PrintableArgumentSequence):
    flag: Optional[str]
    args: tuple[RawArgument, ...]
    flag_followed_by_equals: bool
    arity: Arity | int
    symbol: str = field(kw_only=True, default="", compare=False)
    identifier: str = field(kw_only=True, default="")

    def environment_variation(self) -> Iterable[EnvironmentNode]:
        for environment_combo in product(*[x.attach_env() for x in self.args]):
            yield ArgumentSequenceWithEnv(
                flag=self.flag,
                args=environment_combo,
                flag_followed_by_equals=self.flag_followed_by_equals,
                arity=self.arity,
                symbol=self.symbol,
            )


@dataclass(frozen=True)
class CommandInvocation(PrintableCommandInvocation):
    name: str
    body: tuple[ArgumentSequence, ...]

    def to_exec_env(
        self,
        prefix: str,
        stdin_variation: ContentLevel = "simple",
        content_variation: ContentLevel = "simple",
    ) -> Iterable[CommandConfig]:
        stdins = Content.variation(stdin_variation)
        RawArgument.content_variation = content_variation

        self_asdict = asdict(self)
        self_asdict["body"] = [x for x in self_asdict["body"] if x["args"]]

        for combo in product(*(el.environment_variation() for el in self.body)):
            for stdin in stdins:
                yield CommandConfig(
                    name=prefix + self.name,
                    body=combo,
                    string=self_asdict,
                    stdin=stdin,
                )

    def length_hint(self, stdin_variation, content_variation):
        stdins = Content.variation(stdin_variation)
        RawArgument.content_variation = content_variation
        variations: list[list] = [list(el.environment_variation()) for el in self.body]
        variations.append(stdins)
        return functools.reduce(operator.mul, map(len, variations), 1)
