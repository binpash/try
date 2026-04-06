from unittest.mock import patch

import pytest

from caruca.ir.environment import Arity
from caruca.ir.string import ArgumentSequence, CommandInvocation, FlagSet, Int
from caruca.ir.syntax import CommandSpecification, Flag, Integer


@pytest.fixture(autouse=True)
def patch_random_choices():
    with patch("random.choices", return_value=[""]):
        yield


class TestSyntaxVariation:
    def test_flag(self):
        assert list(Flag("-a").syntax_variation()) == [
            ArgumentSequence("-a", tuple(), False, Arity.OPTIONAL),
            ArgumentSequence("-a", (FlagSet(),), False, Arity.OPTIONAL),
        ]


class TestConcretization:
    def test_single_flag(self):
        spec = CommandSpecification("test", [[Flag("-a")]])
        assert list(spec.to_concrete_string()) == [
            CommandInvocation("test", tuple()),
            CommandInvocation(
                "test", (ArgumentSequence("-a", (FlagSet(),), False, Arity.OPTIONAL),)
            ),
        ]

    def test_single_option_int(self):
        spec = CommandSpecification(
            "test", [[Integer("-a", min=1, max=1, arity=Arity.OPTIONAL)]]
        )
        assert list(spec.to_concrete_string()) == [
            CommandInvocation("test", tuple()),
            CommandInvocation(
                "test", (ArgumentSequence("-a", (Int("1"),), False, Arity.OPTIONAL),)
            ),
        ]
