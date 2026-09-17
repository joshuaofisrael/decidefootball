import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";

function publisherIdFromClient(clientId) {
  const match = String(clientId ?? "").trim().match(/pub-\d+/);
  return match ? match[0] : null;
}

function adsTxtBody(clientId, enabled) {
  const pub = clientId ? publisherIdFromClient(clientId) : null;
  if (enabled && pub) {
    return `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  }
  return `# Decide Football ads.txt template
# Display ads are off unless NEXT_PUBLIC_ADS_ENABLED=true and
# NEXT_PUBLIC_ADSENSE_CLIENT_ID is set at export time.
# Do not invent a publisher ID. When configured, this file becomes:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
}

function writeAdsTxt() {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
  writeFileSync(join(out, "ads.txt"), adsTxtBody(client, enabled));
}

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

writeAdsTxt();

console.log("pages-postbuild: wrote out/.nojekyll, out/CNAME, out/health.json, ads.txt, pretty is-playing URLs");
