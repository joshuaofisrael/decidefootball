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
  "anthropic-ai",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
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
    "Allow: /",
    "Allow: /llms.txt",
    "Allow: /about/",
    "Allow: /methodology/",
    "Allow: /guide/",
    "Allow: /guide/start-sit/",
    "Allow: /guide/certainty/",
    "Allow: /guide/thanksgiving-nfl-how-to-watch/",
    "Allow: /terms/",
    "Allow: /privacy/",
    "Allow: /disclaimer/",
    "Allow: /contact/",
    "Allow: /cookies/",
    "Disallow: /api/",
  ]) {
    if (!rules.includes(required)) fail(`robots.txt missing ${required}`);
  }
  for (const blocked of [
    "Disallow: /players/",
    "Disallow: /start-sit/",
    "Disallow: /rankings/",
    "Disallow: /add-drop/",
    "Disallow: /waiver-radar/",
    "Disallow: /health/",
    "Disallow: /cookies/",
  ]) {
    if (rules.includes(blocked)) fail(`robots.txt still blocks a real page: ${blocked}`);
  }
  const disallows = rules.filter((line) => line.startsWith("Disallow: "));
  if (disallows.length !== 1 || disallows[0] !== "Disallow: /api/") {
    fail(`robots.txt must disallow only /api/: ${disallows.join(" | ")}`);
  }
  if (!rules.includes("Allow: /")) fail("robots.txt missing Allow: /");
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  if (sitemap.includes("llms.txt")) fail("sitemap.xml must list HTML pages only");
  const locs = sitemap.match(/<loc>[^<]+<\/loc>/g) ?? [];
  const mods = sitemap.match(/<lastmod>([^<]+)<\/lastmod>/g) ?? [];
  if (locs.length !== 61) fail(`sitemap has ${locs.length} urls, expected 61`);
  if (mods.length !== locs.length) fail("every sitemap url needs one lastmod");
  for (const tag of mods) {
    const value = tag.slice("<lastmod>".length, -"</lastmod>".length);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(`lastmod must be YYYY-MM-DD: ${value}`);
  }
}

function validateNoAiOptOut() {
  const token = /\bnoai\b|\bnoimageai\b|X-Robots-Tag/i;
  for (const file of walkHtml(out)) {
    const html = readFileSync(file, "utf8");
    if (token.test(html)) fail(`${file} includes noai, noimageai, or X-Robots-Tag`);
  }
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
  if (org.name !== "Joshua Israel Ventures LLC" || org.url !== "https://decidefootball.com/") {
    fail(`homepage Organization name/url: ${org.name} ${org.url}`);
  }
  if (org.legalName !== "Joshua Israel Ventures LLC") fail("homepage Organization legalName");
  if (org.brand?.["@type"] !== "Brand" || org.brand?.name !== "Decide Football") {
    fail("homepage Organization brand");
  }
  if (org.email || org.address) fail("homepage Organization invents contact");
  if (site.name !== "Decide Football" || site.url !== "https://decidefootball.com/") {
    fail(`homepage WebSite name/url: ${site.name} ${site.url}`);
  }
  if (
    site.publisher?.["@type"] !== "Organization" ||
    site.publisher?.name !== "Joshua Israel Ventures LLC" ||
    site.publisher?.["@id"] !== org["@id"]
  ) {
    fail("homepage WebSite publisher does not point at Joshua Israel Ventures LLC");
  }
  if (site.publisher?.brand?.["@type"] !== "Brand" || site.publisher?.brand?.name !== "Decide Football") {
    fail("homepage WebSite publisher brand");
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
    ["guide/thanksgiving-nfl-how-to-watch/index.html", true, true],
    ["waiver-radar/2026-week-6/index.html", false, false],
    ["start-sit/2026-week-6/index.html", false, false],
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
    if (article.publisher?.["@type"] !== "Organization" || article.publisher.name !== "Joshua Israel Ventures LLC") {
      fail(`${rel} Article publisher is not Joshua Israel Ventures LLC`);
    }
    if (article.publisher.legalName !== "Joshua Israel Ventures LLC") {
      fail(`${rel} Article publisher legalName`);
    }
    if (article.publisher.brand?.["@type"] !== "Brand" || article.publisher.brand?.name !== "Decide Football") {
      fail(`${rel} Article publisher brand`);
    }
    for (const block of blocks) assertNoInventedReview(rel, block);
    if (!html.includes('content="index,follow"')) fail(`${rel} editorial robots meta changed`);
  }

  const fixture = readFileSync(join(out, "start-sit/index.html"), "utf8");
  const fixtureBlocks = jsonLdBlocks("start-sit/index.html", fixture);
  if (fixtureBlocks.some((block) => block["@type"] === "Article")) {
    fail("fixture start/sit index must not gain Article JSON-LD");
  }
  if (!fixture.includes('content="index,follow"')) fail("fixture start/sit must be index,follow");
  if (!home.includes('content="index,follow"')) fail("homepage must be index,follow");
  assertSampleJsonLd("out/index.html", homeBlocks);
  assertSampleJsonLd("start-sit/index.html", fixtureBlocks);

  const desks = [
    "out/index.html",
    "out/start-sit/index.html",
    "out/add-drop/index.html",
    "out/rankings/index.html",
    "out/waiver-radar/index.html",
    "out/players/index.html",
    "out/slate/index.html",
    "out/watchlist/index.html",
    "out/is-playing/index.html",
  ];
  for (const rel of desks) {
    const html = readFileSync(join(rel.startsWith("out/") ? rel : join("out", rel)), "utf8");
    if (!html.includes("sample data for demonstrating the tool")) {
      fail(`${rel} is missing the visible sample-data label`);
    }
    if (!html.includes('content="index,follow"')) fail(`${rel} must be index,follow`);
    if (html.includes("noindex")) fail(`${rel} must not be noindex`);
  }

  for (const file of walkHtml(out)) {
    let html = readFileSync(file, "utf8");
    const rel = file.slice(out.length + 1);
    if (rel === "404/index.html" || rel === "404.html") {
      // Next injects noindex on the not-found document. That file is not a
      // real page. Replace it so the only noindex left is the waiver redirect.
      const next = html
        .replaceAll(
          '<meta name="robots" content="noindex"/>',
          '<meta name="robots" content="index,follow"/>',
        )
        .replaceAll('\\"content\\":\\"noindex\\"', '\\"content\\":\\"index,follow\\"');
      if (next !== html) writeFileSync(file, next);
      html = next;
    }
    const stub = rel.startsWith("waiver-wire/");
    if (stub) {
      if (!html.includes('content="noindex,follow"')) fail(`${rel} redirect stub must be noindex,follow`);
      if (!html.includes('rel="canonical" href="https://decidefootball.com/waiver-radar/"')) {
        fail(`${rel} redirect stub must canonical to /waiver-radar/`);
      }
      continue;
    }
    if (html.includes("noindex")) fail(`${rel} real page must not be noindex`);
  }
}

function assertSampleJsonLd(file, blocks) {
  const blob = JSON.stringify(blocks);
  if (/SportsEvent|live licensed|official statistics|Dataset/i.test(blob)) {
    fail(`${file} JSON-LD claims live or official statistics`);
  }
}

validateRobotsGroup();
validateJsonLd();
validateNoAiOptOut();

console.log("pages-postbuild: wrote out/.nojekyll, out/CNAME, out/health.json, ads.txt, pretty is-playing URLs");
console.log("pages-postbuild: validated robots.txt group and JSON-LD in the static export");
