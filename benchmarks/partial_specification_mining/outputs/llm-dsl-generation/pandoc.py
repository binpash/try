from caruca.ir.syntax import *

pandoc_syntax_spec: list[SyntaxSpecification] = [
    [
        [
            Selection(
                flag="-f", alias=["--from", "--read"],
                choices=(
                    "markdown", "markdown_strict", "markdown_phpextra", "markdown_github",
                    "markdown_mmd", "commonmark", "gfm", "commonmark_x", "html", "latex",
                    "rst", "docbook", "opml", "org", "mediawiki", "textile", "twiki",
                    "tikiwiki", "creole", "vimwiki", "haddock", "ipynb", "jats", "jira",
                    "json", "latex", "man", "muse", "native", "odt", "opml", "org", "ris",
                    "rtf", "rst", "t2t", "textile", "typst", "vimwiki"
                ),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="-t", alias=["--to", "--write"],
                choices=(
                    "asciidoc", "beamer", "bibtex", "biblatex", "chunkedhtml", "commonmark",
                    "commonmark_x", "context", "csljson", "docbook", "docbook4", "docbook5",
                    "docx", "dokuwiki", "epub", "epub2", "epub3", "fb2", "gfm", "haddock",
                    "html", "html4", "html5", "icml", "ipynb", "jats_archiving",
                    "jats_articleauthoring", "jats_publishing", "jats", "jira", "json",
                    "latex", "man", "markdown", "markdown_mmd", "markdown_phpextra",
                    "markdown_strict", "markua", "mediawiki", "ms", "muse", "native", "odt",
                    "opml", "opendocument", "org", "pdf", "plain", "pptx", "rst", "rtf",
                    "texinfo", "textile", "slideous", "slidy", "dzslides", "revealjs", "s5",
                    "tei", "typst", "xwiki", "zimwiki"
                ),
                flag_followed_by_equals=True
            ),
            Path(flag="-o", alias=["--output"], arity=Arity.EXACTLY_ONE),
            Path(flag="--data-dir", arity=Arity.EXACTLY_ONE),
            Path(flag="-d", alias=["--defaults"], arity=Arity.EXACTLY_ONE),
            Flag("--bash-completion"),
            Flag("--verbose"),
            Flag("--quiet"),
            Flag("--fail-if-warnings"),
            Path(flag="--log", arity=Arity.EXACTLY_ONE),
            Flag("--list-input-formats"),
            Flag("--list-output-formats"),
            Selection(
                flag="--list-extensions",
                choices=("", "markdown", "commonmark", "gfm"),
                flag_followed_by_equals=True
            ),
            Flag("--list-highlight-languages"),
            Flag("--list-highlight-styles"),
            Flag("-v", alias=["--version"]),
            Flag("-h", alias=["--help"]),
            Integer(flag="--shift-heading-level-by"),
            Integer(flag="--base-header-level"),
            String(flag="--indented-code-classes"),
            String(flag="--default-image-extension"),
            Flag("--file-scope"),
            Path(flag="-F", alias=["--filter"], arity=Arity.EXACTLY_ONE),
            Path(flag="-L", alias=["--lua-filter"], arity=Arity.EXACTLY_ONE),
            String(flag="-M", alias=["--metadata"]),
            Path(flag="--metadata-file", arity=Arity.EXACTLY_ONE),
            Flag("-p", alias=["--preserve-tabs"]),
            Integer(flag="--tab-stop"),
            Selection(
                flag="--track-changes",
                choices=("accept", "reject", "all"),
                flag_followed_by_equals=True
            ),
            Path(flag="--extract-media", arity=Arity.EXACTLY_ONE),
            Path(flag="--abbreviations", arity=Arity.EXACTLY_ONE),
            Flag("--trace"),
            Flag("-s", alias=["--standalone"]),
            Path(flag="--template", arity=Arity.EXACTLY_ONE),
            String(flag="-V", alias=["--variable"]),
            Flag("--sandbox"),
            String(flag="-D", alias=["--print-default-template"]),
            Path(flag="--print-default-data-file", arity=Arity.EXACTLY_ONE),
            Selection(
                flag="--eol",
                choices=("crlf", "lf", "native"),
                flag_followed_by_equals=True
            ),
            Integer(flag="--dpi"),
            Selection(
                flag="--wrap",
                choices=("auto", "none", "preserve"),
                flag_followed_by_equals=True
            ),
            Integer(flag="--columns"),
            Flag("--toc", alias=["--table-of-contents"]),
            Integer(flag="--toc-depth"),
            Flag("--strip-comments"),
            Flag("--no-highlight"),
            Selection(
                flag="--highlight-style",
                choices=("pygments", "kate", "monochrome", "breezeDark", "espresso", "zenburn", "haddock", "tango"),
                flag_followed_by_equals=True
            ),
            Path(flag="--syntax-definition", arity=Arity.EXACTLY_ONE),
            Path(flag="-H", alias=["--include-in-header"], arity=Arity.EXACTLY_ONE),
            Path(flag="-B", alias=["--include-before-body"], arity=Arity.EXACTLY_ONE),
            Path(flag="-A", alias=["--include-after-body"], arity=Arity.EXACTLY_ONE),
            String(flag="--resource-path"),
            String(flag="--request-header"),
            Flag("--no-check-certificate"),
            Flag("--self-contained"),
            Flag("--embed-resources"),
            Flag("--html-q-tags"),
            Flag("--ascii"),
            Flag("--reference-links"),
            Selection(
                flag="--reference-location",
                choices=("block", "section", "document"),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="--markdown-headings",
                choices=("setext", "atx"),
                flag_followed_by_equals=True
            ),
            Flag("--list-tables"),
            Selection(
                flag="--top-level-division",
                choices=("default", "section", "chapter", "part"),
                flag_followed_by_equals=True
            ),
            Flag("-N", alias=["--number-sections"]),
            String(flag="--number-offset"),
            Flag("--listings"),
            Flag("-i", alias=["--incremental"]),
            Integer(flag="--slide-level"),
            Flag("--section-divs"),
            Selection(
                flag="--email-obfuscation",
                choices=("none", "javascript", "references"),
                flag_followed_by_equals=True
            ),
            String(flag="--id-prefix"),
            String(flag="-T", alias=["--title-prefix"]),
            Path(flag="-c", alias=["--css"], arity=Arity.EXACTLY_ONE),
            Path(flag="--reference-doc", arity=Arity.EXACTLY_ONE),
            Integer(flag="--split-level"),
            String(flag="--chunk-template"),
            Path(flag="--epub-cover-image", arity=Arity.EXACTLY_ONE),
            Selection(
                flag="--epub-title-page",
                choices=("true", "false"),
                flag_followed_by_equals=True
            ),
            Path(flag="--epub-metadata", arity=Arity.EXACTLY_ONE),
            Path(flag="--epub-embed-font", arity=Arity.EXACTLY_ONE),
            String(flag="--epub-subdirectory"),
            Selection(
                flag="--ipynb-output",
                choices=("all", "none", "best"),
                flag_followed_by_equals=True
            ),
            Selection(
                flag="--pdf-engine",
                choices=("pdflatex", "lualatex", "xelatex", "latexmk", "tectonic", "wkhtmltopdf", "weasyprint", "pagedjs-cli", "prince", "context", "pdfroff", "typst"),
                flag_followed_by_equals=True
            ),
            String(flag="--pdf-engine-opt"),
            Flag("-C", alias=["--citeproc"]),
            Path(flag="--bibliography", arity=Arity.EXACTLY_ONE),
            Path(flag="--csl", arity=Arity.EXACTLY_ONE),
            Path(flag="--citation-abbreviations", arity=Arity.EXACTLY_ONE),
            Flag("--natbib"),
            Flag("--biblatex"),
            Flag("--mathjax"),
            Flag("--mathml"),
            String(flag="--webtex"),
            Flag("--katex"),
            Flag("--gladtex"),
            Flag("--dump-args"),
            Flag("--ignore-args"),
        ],
        [Path(arity=Arity.ZERO_OR_MORE)],
    ]
]

