# frac – Lightweight, Pluggable Fault-Injection Framework

`frac` lets you *inject faults on demand* into anything that looks like a
"node" – a Unix process, a Docker container, a micro-service, a VM, … – and then
watch how the rest of your system behaves under failure.


### CLI synopsis

```
frac byte-kill --bytes N --cmd "CMD …"                 # local fail-stop
frac inject     --node ID --event delay --ms 30000     # remote (plugin)
frac resurrect  --node ID                              # bring a remote node back
```

### Public API (one screen)

```python
class Event:          # When to fire
    def arm(hooks): ...

class Node:           # What to do
    def kill(): ...
    def resurrect(): ...

class RuntimeHooks:   # Runtime observability
    def call_later(secs, fn): ...  # timers
    def add_byte_threshold(N, fn): ...
    # …

class Frac:           # Coordinator
    def inject(node: Node, event: Event, hooks: RuntimeHooks): ...
```

#### What *you* implement

| Scenario | What the client wrote |
|----------|-----------------------|
| **Single-node** | Literally just the CLI line – built-ins (`LocalProcessNode`, etc.) did the rest |
| **Multi-node**  | In `http_plugin.py`, defining `WorkerNode`, a tiny `TimerHooks`, and `SimpleFrac` |

That is all: the **core stays unchanged**.

#### Extending to multi-node faults

Copy `frac/skeleton.py`, implement your own `Node`, `RuntimeHooks`, and
`Frac` classes.  The same CLI (`frac inject …`) will work, now targeting
remote workers instead of local commands.

### Design philosophy – keep the core generic

`frac` purposely separates *how to trigger a fault* (the **event**) from
*how to carry it out* (the **node implementation**):

1. **Thin core** – The built-in code only understands byte/time/token
   events and how to call `Node.kill()` / `Node.resurrect()`.  It has **no
   knowledge of your cluster, scheduler, or network layout**.
2. **User plugins** – You write a tiny Python module (see
   `frac/skeleton.py`) that turns whatever *identifies* a worker in *your*
   world into a concrete `Node` object.  That may be an IP address, a
   hostname, a Kubernetes Pod name, a Docker container ID, or even an MPI
   rank.
3. **Opaque `--node` flag** – Because of (2) the CLI treats the argument
   after `--node` as an **opaque string**.  If you *want* to pass a raw
   IP you can:

   ```bash
   frac inject --node 10.1.2.3 --event delay --ms 30000
   ```

   A different deployment might instead run:

   ```bash
   frac inject --node worker-7 --event bytes --bytes 1000000
   ```

   Both commands use the same public interface; only the plugin’s
   `create_node()` function decides what the string means.


---

### Example overview

Below we demonstrate *the same core and CLI* in two completely different
settings:

1. **Single-node Unix pipeline** – kill the `tr` process *exactly* after it has
   delivered **500 bytes** downstream.
2. **Multi-node JavaScript workload** – kill **worker-2** after **10 seconds** of
   uptime and resurrect it **5 seconds** later while the load-generator keeps
   sending HTTP requests through a round-robin balancer.

Each demo includes a built-in **oracle** (ground-truth check) so you can confirm
the fault happened precisely when claimed.


### Example 1 – Single-node pipeline (500-byte kill)

#### Quick start

```bash
# Single-node pipeline demo (500-byte kill)
bash frac/examples/command-level/test.sh

```


#### Verifying correctness

*Why do we expect exactly 5 matches?*  The demo script pipes the **first 500
bytes** of `in.txt` through the same `tr | grep` pipeline *without* fault
injection and records how many matches the regular expression produces.  When
`frac` kills `tr` at the 500-byte mark the downstream `grep` should see **the
exact same byte sequence** and therefore report the **same number of matches**.

Successful run:

```
[demo] Found 5 matches           # output under fault injection
[demo] Ground truth (500 bytes): 5 matches  # oracle
✅ SUCCESS: Fault injection matches 500-byte ground truth!
```

#### How it works

```
 stdin ─┬──────────────────────────────┐
        │                              │ 8 KiB chunks (input thread)
        ▼                              │
     tr A-Z a-z        ← upstream cmd  │
        │ 1 byte at a time             │ monitor loop (main thread)
        ▼                              │
  frac-monitor  (LocalStreamingHooks)  │ counts bytes **out of `tr`**
        │                              │ fires kill after 500 bytes
        ▼                              ▼
     grep 'regex'     ← downstream cmd  
```

1. `frac` spawns `tr A-Z a-z` with pipes for stdin/stdout.
2. A background thread **feeds input** (8 KiB chunks) to `tr`.
3. The main thread **reads exactly 1 byte** at a time from
   `tr`’s stdout, counts it, forwards it to `grep`.
4. When the counter reaches the threshold (e.g. 500 bytes) the monitor
   sends `SIGTERM` to `tr`.
5. `grep` receives EOF after the 500-th byte and exits normally.

    **Scaffolding provided by `frac`**
    - `LocalProcessNode` wraps the spawned `tr` process so the core can call
      `kill()`.
    - `LocalStreamingHooks` counts **bytes actually emitted** and fires the
      event at the *exact* threshold.
    - `LocalFrac` glues the two together – as a *client* you only wrote **one
      CLI line** (see quick-start above).

Because we count the bytes actually delivered *between* `tr` and `grep`,
we have byte-level precision with no buffering surprises.

---

### Example 2 – Multi-node JavaScript workload (timer kill + resurrection)

#### Quick start

```bash
# Multi-node demo (10 s kill + 5 s resurrection, requires Node.js)
bash frac/examples/multi-node/test.sh
```

#### Expected run (truncated)

```
[frac] node worker-2 killed (PID 12346)
...
[frac] node worker-2 resurrected on port 8002
[demo] Total requests: 218
[demo] Successful (200): 201
[demo] Failed (503): 17
```

#### Why those numbers make sense

*Setup recap*  – The load-generator sends **one request every 100 ms**.
After a 5 s warm-up we:

* kill **worker-2** exactly **3 s** later (≈ t = 8 s);
* resurrect it **5 s** after the kill (≈ t = 13 s);
* stop the demo at **t = 20 s**.

That means **worker-2 is down for ≈ 5 s** while requests keep flowing.

```
requests_per_sec = 1000 ms / 100 ms = 10
downtime_sec     ≈ 5
total_requests   ≈ 10 × 20 s = 200         (actual 218 because of startup jitter)
requests_to_w2   ≈ total / 3 ≈ 66
errors_expected  ≈ requests_to_w2 × (downtime / run_time)
                ≈ 66 × (5 / 20) ≈ 16–17
```

The demo reports **17 failed (503)** responses – exactly the share of
worker-2 traffic during its **5 s** absence.  All other requests (201) are
served successfully by workers 1 & 3 **and** by worker-2 once it is back
online, validating both the kill and the resurrection events.
