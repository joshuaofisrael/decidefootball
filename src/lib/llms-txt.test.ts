import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { EDITORIAL_SITEMAP_PATHS } from "./editorial-urls";
import { indexableSitemapPaths } from "./indexable-urls";

describe("public/llms.txt", () => {
  const text = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");

  it("uses the llmstxt.org outline and names the operator", () => {
    assert.match(text, /^# Decide Football\n/);
    assert.match(text, /^> Decide Football publishes fantasy football guides/m);
    assert.match(text, /Live player data is not licensed yet/);
    assert.match(text, /sample\/fixture/);
    assert.match(text, /sample data for demonstrating the tool/);
    assert.match(text, /not live licensed NFL statistics/);
    assert.match(text, /not affiliated with the NFL/);
    assert.match(text, /^Operated by Joshua Israel Ventures LLC\.$/m);
    assert.match(text, /Decide Football is a brand of Joshua Israel Ventures LLC\./);
    assert.match(text, /^## Guides\n/m);
    assert.match(text, /^## Weekly notes\n/m);
    assert.match(text, /^## Sample desks\n/m);
    assert.match(text, /^## About\n/m);
    assert.match(text, /^## Legal\n/m);
    assert.equal(text.includes("/llms.txt"), false);
    assert.equal(/waiver[\s-]wire/i.test(text), false);
  });

  it("links every indexable sitemap page once, and no other URL", () => {
    const links = [...text.matchAll(/\]\((https:\/\/decidefootball\.com[^)]+)\)/g)].map(
      (match) => match[1] ?? "",
    );
    const paths = links.map((url) => new URL(url).pathname);
    assert.deepEqual([...paths].sort(), [...indexableSitemapPaths()].sort());
    assert.equal(links.length, indexableSitemapPaths().length);
    const [beforeAbout, afterAbout] = text.split("## About");
    const [beforeSample, sample] = (beforeAbout ?? "").split("## Sample desks");
    const [guides, weekly] = (beforeSample ?? "").split("## Weekly notes");
    const [about, legal] = (afterAbout ?? "").split("## Legal");
    assert.ok(guides?.includes("## Guides"));
    assert.equal(about?.includes("## Guides"), false);
    assert.equal(sample?.includes("## Guides"), false);
    assert.equal(weekly?.includes("## Guides"), false);
    assert.match(legal ?? "", /https:\/\/decidefootball\.com\/terms\//);
    assert.match(legal ?? "", /https:\/\/decidefootball\.com\/cookies\//);
    for (const path of indexableSitemapPaths()) {
      const section = path.startsWith("/guide")
        ? guides
        : path === "/about/" || path === "/methodology/"
          ? about
          : /^\/(?:waiver-radar|start-sit)\/\d{4}-week-\d+\/$/.test(path)
            ? weekly
            : EDITORIAL_SITEMAP_PATHS.includes(path as (typeof EDITORIAL_SITEMAP_PATHS)[number])
              ? legal
              : sample;
      assert.equal(
        section?.includes(`https://decidefootball.com${path === "/" ? "/" : path}`),
        true,
        path,
      );
    }
    assert.equal(text.includes("](https://decidefootball.com/guide/):"), true);
    assert.equal(text.includes("](https://decidefootball.com/):"), true);
    assert.equal(text.includes("https://decidefootball.com/waiver-radar/"), true);
    assert.equal(text.includes("waiver-wire"), false);
  });
});
