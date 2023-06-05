.PHONY: clean

try.1: ../docs/try.1.md
	pandoc --standalone --from markdown-smart --to man $< -o $@

clean:
	rm try.1