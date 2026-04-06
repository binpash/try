import argparse
import copy
import libdash
import logging
import pathlib
import shasta.ast_node as AST
from shasta.json_to_ast import to_ast_node
from typing import Iterable, List

# Monkey patch
# TODO: Fix this in libdash
old_pretty = AST.CommandNode.pretty
AST.CommandNode.pretty = lambda self, ignore_heredocs=False, quote_mode=None: old_pretty(self, ignore_heredocs)

INITIALIZE_LIBDASH = True
# Parses straight a shell script to an AST
# through python without calling it as an executable
def parse_shell_to_asts(input_script_path : str):
    global INITIALIZE_LIBDASH
    new_ast_objects = libdash.parser.parse(input_script_path,init=INITIALIZE_LIBDASH)
    INITIALIZE_LIBDASH = False
    # Transform the untyped ast objects to typed ones
    new_ast_objects = list(new_ast_objects)
    typed_ast_objects = []
    for (
        untyped_ast,
        original_text,
        linno_before,
        linno_after,
    ) in new_ast_objects:
        typed_ast = to_ast_node(untyped_ast)
        typed_ast_objects.append(
            (typed_ast, original_text, linno_before, linno_after)
        )
    return typed_ast_objects

def flatten_seq(cmd: AST.Command) -> List[AST.Command]:
    if isinstance(cmd, AST.SemiNode):
        return flatten_seq(cmd.left_operand) + flatten_seq(cmd.right_operand)
    return [cmd]


def rebuild_seq(cmds: List[AST.Command]) -> AST.Command:
    seq = cmds[0]
    for cmd in cmds[1:]:
        seq = AST.SemiNode(seq, cmd)
    return seq


def node_to_incremental_asts(node) -> Iterable[AST.Command]:
    if isinstance(node, AST.PipeNode):
        for i in range(1, len(node.items) + 1):
            pipe_partial = copy.deepcopy(node)
            pipe_partial.items = pipe_partial.items[:i]
            yield pipe_partial
        return

    if isinstance(node, AST.ForNode):
        parts = flatten_seq(node.body)
        for i in range(1, len(parts) + 1):
            newf = copy.deepcopy(node)
            newf.body = rebuild_seq(parts[:i])
            yield newf
        return

    if isinstance(node, AST.WhileNode):
        parts = flatten_seq(node.body)
        for i in range(1, len(parts) + 1):
            neww = copy.deepcopy(node)
            neww.body = rebuild_seq(parts[:i])
            yield neww
        return

    yield copy.deepcopy(node)
def ast_to_incremental_asts(ast) -> Iterable[List[AST.Command]]:
    """
    Generate incremental ASTs by yielding, for each node in the AST, partial ASTs
    consisting of all preceding nodes plus a truncated version of the current node.
    """
    for idx, (node, *_) in enumerate(ast):
        for incremental_node in node_to_incremental_asts(node):
            prefix = [n for n, *_ in ast[:idx]] + [incremental_node]
            yield prefix

def main():
    arg_parser = argparse.ArgumentParser(
        description=f"Converts a single shell script to multiple ones with incremental changes."
    )
    arg_parser.add_argument("path", help="Path to the script")
    arg_parser.add_argument("output", help="Path to save the incremetized scripts to.")
    arg_parser.add_argument("-d", "--debug", action="store_true", help="Enable debug logging")
    args = arg_parser.parse_args()
    
    logging.basicConfig(level=logging.DEBUG if args.debug else logging.INFO)
    original_ast = parse_shell_to_asts(args.path)
    incremental_asts = ast_to_incremental_asts(original_ast)

    for i, ast in enumerate(incremental_asts):
        basename = pathlib.Path(args.path).stem
        with open(f"{args.output}/{i}_{basename}", "w") as f:
            f.write("\n".join([n.pretty() for n in ast]))

if __name__ == "__main__":
    main()
