import asyncio
from abc import ABC, abstractmethod

import pytest

from caruca.annotator import annotate
from caruca.annotator.pash import PaSh
from caruca.cli.generate import string_invocations
from caruca.tracer.data import Traces, Parallelizability
from caruca.tracer.tracer import Tracer


class Runner(ABC):
    CMD = "dummy"
    MAX_ARITY = 1

    @classmethod
    @pytest.fixture(scope="class")
    def annotations(cls):
        args = {
            "parallel": 10,
            "stdin_variation": "split",
            "content_variation": "varied",
            "timeout": 4,
        }
        invocations = string_invocations(
            cls.CMD, "caruca.pash_syntax_specs", None, cls.MAX_ARITY, False
        )
        traces = Traces(asyncio.run(Tracer(**args).run(invocations)))
        return annotate(cls.CMD, "pash", traces)

    def test_nonvacuous(self, annotations: PaSh):
        assert annotations.cases


class ParallelizabilityRunner(ABC):
    @property
    @abstractmethod
    def pclass(self) -> Parallelizability:
        pass

    def test_pclass(self, annotations: PaSh):
        assert max(ann.pclass for ann in annotations.cases) is self.pclass


class Stateless(ABC):
    @property
    def pclass(self):
        return Parallelizability.S


class Pure(ABC):
    @property
    def pclass(self):
        return Parallelizability.P


class NonparallelizablePure(ABC):
    @property
    def pclass(self):
        return Parallelizability.N


class SideEffectful(ABC):
    @property
    def pclass(self):
        return Parallelizability.E


class Input(ABC):
    def test_input(self, annotations: PaSh):
        pass
        # for run in successful_runs(annotations):
        #     assert all((ann.inputs for ann in run.annotations))


class Stdin(ABC):
    def test_input_stdin(self, annotations: PaSh):
        pass


class ArgsIn(ABC):
    def test_input_args(self, annotations: PaSh):
        pass


class Stdout(ABC):
    def test_output_stdout(self, annotations: PaSh):
        pass


class StdoutAndArgs(ABC):
    def test_output_all(self, annotations: PaSh):
        pass


class TestAwk(Stdin, Stdout, NonparallelizablePure, Runner):
    CMD = "awk"


class TestBc(Stateless, Stdin, Stdout, Runner):
    CMD = "bc"


@pytest.mark.skip(reason="need to rewrite subconditions")
class TestCat(ArgsIn, Stdout, Runner):
    CMD = "cat"

    def test_stateless(self, annotations: PaSh):
        pass

    def test_n_flag_p_precise(self, annotations: PaSh):
        pass

    def test_n_flag_p_safe(self, annotations):
        pass


class TestChmod(SideEffectful, Runner):
    CMD = "chmod"


class TestCol(Stdin, Stdout, Stateless, Runner):
    CMD = "col"


class TestComm(ArgsIn, Stdout, NonparallelizablePure, Runner):
    CMD = "comm"


@pytest.mark.skip(reason="need to rewrite subconditions")
class TestCut(Stdin, Stdout, Runner):
    CMD = "cut"

    def test_delimiter(self, annotations: PaSh):
        pass


class TestDate(NonparallelizablePure, Stdin, Stdout, Runner):
    CMD = "date"


class TestDd(SideEffectful, Runner):
    CONTENT_VARIATION = "varied"
    CMD = "dd"


class TestDiff(NonparallelizablePure, ArgsIn, Stdout, Runner):
    CMD = "diff"


class TestEcho(Stateless, Stdout, Runner):
    CMD = "echo"


class TestFind(SideEffectful, Runner):
    CMD = "find"


class TestFmt(Stdin, Stdout, Runner):
    CMD = "fmt"

    def test_w_flag(self, annotations: PaSh):
        pass


class TestGrep(Runner):
    CMD = "grep"

    def test_grep(self, annotations):
        pass


class TestGroff(Stateless, Stdin, Stdout, Runner):
    CMD = "groff"


class TestGunzip(Stateless, Stdin, Stdout, Runner):
    CMD = "gunzip"


class TestGzip(Stateless, Stdin, Stdout, Runner):
    CMD = "gzip"


@pytest.mark.skip(reason="Custom PaSh aggregator without documentation")
class TestHead(Pure, Stdin, Stdout, Runner):
    CMD = "head"


class TestIconv(Stateless, Stdin, Stdout, Runner):
    CMD = "iconv"


class TestLs(SideEffectful, Runner):
    CMD = "ls"


class TestMkfifo(SideEffectful, Runner):
    CMD = "mkfifo"


class TestMktemp(SideEffectful, Runner):
    CMD = "mktemp"


class TestNc(SideEffectful, Runner):
    CMD = "nc"


@pytest.mark.skip(reason="Custom PaSh aggregator without documentation")
class TestNl(Pure, Runner):
    CMD = "nl"


class TestPandoc(NonparallelizablePure, ArgsIn, Stdout, Runner):
    CMD = "pandoc"


class TestPaste(Pure, ArgsIn, Stdout, Runner):
    CMD = "paste"


class TestPs(Stateless, Stdin, Stdout, Runner):
    CMD = "ps"


class TestPr(Stdin, Stdout, Runner):
    CMD = "pr"


class TestReadelf(Pure, ArgsIn, Stdout, Runner):
    CMD = "readelf"


class TestRm(SideEffectful, Runner):
    CMD = "rm"


class TestSed(Pure, Stdin, Stdout, Runner):
    CMD = "sed"


class TestSeq(Pure, Stdout, Runner):
    CMD = "seq"


@pytest.mark.skip(reason="Couldn't locate source")
class TestSet(SideEffectful, Runner):
    CMD = "set"


@pytest.mark.skip(
    reason="Custom PaSh command without documentation (see runtime/set-diff.c)"
)
class TestSetdiff(SideEffectful, Runner):
    CMD = "set"


class TestSha256sum(NonparallelizablePure, Stdin, Stdout, Runner):
    CMD = "sha256sum"


class TestShuf(Stateless, Stdin, Stdout, Runner):
    CMD = "shuf"


@pytest.mark.skip(reason="Custom PaSh aggregator without documentation")
class TestSort(Pure, Runner):
    CMD = "sort"


@pytest.mark.skip(
    reason="Custom PaSh command without documentation (see runtime/split.c)"
)
class TestSplit(SideEffectful, ArgsIn, Stdout, Runner):
    CMD = "split"


@pytest.mark.skip(
    reason="Custom PaSh command without documentation (see runtime/agg/py/tail.py)"
)
class TestTail(Pure, Stdin, Stdout, Runner):
    CMD = "tail"


class TestTee(Pure, Stdin, StdoutAndArgs, Runner):
    CMD = "tee"


class TestResize(Pure, ArgsIn, Stdout, Runner):
    CMD = "resize"


@pytest.mark.skip(
    reason="The PaSh JIT annotation for readelf is incorrectly attributed to xxd"
)
class TestXxd(Pure, ArgsIn, Stdout, Runner):
    CMD = "xxd"


class TestXargs(Stateless, Stdin, Stdout, Runner):
    CMD = "xargs"


class TestPwd(SideEffectful, Stdout, Runner):
    CMD = "pwd"


@pytest.mark.skip(
    reason="Custom PaSh aggregator without documentation (see runtime/agg/py/tac.py)"
)
class TestTac(Stateless, ArgsIn, Stdout, Runner):
    CMD = "tac"


@pytest.mark.skip(
    reason="Custom PaSh aggregator without documentation (see runtime/agg/py/uniq.py)"
)
class TestUniq(Pure, Stdin, Stdout, Runner):
    CMD = "uniq"


class TestConvert(Pure, Runner):
    CMD = "convert"
