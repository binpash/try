export default {
    input: "./lib/index.js",
    external: ["estraverse", "esrecurse"],
    treeshake: false,
    output: {
        format: "cjs",
        file: "dist/eslint-scope.cjs",
        sourcemap: true
    }
};
