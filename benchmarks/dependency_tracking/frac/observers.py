"""Builtin RuntimeHooks helpers for common monitoring patterns."""

from __future__ import annotations

import threading
import time
from datetime import datetime
from typing import Callable, Optional


class ByteCounter:
    """Helper for tracking bytes sent through a stream."""

    def __init__(self) -> None:
        self._bytes = 0
        self._lock = threading.Lock()

    def add(self, chunk: bytes) -> None:
        """Add bytes to the counter."""
        with self._lock:
            self._bytes += len(chunk)

    def total(self) -> int:
        """Get current byte count."""
        with self._lock:
            return self._bytes

    def reset(self) -> None:
        """Reset counter to zero."""
        with self._lock:
            self._bytes = 0


class Timer:
    """Helper for tracking elapsed time."""

    def __init__(self) -> None:
        self._start = time.time()

    def elapsed_ms(self) -> int:
        """Get elapsed time in milliseconds."""
        return int((time.time() - self._start) * 1000)

    def reset(self) -> None:
        """Reset timer to current time."""
        self._start = time.time()


class BaseRuntimeHooks:
    """Base RuntimeHooks implementation with common functionality."""

    def __init__(self) -> None:
        self._timer = Timer()
        self._byte_counter = ByteCounter()
        self._tokens_seen: set[str] = set()
        self._fire_callback: Optional[Callable[[], None]] = None
        self._byte_thresholds: list[tuple[int, Callable[[], None]]] = []  # (threshold, callback) pairs

    # Timer methods
    def call_at(self, when: datetime, fn: Callable[[], None]) -> None:
        """Schedule function to run at specific time."""
        delay = max(0.0, when.timestamp() - time.time())
        threading.Timer(delay, fn).start()

    def call_later(self, secs: float, fn: Callable[[], None]) -> None:
        """Schedule function to run after delay."""
        threading.Timer(secs, fn).start()

    # Metrics
    def elapsed_ms(self) -> int:
        """Time since this hooks object was created."""
        return self._timer.elapsed_ms()

    def bytes_sent(self) -> int:
        """Total bytes counted by add_bytes()."""
        return self._byte_counter.total()

    def seen_token(self, tok: str) -> bool:
        """Check if token was added via add_token()."""
        return tok in self._tokens_seen

    # Action
    def fire(self) -> None:
        """Default fire action - calls registered callback if any."""
        if self._fire_callback:
            self._fire_callback()

    # Helper methods for subclasses
    def add_bytes(self, chunk: bytes) -> None:
        """Add bytes to counter and check for threshold triggers."""
        old_total = self._byte_counter.total()
        self._byte_counter.add(chunk)
        new_total = self._byte_counter.total()
        
        # Check if any byte thresholds were crossed
        for threshold, callback in self._byte_thresholds[:]:  # Copy list to allow modification
            if old_total < threshold <= new_total:
                callback()
                # Remove triggered threshold to prevent multiple firing
                self._byte_thresholds.remove((threshold, callback))

    def add_token(self, token: str) -> None:
        """Mark token as seen (call this when token appears)."""
        self._tokens_seen.add(token)

    def set_fire_callback(self, callback: Callable[[], None]) -> None:
        """Set what happens when fire() is called."""
        self._fire_callback = callback
    
    def add_byte_threshold(self, threshold: int, callback: Callable[[], None]) -> None:
        """Register a callback to fire immediately when byte count reaches threshold."""
        self._byte_thresholds.append((threshold, callback)) 