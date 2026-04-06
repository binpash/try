from caruca.annotator.annotator import Specification
from caruca.annotator.pash import PaSh
from caruca.annotator.posh import Posh
from caruca.annotator.sash import SaSh
from caruca.annotator.shellcheck import (
    MissingDestinationCheck,
    ShellCheck,
    render_shellcheck_module,
)
from caruca.ir.environment import Arity
from caruca.ir.syntax import Path
from caruca.syntax_specs import get_syntax_spec
from caruca.tracer.data import Traces


def annotate(cmd_name: str, spectype: str, traces: Traces):
    def collapse_pash_cases(cases):
        collapsed = {}
        for case in cases:
            key = (
                case.predicate
                if case.predicate == "default"
                else case.predicate.model_dump_json()
            )

            if key not in collapsed:
                collapsed[key] = case
                continue

            existing = collapsed[key]
            existing.inputs = sorted(set(existing.inputs) | set(case.inputs))
            existing.outputs = sorted(set(existing.outputs) | set(case.outputs))
            existing.pclass = max(existing.pclass, case.pclass)

            combined_true = set(existing.true_str.split(" | "))
            combined_true.add(case.true_str)
            existing.true_str = " | ".join(sorted(combined_true))

        return list(collapsed.values())

    def collapse_shellcheck_cases(cases):
        collapsed = {}
        for case in cases:
            key = (
                case.predicate
                if case.predicate == "default"
                else case.predicate.model_dump_json()
            )

            if key not in collapsed:
                collapsed[key] = case
                continue

            existing = collapsed[key]
            existing.deletions = sorted(set(existing.deletions) | set(case.deletions))
            existing.true_strs = sorted(set(existing.true_strs) | set(case.true_strs))

        return list(collapsed.values())

    def _required_path_count(path_arg: Path) -> int:
        match path_arg.arity:
            case Arity.EXACTLY_ONE:
                return 1
            case Arity.AT_LEAST_ONE:
                return 1
            case Arity.ZERO_OR_MORE | Arity.OPTIONAL:
                return 0
            case int() as n:
                return n
            case _:
                return 0

    def infer_missing_destination_check(
        cmd: str,
    ) -> MissingDestinationCheck | None:
        try:
            syntax_specs = get_syntax_spec(None, cmd)
        except ModuleNotFoundError:
            return None

        for syntax in syntax_specs:
            positional_paths: list[Path] = []
            target_flags: set[str] = set()
            for group in syntax:
                for arg in group:
                    if not isinstance(arg, Path):
                        continue
                    if arg.flag:
                        target_flags.add(arg.flag)
                        target_flags.update(arg.alias)
                    else:
                        positional_paths.append(arg)

            if len(positional_paths) < 2:
                continue

            required_paths = sum(_required_path_count(p) for p in positional_paths)
            if required_paths < 2:
                continue

            return MissingDestinationCheck(
                command=cmd,
                required_paths=required_paths,
                target_directory_flags=sorted(target_flags),
            )

        return None

    specs = (
        Specification(
            invocation=trace_set.command,
            true_str=trace_set.true_str,
            annotations=list(trace_set.to_annotation()),
        )
        for trace_set in traces.root
    )

    match spectype:
        case "sash":
            return SaSh([a.to_sash() for a in specs])
        case "pash":
            cases = list(filter(None, (a.to_pash() for a in specs)))
            return PaSh(command=cmd_name, cases=collapse_pash_cases(cases), options=[])
        case "posh":
            return Posh(command=cmd_name, cases=list(a.to_posh() for a in specs))
        case "shellcheck":
            cases = list(filter(None, (a.to_shellcheck() for a in specs)))
            cases = collapse_shellcheck_cases(cases)
            missing_destination = infer_missing_destination_check(cmd_name)
            return ShellCheck(
                command=cmd_name,
                cases=cases,
                missing_destination=missing_destination,
                code=render_shellcheck_module(
                    cmd_name, cases, missing_destination=missing_destination
                ),
            )
        case _:
            raise Exception(f"Unknown annotation type {spectype}")
