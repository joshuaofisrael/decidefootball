import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  editorialSitemapEntries,
  EDITORIAL_SITEMAP_PATHS,
  LEGAL_STUB_PATHS,
} from "./editorial-urls";
import { indexableSitemapEntries, indexableSitemapPaths, WAIVER_DESK_PATH } from "./indexable-urls";
import { decideIndexation } from "./indexation";
import { EDITORIAL_ROBOTS_ALLOW, NON_PAGE_DISALLOW } from "./robots-policy";

describe("decideIndexation", () => {
  it("indexes sample sports pages", () => {
    const decision = decideIndexation({ sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "index");
    assert.equal(decision.robots, "index,follow");
  });

  it("indexes the homepage the same way as other sample desks", () => {
    const decision = decideIndexation({ sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "index");
    assert.equal(decision.robots, "index,follow");
  });

  it("indexes editorial pages without a licensed sports source", () => {
    const decision = decideIndexation({ kind: "editorial" });
    assert.equal(decision.indexation, "index");
    assert.equal(decision.robots, "index,follow");
  });

  it("does not let fixture sourceClass override editorial kind", () => {
    const decision = decideIndexation({ kind: "editorial", sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "index");
  });

  it("noindexes a redirect stub", () => {
    const decision = decideIndexation({ redirectStub: true, sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "noindex");
    assert.equal(decision.robots, "noindex,follow");
  });

  it("noindexes draft legal shells until placeholders are gone", () => {
    const decision = decideIndexation({ sourceClass: "GREEN", draftLegal: true });
    assert.equal(decision.indexation, "noindex");
    assert.equal(decision.robots, "noindex,follow");
  });
});

describe("editorialSitemapEntries", () => {
  it("lists the editorial cluster, including the cookie notice, as absolute trailing-slash URLs", () => {
    const entries = editorialSitemapEntries();
    const urls = entries.map((row) => row.url);
    assert.deepEqual(EDITORIAL_SITEMAP_PATHS.slice(), [
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
      "/guide/college-football-playoff-2026-schedule-how-to-watch/",
      "/guide/bowl-schedule-2026-how-to-watch/",
      "/guide/christmas-nfl-how-to-watch/",
      "/guide/nfl-playoffs-2027-schedule-how-to-watch/",
      "/waiver-radar/2026-week-6/",
      "/waiver-radar/2026-week-7/",
      "/waiver-radar/2026-week-8/",
      "/start-sit/2026-week-6/",
      "/start-sit/2026-week-7/",
      "/start-sit/2026-week-8/",
      "/terms/",
      "/privacy/",
      "/disclaimer/",
      "/contact/",
      "/contact/thanks/",
      "/cookies/",
    ]);
    assert.deepEqual([...EDITORIAL_SITEMAP_PATHS], [...EDITORIAL_ROBOTS_ALLOW]);
    assert.equal(entries.length, EDITORIAL_SITEMAP_PATHS.length);
    for (const url of urls) {
      assert.match(url, /^https?:\/\//);
      assert.ok(url.endsWith("/"));
    }
  });
});

describe("indexableSitemapEntries", () => {
  it("lists every real page and omits redirect stubs", () => {
    const paths = indexableSitemapPaths();
    const urls = indexableSitemapEntries().map((row) => row.url);
    assert.equal(paths.length, 70);
    assert.equal(urls.length, paths.length);
    assert.equal(paths[0], "/");
    for (const path of EDITORIAL_SITEMAP_PATHS) {
      assert.ok(paths.includes(path), path);
    }
    for (const path of [
      "/rankings/",
      "/start-sit/",
      "/add-drop/",
      WAIVER_DESK_PATH,
      "/players/",
      "/players/jordan-voss/",
      "/injuries/jordan-voss/",
      "/is-jordan-voss-playing-today/",
      "/is-playing/",
      "/slate/",
      "/watchlist/",
      "/health/",
      "/week-3/rb-rankings/",
      "/start-sit/jordan-voss-vs-noah-crowe/",
      "/add-drop/kai-benton-vs-amir-cole/",
    ]) {
      assert.ok(paths.includes(path), `missing ${path}`);
    }
    assert.equal(paths.includes("/waiver-wire/"), false);
    assert.equal(paths.includes("/waiver-wire/week-3/"), false);
    assert.equal(paths.includes("/start-sit/noah-crowe-vs-jordan-voss/"), false);
    assert.equal(paths.includes("/rankings/3/rb/"), false);
    assert.equal(paths.includes("/is-playing/jordan-voss/"), false);
    assert.equal(paths.includes("/llms.txt"), false);
    const seen = new Set<string>();
    for (const path of paths) {
      assert.equal(seen.has(path), false, `duplicate ${path}`);
      seen.add(path);
      assert.ok(path.endsWith("/") || path === "/");
      for (const prefix of NON_PAGE_DISALLOW) {
        assert.equal(path.startsWith(prefix), false, path);
      }
      for (const stub of LEGAL_STUB_PATHS) {
        assert.ok(!path.includes(stub));
      }
    }
    for (const url of urls) {
      assert.match(url, /^https:\/\/decidefootball\.com\//);
      assert.equal(new URL(url).pathname, paths[urls.indexOf(url)]);
    }
  });
});
