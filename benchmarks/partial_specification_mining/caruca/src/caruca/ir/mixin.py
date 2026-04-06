from abc import ABC
from collections.abc import Iterable
import shlex


class PrintableValueWrapper(ABC):
    value: str

    def __str__(self) -> str:
        return self.value


class PrintableArgumentSequence(ABC):
    flag: str | None
    args: Iterable[PrintableValueWrapper]
    flag_followed_by_equals: bool

    def __str__(self) -> str:
        if not self.args:
            return ""

        body = " ".join(shlex.quote(str(arg)) for arg in self.args if arg.value)
        if self.flag:
            return f"{self.flag}{'=' if self.flag_followed_by_equals else ' '}{body}".strip()
        else:
            return body


class PrintableCommandInvocation(ABC):
    name: str
    body: Iterable[PrintableArgumentSequence]

    def __str__(self) -> str:
        body_str = " ".join(str(bod) for bod in self.body if bod)
        return f"{self.name} {body_str}".strip()
