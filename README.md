# HTML Report for `cargo-mutants`

This tool takes the results of [cargo-mutants](https://mutants.rs/) and displays them in a HTML report based on [Stryker Mutator](https://stryker-mutator.io/)'s [mutation-testing-elements](https://github.com/stryker-mutator/mutation-testing-elements/tree/master/packages/elements).
We convert the cargo-mutants output into a Stryker-compatible json format and vendor a modified version of mutation-testing-elements which supports Rust syntax highlighting.

## Building

To build this tool you need to have [bun](https://bun.sh) installed. Then, run:

```shell
$ bun install
$ bun compile
```

The result is an executable `dist/converter`.

## Usage

Run cargo-mutants on your Rust project. For test information in the report it is recommended to run the mutation tests with nextest and with the environment variables `NEXTEST_EXPERIMENTAL_LIBTEST_JSON=1 NEXTEST_MESSAGE_FORMAT=libtest-json`.
(Alternatively, if nextest is not an option, with `cargo +nightly mutants -- -- --format json -Z unstable-options`.)
You should have a `mutants.out` directory in your project folder.
Now, run the `converter serve` from the project folder. This will serve the report on port 3000.

Running only `converter` will output the report files (`report.json`, `report.html` and `mutant-report.js`) to `mutants.out`. Due to CORS restrictions, you need to serve them via HTTP to be useful.
