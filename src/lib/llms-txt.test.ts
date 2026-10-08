import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { EDITORIAL_SITEMAP_PATHS } from "./editorial-urls";

describe("public/llms.txt", () => {
  const text = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

  it("uses the llmstxt.org outline and names the operator", () => {
    assert.match(text, /^# Decide Football\n/);
    assert.match(text, /^> Decide Football publishes fantasy football guides/m);
    assert.match(text, /Live player data is not licensed yet/);
    assert.match(text, /sample\/fixture/);
    assert.match(text, /not affiliated with the NFL/);
    assert.match(text, /^Operated by Joshua Israel Ventures LLC\.$/m);
    assert.match(text, /Decide Football is a brand of Joshua Israel Ventures LLC\./);
    assert.match(text, /^## Guides\n/m);
    assert.match(text, /^## About\n/m);
    assert.equal(text.includes("/llms.txt"), false);
  });

  it("links every indexable sitemap page once, and no other URL", () => {
    const links = [...text.matchAll(/\]\((https:\/\/decidefootball\.com[^)]+)\)/g)].map(
      (match) => match[1] ?? "",
    );
    const paths = links.map((url) => new URL(url).pathname);
    assert.deepEqual([...paths].sort(), [...EDITORIAL_SITEMAP_PATHS].sort());
    assert.equal(links.length, EDITORIAL_SITEMAP_PATHS.length);
    const [guides, afterGuides] = text.split("## About");
    assert.ok(guides?.includes("## Guides"));
    const [about, legal] = (afterGuides ?? "").split("## Legal");
    assert.equal(about?.includes("## Guides"), false);
    assert.match(legal ?? "", /https:\/\/decidefootball\.com\/terms\//);
    for (const path of EDITORIAL_SITEMAP_PATHS) {
      const section =
        path === "/about/" || path === "/methodology/"
          ? about
          : path.startsWith("/guide")
            ? guides
            : legal;
      assert.equal(
        section?.includes(`https://decidefootball.com${path}`),
        true,
        path,
      );
    }
    assert.equal(text.includes("](https://decidefootball.com/guide/):"), true);
  });
});