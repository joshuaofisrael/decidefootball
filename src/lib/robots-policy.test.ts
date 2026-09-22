import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
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
    assert.deepEqual(rules.allow, [...EDITORIAL_ROBOTS_ALLOW]);
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
    assert.deepEqual(allow, ["/about/", "/methodology/", "/guide/start-sit/"]);
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
    assert.equal(rules.allow, "/");
    assert.deepEqual(rules.disallow, ["/api/", "/health/"]);
  });
});
