import importlib
import importlib.resources
import importlib.util
import os
import re
import sys
import tempfile

import dotenv
import dspy
from dspy.predict import Retry
from dspy.teleprompt import LabeledFewShot

import caruca.syntax_specs
from caruca.error import SetupError

dotenv.load_dotenv()


def extract_code(string):
    pattern = r"```.*?\n([\s\S]*?)```"
    match = re.search(pattern, string)
    # Remove first and last line
    if not match:
        return string
    else:
        return match.group(1)


class Signature(dspy.Signature):
    """
    You are an expert on the shell and all kinds of commands.
    Given a shell command's manpage, generate the corresponding syntax specification.
    The specification is a DSL embedded inside Python.
    Only use features that you see in the examples.

    Include all the flags and arguments that are present in the manpage, even ignored ones.
    Include both short and long versions of flags/options (when they start with --).

    Arity is used to specify how many times a flag or argument can appear in the command. Don't use it as the number of arguments a flag takes.
    Arity can be: ZERO_OR_MORE, EXACTLY_ONE, EXACTLY_TWO, AT_LEAST_ONE, ONE_OR_MORE, OPTIONAL, ZERO_OR_ONE.
    Dont miss any choices mentioned in the description.
    Dont add extra choices that are not mentioned in the manpage.
    
    Following are the predefined types you can use, try to use the one that best fits, otherwise use type Other:
    String # Only use when any string is allowed
    Integer
    Regex
    Signal
    Variable
    Glob
    Pid
    Duration
    User
    Hostname
    Command
    Group
    Filesystem
    Delimiter
    Separator
    SecurityContext
    PrintfFormat
    Size
    Permission
    OwnerGroup
    SprintfFormat
    DateFormat 
    Format
    Char
    Range 
    Date
    TimeStyle
    """

    man_page = dspy.InputField(desc="The command's documentation.", format=str)
    syntax_spec = dspy.OutputField(
        desc="The corresponding syntax specification.", format=str
    )


class DocumentationParser(dspy.Module):
    def __init__(self):
        self.cot = dspy.ChainOfThought(Signature)

    def forward(self, cmd_name):
        man_page = _doc_for(cmd_name)
        prediction = self.cot(man_page=man_page)
        with tempfile.NamedTemporaryFile("w", dir='.', suffix='.py', delete=True) as f:
            f.write(extract_code(prediction.syntax_spec))
            f.flush()
            result, error_msg = validate_syntax_spec(cmd_name, f)
            dspy.Suggest(
                result,
                f""" 
                Previous output use undefined Type and Keys and following error message: {error_msg}.
                Please regenerate and fix the error.
                """,
                target_module=self.cot,
            )
        return prediction


def doc_to_dsl(cmd_name: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if api_key is None:
        raise SetupError(
            "Please provide an OpenAI API key in the environment variable OPENAI_API_KEY",
        )
    lm = dspy.OpenAI(
        model="gpt-4o",
        api_key=api_key,
        seed=42,
        max_tokens=4096,
    )
    dspy.settings.configure(lm=lm)
    cmd_example_names = ["touch", "rm", "mv", "ls"]
    examples = [
        dspy.Example(
            man_page=_doc_for(cmd_name),
            syntax_spec=_syntax_spec_for(cmd_name),
        )
        for cmd_name in cmd_example_names
    ]

    module = DocumentationParser().map_named_predictors(Retry)
    transformed_module = dspy.assert_transform_module(
        module, dspy.primitives.assertions.backtrack_handler
    )
    teleprompter = LabeledFewShot(k=len(cmd_example_names))
    man2syntaxspec = teleprompter.compile(transformed_module, trainset=examples)
    code = extract_code(man2syntaxspec(cmd_name).syntax_spec)
    # lm.inspect_history(1)
    return code


def import_from_path(file_path, module_name):
    # Load the module from the given file path
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


def validate_syntax_spec(cmd: str, spec_file) -> tuple[bool, str | None]:
    try:
        base_name = os.path.basename(spec_file.name)
        gen_syntax_spec = import_from_path(base_name, cmd)
    except Exception as e:
        return False, str(e)
    return True, None


SYNTAX_SPECS = importlib.resources.files(caruca.syntax_specs)
DOCS = importlib.resources.files(caruca).joinpath("doc_sources/man/")


def _doc_for(command):
    return DOCS.joinpath(command + ".txt").read_text()


def _syntax_spec_for(command):
    return SYNTAX_SPECS.joinpath(command + ".py").read_text()
