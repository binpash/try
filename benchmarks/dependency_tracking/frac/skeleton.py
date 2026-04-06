"""
frac skeleton - Template for custom Node and RuntimeHooks implementations

Copy this file and implement the TODOs to create your own fault injection
backend for remote nodes, Docker containers, cloud VMs, etc.

Usage:
1. Copy this file to your project (e.g., my_cluster_frac.py)
2. Fill in the TODO sections below
3. Use with: frac inject --plugin my_cluster_frac.py --node worker-7 --event delay --ms 30000
"""

from __future__ import annotations

import os
import subprocess
import sys
from typing import Any, Dict

from frac.api import Node, Frac, RuntimeHooks, Event
from frac.observers import BaseRuntimeHooks


# ===========================================================================
# TODO 1: Define your Node class
# ===========================================================================
class MyCustomNode(Node):
    """
    TODO: Implement Node for your infrastructure (SSH, Docker, K8s, etc.)
    
    Examples:
    - SSHNode: uses paramiko/subprocess to ssh into remote machines
    - DockerNode: uses docker API to kill/start containers
    - K8sNode: uses kubectl to delete/create pods
    """
    
    def __init__(self, node_id: str) -> None:
        self.node_id = node_id
        # TODO: Add any connection info (hostname, container ID, etc.)
        self.hostname = f"{node_id}.example.com"  # Example
    
    def kill(self) -> None:
        """TODO: Implement how to kill/crash this node."""
        # Example: SSH approach
        cmd = f"ssh {self.hostname} 'sudo systemctl stop my-worker-service'"
        sys.stderr.write(f"[frac] killing node {self.node_id}: {cmd}\n")
        
        # TODO: Replace with your actual kill logic
        # subprocess.run(cmd, shell=True, check=True)
        
        # Example: Docker approach
        # subprocess.run(f"docker kill {self.node_id}", shell=True, check=True)
        
        # Example: Kubernetes approach  
        # subprocess.run(f"kubectl delete pod {self.node_id}", shell=True, check=True)
        
        print(f"[DEMO] Would kill node: {self.node_id}")
    
    def resurrect(self) -> None:
        """TODO: Implement how to bring this node back online."""
        # Example: SSH approach
        cmd = f"ssh {self.hostname} 'sudo systemctl start my-worker-service'"
        sys.stderr.write(f"[frac] resurrecting node {self.node_id}: {cmd}\n")
        
        # TODO: Replace with your actual resurrect logic
        # subprocess.run(cmd, shell=True, check=True)
        
        print(f"[DEMO] Would resurrect node: {self.node_id}")


# ===========================================================================
# TODO 2: Define your RuntimeHooks class 
# ===========================================================================
class MyCustomHooks(BaseRuntimeHooks):
    """
    TODO: Implement RuntimeHooks for monitoring your node's state.
    
    The base class provides timer functionality and basic byte/token tracking.
    You need to override the metrics methods to query your actual systems.
    """
    
    def __init__(self, node: MyCustomNode) -> None:
        super().__init__()
        self.node = node
        # Set what happens when fire() is called
        self.set_fire_callback(node.kill)
    
    def bytes_sent(self) -> int:
        """
        TODO: Return how many bytes this node has sent.
        
        Examples:
        - Query Prometheus metrics
        - Parse log files  
        - Call REST API on the node
        - Read /proc/net/dev on Linux
        """
        # Example: Prometheus query
        # import requests
        # resp = requests.get(f"http://prometheus:9090/api/v1/query",
        #                    params={"query": f"node_network_transmit_bytes{{instance='{self.node.hostname}'}}"})
        # return int(resp.json()["data"]["result"][0]["value"][1])
        
        # TODO: Replace with your actual monitoring
        return 0
    
    def seen_token(self, token: str) -> bool:
        """
        TODO: Check if a specific token has appeared in the node's output.
        
        Examples:
        - Check log files for the token
        - Query a message queue
        - Check a shared file system
        """
        # Example: Check log file
        # try:
        #     with open(f"/logs/{self.node.node_id}.log", "r") as f:
        #         return token in f.read()
        # except FileNotFoundError:
        #     return False
        
        # TODO: Replace with your actual token detection
        return False


# ===========================================================================
# TODO 3: Define your Frac class (usually can just inherit from base)
# ===========================================================================
class MyCustomFrac(Frac):
    """
    TODO: Usually you can just use the default implementation.
    
    Override only if you need special coordination logic between
    multiple nodes or custom event handling.
    """
    
    def inject(self, target: Node, event: Event, hooks: RuntimeHooks) -> None:
        """Standard implementation - just arm the event."""
        event.arm(hooks)


# ===========================================================================
# Plugin interface - frac CLI will call these functions
# ===========================================================================

def create_node(node_id: str) -> Node:
    """Factory function called by frac CLI."""
    return MyCustomNode(node_id)


def create_hooks(node: Node) -> RuntimeHooks:
    """Factory function called by frac CLI."""
    if not isinstance(node, MyCustomNode):
        raise TypeError(f"Expected MyCustomNode, got {type(node)}")
    return MyCustomHooks(node)


def create_frac() -> Frac:
    """Factory function called by frac CLI.""" 
    return MyCustomFrac()


# ===========================================================================
# Example usage and testing
# ===========================================================================

if __name__ == "__main__":
    """
    Test your implementation locally before using with frac CLI.
    
    Run: python my_cluster_frac.py
    """
    print("Testing custom frac implementation...")
    
    # Test node creation and basic operations
    node = create_node("test-worker-1")
    print(f"Created node: {node.node_id}")
    
    # Test kill (should print demo message)
    node.kill()
    
    # Test resurrect (should print demo message)  
    node.resurrect()
    
    # Test hooks
    hooks = create_hooks(node)
    print(f"Bytes sent: {hooks.bytes_sent()}")
    print(f"Seen token 'test': {hooks.seen_token('test')}")
    
    print("Test complete - implement the TODOs for real functionality!") 