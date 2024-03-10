#!bun
import { transformReport } from './transform';
import { js, html } from '../report' with { type: "macro" };

const input = (await Bun.file("mutants.out/outcomes.json").json()) as unknown as LabOutcome;
const output = JSON.stringify(await transformReport(input), null, 2);

if (process.argv[2] === "serve") {
    const server = Bun.serve({
        async fetch(req) {
            const url = new URL(req.url);
            if (url.pathname === "/") return new Response(await html(), { headers: { "content-type": "text/html" } });
            if (url.pathname === "/mutant-report.js") return new Response(await js(), { headers: { "content-type": "application/javascript" } });
            if (url.pathname === "/report.json") return new Response(output, { headers: { "content-type": "application/json" } });
            return new Response("Not found", { status: 404 });
        }
    })
    console.log("Listening on %s", server.url);
}
else {
    await Bun.write("mutants.out/report.json", output);
    await Bun.write("mutants.out/report.html", await html());
    await Bun.write("mutants.out/mutant-report.js", await js());
}