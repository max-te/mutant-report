import type { MutantStatus, MutationTestResult } from 'mutation-testing-report-schema/api';

const statusmap: { [s in MutantSummary]: MutantStatus } = {
    MissedMutant: "Survived",
    CaughtMutant: "Killed",
    Unviable: "CompileError",
    Timeout: "Timeout",
}

export async function transformReport(input: LabOutcome): Promise<MutationTestResult> {
    const output: MutationTestResult = {
        schemaVersion: '2',
        files: {},
        thresholds: { low: 10, high: 50 },
        framework: {
            name: "cargo-mutants"
        },
        projectRoot: process.cwd(),
        testFiles: {}
    }

    for (const outcome of input.outcomes) {
        const duration = outcome.phase_results.reduce((d, p) => d + p.duration, 0)
        if (outcome.scenario === "Baseline") {
            output.performance = {
                initialRun: duration,
                mutation: 0,
                setup: 0
            }
            const log = await Bun.file(outcome.log_path).text();
            const testEvents = log.split('\n').flatMap(line => {
                try {
                    return [JSON.parse(line)];
                } catch {
                    return [];
                }
            }).filter(line => typeof line == "object" && "type" in line && line.type == "test" && "event" in line && line.event == "started" && "name" in line);
            testEvents.forEach(line => {
                const testParts = (line.name as string).split(/::|\$/g);
                const module = testParts.slice(0, testParts.length - 1).join('/');
                const name = testParts[testParts.length - 1];
                output.testFiles![module] ??= {
                    tests: []
                };
                output.testFiles![module].tests.push({
                    "id": line.name,
                    "name": line.name,
                });
            })
            continue;
        }
        const { file, span, replacement, genre } = outcome.scenario.Mutant;

        output.files[file] ??= {
            language: "rust",
            mutants: [],
            source: await Bun.file(file).text(),
        };
        const id = `${file}:${span.start.line}:${span.start.column}:${span.end.line}:${span.end.column}:${genre}:${replacement}`;
        const log = await Bun.file(outcome.log_path).text();
        const testEvents = log.split('\n').flatMap(line => {
            try {
                return [JSON.parse(line)];
            } catch {
                return [];
            }
        }).filter(line => typeof line == "object" && "type" in line && line.type == "test" && "event" in line && "name" in line);
        const failedTests = testEvents.filter(line => line.event == "failed");
        // const okTests = testEvents.filter(line => line.event == "ok").map(line => line.name);

        output.files[file].mutants.push({
            id,
            duration,
            mutatorName: genre,
            location: span,
            replacement,
            status: statusmap[outcome.summary],
            description: `Replace ${genre} by ${replacement}`,
            statusReason: failedTests[0]?.stdout || undefined,
            killedBy: failedTests.map(line => line.name),
        });
    }

    return output;
}

