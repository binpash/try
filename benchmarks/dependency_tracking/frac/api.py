"""Core abstractions for frac fault injection system."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import Callable, Protocol


# ---------------------------------------------------------------------------
# Core Node abstraction
# ---------------------------------------------------------------------------
class Node(ABC):
    """What may be killed/resurrected. Subclass for different fault domains."""

    @abstractmethod
    def kill(self) -> None:
        """Terminate/crash this node."""

    @abstractmethod
    def resurrect(self) -> None:
        """Bring this node back online."""


# ---------------------------------------------------------------------------
# RuntimeHooks protocol - how to observe state/progress
# ---------------------------------------------------------------------------
class RuntimeHooks(Protocol):
    """Interface for observing runtime state and triggering actions."""

    # timers
    def call_at(self, when: datetime, fn: Callable[[], None]) -> None: ...
    def call_later(self, secs: float, fn: Callable[[], None]) -> None: ...

    # metrics
    def elapsed_ms(self) -> int: ...
    def bytes_sent(self) -> int: ...
    def seen_token(self, tok: str) -> bool: ...

    # action - called exactly once by Event
    def fire(self) -> None: ...


# ---------------------------------------------------------------------------
# Event base class and concrete triggers
# ---------------------------------------------------------------------------
class Event(ABC):
    """When to do it - polymorphic trigger conditions."""

    @abstractmethod
    def arm(self, hooks: RuntimeHooks) -> None:
        """Register callbacks so hooks.fire() is called when condition is met."""


# Simple polling helper for events that need to check conditions
_POLL_INTERVAL = 0.05  # seconds


def _poll_until(condition: Callable[[], bool], hooks: RuntimeHooks) -> None:
    """Helper that re-schedules itself until condition becomes true."""
    if condition():
        hooks.fire()
    else:
        hooks.call_later(_POLL_INTERVAL, lambda: _poll_until(condition, hooks))


@dataclass
class TimeEvent(Event):
    """Fire at an absolute wall-clock time."""
    at: datetime

    def arm(self, hooks: RuntimeHooks) -> None:
        hooks.call_at(self.at, hooks.fire)


@dataclass
class DelayEvent(Event):
    """Fire after a relative delay."""
    ms: int  # milliseconds

    def arm(self, hooks: RuntimeHooks) -> None:
        hooks.call_later(self.ms / 1000.0, hooks.fire)


@dataclass
class ByteEvent(Event):
    """Fire after N bytes have been sent."""
    bytes_out: int
    
    def __post_init__(self):
        self._fired = False

    def arm(self, hooks: RuntimeHooks) -> None:
        def fire_once():
            if not self._fired:
                self._fired = True
                hooks.fire()
        
        # Use immediate threshold checking if available
        if hasattr(hooks, 'add_byte_threshold'):
            hooks.add_byte_threshold(self.bytes_out, fire_once)
        else:
            # Fallback to polling for hooks that don't support immediate thresholds
            def check_condition():
                if not self._fired and hooks.bytes_sent() >= self.bytes_out:
                    fire_once()
                elif not self._fired:
                    hooks.call_later(_POLL_INTERVAL, check_condition)
            
            check_condition()


@dataclass
class TokenEvent(Event):
    """Fire when a specific token is seen."""
    token: str

    def arm(self, hooks: RuntimeHooks) -> None:
        _poll_until(lambda: hooks.seen_token(self.token), hooks)


# ---------------------------------------------------------------------------
# Core orchestrator
# ---------------------------------------------------------------------------
class Frac(ABC):
    """Main orchestrator - coordinates Node, Event, and RuntimeHooks."""

    @abstractmethod
    def inject(self, target: Node, event: Event, hooks: RuntimeHooks) -> None:
        """Arm event to call target.kill() when condition is met."""

    def schedule_resurrection(
        self, target: Node, event: Event, hooks: RuntimeHooks
    ) -> None:
        """Arm event to call target.resurrect() when condition is met."""
        # Default implementation: patch hooks.fire to call resurrect
        original_fire = hooks.fire

        def _resurrect_fire() -> None:
            target.resurrect()
            # Optionally call original fire too
            try:
                original_fire()
            except AttributeError:
                pass  # No original fire method

        # Replace fire method
        hooks.fire = _resurrect_fire  # type: ignore[assignment]
        self.inject(target, event, hooks)

    def resurrect(self, target: Node) -> None:
        """Manually resurrect a node."""
        target.resurrect() 