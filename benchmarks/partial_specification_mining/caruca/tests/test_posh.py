import asyncio
from abc import ABC

from caruca.annotator.pash import PaShAnnotationSet
import pytest
from textwrap import dedent

from caruca.annotator import annotate, PoshAnnotationSet
from caruca.cli.generate import string_invocations
from caruca.tracer.data import Traces
from caruca.tracer.tracer import Tracer


def successful_runs(anns: list[PoshAnnotationSet]):
    return filter(lambda ann: any(io.return_code == 0 for io in ann.annotations), anns)


class GitRunner(ABC):
    CMD = "dummy"
    STDIN_VARIATION = "simple"
    CONTENT_VARIATION = "simple"
    MAX_ARITY = 1

    @classmethod
    @pytest.fixture(scope="class")
    def annotations(cls, pytestconfig):
        serialized_traces = pytestconfig.cache.get(f"posh/{cls.CMD}", None)
        if serialized_traces is None:
            args = {
                "parallel": 10,
                "stdin_variation": cls.STDIN_VARIATION,
                "content_variation": cls.CONTENT_VARIATION,
                "timeout": 4,
            }
            invocations = string_invocations(
                cls.CMD, "caruca.posh_syntax_specs", None, cls.MAX_ARITY, False
            )
            traces = Traces(asyncio.run(Tracer(**args).run(invocations)))
            serialized_traces = traces.model_dump_json()
            pytestconfig.cache.set(f"posh/{cls.CMD}", serialized_traces)
        else:
            traces = Traces.model_validate_json(serialized_traces)

        return annotate(cls.CMD, "pash", traces).root

    def test_needs_cur_dir(self, annotations: list[PaShAnnotationSet]):
        for ann in annotations:
            for a in ann.annotations:
                if "." in a.inputs:
                    return
        assert False


class Runner(ABC):
    CMD = "dummy"
    STDIN_VARIATION = "simple"
    CONTENT_VARIATION = "simple"
    MAX_ARITY = 1

    @classmethod
    @pytest.fixture(scope="class")
    def annotations(cls, pytestconfig):
        serialized_traces = pytestconfig.cache.get(f"posh/{cls.CMD}", None)
        if serialized_traces is None:
            args = {
                "parallel": 10,
                "stdin_variation": cls.STDIN_VARIATION,
                "content_variation": cls.CONTENT_VARIATION,
                "timeout": 4,
            }
            invocations = string_invocations(
                cls.CMD, "caruca.posh_syntax_specs", None, cls.MAX_ARITY, False
            )
            traces = Traces(asyncio.run(Tracer(**args).run(invocations)))
            serialized_traces = traces.model_dump_json()
            pytestconfig.cache.set(f"posh/{cls.CMD}", serialized_traces)
        else:
            traces = Traces.model_validate_json(serialized_traces)

        return annotate(cls.CMD, "posh", traces).root

    def test_nonvacuous(self, annotations):
        assert annotations

    def test_at_least_one_succeeds(self, annotations: list[PoshAnnotationSet]):
        assert list(successful_runs(annotations))


class SplittableArg(ABC):
    CONTENT_VARIATION = "varied"
    MAX_ARITY = 2

    def test_split_arg(self, annotations: list[PoshAnnotationSet]):
        assert any(
            any(split.args_split for split in ann.annotations)
            for ann in successful_runs(annotations)
        )


class SplittableAcrossInput(ABC):
    STDIN_VARIATION = "split"

    def test_splittable_across_input(self, annotations: list[PoshAnnotationSet]):
        assert any(
            any(split.input_split for split in ann.annotations)
            for ann in successful_runs(annotations)
        )


class ReducesInput(ABC):
    def test_reduces(self, annotations: list[PoshAnnotationSet]):
        assert any(
            any(split.input_geq_output is True for split in ann.annotations)
            for ann in successful_runs(annotations)
        )


"""
/home/deeptir/go/bin/zannotate[long_arg_single_dash]: FLAGS:[(long:routing)] OPTPARAMS:[(long:routing-mrt-file,type:input_file,size:1),(long:input-file-type,type:str,size:1)]
git status[needs_current_dir]: OPTPARAMS:[(short:C,size:1,type:input_file)]
git add[needs_current_dir]: PARAMS:[(size:1,type:str)]
git commit[needs_current_dir]: OPTPARAMS:[(short:F,long:file,size:1,type:input_file)]
"""

class TestAwk(Runner):
    CMD = "awk"


class TestMogrify(SplittableArg, Runner):
    CMD = "mogrify"


class TestJq(Runner):
    STDIN_VARIATION = "varied"
    CMD = "jq"


class TestSed(SplittableAcrossInput, Runner):
    CMD = "sed"


class TestSort(Runner):
    CMD = "sort"


class TestQ(Runner):
    CMD = "pr"


class TestPr(Runner):
    CMD = "pr"


class TestCut(SplittableAcrossInput, Runner):
    CMD = "cut"


class TestTr(Runner):
    CMD = "tr"


class TestWc(Runner):
    CMD = "wc"


class TestHead(Runner):
    CMD = "head"


class TestGrep(SplittableAcrossInput, ReducesInput, Runner):
    CMD = "grep"


class TestEcho(Runner):
    CMD = "echo"


class TestComm(ReducesInput, Runner):
    CMD = "comm"


class TestCat(SplittableArg, Runner):
    CMD = "cat"


class TestGitAdd(GitRunner):
    CMD = "git add"


class TestGitCommit(GitRunner):
    CMD = "git commit"


class TestGitStatus(GitRunner):
    CMD = "git status"
