"""
HTTP worker plugin for frac multi-node demo.

A "node" is a Node.js worker process identified by its worker ID.
The plugin reads PID files to find the actual process ID.
"""

from __future__ import annotations
import os
import signal
import subprocess
import time
from pathlib import Path
from typing import Any

from frac.api import Node, RuntimeHooks, Frac


class TimerHooks(RuntimeHooks):
    """Simple RuntimeHooks implementation that only supports delay events."""
    
    def call_at(self, when, fn):
        pass  # Not needed for delay events
        
    def call_later(self, secs: float, fn):
        import threading
        threading.Timer(secs, fn).start()
        
    def elapsed_ms(self) -> int:
        return 0
        
    def bytes_sent(self) -> int:
        return 0
        
    def seen_token(self, tok: str) -> bool:
        return False
        
    def fire(self):
        pass  # DelayEvent will call the node's kill/resurrect method directly


class WorkerNode(Node):
    """A Node.js worker process that can be killed and resurrected."""
    
    def __init__(self, worker_id: str):
        self.worker_id = worker_id
        self.port = 8000 + int(worker_id)  # worker-1 -> 8001, worker-2 -> 8002, etc.
    
    def _pid_file(self) -> Path:
        return Path(f"worker-{self.worker_id}.pid")
    
    def _get_pid(self) -> int:
        """Read PID from the worker's PID file."""
        pid_file = self._pid_file()
        if not pid_file.exists():
            raise FileNotFoundError(f"PID file {pid_file} not found - is worker-{self.worker_id} running?")
        return int(pid_file.read_text().strip())
    
    def kill(self) -> None:
        """Kill the worker process."""
        try:
            pid = self._get_pid()
            os.kill(pid, signal.SIGTERM)
            print(f"[frac] node worker-{self.worker_id} killed (PID {pid})")
            
            # Wait a moment for the process to clean up
            time.sleep(0.5)
            
        except FileNotFoundError as e:
            print(f"[frac] cannot kill worker-{self.worker_id}: {e}")
        except ProcessLookupError:
            print(f"[frac] worker-{self.worker_id} process already dead")
    
    def resurrect(self) -> None:
        """Restart the worker process."""
        try:
            # Start the worker process
            subprocess.Popen([
                "node", "worker.js", self.worker_id, str(self.port)
            ], cwd=Path(__file__).parent)
            
            print(f"[frac] node worker-{self.worker_id} resurrected on port {self.port}")
            
        except Exception as e:
            print(f"[frac] failed to resurrect worker-{self.worker_id}: {e}")


class SimpleFrac(Frac):
    """Simple Frac implementation that just arms events."""
    
    def inject(self, target: Node, event, hooks: RuntimeHooks) -> None:
        """Arm the event to trigger on the target."""
        # For DelayEvent, we need to bind the target's kill method to the event
        original_fire = hooks.fire
        
        def fire_with_kill():
            target.kill()
            original_fire()
        
        hooks.fire = fire_with_kill
        event.arm(hooks)


# Factory functions required by frac CLI
def create_node(node_str: str, **kwargs: Any) -> Node:
    """Create a WorkerNode from the node identifier string."""
    return WorkerNode(node_str)


def create_hooks(node: Node, **kwargs: Any) -> RuntimeHooks:
    """Create RuntimeHooks for the node."""
    return TimerHooks()


def create_frac(**kwargs: Any) -> Frac:
    """Create a Frac implementation."""
    return SimpleFrac() 