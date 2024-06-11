CFLAGS=-Wall -O2

.PHONY: all clean

all: try-summary try-commit

try-summary: ignores.o try-summary.o
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ -g $^

try-commit: ignores.o try-commit.o
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ -g $^

clean:
	-rm try-summary try-commit
	-rm *.o
