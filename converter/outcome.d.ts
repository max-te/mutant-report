type LabOutcome = {
    outcomes: ScenarioOutcome[]
    total_mutants: number
    missed: number
    caught: number
    timeout: number
    unviable: number
    success: number
    failure: number
}

type ScenarioOutcome =
    ({
        scenario: "Baseline"
        summary: BaselineSummary
    } |
    {
        scenario: { Mutant: Mutant }
        summary: MutantSummary
    }) & {
        log_path: string
        phase_results: PhaseResult[]
    }

type MutantSummary = "MissedMutant" | "CaughtMutant" | "Unviable" | "Timeout"
type BaselineSummary = "Success" | "Failure"

type Mutant = {
    package: string
    file: string
    function?: {
        function_name: string
        return_type: string
        span: SourceSpan
    }
    span: SourceSpan
    replacement: string
    genre: string
}

type SourceSpan = {
    start: SourcePosition
    end: SourcePosition
}
type SourcePosition = {
    line: number
    column: number
}

type PhaseResult = {
    phase: "Build" | "Test"
    duration: number
    process_status: unknown
    argv: string[]
}


