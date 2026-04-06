"""
Sample syntax specifications built into Caruca
"""

import importlib
from os import PathLike
from caruca.ir.syntax import SyntaxSpecification


def get_syntax_spec(path: None | PathLike, cmd_name: str) -> list[SyntaxSpecification]:
    cmd_name = cmd_name.replace(" ", "_")
    if path is None:
        module = importlib.import_module(f"caruca.syntax_specs.{cmd_name}")
    else:
        module = importlib.import_module(f"{path}.{cmd_name}")
    return getattr(module, f"{cmd_name}_syntax_spec")
