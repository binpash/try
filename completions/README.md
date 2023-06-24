# Shell completions

This directory holds completions for the `bash` shell.

You can apply completions locally by running:

```Bash
source try.bash
```

Alternatively, to enable *try* shell completion by default, consider adding the following line to your `.bashrc`:
```Bash
source <path-to-try-dir>/completions/try.bash
```

To enable *try* shell completion for all users,
consider copying the bash completion script to the `/etc/bash_completion.d/` directory:
```Bash
sudo cp try.bash /etc/bash_completion.d/
```
