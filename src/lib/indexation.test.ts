import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  editorialSitemapEntries,
  EDITORIAL_SITEMAP_PATHS,
  LEGAL_STUB_PATHS,
} from "./editorial-urls";
import { decideIndexation } from "./indexation";
import { EDITORIAL_ROBOTS_ALLOW, FIXTURE_CONTENT_DISALLOW } from "./robots-policy";

describe("decideIndexation", () => {
  it("noindexes fixture sports pages even when the gate is GREEN", () => {
    const decision = decideIndexation({ sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "noindex");
    assert.equal(decision.robots, "noindex,follow");
  });

  it("noindexes the homepage fixture hub the same way as other sports pages", () => {
    const decision = decideIndexation({ sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "noindex");
    assert.equal(decision.robots, "noindex,follow");
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

  it("noindexes draft legal shells until placeholders are gone", () => {
    const decision = decideIndexation({ sourceClass: "GREEN", draftLegal: true });
    assert.equal(decision.indexation, "noindex");
    assert.equal(decision.robots, "noindex,follow");
  });
});

describe("editorialSitemapEntries", () => {
  it("lists the editorial cluster as absolute trailing-slash URLs", () => {
    const entries = editorialSitemapEntries();
    const urls = entries.map((row) => row.url);
    assert.deepEqual(EDITORIAL_SITEMAP_PATHS.slice(), [
      "/about/",
      "/methodology/",
      "/guide/start-sit/",
      "/guide/waiver-radar/",
      "/guide/listed-status/",
    ]);
    assert.deepEqual([...EDITORIAL_SITEMAP_PATHS], [...EDITORIAL_ROBOTS_ALLOW]);
    assert.ok(urls.some((url) => url.endsWith("/about/")));
    assert.ok(urls.some((url) => url.endsWith("/methodology/")));
    assert.ok(urls.some((url) => url.endsWith("/guide/start-sit/")));
    assert.ok(urls.some((url) => url.endsWith("/guide/waiver-radar/")));
    assert.ok(urls.some((url) => url.endsWith("/guide/listed-status/")));
    assert.equal(entries.length, 5);
    assert.equal(
      urls.some((url) => url.includes("/waiver-wire/")),
      false,
    );
    assert.equal(
      urls.some((url) => url.includes("/is-playing/") || url.includes("/is-")),
      false,
    );
    assert.equal(
      urls.some((url) => url.includes("/injuries/")),
      false,
    );
    for (const url of urls) {
      assert.match(url, /^https?:\/\//);
      const path = new URL(url).pathname;
      for (const prefix of FIXTURE_CONTENT_DISALLOW) {
        assert.equal(
          path.startsWith(prefix),
          false,
          `${path} must not match fixture prefix ${prefix}`,
        );
      }
      assert.ok(!url.includes("jordan-voss"));
      for (const stub of LEGAL_STUB_PATHS) {
        assert.ok(!url.includes(stub), `sitemap must not include legal stub ${stub}`);
      }
    }
  });
});
