.PHONY: all clean

all: try-summary try-commit

try-summary: try-summary.o ignores.o
	gcc -o $@ -g $^

try-commit: try-commit.o ignores.o
	gcc -o $@ -g $^

clean:
	-rm try-summary try-commit
