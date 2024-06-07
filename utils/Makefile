.PHONY: all clean

all: try-summary try-commit

try-summary: ignores.o try-summary.o
	$(CC) -Wall -O2 -o $@ -g $^

try-commit: ignores.o try-commit.o
	$(CC) -Wall -O2 -o $@ -g $^

clean:
	-rm try-summary try-commit
	-rm *.o
