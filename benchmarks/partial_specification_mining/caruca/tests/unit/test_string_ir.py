from caruca.ir.string import ArgumentSequence, Int
from caruca.ir.syntax import Arity

import shlex


class TestStringIntermediateRepresentationCorrectlyStringifies:
    @staticmethod
    def diffing_helper(generated: ArgumentSequence, expected: str):
        assert shlex.join(shlex.split(str(generated))) == shlex.join(
            shlex.split(str(expected))
        )

    """
    Because Arity is simply a property that is propagated down for the sake of
    easy tracking, it actually should not influence what the node's string
    representation is.

    Therefore, the tests check this by repeating every Arity value
    """

    def test_empty_arg_sequence(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    flag=None,
                    args=tuple(),
                    flag_followed_by_equals=False,
                    arity=a,
                ),
                "",
            )

    def test_empty_flagged_arg_sequence(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    "-r", args=tuple(), flag_followed_by_equals=False, arity=a
                ),
                "",
            )

    def test_empty_flagged_arg_sequence_followed_by_equals(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    "-r", args=tuple(), flag_followed_by_equals=False, arity=a
                ),
                "",
            )

    def test_single_arg_sequence(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    flag=None,
                    args=(Int(value="0"),),
                    flag_followed_by_equals=False,
                    arity=a,
                ),
                "0",
            )

    def test_flagged_single_arg_sequence(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    flag="-n",
                    args=(Int(value="0"),),
                    flag_followed_by_equals=False,
                    arity=a,
                ),
                "-n 0",
            )

    def test_flagged_with_equals_single_arg_sequence(self):
        for a in Arity:
            self.diffing_helper(
                ArgumentSequence(
                    flag="-n",
                    args=(Int(value="0"),),
                    flag_followed_by_equals=True,
                    arity=a,
                ),
                '-n="0"',
            )
