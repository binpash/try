# Caruca: Automatic Specification Miner for Commands
Caruca automatically produces partial specifications for commands (_e.g._, `rm`, `mkdir`, `cat`) from natural language documentation.

## Organization
* `caruca`: source code for the `caruca` project.
* `eval`: scripts for analysing shell command invocations in the wild to evaluate practical completeness (and their results)
* `outputs`: intermediate representation of natural language documentation as produced by the LLM
