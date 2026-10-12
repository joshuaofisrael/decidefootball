import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "../app/robots";
import {
  AI_SEARCH_USER_AGENTS,
  buildRobotsRules,
  EDITORIAL_ROBOTS_ALLOW,
  LEGAL_STUB_PATHS,
  NON_PAGE_DISALLOW,
} from "./robots-policy";

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
    const body = robots();
    const rule = Array.isArray(body.rules) ? body.rules[0] : body.rules;
    assert.ok(rule);
    assert.deepEqual(rule.userAgent, ["*", ...AI_SEARCH_USER_AGENTS]);
    assert.equal(Array.isArray(body.rules), false);
    assert.equal(body.sitemap, "https://decidefootball.com/sitemap.xml");
    const allow = rule.allow;
    assert.ok(Array.isArray(allow));
    assert.ok(allow.includes("/llms.txt"));
    assert.ok(allow.includes("/"));
    for (const path of EDITORIAL_ROBOTS_ALLOW) {
      assert.ok(allow.includes(path), `missing allow ${path}`);
    }
    assert.deepEqual(rule.disallow, [...NON_PAGE_DISALLOW]);
  });
});
