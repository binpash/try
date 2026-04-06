#!/usr/bin/env python3
"""frac unified CLI - supports both local command-level and remote node-level fault injection."""

from __future__ import annotations

import argparse
import shlex
import sys
from typing import Any, Dict

from .api import ByteEvent, DelayEvent, TimeEvent, TokenEvent
from .local import LocalProcessNode, LocalFrac, LocalStreamingHooks


def load_plugin(plugin_path: str):
    """Load a plugin module from the given path."""
    import importlib.util
    import sys
    from pathlib import Path
    
    plugin_path = Path(plugin_path).resolve()
    if not plugin_path.exists():
        sys.exit(f"frac: plugin file not found: {plugin_path}")
    
    # Load the module
    spec = importlib.util.spec_from_file_location("plugin", plugin_path)
    if spec is None or spec.loader is None:
        sys.exit(f"frac: failed to load plugin: {plugin_path}")
    
    plugin = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(plugin)
    
    # Verify required functions exist
    required_funcs = ['create_node', 'create_hooks', 'create_frac']
    for func_name in required_funcs:
        if not hasattr(plugin, func_name):
            sys.exit(f"frac: plugin missing required function: {func_name}")
    
    return plugin


def cmd_byte_kill(args: argparse.Namespace) -> None:
    """Execute byte-kill command for local processes."""
    if not args.cmd:
        sys.exit("frac byte-kill: --cmd is required")

    # Parse command string into argv
    cmd_args = shlex.split(args.cmd)
    
    # Create node and start process
    node = LocalProcessNode(cmd_args)
    node.start()
    
    if not node.proc:
        sys.exit("frac: failed to start process")

    # Create hooks and frac
    hooks = LocalStreamingHooks(node)
    frac = LocalFrac()
    
    # Inject fault - this will kill the process once at N bytes
    frac.inject(node, ByteEvent(args.bytes), hooks)
    
    # Pump data from stdin through process to stdout
    try:
        hooks.pump_data(sys.stdin.buffer, sys.stdout.buffer)
    except KeyboardInterrupt:
        pass
    finally:
        if node.proc:
            node.proc.terminate()
            node.proc.wait()


def cmd_inject(args: argparse.Namespace) -> None:
    """Execute inject command for remote nodes (requires plugin)."""
    if not args.plugin:
        sys.exit("frac inject: --plugin is required for remote node injection")
    
    # Load plugin
    plugin = load_plugin(args.plugin)
    
    # Create components using plugin
    node = plugin.create_node(args.node)
    hooks = plugin.create_hooks(node)
    event = create_event_from_args(args)
    frac = plugin.create_frac()
    
    # Inject fault
    frac.inject(node, event, hooks)
    
    print(f"[frac] fault injection armed for node {args.node}")


def cmd_resurrect(args: argparse.Namespace) -> None:
    """Execute resurrect command for remote nodes."""
    if not args.plugin:
        sys.exit("frac resurrect: --plugin is required for remote node resurrection")
    
    # Load plugin
    plugin = load_plugin(args.plugin)
    
    # Create components using plugin
    node = plugin.create_node(args.node)
    hooks = plugin.create_hooks(node)
    event = create_event_from_args(args)  # Use delay event for timed resurrection
    frac = plugin.create_frac()
    
    # For resurrection, we need to bind the resurrect method instead of kill
    original_fire = hooks.fire
    
    def fire_with_resurrect():
        node.resurrect()
        original_fire()
    
    hooks.fire = fire_with_resurrect
    
    # Arm the resurrection event
    event.arm(hooks)
    
    print(f"[frac] resurrection armed for node {args.node}")


def create_event_from_args(args: argparse.Namespace) -> Any:
    """Create Event object from CLI arguments."""
    if args.event == "delay":
        if not hasattr(args, "ms") or args.ms is None:
            sys.exit("frac inject: --ms required for delay event")
        return DelayEvent(args.ms)
    elif args.event == "bytes":
        if not hasattr(args, "bytes") or args.bytes is None:
            sys.exit("frac inject: --bytes required for bytes event")
        return ByteEvent(args.bytes)
    elif args.event == "token":
        if not hasattr(args, "token") or args.token is None:
            sys.exit("frac inject: --token required for token event")
        return TokenEvent(args.token)
    else:
        sys.exit(f"frac inject: unknown event type: {args.event}")


def main(argv: list[str] | None = None) -> None:
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        prog="frac",
        description="Unified fault injection for local commands and remote nodes"
    )
    
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # byte-kill subcommand (local)
    byte_kill = subparsers.add_parser(
        "byte-kill",
        help="Kill local command after N bytes"
    )
    byte_kill.add_argument(
        "--bytes", type=int, required=True,
        help="Kill after this many bytes are sent"
    )
    byte_kill.add_argument(
        "--cmd", required=True,
        help="Command to run (quoted string)"
    )
    byte_kill.set_defaults(func=cmd_byte_kill)
    
    # inject subcommand (remote)
    inject = subparsers.add_parser(
        "inject", 
        help="Inject fault into remote node"
    )
    inject.add_argument(
        "--node", required=True,
        help="Node identifier"
    )
    inject.add_argument(
        "--event", choices=["delay", "bytes", "token"], required=True,
        help="Event type"
    )
    inject.add_argument("--ms", type=int, help="Milliseconds for delay event")
    inject.add_argument("--bytes", type=int, help="Bytes for bytes event")
    inject.add_argument("--token", help="Token string for token event")
    inject.add_argument(
        "--plugin",
        help="Path to plugin file defining Node/Hooks classes"
    )
    inject.set_defaults(func=cmd_inject)
    
    # resurrect subcommand (remote)
    resurrect = subparsers.add_parser(
        "resurrect",
        help="Resurrect a remote node"
    )
    resurrect.add_argument(
        "--node", required=True,
        help="Node identifier"
    )
    resurrect.add_argument(
        "--event", choices=["delay", "bytes", "token"], required=True,
        help="Event type for when to resurrect"
    )
    resurrect.add_argument("--ms", type=int, help="Milliseconds for delay event")
    resurrect.add_argument("--bytes", type=int, help="Bytes for bytes event")
    resurrect.add_argument("--token", help="Token string for token event")
    resurrect.add_argument(
        "--plugin",
        help="Path to plugin file"
    )
    resurrect.set_defaults(func=cmd_resurrect)
    
    # Parse and execute
    args = parser.parse_args(argv)
    args.func(args)


if __name__ == "__main__":
    main() 