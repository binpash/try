import subprocess


class TestGenerate:
    @staticmethod
    def helper(args, contains, excludes, length):
        result = subprocess.run(
            ["caruca", "generate", *args], capture_output=True, text=True
        )
        lines = set(result.stdout.splitlines())
        assert result.returncode == 0
        assert len(lines) == length
        assert lines.issuperset(contains)
        assert lines.isdisjoint(excludes)

        return lines

    def test_arch(self):
        lines = self.helper(["arch"], {"arch", "arch --version", "arch --help"}, [], 4)
        assert "arch --help --version" in lines or "arch --version --help" in lines

    def test_arch_skip(self):
        self.helper(["arch", "--skip"], {"arch"}, [], 1)

    def test_echo(self):
        self.helper(
            ["echo"],
            {
                "echo",
                "echo -n",
                "echo -e",
                "echo -E",
                "echo --help",
                "echo --version",
                'echo "string"',
            },
            [],
            2**6,
        )

    def test_echo_skip(self):
        self.helper(
            ["echo", "--skip"],
            {"echo", "echo -n", "echo -e", "echo -E"},
            {"echo --help", "echo --version"},
            2**4,
        )

    def test_cat(self):
        self.helper(
            ["cat"],
            {
                "cat -A",
                "cat -b",
                "cat -e",
                "cat -E",
                "cat -n",
                "cat -s",
                "cat -T",
                "cat -u",
                "cat -v",
                "cat --help",
                "cat --version",
                'cat -A "path_1"',
                'cat -b "path_1"',
                'cat -e "path_1"',
                'cat -E "path_1"',
                'cat -n "path_1"',
                'cat -s "path_1"',
                'cat -T "path_1"',
                'cat -u "path_1"',
                'cat -v "path_1"',
                'cat --help "path_1"',
                'cat --version "path_1"',
            },
            {},
            2**13,
        )
