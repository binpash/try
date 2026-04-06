"""
The Caruca Intermediate Representation (IR)

A module containing the intermediate represetations that Caruca uses to
generate command string + environment combinations to trace.

Note that the term IR is used rather loosely since technically syntax.py is something the end user would interact with.

Caruca has three "levels" of IR.
The outermost representation is the *syntactic representation* found in syntax.py.
The syntactic IR is one that the LLM (and users that manually write syntax specifications) will use.
It is effectively a DSL for describing the syntax of the commands.

The second IR is the "string representation" found in string.py.
This IR translates directly to a string which uses the command.

The final IR is the "environment representation" found in string.py.
This IR not only contains information about what string to use to invoke the command,
but also what preparations must be made in the environment (e.g. file system).

There is a combinatorial explosion in between each stage of IR translation.
"""
