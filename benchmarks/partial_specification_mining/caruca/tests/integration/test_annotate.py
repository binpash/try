import asyncio
import re
from abc import ABC

import pytest

from caruca.annotator import SaShAnnotationSet, annotate
from caruca.cli.generate import string_invocations
from caruca.tracer.data import Traces
from caruca.tracer.tracer import Tracer


class Runner(ABC):
    CMD = "dummy"

    @classmethod
    @pytest.fixture(scope="session")
    def annotations(cls, pytestconfig):
        serialized_traces = pytestconfig.cache.get(f"traces/{cls.CMD}", None)
        if serialized_traces is None:
            invocations = string_invocations(
                cls.CMD, None, "--version,--help,--interactive", 1, False
            )
            traces = Traces(asyncio.run(Tracer(10).run(invocations)))
            serialized_traces = traces.model_dump_json()
            pytestconfig.cache.set(f"traces/{cls.CMD}", serialized_traces)
        else:
            traces = Traces.model_validate_json(serialized_traces)

        return annotate(cls.CMD, "fs", traces).root

    def test_true_string_uniq(self, annotations):
        true_strs = set(map(lambda a: a.true_str, annotations))
        assert len(annotations) == len(true_strs)


class NoFileSystemDependency(ABC):
    def test_no_dependencies(self, annotations: list[SaShAnnotationSet]):
        for ann in annotations:
            for cond in ann.annotations:
                assert not cond.preconditions, ann.true_str
                assert not cond.postconditions, ann.true_str
                assert not cond.updates, ann.true_str


class NoFileSystemChanges(ABC):
    def test_no_changes(self, annotations: list[SaShAnnotationSet]):
        for ann in annotations:
            for cond in ann.annotations:
                assert not cond.postconditions, ann.true_str
                assert not cond.updates, ann.true_str


class AllSuccessMixin(ABC):
    def ann_success(self, ann):
        for cond in ann.conditions:
            assert cond.return_code == 0, ann.true_str

    def test_all_success(self, annotations: list[SaShAnnotationSet]):
        for ann in annotations:
            self.ann_success(ann)


class TestArch(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "arch"


class TestPwd(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "pwd"


class TestTrue(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "true"


class TestWhoAmI(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "whoami"


class TestId(NoFileSystemDependency, Runner):
    CMD = "id"

    def exclusivity_check(self, ann, cond):
        exclusive_flags = ["-u", "-Z", "-g", "-G"]
        already_include_one = False
        for flag in exclusive_flags:
            if flag in ann.true_str and already_include_one:
                assert cond.return_code != 0, ann.true_str
                return
            elif flag in ann.true_str:
                already_include_one = True

    def test_all_success_unless_z_flag(self, annotations: list[SaShAnnotationSet]):
        for ann in annotations:
            for cond in ann.annotations:
                # Not on SELinux
                if "-Z" in ann.true_str:
                    assert cond.return_code != 0, ann.true_str
                else:
                    self.exclusivity_check(ann, cond)


class TestHostId(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "hostid"


class TestFactor(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "factor"


class TestSeq(NoFileSystemDependency, Runner):
    CMD = "seq"

    def test_success_unless(self, annotations: list[SaShAnnotationSet]):
        for ann in annotations:
            for cond in ann.annotations:
                if re.search(r'"\d" "0" "\d"$', ann.true_str):
                    # cannot set 0 as increment
                    assert cond.return_code != 0, ann.true_str
                    return
                elif "-f" in ann.true_str:
                    if "-w" in ann.true_str:
                        # cannot specify width with format string
                        assert cond.return_code != 0, ann.true_str
                        return
                    elif (
                        "%f" not in ann.true_str
                        and "%F" not in ann.true_str
                        and "%a" not in ann.true_str
                        and "%A" not in ann.true_str
                    ):
                        # format string only supports floats
                        assert cond.return_code != 0, ann.true_str
                        return

                assert cond.return_code == 0, ann.true_str


class TestEcho(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "echo"


class TestUname(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "uname"


class TestUptime(AllSuccessMixin, NoFileSystemDependency, Runner):
    CMD = "uptime"


class TestFalse(NoFileSystemDependency, Runner):
    CMD = "false"

    def test_all_fail(self, annotations):
        for ann in annotations:
            for cond in ann.conditions:
                assert cond.return_code != 0, ann.true_str


@pytest.mark.skip(reason="Temporarily failing")
class TestCat(NoFileSystemChanges, Runner):
    CMD = "cat"

    def test_requires_path_is_file(self, annotations):
        for ann in filter(lambda ann: "path_1" in ann, annotations):
            for cond in ann.conditions:
                if cond.return_code == 0:
                    breakpoint()
                    assert cond.preconditions, ann.true_str
                else:
                    pass
