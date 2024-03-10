
export async function html() {
    return Bun.readableStreamToText(Bun.file("report/mutant-report.html").stream());
}

export async function js() {
    const build = await Bun.build({
        "entrypoints": ["report/app.ts"],
        "target": "browser",
    })
    return build.outputs[0].text();
}
