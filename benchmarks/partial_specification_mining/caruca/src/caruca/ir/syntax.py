import functools
import operator
import random
import re
from abc import ABC, abstractmethod
from collections.abc import Iterable
from contextlib import contextmanager
from dataclasses import dataclass, field
from itertools import chain, product, combinations
from string import ascii_uppercase
from typing import ClassVar, TypeAlias

import caruca.ir.string as string
from caruca.ir.environment import Arity
from caruca.ir.string import ArgumentSequence, CommandInvocation, RawArgument, Relation


@dataclass(frozen=True)
class MatchStrategy(ABC):
    arg: str


@dataclass(frozen=True)
class Exact(MatchStrategy):
    pass


@dataclass(frozen=True)
class Extrapolated(MatchStrategy, ABC):
    pass


@dataclass(frozen=True)
class AliasStrategy(Extrapolated):
    matched_with: str


@dataclass(frozen=True)
class ArityStrategy(Extrapolated):
    required_arity: int


@dataclass(frozen=True)
class Agnosticism(Extrapolated, ABC):
    pass


@dataclass(frozen=True)
class PathAgnosticism(Agnosticism):
    matched_with: str


@dataclass(frozen=True)
class IntAgnosticism(Agnosticism):
    matched_with: str


@dataclass(frozen=True)
class StringAgnosticism(Agnosticism):
    matched_with: str


@dataclass(frozen=True)
class ShortFlagSplat(Extrapolated):
    matched_with: str


@dataclass(frozen=True)
class DefaultArg(Extrapolated):
    pass


@dataclass
class Argument(ABC):
    elaborate_relations: ClassVar[bool]
    max_repetition: ClassVar[int] = 2

    flag: str | None = field(init=False)
    arity: Arity | int = field(kw_only=True, default=Arity.OPTIONAL)
    flag_followed_by_equals: bool = field(kw_only=True, default=False)
    # Some options like --interactive may require the argument to --interactive
    # be prepended by an equals sign like ---interactive=always
    alias: list[str] = field(kw_only=True, default_factory=list)
    symbol: str = field(init=False)
    identifier: str = field(
        init=False,
        default_factory=lambda: "".join(random.choices(ascii_uppercase, k=5)),
    )
    strat: list[Extrapolated] = field(init=False, default_factory=list)

    def __post_init__(self):
        self.symbol = f"{type(self).__name__.upper()}{self.flag if self.flag else ''}_{self.identifier}"

    def is_optional(self):
        return self.arity == Arity.OPTIONAL or self.arity == Arity.ZERO_OR_MORE

    def _arity_range(self) -> Iterable[int]:
        match self.arity:
            case Arity.EXACTLY_ONE:
                return [1]
            case Arity.OPTIONAL:
                return [0, 1]
            case Arity.AT_LEAST_ONE:
                return range(1, self.max_repetition + 1)
            case Arity.ZERO_OR_MORE:
                return range(0, self.max_repetition + 1)
            case _ if isinstance(self.arity, int):
                return [self.arity]
            case _:
                raise Exception(
                    f"self.arity must be type int or Arity but found {type(self.arity)}"
                )

    def syntax_variation(self) -> Iterable[ArgumentSequence]:
        for n in self._arity_range():
            for combo in product(*(self.syntax() for _ in range(n))):
                yield ArgumentSequence(
                    self.flag,
                    combo,
                    self.flag_followed_by_equals,
                    arity=self.arity,
                    identifier=self.identifier,
                    symbol=self.symbol,
                )

    def length_hint(self) -> int:
        return sum(len(list(self.syntax())) ** n for n in self._arity_range())

    @contextmanager
    def _strategy_ctx(self):
        self._strat = []
        try:
            yield
        finally:
            pass

    @abstractmethod
    def syntax(self) -> Iterable[RawArgument]:
        pass

    @abstractmethod
    def could_match(self, other: list[str]) -> tuple[list[str], list[MatchStrategy]]:
        """
        Given a list of args, returns the remaining args after matching
        and the list of strategies used when matching
        """
        pass


@dataclass
class ValueArgument(Argument, ABC):
    flag: str | None = None
    _strat: list[MatchStrategy] = field(init=False, default_factory=list)

    @abstractmethod
    def _value_match(self, arg: str) -> bool:
        pass

    def __inner_match(self, other: list[str]) -> list[str]:
        fst, *rest = other
        if self.flag and self.flag_followed_by_equals:
            for flag in (self.flag, *self.alias):
                if fst.startswith(flag):
                    value = fst.removeprefix(flag)
                    stripeq = value.removeprefix("=")
                    if stripeq == value:
                        self._strat.append(DefaultArg(value))
                        return rest
                    elif self._value_match(stripeq):
                        return rest
                    else:
                        return other
            return other

        # We've already verified that the flag matches in self.__flag_match
        args = rest if self.flag else other
        max_iter = max(self._arity_range())

        for i, arg in zip(range(max_iter), args):
            if not self._value_match(arg):
                return args[i:]
            elif i != 0:
                self._strat.append(ArityStrategy(arg, i + 1))

        return args[max_iter:]

    def __flag_match(self, arg: str) -> bool:
        if not self.flag:
            return True

        if self.flag_followed_by_equals:
            if arg.startswith(self.flag):
                self._strat.append(Exact(arg))
                return True
            for alias in self.alias:
                if arg.startswith(alias):
                    self._strat.append(AliasStrategy(arg, alias))
                    return True
            return False
        else:
            if arg == self.flag:
                self._strat.append(Exact(arg))
                return True
            elif arg in self.alias:
                self._strat.append(AliasStrategy(arg, arg))
                return True
            elif arg.startswith(self.flag):
                self._strat.append(ShortFlagSplat(arg, self.flag))
                return True
            else:
                self._strat.append(StringAgnosticism(arg, self.flag))
                return True

    def could_match(self, other: list[str]) -> tuple[list[str], list[MatchStrategy]]:
        with self._strategy_ctx():
            if self.__flag_match(other[0]):
                return self.__inner_match(other), self._strat
            else:
                return other, self._strat


@dataclass
class Path(ValueArgument):
    dash_as_stdin: bool = field(kw_only=True, default=False)
    _counter: ClassVar[int] = 1

    def syntax(self) -> Iterable[RawArgument]:
        counter = Path._counter
        Path._counter += 1

        if self.elaborate_relations:
            for relation in Relation:
                yield from (
                    string.Path(
                        f"my_{relation.value}_relpath_{counter}",
                        relative=True,
                        relation=relation,
                    ),
                    string.Path(
                        f"my_{relation.value}_abspath_{counter}",
                        relative=False,
                        relation=relation,
                    ),
                )
        else:
            yield from (
                string.Path(f"relpath_{counter}", relative=True),
                string.Path(f"abspath_{counter}", relative=False),
            )

    def _value_match(self, arg: str) -> bool:
        if re.match(r"^relpath_\d", arg):
            self._strat.append(Exact(arg))
            return True
        elif not arg.startswith("-"):
            self._strat.append(PathAgnosticism(arg, ""))
            return True
        else:
            return False


@dataclass
class Integer(ValueArgument):
    min: int = -1
    max: int = 1
    suffixes: tuple[str] = field(kw_only=True, default_factory=tuple)

    def syntax(self):
        return map(string.Int, map(str, range(self.min, self.max + 1)))

    def _value_match(self, arg: str) -> bool:
        if arg in map(str, range(self.min, self.max + 1)):
            self._strat.append(Exact(arg))
            return True
        elif arg.isdigit():
            self._strat.append(IntAgnosticism(arg, f"{self.min}-{self.max}"))
            return True
        else:
            return False


@dataclass
class String(ValueArgument):
    choices: tuple[str, ...] = field(default=("string",))

    def syntax(self):
        return map(string.String, self.choices)

    def _value_match(self, arg: str) -> bool:
        if arg in self.choices:
            return True
        elif not arg.startswith("-"):
            self._strat.append(StringAgnosticism(arg, str(self.choices)))
            return True
        else:
            return False


@dataclass
class Selection(ValueArgument):
    choices: list[str] = field(default_factory=list)

    def syntax(self):
        return map(string.Selection, self.choices)

    def _value_match(self, arg: str) -> bool:
        if arg in self.choices:
            self._strat.append(Exact(arg))
            return True
        else:
            return False


@dataclass
class List(ValueArgument):
    of: type[Argument] = field(kw_only=True, default=String)
    separator: str = field(kw_only=True, default=",")
    choices: list[str] = field(default_factory=list)

    def syntax(self):
        return map(string.String, self.choices)

    def _value_match(self, arg: str) -> bool:
        return False


@dataclass
class Flag(Argument):
    flag: str

    def syntax(self):
        return [string.FlagSet()]

    @staticmethod
    def single_char(flag):
        return re.match(r"^-([a-zA-Z0-9])$", flag)

    def could_match(self, other: list[str]) -> tuple[list[str], list[Extrapolated]]:
        with self._strategy_ctx():
            flag = self.flag
            target, *rest = other
            if target == flag:
                self._strat.append(Exact(target))
                return rest, self._strat
            elif self.single_char(flag) and target.startswith(flag):
                self._strat.append(ShortFlagSplat(target, flag))
                return ["-" + target[2:], *rest], self._strat

            for flag in self.alias:
                if target == flag:
                    self._strat.append(AliasStrategy(target, flag))
                    return rest, self._strat
                elif self.single_char(flag) and target.startswith(flag):
                    self._strat.append(AliasStrategy(target, flag))
                    self._strat.append(ShortFlagSplat(target, flag))
                    return ["-" + target[2:], *rest], self._strat

            return other, self._strat


# Createa a meta-class that is like a string but I pass in a few options
# Then it returns a class that is a string with the options as defaults
class MetaString(type):
    def __new__(cls, options):
        @dataclass
        class _String(ValueArgument):
            choices: tuple[str] = field(default=options)

            def syntax(self):
                return map(string.String, self.choices)

            def _value_match(self, arg: str) -> bool:
                return arg in self.choices

        return _String


Int = Integer
Regex = MetaString(("a"))
Signal = MetaString(("", "HUP", "INT", "KILL", "STOP", "CONT", "0"))
Variable = MetaString(("HOME", "PWD"))
Glob = MetaString(("*.txt", "*.py", "*.c", "*.h"))
Pid = Int
Duration = Int
User = String
Hostname = MetaString(("localhost"))
Command = MetaString(("ls", "pwd"))
Group = MetaString(("root", "wheel", "nobody"))
Filesystem = MetaString(("ext4", "vfat"))
Delimiter = MetaString((",", "\n\t"))
Separator = Delimiter
SecurityContext = MetaString(("user_u:object_r:user_tmp_t:s0", "default"))
SecurityRange = MetaString(("s0", "s0-s1", "s0:c0.c255"))
SecurityRole = MetaString(("role1", "role2", "role3"))
SecurityType = MetaString(("type1", "type2", "type3"))
PrintfFormat = MetaString(("%d", "%s", "%f"))
Size = MetaString(("1b", "1k", "1m", "1g", "1t"))
Permission = MetaString(("u+r", "g-w", "o+x", "a=rwx", "0755", "u+s", "g-s", "o+t"))
OwnerGroup = MetaString(("root:root", "nobody:nogroup", "wheel:wheel"))
SprintfFormat = MetaString(("%d", "%s", "%f"))
DateFormat = MetaString(("%Y-%m-%d", "%Y-%m-%d %H:%M:%S"))
Format = String
Char = MetaString(("a", "b", "c", "d", "e"))
Range = MetaString(("1", "1-", "1-2", "-2", "1,3"))
Date = MetaString(("2021-01-01", "tommorrow", "yesterday"))
Expression = MetaString(("1+1", "2-1", "3*3", "4/2"))
DateTime = Date
TimeStyle = MetaString(
    (
        "full-iso",
        "long-iso",
        "iso",
        "locale",
        "full-locale",
        "posix-iso",
        "+%b %e  %Y$newline%b %e %H:%M",
    )
)
Geometry = MetaString(("50%", "100x100"))
Number = Int
Other = String

# ArgumentPair

SyntaxSpecification: TypeAlias = list[list[Argument]]
"""
A single syntax specification is composed of a list of list of syntax nodes
Each element in the outer list indicates a position, and the inner list indicates
what syntax nodes can come in that position.

For instance, if the command's specification looks like
cmd [-x | -y] [-a | -b] FILE
it should be translated as [[-x, -y], [-a | -b], [FILE]]
"""


@dataclass
class CommandSpecification:
    name: str
    syntaxes: tuple[SyntaxSpecification, ...]

    def __init__(self, name: str, *syntaxes: SyntaxSpecification) -> None:
        self.name = name
        self.syntaxes = syntaxes

    def remove(self, to_remove):
        self.syntaxes = tuple(
            [
                [arg for arg in pos if arg.flag is None or arg.flag not in to_remove]
                for pos in syntax
            ]
            for syntax in self.syntaxes
        )

    @staticmethod
    def __filtered_args(syntax: SyntaxSpecification, max_count):
        opt_arg_positions: set[tuple[int, int]] = set()
        for i, arg_group in enumerate(syntax):
            for j, arg in enumerate(arg_group):
                if arg.is_optional():
                    opt_arg_positions.add((i, j))

        count = min(len(opt_arg_positions), max_count)

        for winners in map(set, combinations(opt_arg_positions, count)):
            variation: list[list[Argument]] = []
            for i, arg_group in enumerate(syntax):
                variation.append(
                    [
                        arg
                        for j, arg in enumerate(arg_group)
                        if not arg.is_optional() or (i, j) in winners
                    ]
                )
            yield variation

    def to_concrete_string(
        self, max_arity: int, elaborate_relations: bool, max_count: int
    ) -> Iterable[CommandInvocation]:
        Argument.max_repetition = max_arity
        Argument.elaborate_relations = elaborate_relations

        for syntax in self.syntaxes:
            for combo in self.__filtered_args(syntax, max_count):
                for args in product(
                    *(n.syntax_variation() for n in chain.from_iterable(combo))
                ):
                    Path._counter = 1
                    yield CommandInvocation(self.name, tuple(c for c in args if c.args))

    def length_hint(self, max_arity: int, elaborate_relations: bool, stdin, content):
        Argument.max_repetition = max_arity
        Argument.elaborate_relations = elaborate_relations

        yield sum(
            functools.reduce(
                operator.mul,
                (n.length_hint() for n in chain.from_iterable(syntax)),
                1,
            )
            for syntax in self.syntaxes
        )

        yield sum(
            CommandInvocation(self.name, tuple(c for c in combo if c.args)).length_hint(
                stdin, content
            )
            for syntax in self.syntaxes
            for combo in product(
                *(n.syntax_variation() for n in chain.from_iterable(syntax))
            )
        )
