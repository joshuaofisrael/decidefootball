import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pageMetadata } from "./seo";
import { lastmodForPath } from "./sitemap-lastmod";
import { citationParts } from "./weekly-waiver";
import {
  WEEK_8_CITATION_HOSTS,
  WEEK_8_WAIVER,
  WEEK_8_WAIVER_DESCRIPTION,
  WEEK_8_WAIVER_PATH,
  WEEK_8_WAIVER_TITLE,
  WEEK_8_WAIVER_UPDATED,
  week8WaiverBodies,
} from "./weekly-waiver-week-8";

describe("week 8 waiver note", () => {
  it("targets the week 8 waiver query and dates the note", () => {
    assert.equal(WEEK_8_WAIVER.path, "/waiver-radar/2026-week-8/");
    assert.equal(WEEK_8_WAIVER_PATH, WEEK_8_WAIVER.path);
    assert.equal(WEEK_8_WAIVER_TITLE, "Week 8 waiver wire pickups 2026");
    assert.equal(WEEK_8_WAIVER.h1, "Week 8 fantasy waiver pickups");
    assert.equal(WEEK_8_WAIVER_UPDATED, "2026-10-27");
    assert.equal(WEEK_8_WAIVER.updated, WEEK_8_WAIVER_UPDATED);
    assert.equal(WEEK_8_WAIVER.week, 8);
    assert.ok(WEEK_8_WAIVER_DESCRIPTION.length >= 140);
    assert.ok(WEEK_8_WAIVER_DESCRIPTION.length <= 160);
    const page = readFileSync("src/app/waiver-radar/2026-week-8/page.tsx", "utf8");
    assert.match(page, /lastModified: "2026-10-27"/);
    assert.match(page, /waiver wire/);
    assert.match(page, /articleJsonLd/);
    assert.match(page, /faqPageJsonLd/);
    assert.match(page, /href="\/waiver-radar\/2026-week-7\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-6\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-6\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.match(page, /href="\/guide\/waiver-radar\/"/);
    assert.match(page, /href="\/guide\/add-drop\/"/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/guide\/listed-status\/"/);
    assert.match(page, /href="\/add-drop\/"/);
    assert.equal(page.includes("/waiver-wire/"), false);
    assert.equal(lastmodForPath(WEEK_8_WAIVER_PATH), "2026-10-27");
    const week7 = readFileSync("src/app/waiver-radar/2026-week-7/page.tsx", "utf8");
    assert.match(week7, /href="\/waiver-radar\/2026-week-8\/"/);
  });

  it("indexes the editorial page", () => {
    const meta = pageMetadata({
      path: WEEK_8_WAIVER_PATH,
      title: WEEK_8_WAIVER_TITLE,
      description: WEEK_8_WAIVER.description,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.robots, "index,follow");
    assert.equal(meta.alternates?.canonical, WEEK_8_WAIVER_PATH);
    assert.equal(meta.openGraph?.title, WEEK_8_WAIVER_TITLE);
    assert.equal(meta.openGraph?.description, WEEK_8_WAIVER.description);
  });

  it("names the four verified bye clubs and keeps a short add list", () => {
    assert.match(WEEK_8_WAIVER.byes, /Houston Texans/);
    assert.match(WEEK_8_WAIVER.byes, /New Orleans Saints/);
    assert.match(WEEK_8_WAIVER.byes, /New York Giants/);
    assert.match(WEEK_8_WAIVER.byes, /San Francisco 49ers/);
    assert.match(WEEK_8_WAIVER.reportGap, /Monday/);
    assert.match(WEEK_8_WAIVER.reportGap, /in progress/);
    const positions = new Set(WEEK_8_WAIVER.picks.map((pick) => pick.position));
    assert.equal(positions.has("QB"), true);
    assert.equal(positions.has("RB"), true);
    assert.equal(positions.has("WR"), true);
    assert.equal(positions.has("TE"), true);
    assert.ok(WEEK_8_WAIVER.picks.length >= 5 && WEEK_8_WAIVER.picks.length <= 9);
    assert.equal(
      WEEK_8_WAIVER.picks.filter((pick) => pick.byeStash).map((pick) => pick.name).join(","),
      "Woody Marks",
    );
    for (const pick of WEEK_8_WAIVER.picks) {
      const sentences = pick.body.split(/(?<=\.)\s+/).filter((sentence) => sentence.length > 0);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, `${pick.name}: ${sentences.length}`);
      if (pick.byeStash) assert.equal(pick.nextGame, undefined);
      else assert.ok(pick.nextGame, pick.name);
    }
    assert.equal(WEEK_8_WAIVER.faqs.length >= 3, true);
    assert.match(WEEK_8_WAIVER.drops, /Jalon Daniels/);
    assert.match(WEEK_8_WAIVER.drops, /Dameon Pierce/);
  });

  it("cites only https pages on the allowed hosts and keeps FAAB percents in the opinion", () => {
    const hrefs = new Set<string>();
    for (const body of week8WaiverBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(
          WEEK_8_CITATION_HOSTS.includes(url.host as (typeof WEEK_8_CITATION_HOSTS)[number]),
          url.host,
        );
        hrefs.add(part.href);
      }
    }
    for (const source of WEEK_8_WAIVER.sources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(
        WEEK_8_CITATION_HOSTS.includes(url.host as (typeof WEEK_8_CITATION_HOSTS)[number]),
        url.host,
      );
      hrefs.add(source.href);
    }
    for (const href of hrefs) {
      assert.ok(
        WEEK_8_WAIVER.sources.some((source) => source.href === href),
        href,
      );
    }
    const blob = week8WaiverBodies().join("\n");
    assert.match(WEEK_8_WAIVER.opinion, /opinion/);
    assert.match(WEEK_8_WAIVER.opinion, /\d+%/);
    for (const pick of WEEK_8_WAIVER.picks) {
      assert.equal(/\d+\s*%/.test(pick.body), false, pick.name);
    }
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook|moneyline|\bodds\b/i.test(blob), false);
    assert.equal(blob.includes("Joshua Israel"), false);
  });
});
