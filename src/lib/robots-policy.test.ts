import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import robots from "../app/robots";
import { pageMetadata } from "./seo";
import {
  AI_SEARCH_USER_AGENTS,
  buildRobotsRules,
  EDITORIAL_ROBOTS_ALLOW,
  LEGAL_STUB_PATHS,
  NON_PAGE_DISALLOW,
} from "./robots-policy";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

const EXPECTED_CRAWLERS = [
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
] as const;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

describe("buildRobotsRules", () => {
  it("disallows the whole site when the gate forbids indexing", () => {
    const rules = buildRobotsRules({ allowIndexing: false, fixtureMode: true });
    assert.equal(rules.allow, undefined);
    assert.equal(rules.disallow, "/");
  });

  it("allows real pages and keeps the editorial Allow lines", () => {
    const rules = buildRobotsRules({ allowIndexing: true, fixtureMode: true });
    assert.deepEqual(rules.allow, ["/", ...EDITORIAL_ROBOTS_ALLOW, "/llms.txt"]);
    assert.deepEqual(rules.disallow, [...NON_PAGE_DISALLOW]);
    const allow = rules.allow as string[];
    const disallow = rules.disallow as string[];
    assert.deepEqual(disallow, ["/api/"]);
    assert.equal(allow.includes("/"), true);
    assert.equal(allow.includes("/llms.txt"), true);
    assert.equal(allow.includes("/cookies/"), true);
    for (const path of [
      "/about/",
      "/methodology/",
      "/guide/",
      "/guide/start-sit/",
      "/guide/waiver-radar/",
      "/guide/listed-status/",
      "/guide/rankings/",
      "/guide/add-drop/",
      "/guide/toss-up/",
      "/guide/certainty/",
      "/guide/thanksgiving-nfl-how-to-watch/",
      "/terms/",
      "/privacy/",
      "/disclaimer/",
      "/contact/",
    ]) {
      assert.ok(allow.includes(path), `missing allow ${path}`);
    }
    for (const path of [
      "/players/",
      "/start-sit/",
      "/is-playing/",
      "/is-",
      "/injuries/",
      "/rankings/",
      "/waiver-radar/",
      "/add-drop/",
      "/week-",
      "/slate/",
      "/watchlist/",
      "/health/",
      "/cookies/",
    ]) {
      assert.equal(disallow.includes(path), false, `real page must not be disallowed: ${path}`);
    }
    for (const stub of LEGAL_STUB_PATHS) {
      assert.ok(!allow.includes(stub), `legal stub must not be Allow-listed: ${stub}`);
      assert.ok(!disallow.includes(stub), `legal stub must not be Disallowed: ${stub}`);
    }
  });

  it("keeps the same crawl rules outside fixture mode", () => {
    const rules = buildRobotsRules({ allowIndexing: true, fixtureMode: false });
    assert.deepEqual(rules.allow, ["/", ...EDITORIAL_ROBOTS_ALLOW, "/llms.txt"]);
    assert.deepEqual(rules.disallow, ["/api/"]);
  });

  it("names AI crawlers in the same group as the star agent", () => {
    assert.deepEqual([...AI_SEARCH_USER_AGENTS], [...EXPECTED_CRAWLERS]);
    const body = robots();
    const rule = Array.isArray(body.rules) ? body.rules[0] : body.rules;
    assert.ok(rule);
    assert.deepEqual(rule.userAgent, ["*", ...EXPECTED_CRAWLERS]);
    assert.equal(Array.isArray(body.rules), false);
    assert.equal(body.sitemap, "https://decidefootball.com/sitemap.xml");
    const allow = rule.allow;
    assert.ok(Array.isArray(allow));
    assert.equal(allow[0], "/");
    assert.ok(allow.includes("/llms.txt"));
    for (const path of EDITORIAL_ROBOTS_ALLOW) {
      assert.ok(allow.includes(path), `missing allow ${path}`);
    }
    assert.deepEqual(rule.disallow, ["/api/"]);
    assert.deepEqual(rule.disallow, [...NON_PAGE_DISALLOW]);
    const postbuild = readFileSync(join(ROOT, "scripts/pages-postbuild.mjs"), "utf8");
    const block = postbuild.match(/const AI_SEARCH_USER_AGENTS = \[([\s\S]*?)\];/);
    assert.ok(block);
    const agents = [...block[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(agents, [...EXPECTED_CRAWLERS]);
  });

  it("does not emit noai, noimageai, or an X-Robots-Tag header", () => {
    const token = /\bnoai\b|\bnoimageai\b|X-Robots-Tag/i;
    const files = [
      ...walk(join(ROOT, "src/app")),
      ...walk(join(ROOT, "src/components")),
      ...walk(join(ROOT, "src/lib")).filter((file) => !file.endsWith(".test.ts")),
      ...walk(join(ROOT, "public")),
      join(ROOT, "next.config.ts"),
    ];
    for (const file of files) {
      assert.equal(token.test(readFileSync(file, "utf8")), false, file);
    }
    for (const args of [
      { path: "/about/", title: "About", description: "Desk.", indexation: { kind: "editorial" as const } },
      { path: "/start-sit/", title: "Start", description: "Desk.", indexation: { sourceClass: "FIXTURE" as const } },
      { path: "/terms/", title: "Terms", indexation: { kind: "editorial" as const } },
    ]) {
      const robotsMeta = pageMetadata(args).robots;
      assert.equal(typeof robotsMeta, "string");
      assert.equal(token.test(String(robotsMeta)), false);
    }
  });
});
