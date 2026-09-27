import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
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

function cloudflareBeaconSnippet() {
  const src = readFileSync("src/lib/cloudflare-analytics.ts", "utf8");
  const match = src.match(/export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "([0-9a-f]+)";/);
  const token = match?.[1];
  if (token !== "9c4f710ff2a04acb99c29039ac218aea") {
    console.error("pages-postbuild: Cloudflare Web Analytics token missing or unexpected");
    process.exit(1);
  }
  return `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${token}"}'></script><!-- End Cloudflare Web Analytics -->`;
}

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(path, files);
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

function ensureCloudflareBeacon() {
  const snippet = cloudflareBeaconSnippet();
  const slot = `<div id="cf-web-analytics" hidden="">${snippet}</div>`;
  const executableRe =
    /<script type='module' src='https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js'[^>]*>\s*<\/script>/g;
  let kept = 0;
  let inserted = 0;
  for (const file of walkHtml(out)) {
    const html = readFileSync(file, "utf8");
    if (!html.includes("</body>")) continue;
    const slotCount = html.split(slot).length - 1;
    if (slotCount > 1) {
      console.error(`pages-postbuild: multiple beacon slots in ${file}`);
      process.exit(1);
    }
    let next = html;
    if (slotCount === 1) {
      // Leave the layout node in place. Moving it after Next's runtime scripts
      // makes the server HTML disagree with the client tree (React #418) and
      // the recovered tree emits a second beacon.
      kept += 1;
    } else {
      const idx = html.lastIndexOf("</body>");
      next = `${html.slice(0, idx)}${snippet}${html.slice(idx)}`;
      inserted += 1;
    }
    const executable = next.match(executableRe) ?? [];
    if (executable.length !== 1 || next.split(snippet).length !== 2 || !next.includes(snippet)) {
      console.error(`pages-postbuild: beacon was not present once in ${file}`);
      process.exit(1);
    }
    if (next !== html) writeFileSync(file, next);
  }
  if (kept + inserted === 0) {
    console.error("pages-postbuild: no HTML files received the Cloudflare beacon");
    process.exit(1);
  }
  console.log(
    `pages-postbuild: Cloudflare beacon kept in layout on ${kept} HTML files, inserted before </body> on ${inserted}`,
  );
}

ensureCloudflareBeacon();

console.log("pages-postbuild: wrote out/.nojekyll, out/CNAME, out/health.json, ads.txt, pretty is-playing URLs");
