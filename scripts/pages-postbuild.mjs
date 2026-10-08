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

const AI_SEARCH_USER_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
];

function fail(message) {
  console.error(`pages-postbuild: ${message}`);
  process.exit(1);
}

function validateRobotsGroup() {
  const robots = readFileSync(join(out, "robots.txt"), "utf8");
  const lines = robots.split(/\r?\n/).filter((line) => line.length > 0);
  const agents = [];
  let index = 0;
  while (index < lines.length && lines[index].startsWith("User-Agent: ")) {
    agents.push(lines[index].slice("User-Agent: ".length));
    index += 1;
  }
  const expected = ["*", ...AI_SEARCH_USER_AGENTS];
  if (agents.length !== expected.length || agents.some((agent, i) => agent !== expected[i])) {
    fail(`robots user-agents are not one shared group: ${agents.join(", ")}`);
  }
  const rules = [];
  while (index < lines.length && !lines[index].startsWith("Sitemap:")) {
    rules.push(lines[index]);
    index += 1;
  }
  if (rules.some((line) => !line.startsWith("Allow: ") && !line.startsWith("Disallow: "))) {
    fail(`robots group contains a non-rule line: ${rules.join(" | ")}`);
  }
  if (lines[index] !== "Sitemap: https://decidefootball.com/sitemap.xml" || index !== lines.length - 1) {
    fail("robots.txt must end with one Sitemap line for https://decidefootball.com/sitemap.xml");
  }
  for (const required of [
    "Allow: /llms.txt",
    "Allow: /about/",
    "Allow: /methodology/",
    "Allow: /guide/",
    "Allow: /guide/start-sit/",
    "Allow: /guide/certainty/",
    "Disallow: /players/",
    "Disallow: /start-sit/",
    "Disallow: /is-playing/",
    "Disallow: /is-",
    "Disallow: /week-",
    "Disallow: /api/",
    "Disallow: /rankings/",
    "Disallow: /add-drop/",
  ]) {
    if (!rules.includes(required)) fail(`robots.txt missing ${required}`);
  }
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  if (sitemap.includes("llms.txt")) fail("sitemap.xml must list HTML pages only");
}

function jsonLdBlocks(file, html) {
  const blocks = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(re)) {
    const raw = match[1].trim();
    try {
      blocks.push(JSON.parse(raw));
    } catch (error) {
      fail(`${file} JSON-LD did not parse: ${error instanceof Error ? error.message : error}`);
    }
  }
  if (blocks.length === 0) fail(`${file} has no JSON-LD`);
  return blocks;
}

function metaContent(html, attr, key) {
  const re = new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`, "i");
  const match = html.match(re);
  return match ? match[1].replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"') : "";
}

function assertNoInventedReview(file, block) {
  const blob = JSON.stringify(block);
  if (/"author"\s*:/.test(blob)) fail(`${file} JSON-LD invents an author`);
  if (block.dateModified || block.datePublished) fail(`${file} JSON-LD invents a date`);
  if (blob.includes("aggregateRating") || blob.includes('"Review"') || blob.includes('"review"')) {
    fail(`${file} JSON-LD invents a review or rating`);
  }
}

function validateJsonLd() {
  const home = readFileSync(join(out, "index.html"), "utf8");
  const homeBlocks = jsonLdBlocks("out/index.html", home);
  const homeTypes = homeBlocks.map((block) => block["@type"]);
  if (!homeTypes.includes("Organization") || !homeTypes.includes("WebSite")) {
    fail(`homepage JSON-LD types: ${homeTypes.join(", ")}`);
  }
  if (homeTypes.includes("Article")) fail("homepage must not be an Article");
  const org = homeBlocks.find((block) => block["@type"] === "Organization");
  const site = homeBlocks.find((block) => block["@type"] === "WebSite");
  if (org.name !== "Decide Football" || org.url !== "https://decidefootball.com/") {
    fail(`homepage Organization name/url: ${org.name} ${org.url}`);
  }
  if (org.legalName !== "Joshua Israel Ventures LLC") fail("homepage Organization legalName");
  if (site.name !== "Decide Football" || site.url !== "https://decidefootball.com/") {
    fail(`homepage WebSite name/url: ${site.name} ${site.url}`);
  }
  for (const block of homeBlocks) assertNoInventedReview("out/index.html", block);

  const editorial = [
    ["about/index.html", true, false],
    ["methodology/index.html", false, false],
    ["guide/index.html", false, true],
    ["guide/start-sit/index.html", true, false],
    ["guide/waiver-radar/index.html", true, false],
    ["guide/listed-status/index.html", true, false],
    ["guide/rankings/index.html", true, false],
    ["guide/add-drop/index.html", true, false],
    ["guide/toss-up/index.html", true, false],
    ["guide/certainty/index.html", true, false],
  ];
  for (const [rel, faq, itemList] of editorial) {
    const html = readFileSync(join(out, rel), "utf8");
    const blocks = jsonLdBlocks(rel, html);
    const types = blocks.map((block) => block["@type"]);
    for (const required of ["Article", "BreadcrumbList", "Organization", "WebSite"]) {
      if (!types.includes(required)) fail(`${rel} missing ${required}; has ${types.join(", ")}`);
    }
    if (faq && !types.includes("FAQPage")) fail(`${rel} missing FAQPage`);
    if (!faq && types.includes("FAQPage")) fail(`${rel} has an unexpected FAQPage`);
    if (itemList && !types.includes("ItemList")) fail(`${rel} missing ItemList`);
    const article = blocks.find((block) => block["@type"] === "Article");
    const ogTitle = metaContent(html, "property", "og:title");
    const description = metaContent(html, "name", "description");
    if (!ogTitle || article.headline !== ogTitle) {
      fail(`${rel} Article headline does not match og:title (${article.headline} vs ${ogTitle})`);
    }
    if (!description || article.description !== description) {
      fail(`${rel} Article description does not match meta description`);
    }
    if (article.publisher?.["@type"] !== "Organization" || article.publisher.name !== "Decide Football") {
      fail(`${rel} Article publisher is not the Decide Football Organization`);
    }
    if (article.publisher.legalName !== "Joshua Israel Ventures LLC") {
      fail(`${rel} Article publisher legalName`);
    }
    for (const block of blocks) assertNoInventedReview(rel, block);
    if (!html.includes('content="index,follow"')) fail(`${rel} editorial robots meta changed`);
  }

  const fixture = readFileSync(join(out, "start-sit/index.html"), "utf8");
  const fixtureBlocks = jsonLdBlocks("start-sit/index.html", fixture);
  if (fixtureBlocks.some((block) => block["@type"] === "Article")) {
    fail("fixture start/sit index must not gain Article JSON-LD");
  }
  if (!fixture.includes('content="noindex,follow"')) fail("fixture start/sit robots meta changed");
  if (!home.includes('content="noindex,follow"')) fail("homepage robots meta changed");
}

validateRobotsGroup();
validateJsonLd();

console.log("pages-postbuild: wrote out/.nojekyll, out/CNAME, out/health.json, ads.txt, pretty is-playing URLs");
console.log("pages-postbuild: validated robots.txt group and JSON-LD in the static export");
