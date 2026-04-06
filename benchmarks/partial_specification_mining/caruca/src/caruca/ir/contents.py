from enum import Enum
from importlib.resources import read_binary
from typing import Annotated, Literal, Self

from caruca import data
from pydantic import PlainSerializer, PlainValidator

ContentLevel = Literal["simple", "varied", "split"]


class Content(Enum):
    HUMAN_TEXT_1 = read_binary(data, "human_1.txt")
    HUMAN_TEXT_2 = read_binary(data, "human_2.txt")
    HUMAN_TEXT = HUMAN_TEXT_1 + HUMAN_TEXT_2

    MATH_1 = read_binary(data, "math_1.txt")
    MATH_2 = read_binary(data, "math_2.txt")
    MATH = MATH_1 + MATH_2

    TIME_1 = read_binary(data, "time_1.txt")
    TIME_2 = read_binary(data, "time_2.txt")
    TIME = TIME_1 + TIME_2

    JSON = read_binary(data, "json.json")

    IMAGE = read_binary(data, "usenix.jpg")

    @staticmethod
    def variation(level: ContentLevel):
        match level:
            case "simple":
                return [Content.HUMAN_TEXT]
            case "varied":
                return [
                    Content.HUMAN_TEXT,
                    Content.MATH,
                    Content.JSON,
                    Content.TIME,
                    Content.IMAGE,
                ]
            case "split":
                return [
                    Content.HUMAN_TEXT,
                    Content.HUMAN_TEXT_1,
                    Content.HUMAN_TEXT_2,
                    Content.MATH,
                    Content.MATH_1,
                    Content.MATH_2,
                    Content.TIME,
                    Content.TIME_1,
                    Content.TIME_2,
                    Content.JSON,
                    Content.IMAGE,
                ]

    def is_partial_of(self, other: Self):
        return other.name != self.name and (other.name in self.name)

    @classmethod
    def deserialize(cls, item: Self | str) -> Self:
        try:
            if isinstance(item, cls):
                return item
            else:
                return cls[item]
        except KeyError:
            raise ValueError("invalid value")


SerializableContent = Annotated[
    Content,
    PlainSerializer(lambda c: c.name, return_type=str),
    PlainValidator(Content.deserialize),
]
