# Multi-Node Fault Injection Demo

This demo shows how `frac` can inject time-based faults into a distributed system with multiple worker nodes.

## System Architecture

```
Client (load.js)
       │ HTTP requests every 100ms
       ▼
Load Balancer (balancer.js) on port 9000
       ├────────► Worker-1 (worker.js) on port 8001
       ├────────► Worker-2 (worker.js) on port 8002  ← fault target
       └────────► Worker-3 (worker.js) on port 8003
```

## What it demonstrates

- **Time-based fault injection**: Kill worker-2 after 3 seconds
- **Automatic resurrection**: Restart worker-2 after 5 seconds of downtime  
- **Service resilience**: Workers 1 and 3 continue serving requests during the fault
- **Load balancer behavior**: 503 errors for worker-2's share of traffic during outage

## Timeline

```
t=0s    Start 3 workers + balancer + load generator
t=5s    Baseline metrics collected
t=8s    worker-2 killed (3s after fault scheduled)
t=13s   worker-2 resurrected (5s downtime)
t=20s   Demo ends, results printed
```

## Requirements

- Node.js (for the JavaScript workers and balancer)
- Python 3.7+ (for frac)

## Running the demo

```bash
cd frac/examples/multi-node
bash test.sh
```

## Expected output

```
[demo] Starting multi-node fault injection demo
[demo] Starting 3 worker nodes...
[worker-1] listening on port 8001, PID 12345
[worker-2] listening on port 8002, PID 12346  
[worker-3] listening on port 8003, PID 12347
[demo] Starting load balancer...
[balancer] listening on port 9000
[demo] Starting load generator...
[load] starting load generation to http://localhost:9000
...
[frac] fault injection armed for node 2
[frac] resurrection armed for node 2
...
[frac] node worker-2 killed (PID 12346)
...
[frac] node worker-2 resurrected on port 8002
...
[demo] Request summary:
[demo] Total requests: 150
[demo] Successful (200): 125
[demo] Failed (503): 25
[demo] Results saved to load_results.csv
```

## Plugin architecture

The demo uses `http_plugin.py` which maps node identifiers to Node.js worker processes:

- **Node**: Maps `"2"` → worker-2 process (via PID file)  
- **Kill**: `os.kill(pid, SIGTERM)`
- **Resurrect**: `subprocess.Popen(["node", "worker.js", "2", "8002"])`

This shows how the same `frac` CLI works across completely different infrastructures just by changing the plugin. 