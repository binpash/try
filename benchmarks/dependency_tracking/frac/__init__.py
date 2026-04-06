"""
frac – Unified, Lightweight Fault-Injection Subsystem (v2)

Convenience re-exports for common public symbols.
"""

__version__ = "2.0.0"

# Core abstractions
from .api import (
    Node,
    Event,
    TimeEvent,
    DelayEvent,
    ByteEvent,
    TokenEvent,
    RuntimeHooks,
    Frac,
)

# Built-in implementations
from .local import LocalProcessNode, LocalFrac

# Helpers for building custom RuntimeHooks
from .observers import ByteCounter, Timer 