import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pageMetadata } from "./seo";
import { lastmodForPath } from "./sitemap-lastmod";
import {
  CITATION_HOSTS,
  WEEK_6_WAIVER,
  WEEKLY_WAIVER_PATH,
  WEEKLY_WAIVER_TITLE,
  WEEKLY_WAIVER_UPDATED,
  citationParts,
  weeklyWaiverBodies,
} from "./weekly-waiver";

describe("week 6 waiver note", () => {
  it("targets the week 6 waiver query and dates the note", () => {
    assert.equal(WEEK_6_WAIVER.path, "/waiver-radar/2026-week-6/");
    assert.equal(WEEKLY_WAIVER_PATH, WEEK_6_WAIVER.path);
    assert.equal(WEEKLY_WAIVER_TITLE, "Week 6 waiver wire pickups 2026");
    assert.equal(WEEK_6_WAIVER.h1, "Week 6 fantasy waiver pickups");
    assert.equal(WEEKLY_WAIVER_UPDATED, "2026-10-14");
    assert.equal(WEEK_6_WAIVER.updated, WEEKLY_WAIVER_UPDATED);
    assert.equal(WEEK_6_WAIVER.week, 6);
    const page = readFileSync("src/app/waiver-radar/2026-week-6/page.tsx", "utf8");
    assert.match(page, /lastModified: "2026-10-14"/);
    assert.match(page, /waiver wire/);
    assert.equal(lastmodForPath(WEEKLY_WAIVER_PATH), "2026-10-14");
  });

  it("indexes the editorial page", () => {
    const meta = pageMetadata({
      path: WEEKLY_WAIVER_PATH,
      title: WEEKLY_WAIVER_TITLE,
      description: WEEK_6_WAIVER.description,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.robots, "index,follow");
    assert.equal(meta.alternates?.canonical, WEEKLY_WAIVER_PATH);
  });

  it("names the four verified bye clubs and keeps a short add list", () => {
    assert.match(WEEK_6_WAIVER.byes, /Cincinnati Bengals/);
    assert.match(WEEK_6_WAIVER.byes, /Detroit Lions/);
    assert.match(WEEK_6_WAIVER.byes, /Miami Dolphins/);
    assert.match(WEEK_6_WAIVER.byes, /Minnesota Vikings/);
    const positions = new Set(WEEK_6_WAIVER.picks.map((pick) => pick.position));
    assert.equal(positions.has("QB"), true);
    assert.equal(positions.has("RB"), true);
    assert.equal(positions.has("WR"), true);
    assert.equal(positions.has("TE"), false);
    assert.match(WEEK_6_WAIVER.tightEnd, /T\.J\. Hockenson/);
    assert.match(WEEK_6_WAIVER.streaming, /No streaming defense or kicker/);
    for (const pick of WEEK_6_WAIVER.picks) {
      const sentences = pick.body.split(/(?<=\.)\s+/).filter((sentence) => sentence.length > 0);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, pick.name);
      if (pick.byeStash) assert.equal(pick.nextGame, undefined);
      else assert.ok(pick.nextGame);
    }
  });

  it("cites only https pages on the allowed hosts and publishes no FAAB percent", () => {
    const hrefs = new Set<string>();
    for (const body of weeklyWaiverBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of WEEK_6_WAIVER.sources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
      hrefs.add(source.href);
    }
    for (const href of hrefs) {
      assert.ok(
        WEEK_6_WAIVER.sources.some((source) => source.href === href),
        href,
      );
    }
    const blob = weeklyWaiverBodies().join("\n");
    assert.equal(/\d+\s*%/.test(blob), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.match(WEEK_6_WAIVER.opinion, /opinion/);
    assert.match(WEEK_6_WAIVER.opinion, /not publishing a FAAB percent/i);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook/i.test(blob), false);
  });
});
