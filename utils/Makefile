.PHONY: all clean

all: try-summary try-commit

try-summary: ignores.o try-summary.o
	gcc -Wall -O2 -o $@ -g $^

try-commit: ignores.o try-commit.o
	gcc -Wall -O2 -o $@ -g $^

clean:
	-rm try-summary try-commit
	-rm *.o
