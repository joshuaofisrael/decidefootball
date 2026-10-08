import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "../app/robots";
import {
  AI_SEARCH_USER_AGENTS,
  buildRobotsRules,
  EDITORIAL_ROBOTS_ALLOW,
  FIXTURE_CONTENT_DISALLOW,
  LEGAL_STUB_PATHS,
} from "./robots-policy";

describe("buildRobotsRules", () => {
  it("disallows the whole site when the gate forbids indexing", () => {
    const rules = buildRobotsRules({ allowIndexing: false, fixtureMode: true });
    assert.equal(rules.allow, undefined);
    assert.equal(rules.disallow, "/");
  });

  it("allows only the editorial cluster in fixture mode", () => {
    const rules = buildRobotsRules({ allowIndexing: true, fixtureMode: true });
    assert.deepEqual(rules.allow, [...EDITORIAL_ROBOTS_ALLOW, "/llms.txt"]);
    assert.deepEqual(rules.disallow, [...FIXTURE_CONTENT_DISALLOW]);
    const allow = rules.allow as string[];
    const disallow = rules.disallow as string[];
    for (const prefix of [
      "/players/",
      "/start-sit/",
      "/is-playing/",
      "/is-",
      "/injuries/",
      "/rankings/",
      "/waiver-wire/",
      "/add-drop/",
      "/week-",
      "/slate/",
      "/watchlist/",
      "/health/",
      "/api/",
    ]) {
      assert.ok(disallow.includes(prefix), `missing disallow ${prefix}`);
    }
    assert.deepEqual(allow, [
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
      "/llms.txt",
    ]);
    for (const path of allow) {
      for (const prefix of disallow) {
        assert.equal(
          path.startsWith(prefix),
          false,
          `${path} must not fall under disallow ${prefix}`,
        );
      }
    }
    assert.ok(disallow.includes("/waiver-wire/"));
    assert.ok(disallow.includes("/is-playing/"));
    assert.ok(disallow.includes("/is-"));
    assert.ok(disallow.includes("/injuries/"));
    assert.equal(
      allow.some((path) => path.startsWith("/waiver-wire/")),
      false,
    );
    assert.equal(allow.includes("/guide/"), true);
    assert.equal(allow.includes("/guide/listed-status/"), true);
    assert.equal(allow.includes("/guide/rankings/"), true);
    assert.equal(allow.includes("/guide/add-drop/"), true);
    assert.equal(allow.includes("/guide/toss-up/"), true);
    assert.equal(allow.includes("/guide/certainty/"), true);
    assert.equal(allow.includes("/add-drop/"), false);
    assert.equal(allow.includes("/start-sit/"), false);
    assert.equal("/guide/add-drop/".startsWith("/add-drop/"), false);
    assert.equal("/guide/toss-up/".startsWith("/start-sit/"), false);
    assert.equal("/guide/certainty/".startsWith("/start-sit/"), false);
    assert.equal(allow.includes("/rankings/"), false);
    assert.ok(disallow.includes("/rankings/"));
    assert.equal(
      allow.some(
        (path) =>
          path.startsWith("/is-playing/") ||
          path.startsWith("/is-") ||
          path.startsWith("/injuries/"),
      ),
      false,
    );
    for (const stub of LEGAL_STUB_PATHS) {
      assert.ok(!allow.includes(stub), `legal stub must not be Allow-listed: ${stub}`);
      assert.ok(
        !disallow.includes(stub),
        `legal stub must not be Disallowed so crawlers can see page noindex: ${stub}`,
      );
    }
  });

  it("restores a broad allow outside fixture mode", () => {
    const rules = buildRobotsRules({ allowIndexing: true, fixtureMode: false });
    assert.deepEqual(rules.allow, ["/", "/llms.txt"]);
    assert.deepEqual(rules.disallow, ["/api/", "/health/"]);
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
    for (const path of EDITORIAL_ROBOTS_ALLOW) {
      assert.ok(allow.includes(path), `missing allow ${path}`);
    }
    assert.deepEqual(rule.disallow, [...FIXTURE_CONTENT_DISALLOW]);
  });
});
