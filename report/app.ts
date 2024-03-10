import { MutationTestReportAppComponent } from "mutation-testing-elements";
import "prismjs/components/prism-rust";
import type { MutationTestResult } from "mutation-testing-report-schema";

async function mount() {
  const app = new MutationTestReportAppComponent();
  app.report = (await fetch("report.json").then((r) =>
    r.json()
  )) as MutationTestResult;
  app["id"] = "app";

  document.getElementById("app")?.replaceWith(app as Node);
}

void mount();
