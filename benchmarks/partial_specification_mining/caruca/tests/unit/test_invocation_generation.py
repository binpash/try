from caruca.ir.syntax import CommandSpecification, Arity, Argument, Flag, Path

import shlex


class TestDSLToStringGeneration:
    @staticmethod
    def diffing_helper(syntax: list[list[Argument]], expected: set[str]):
        generated = {
            shlex.join(shlex.split(str(gen)))
            for gen in CommandSpecification("touch", syntax).to_concrete_string()
        }
        expected = {shlex.join(shlex.split(ex)) for ex in expected}
        assert expected == generated

    def test_one_flag(self):
        self.diffing_helper([[Flag("-a")]], {"touch -a", "touch"})

    def test_two_flags(self):
        self.diffing_helper(
            [[Flag("-a"), Flag("-b")]],
            {"touch -a", "touch", "touch -a -b", "touch -b"},
        )

    def test_arg(self):
        self.diffing_helper([[Path(arity=Arity.EXACTLY_ONE)]], {"touch path_1"})
        self.diffing_helper([[Path(arity=1)]], {"touch path_1"})

    def test_optional_arg(self):
        self.diffing_helper(
            [[Path(arity=Arity.OPTIONAL)]],
            {"touch path_1", "touch"},
        )

    def test_multi_arity_arg(self):
        self.diffing_helper([[Path(arity=2)]], {"touch path_1 path_2"})

    def test_flagged_arg(self):
        self.diffing_helper(
            [[Path(flag="-r", arity=1)]],
            {"touch -r path_1"},
        )

    def test_optional_flagged_arg(self):
        self.diffing_helper(
            [[Path(flag="-r", arity=Arity.OPTIONAL)]],
            {"touch -r path_1", "touch"},
        )

    def test_flagged_and_positional_args(self):
        self.diffing_helper(
            [
                [Path(flag="-r", arity=Arity.OPTIONAL)],
                [Path(arity=Arity.EXACTLY_ONE)],
            ],
            # path_2 appears even without path_1 because the names
            # are given at syntax resolution time, not string generation time
            {"touch -r path_1 path_2", "touch path_2"},
        )
