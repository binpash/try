import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigESLint from "eslint-config-eslint";
import eslintConfigESLintFormatting from "eslint-config-eslint/formatting";
import eslintPluginChaiFriendly from "eslint-plugin-chai-friendly";
import globals from "globals";

export default defineConfig([
    globalIgnores([
        "**/tests/fixtures/",
        "**/dist/",
        "**/coverage/",
        "packages/espree/tools/create-test-example.js"
    ]),
    eslintConfigESLint,
    eslintConfigESLintFormatting,
    {
        files: ["packages/*/tests/lib/**"],
        languageOptions: {
            globals: {
                ...globals.mocha
            }
        }
    },
    {
        files: ["packages/eslint-scope/tests/**"],
        languageOptions: {
            globals: {
                ...globals.mocha
            }
        },
        plugins: {
            "chai-friendly": eslintPluginChaiFriendly
        },
        rules: {
            "no-unused-expressions": "off",
            "chai-friendly/no-unused-expressions": "error"
        }
    },
    {
        files: ["packages/eslint-scope/lib/**"],
        rules: {
            "no-underscore-dangle": "off"
        }
    },
    {
        files: ["packages/eslint-scope/Makefile.js"],
        languageOptions: {
            globals: {
                ...globals.shelljs,
                target: false
            }
        },
        rules: {
            "no-console": "off"
        }
    },
    {
        files: ["packages/eslint-scope/**"],
        linterOptions: {
            reportUnusedDisableDirectives: "error"
        },
        settings: {
            jsdoc: {
                preferredTypes: {
                    Object: "object",
                    "object<>": "Object"
                }
            }
        }
    },
    {
        files: ["**/tools/**"],
        rules: {
            "no-console": "off",
            "n/no-process-exit": "off"
        }
    }
]);
