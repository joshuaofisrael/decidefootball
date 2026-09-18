import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { editorialSitemapEntries, EDITORIAL_SITEMAP_PATHS } from "./editorial-urls";
import { decideIndexation } from "./indexation";

describe("decideIndexation", () => {
  it("noindexes fixture sports pages even when the gate is GREEN", () => {
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
});

describe("editorialSitemapEntries", () => {
  it("lists about and methodology as absolute trailing-slash URLs", () => {
    const entries = editorialSitemapEntries();
    const urls = entries.map((row) => row.url);
    assert.deepEqual(
      EDITORIAL_SITEMAP_PATHS.slice(),
      ["/about/", "/methodology/"],
    );
    assert.ok(urls.some((url) => url.endsWith("/about/")));
    assert.ok(urls.some((url) => url.endsWith("/methodology/")));
    assert.equal(entries.length, 2);
    for (const url of urls) {
      assert.match(url, /^https?:\/\//);
      assert.ok(!url.includes("/players/"));
      assert.ok(!url.includes("jordan-voss"));
    }
  });
});
