import argparse
import libbash
import libbash.bash_command as BashAST
import libbash.ctypes_bash_command as c_bash
import libdash
import logging
import os
import shasta.ast_node as AST
from shasta.json_to_ast import to_ast_node
import sys
import tempfile
import copy
from dataclasses import dataclass, field
import re

# Ensure these match config.rs
IGNORE_COMMANDS = [
    # Built-in commands from `compgen -b`
    "alias",
    "bg",
    "bind",
    "break",
    "builtin",
    "caller",
    "cd",
    "command",
    "compgen",
    "complete",
    "compopt",
    "continue",
    "declare",
    "dirs",
    "disown",
    "echo",
    "enable",
    "eval",
    "exec",
    "exit",
    "export",
    "false",
    "fc",
    "fg",
    "getopts",
    "hash",
    "help",
    "history",
    "jobs",
    "kill",
    "let",
    "local",
    "logout",
    "mapfile",
    "popd",
    "printf",
    "pushd",
    "pwd",
    "read",
    "readarray",
    "readonly",
    "return",
    "set",
    "shift",
    "shopt",
    "source",
    "suspend",
    "test",
    "times",
    "trap",
    "true",
    "type",
    "typeset",
    "ulimit",
    "umask",
    "unalias",
    "unset",
    "wait",
    ":", # no-op command
    ".", # source command
    # Additional untraced metadata commands
    "chgrp",
    "chmod",
    "chown",
    "env",
    "ln",
    "mount",
    "printenv",
    "sleep",
    "stat",
    "stty",
    "sync",
    "touch",
    "umount",
    "yes",
]
AVOID_SET = set(IGNORE_COMMANDS)

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

def parse_bash_to_asts(input_script_path : str):
    return libbash.bash_to_ast(input_script_path)

def str_to_ast(s : str):
    return [AST.CArgChar(char=ord(c)) for c in s]

def transform_node(node, sys_path):
    match node:
        case AST.PipeNode():
            return AST.PipeNode(
            items=[transform_node(node, sys_path) for node in node.items],
            **{k: v for k, v in vars(node).items() if k != "items"}
            )
        case AST.CommandNode():
            if not node.arguments and not node.assignments:
                return node
            assignments = [transform_node(ass, sys_path) for ass in node.assignments]
            arguments = [transform_node(arg, sys_path) for arg in node.arguments]

            # ----- INCR -----
            if arguments and all(hasattr(c, "char") for c in arguments[0]): # Don't append sys to assignments
                command_name = "".join(chr(c.char) for c in arguments[0])
                if command_name not in AVOID_SET: # Don't append sys to unreasonable commands
                    arguments = [str_to_ast(sys_path)] + arguments
            # ----- INCR -----

            return AST.CommandNode(
                    arguments=arguments,
                    assignments=assignments,
                    **{k: v for k, v in vars(node).items() if k not in ("arguments", "assignments")})
        case AST.AssignNode():
            val = [transform_node(v, sys_path) for v in node.val]
            return AST.AssignNode(
                    val=val,
                    **{k: v for k, v in vars(node).items() if k != "val"})
        case AST.BArgChar():
            return AST.BArgChar(
                    node=transform_node(node.node, sys_path),
                    **{k: v for k, v in vars(node).items() if k != "node"})
        case AST.QArgChar():
            return AST.QArgChar(
                    arg=[transform_node(n, sys_path) for n in node.arg],
                    **{k: v for k, v in vars(node).items() if k != "arg"})
        case AST.DefunNode():
            return AST.DefunNode(
                body=transform_node(node.body, sys_path),
                **{k: v for k, v in vars(node).items() if k != "body"}
            )
        case AST.ForNode():
            return AST.ForNode(
                body=transform_node(node.body, sys_path),
                argument=[transform_node(n, sys_path) for n in node.argument],
                **{k: v for k, v in vars(node).items() if k not in ("body", "argument")}
            )
        case AST.WhileNode():
            return AST.WhileNode(
                    test=transform_node(node.test, sys_path),
                    body=transform_node(node.body, sys_path),
                    **{k: v for k, v in vars(node).items() if k not in ("test", "body")})
        case AST.SemiNode():
            return AST.SemiNode(
                    left_operand=transform_node(node.left_operand, sys_path),
                    right_operand=transform_node(node.right_operand, sys_path),
                    **{k: v for k, v in vars(node).items() if k not in ("left_operand", "right_operand")})
        case AST.RedirNode():
            return AST.RedirNode(
                    node=transform_node(node.node, sys_path),
                    redir_list=[transform_node(n, sys_path) for n in node.redir_list],
                    **{k: v for k, v in vars(node).items() if k not in ("node", "redir_list")})
        case AST.FileRedirNode():
            return node
        case list() if all(isinstance(x, AST.ArgChar) for x in node):
            return [transform_node(n, sys_path) for n in node]
        case _:
            logging.debug(f"Leaving node unchanged: {type(node)} {node}")
            return node

def transform_ast(ast, sys_path):
    return [transform_node(node, sys_path) for node, _, _, _ in ast]

def transform_bash_node(node, sys_path, state):
    def handle_command_node(node: BashAST.Command, sys_path):
        match node.type:
            case BashAST.CommandType.CM_SIMPLE:
                assert node.value.simple_com
                cmd = node.value.simple_com
                # ----- INCR -----
                cmd_name = str(cmd.words[0].word, "utf8", errors="replace")
                if cmd_name in AVOID_SET or '=' in cmd_name: # Don't append sys to built-in commands or assignments
                    return node
                if cmd_name in state.functions:
                    return node
                if cmd_name[0] == '$': # Don't append sys to variable commands
                    return node
                logging.debug(f"Handling simple command node: {node} with command name {cmd_name}")
                words = [BashAST.WordDesc(c_bash.word_desc(bytes(sys_path, "utf8"), 0))] + cmd.words
                # ----- INCR -----
                node_copy = copy.deepcopy(node)
                node_copy.value.simple_com.words = words
                return node_copy
            case BashAST.CommandType.CM_CONNECTION:
                assert node.value.connection
                first = transform_bash_node(node.value.connection.first, sys_path, state)
                second = transform_bash_node(node.value.connection.second, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.connection.first = first
                node_copy.value.connection.second = second
                return node_copy
            case BashAST.CommandType.CM_GROUP:
                assert node.value.group_com
                command = transform_bash_node(node.value.group_com.command, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.group_com.command = command
                return node_copy
            case BashAST.CommandType.CM_IF:
                assert node.value.if_com
                test = transform_bash_node(node.value.if_com.test, sys_path, state)
                true_case = transform_bash_node(node.value.if_com.true_case, sys_path, state)
                false_case = transform_bash_node(node.value.if_com.false_case, sys_path, state) if node.value.if_com.false_case else None
                node_copy = copy.deepcopy(node)
                node_copy.value.if_com.test = test
                node_copy.value.if_com.true_case = true_case
                node_copy.value.if_com.false_case = false_case
                return node_copy
            case BashAST.CommandType.CM_WHILE:
                assert node.value.while_com
                test = transform_bash_node(node.value.while_com.test, sys_path, state)
                action = transform_bash_node(node.value.while_com.action, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.while_com.test = test
                node_copy.value.while_com.action = action
                return node_copy
            case BashAST.CommandType.CM_FOR:
                assert node.value.for_com
                action = transform_bash_node(node.value.for_com.action, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.for_com.action = action
                return node_copy
            case BashAST.CommandType.CM_COND:
                assert node.value.cond_com
                left = transform_bash_node(node.value.cond_com.left, sys_path, state)
                right = transform_bash_node(node.value.cond_com.right, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.cond_com.left = left
                node_copy.value.cond_com.right = right
                return node_copy
            case BashAST.CommandType.CM_FUNCTION_DEF:
                logging.debug(f"Handling function definition command node: {node}")
                assert node.value.function_def
                name = str(node.value.function_def.name.word, "utf8")
                state.functions.add(name)
                body = transform_bash_node(node.value.function_def.command, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.function_def.command = body
                return node_copy
            case BashAST.CommandType.CM_SUBSHELL:
                logging.debug(f"Handling subshell command node: {node}")
                assert node.value.subshell_com
                sub_command = transform_bash_node(node.value.subshell_com.command, sys_path, state)
                node_copy = copy.deepcopy(node)
                node_copy.value.subshell_com.command = sub_command
                return node_copy
            case _:
                logging.debug(f"Ignoring bash command node: {node} with type {node.type}")
                return node

    match node:
        case BashAST.Command():
            return handle_command_node(node, sys_path)
        case BashAST.CondCom():
            left = transform_bash_node(node.left, sys_path, state)
            right = transform_bash_node(node.right, sys_path, state)
            node_copy = copy.deepcopy(node)
            node_copy.left = left
            node_copy.right = right
            return node_copy
        case _:
            logging.debug(f"Leaving bash node unchanged: {node}")
            return node

@dataclass
class State:
    functions: set[str] = field(default_factory=set)

def transform_bash_ast(ast, sys_path, state):
    nodes = []
    for node in ast:
        t_node = transform_bash_node(node, sys_path, state)
        nodes.append(t_node)
    return nodes


def ast_to_code(ast):
    return "\n".join([node.pretty() for node in ast])

def preserve_line_numbers(path: str):
    lines = []
    with open(path) as file:
        # check for empty or comment-only lines and preserve them
        empty_re = re.compile(r"^[ \t]*(#.*)?\s*$")
        for line in file:
            if empty_re.match(line):
                line = f"incr__no_op\n"
            lines.append(line)
    return "".join(lines)

def strip_no_op_lines(code: str):
    lines = []
    for line in code.splitlines(keepends=True):
        if "incr__no_op" in line:
            line = "\n"
        lines.append(line)
    return "".join(lines)
    

def main():
    sys_name = "incr"
    sys_path = "~/incr/target/release/incr"
    arg_parser = argparse.ArgumentParser(
        description=f"Inserts {sys_name} into a shell script and outputs the modified script"
    )
    arg_parser.add_argument("path", help="Path to the script")
    arg_parser.add_argument("-o", "--output", help="Path to save the transformed script (stdout if empty)", default=None)
    arg_parser.add_argument("-e", "--execute", action="store_true", help="Execute the transformed script")
    arg_parser.add_argument("--sys-path", help=f"Path to the {sys_name} executable", default=sys_path)
    arg_parser.add_argument("--try-path", help=f"Path to the try.sh script", default=None)
    arg_parser.add_argument("--cache-path", help="Path to the cache directory", default=None)
    arg_parser.add_argument("-d", "--debug", action="store_true", help="Enable debug logging")
    arg_parser.add_argument("--bash", action="store_true", help="Use bash parser (experimental)")
    args = arg_parser.parse_args()
    
    logging.basicConfig(level=logging.DEBUG if args.debug else logging.INFO)
    sys_path = f"{args.sys_path} --try {args.try_path} --cache {args.cache_path}" if args.try_path and args.cache_path else args.sys_path

    state = State()
    script_path = args.path

    try:
        if args.bash:
            # with tempfile.NamedTemporaryFile(delete=False, mode="w+", suffix=".sh") as temp_file:
            #     temp_file.write(preserve_line_numbers(args.path))
            #     temp_file.flush()
            #     args.path = temp_file.name
            original_ast = parse_bash_to_asts(args.path)
            # Do transform_bash_ast twice to populate function definitions
            _ = transform_bash_ast(original_ast, sys_path, state)
            transformed_ast = transform_bash_ast(original_ast, sys_path, state)
            with tempfile.NamedTemporaryFile(delete=False, mode="wb+", suffix=".sh") as temp_file:
                libbash.ast_to_bash(transformed_ast, temp_file.name)
                temp_file.flush()
                raw_bytes = temp_file.read()
                transformed_code = raw_bytes.decode("utf-8", errors="replace")
                transformed_code = strip_no_op_lines(transformed_code)
        else:
            original_ast = parse_shell_to_asts(args.path)
            transformed_ast = transform_ast(original_ast, sys_path)
            transformed_code = ast_to_code(transformed_ast)
    except Exception as e:
        print(f"Error inserting {sys_name} into script {script_path}: {e}", file=sys.stderr)
        assert False
        sys.exit(1)

    if args.output:
        with open(args.output, "w") as f:
            f.write(transformed_code)
    else:
        print(transformed_code)
        # sys.stdout.buffer.write(transformed_code.encode("utf-8", errors="surrogateescape"))
        # sys.stdout.buffer.write(b"\n")
    if args.execute and args.output is not None:
        os.system(f"bash {args.output}")

if __name__ == "__main__":
    main()
