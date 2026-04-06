from caruca.ir.syntax import Arity
from caruca.ir.string import CommandInvocation, Path, ArgumentSequence
from caruca.ir.environment import (
    ArgumentSequenceWithEnv,
    CommandConfig,
    File,
    Directory,
    NonEmptyDirectory,
    NonexistentPath,
)


class TestEnvironmentGeneration:
    CMD_NAME = "touch"

    @staticmethod
    def helper(expected, cmd):
        invocations = list(cmd.to_concrete_invocations())
        assert len(invocations) == len(expected)
        for x in expected:
            assert x in invocations

    def test_one_path(self):
        for a in Arity:
            fs_objs = [
                File(value="path_1", relative=True),
                Directory(value="path_1", relative=True),
                NonEmptyDirectory(value="path_1", relative=True),
                NonexistentPath(value="path_1", relative=True, parent_exists=True),
                NonexistentPath(
                    value="nonexistent_path/path_1", relative=True, parent_exists=False
                ),
            ]
            envs = [
                CommandConfig(
                    name=self.CMD_NAME,
                    body=(
                        ArgumentSequenceWithEnv(
                            flag=None,
                            args=(obj,),
                            flag_followed_by_equals=False,
                            arity=a,
                        ),
                    ),
                    string={},
                )
                for obj in fs_objs
            ]

            self.helper(
                envs,
                CommandInvocation(
                    self.CMD_NAME,
                    (
                        ArgumentSequence(
                            None,
                            (Path("path_1", relative=True),),
                            False,
                            arity=a,
                        ),
                    ),
                ),
            )
