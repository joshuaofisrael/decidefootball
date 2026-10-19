import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pageMetadata } from "./seo";
import { lastmodForPath } from "./sitemap-lastmod";
import { citationParts } from "./weekly-waiver";
import {
  WEEK_7_CITATION_HOSTS,
  WEEK_7_WAIVER,
  WEEK_7_WAIVER_PATH,
  WEEK_7_WAIVER_TITLE,
  WEEK_7_WAIVER_UPDATED,
  week7WaiverBodies,
} from "./weekly-waiver-week-7";

describe("week 7 waiver note", () => {
  it("targets the week 7 waiver query and dates the note", () => {
    assert.equal(WEEK_7_WAIVER.path, "/waiver-radar/2026-week-7/");
    assert.equal(WEEK_7_WAIVER_PATH, WEEK_7_WAIVER.path);
    assert.equal(WEEK_7_WAIVER_TITLE, "Week 7 waiver wire pickups 2026");
    assert.equal(WEEK_7_WAIVER.h1, "Week 7 fantasy waiver pickups");
    assert.equal(WEEK_7_WAIVER_UPDATED, "2026-10-18");
    assert.equal(WEEK_7_WAIVER.updated, WEEK_7_WAIVER_UPDATED);
    assert.equal(WEEK_7_WAIVER.week, 7);
    const page = readFileSync("src/app/waiver-radar/2026-week-7/page.tsx", "utf8");
    assert.match(page, /lastModified: "2026-10-18"/);
    assert.match(page, /waiver wire/);
    assert.match(page, /faqPageJsonLd/);
    assert.match(page, /href="\/waiver-radar\/2026-week-6\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-6\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.match(page, /href="\/guide\/waiver-radar\/"/);
    assert.match(page, /href="\/guide\/add-drop\/"/);
    assert.match(page, /href="\/add-drop\/"/);
    assert.equal(page.includes("/waiver-wire/"), false);
    assert.equal(lastmodForPath(WEEK_7_WAIVER_PATH), "2026-10-18");
  });

  it("indexes the editorial page", () => {
    const meta = pageMetadata({
      path: WEEK_7_WAIVER_PATH,
      title: WEEK_7_WAIVER_TITLE,
      description: WEEK_7_WAIVER.description,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.robots, "index,follow");
    assert.equal(meta.alternates?.canonical, WEEK_7_WAIVER_PATH);
    assert.equal(meta.openGraph?.title, WEEK_7_WAIVER_TITLE);
    assert.equal(meta.openGraph?.description, WEEK_7_WAIVER.description);
  });

  it("names the four verified bye clubs and keeps a short add list", () => {
    assert.match(WEEK_7_WAIVER.byes, /Buffalo Bills/);
    assert.match(WEEK_7_WAIVER.byes, /Jacksonville Jaguars/);
    assert.match(WEEK_7_WAIVER.byes, /Los Angeles Chargers/);
    assert.match(WEEK_7_WAIVER.byes, /Washington Commanders/);
    assert.match(WEEK_7_WAIVER.reportGap, /Monday Night Football/);
    assert.match(WEEK_7_WAIVER.reportGap, /had not been played/);
    const positions = new Set(WEEK_7_WAIVER.picks.map((pick) => pick.position));
    assert.equal(positions.has("QB"), true);
    assert.equal(positions.has("RB"), true);
    assert.equal(positions.has("WR"), false);
    assert.equal(positions.has("TE"), false);
    assert.ok(WEEK_7_WAIVER.picks.length >= 5 && WEEK_7_WAIVER.picks.length <= 8);
    assert.match(WEEK_7_WAIVER.wideReceiver, /No wide receiver is listed/);
    assert.match(WEEK_7_WAIVER.tightEnd, /No tight end is listed/);
    assert.match(WEEK_7_WAIVER.streaming, /No streaming defense or kicker/);
    assert.equal(
      WEEK_7_WAIVER.picks.some((pick) => pick.byeStash),
      false,
    );
    for (const pick of WEEK_7_WAIVER.picks) {
      const sentences = pick.body.split(/(?<=\.)\s+/).filter((sentence) => sentence.length > 0);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, `${pick.name}: ${sentences.length}`);
      assert.ok(pick.nextGame, pick.name);
    }
    assert.equal(WEEK_7_WAIVER.faqs.length >= 3, true);
  });

  it("cites only https pages on the allowed hosts and publishes no FAAB percent", () => {
    const hrefs = new Set<string>();
    for (const body of week7WaiverBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(
          WEEK_7_CITATION_HOSTS.includes(url.host as (typeof WEEK_7_CITATION_HOSTS)[number]),
          url.host,
        );
        hrefs.add(part.href);
      }
    }
    for (const source of WEEK_7_WAIVER.sources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(
        WEEK_7_CITATION_HOSTS.includes(url.host as (typeof WEEK_7_CITATION_HOSTS)[number]),
        url.host,
      );
      hrefs.add(source.href);
    }
    for (const href of hrefs) {
      assert.ok(
        WEEK_7_WAIVER.sources.some((source) => source.href === href),
        href,
      );
    }
    const blob = week7WaiverBodies().join("\n");
    assert.equal(/\d+\s*%/.test(blob), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.match(WEEK_7_WAIVER.opinion, /opinion/);
    assert.match(WEEK_7_WAIVER.opinion, /not publishing a FAAB percent/i);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook|moneyline/i.test(blob), false);
  });
});
