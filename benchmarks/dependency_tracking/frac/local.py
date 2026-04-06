"""Local process implementation for command-level fault injection."""

from __future__ import annotations

import os
import signal
import subprocess
import sys
from typing import List, Optional

from .api import Frac, Node, Event, RuntimeHooks
from .observers import BaseRuntimeHooks


class LocalProcessNode(Node):
    """A Node that represents a local subprocess with fault simulation via suspension."""

    def __init__(self, cmd: List[str]) -> None:
        self.cmd = cmd
        self.proc: Optional[subprocess.Popen[bytes]] = None
        self._is_suspended = False
        self._input_buffer: List[bytes] = []  # Buffer input during "death"
        self._output_stream = None  # Reference to downstream for draining
        self._hooks = None  # Reference to hooks for byte counting

    def set_output_stream(self, output_stream) -> None:
        """Set the output stream reference for draining."""
        self._output_stream = output_stream

    def set_hooks(self, hooks) -> None:
        """Set the hooks reference for byte counting during drainage."""
        self._hooks = hooks

    def drain_stdout_to_downstream(self) -> int:
        """Drain any remaining data from stdout pipe after SIGSTOP.
        
        Returns number of bytes drained.
        """
        if not (self.proc and self.proc.stdout and self._output_stream):
            return 0
            
        drained_bytes = 0
        try:
            # Read all remaining data from stdout pipe
            while True:
                # Use non-blocking read to avoid hanging
                import select
                ready, _, _ = select.select([self.proc.stdout], [], [], 0.1)
                if not ready:
                    break
                    
                chunk = self.proc.stdout.read(1024)
                if not chunk:
                    break
                    
                # Forward to downstream
                self._output_stream.write(chunk)
                self._output_stream.flush()
                drained_bytes += len(chunk)
                
                # Count bytes in hooks if available
                if self._hooks:
                    self._hooks.add_bytes(chunk)
                
        except Exception:
            # If anything goes wrong, just stop draining
            pass
            
        return drained_bytes

    def kill(self) -> None:
        """Kill the process permanently (for local command-level fault injection)."""
        if self.proc and self.proc.poll() is None:
            sys.stderr.write(f"[frac] killing PID {self.proc.pid}\n")
            sys.stderr.flush()
            
            # Terminate the process permanently
            self.proc.terminate()
            try:
                self.proc.wait(timeout=1.0)
            except subprocess.TimeoutExpired:
                self.proc.kill()
                self.proc.wait()
            
            # Close streams to signal EOF downstream
            if self.proc.stdout:
                self.proc.stdout.close()
            if self.proc.stdin:
                self.proc.stdin.close()

    def resurrect(self) -> None:
        """Simulate resurrection by flushing buffered input and resuming the suspended process."""
        if self.proc and self.proc.poll() is None and self._is_suspended:
            # First flush any buffered input
            self.flush_buffer_to_stdin()
            
            sys.stderr.write(f"[frac] resurrected as PID {self.proc.pid}\n")
            sys.stderr.flush()
            
            # Resume the process
            os.kill(self.proc.pid, signal.SIGCONT)
            self._is_suspended = False
        else:
            # If process actually died or doesn't exist, create a new one
            if self.proc:
                try:
                    self.proc.stdout.close()  # type: ignore[union-attr]
                    self.proc.wait()
                except:
                    pass

            self.proc = subprocess.Popen(
                self.cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, bufsize=0
            )
            self._is_suspended = False
            sys.stderr.write(f"[frac] resurrected as PID {self.proc.pid}\n")
            sys.stderr.flush()

    def start(self) -> None:
        """Start the subprocess initially."""
        if self.proc is None:
            self.proc = subprocess.Popen(
                self.cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, bufsize=0
            )
            self._is_suspended = False

    def is_suspended(self) -> bool:
        """Check if process is currently suspended (simulating death)."""
        return self._is_suspended
    
    def is_alive(self) -> bool:
        """Check if process is alive and not suspended."""
        return (self.proc and 
                not self._is_suspended and 
                self.proc.poll() is None)
    
    def add_to_buffer(self, chunk: bytes) -> None:
        """Add chunk to input buffer during suspension."""
        self._input_buffer.append(chunk)
    
    def flush_buffer_to_stdin(self) -> None:
        """Send all buffered input to process stdin."""
        if self.proc and self.proc.stdin and self._input_buffer:
            try:
                for buffered_chunk in self._input_buffer:
                    self.proc.stdin.write(buffered_chunk)
                    self.proc.stdin.flush()
                self._input_buffer.clear()
            except:
                pass


class LocalStreamingHooks(BaseRuntimeHooks):
    """RuntimeHooks that monitors a LocalProcessNode's stdout."""

    def __init__(self, node: LocalProcessNode) -> None:
        super().__init__()
        self.node = node
        # Set fire callback to kill the node
        self.set_fire_callback(node.kill)
        # Set hooks reference for byte counting during drainage
        node.set_hooks(self)

    def pump_data(self, input_stream, output_stream) -> None:
        """Stream data through process with precise byte monitoring."""
        
        # Start feeding input in a simple thread
        def feed_input():
            try:
                while True:
                    chunk = input_stream.read(8192)
                    if not chunk:
                        break
                    if self.node.proc and self.node.proc.stdin:
                        self.node.proc.stdin.write(chunk)
                        self.node.proc.stdin.flush()
                    else:
                        break
            except Exception:
                pass
            finally:
                if self.node.proc and self.node.proc.stdin:
                    try:
                        self.node.proc.stdin.close()
                    except:
                        pass
        
        import threading
        input_thread = threading.Thread(target=feed_input, daemon=True)
        input_thread.start()
        
        # Monitor output bytes precisely and kill at threshold
        while True:
            if not (self.node.proc and self.node.proc.stdout):
                break
                
            try:
                # Read in small chunks for precise byte counting
                chunk = self.node.proc.stdout.read(1)  # Read 1 byte at a time for precision
                if not chunk:
                    # Process ended normally
                    break
                
                # Count this byte
                self.add_bytes(chunk)
                
                # Forward to output
                output_stream.write(chunk)
                output_stream.flush()
                
            except Exception:
                # Process was killed or other error
                break


class LocalFrac(Frac):
    """Frac implementation for local processes."""

    def inject(self, target: Node, event: Event, hooks: RuntimeHooks) -> None:
        """Arm event to kill target when condition is met."""
        event.arm(hooks) 