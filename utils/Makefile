.PHONY: all clean

all: try-summary try-commit

try-summary: try-summary.c
	gcc -o $@ -g $^

try-commit: try-commit.c
	gcc -o $@ -g $^

clean:
	-rm try-summary try-commit
