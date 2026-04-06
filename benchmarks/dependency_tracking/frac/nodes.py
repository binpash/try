from __future__ import annotations

from dataclasses import dataclass
from typing import List
import subprocess

from .api import Node


@dataclass
class LocalProcessNode(Node):
    """A *Node* that is simply a local subprocess.

    High-level orchestration layers may subclass this further (e.g. to hold
    metadata like container name, host name, etc.).
    """

    cmd: List[str]
    proc: subprocess.Popen | None = None 