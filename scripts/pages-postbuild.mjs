import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";

if (!existsSync(join(out, "index.html"))) {
  console.error("pages-postbuild: out/index.html missing. next build did not export.");
  process.exit(1);
}

writeFileSync(join(out, ".nojekyll"), "");

if (existsSync("public/CNAME")) {
  copyFileSync("public/CNAME", join(out, "CNAME"));
} else {
  console.error("pages-postbuild: public/CNAME missing.");
  process.exit(1);
}

writeFileSync(
  join(out, "health.json"),
  `${JSON.stringify(
    {
      ok: true,
      service: "decidefootball",
      complianceGate: process.env.COMPLIANCE_GATE ?? "GREEN",
      fixtureMode: true,
      host: "github-pages",
      renderedAt: new Date().toISOString(),
    },
    null,
    2,
  )}\n`,
);

const isPlayingDir = join(out, "is-playing");
if (existsSync(isPlayingDir)) {
  for (const entry of readdirSync(isPlayingDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dest = join(out, `is-${entry.name}-playing-today`);
    mkdirSync(dest, { recursive: true });
    cpSync(join(isPlayingDir, entry.name), dest, { recursive: true });
  }
}

console.log("pages-postbuild: wrote out/.nojekyll, out/CNAME, out/health.json, pretty is-playing URLs");
