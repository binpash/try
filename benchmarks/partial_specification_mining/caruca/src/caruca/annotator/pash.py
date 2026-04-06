from enum import Enum
from typing import Literal, Self

from pydantic import BaseModel


class Parallelizability(Enum):
    S = "stateless"
    P = "pure"
    N = "non-pure"
    E = "side-effectful"

    def __gt__(self, other):
        if other is self:
            return False
        else:
            return self >= other

    def __ge__(self, other):
        match self:
            case Parallelizability.S:
                return True
            case Parallelizability.P:
                return other is not Parallelizability.S
            case Parallelizability.N:
                return other is self or other is Parallelizability.E
            case Parallelizability.E:
                return other is self


class Predicate(BaseModel):
    operator: str
    operands: list[Self | str | int]


class PaShSpecification(BaseModel):
    predicate: Predicate | Literal["default"]
    pclass: Parallelizability
    inputs: list[str]
    outputs: list[str]
    true_str: str
    comments: str


class PaSh(BaseModel):
    command: str
    cases: list[PaShSpecification]
    options: list[str]
