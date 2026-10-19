import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pageMetadata } from "./seo";
import { lastmodForPath } from "./sitemap-lastmod";
import {
  CITATION_HOSTS,
  WEEK_6_START_SIT,
  WEEKLY_START_SIT_PATH,
  WEEKLY_START_SIT_TITLE,
  WEEKLY_START_SIT_UPDATED,
  citationParts,
  proseSentences,
  weeklyStartSitBodies,
} from "./weekly-start-sit";

describe("week 6 start/sit note", () => {
  it("targets the week 6 start/sit query and dates the note", () => {
    assert.equal(WEEK_6_START_SIT.path, "/start-sit/2026-week-6/");
    assert.equal(WEEKLY_START_SIT_PATH, WEEK_6_START_SIT.path);
    assert.equal(WEEKLY_START_SIT_TITLE, "Week 6 start sit 2026");
    assert.match(WEEK_6_START_SIT.h1, /who to start/i);
    assert.match(WEEK_6_START_SIT.h1, /week 6/i);
    assert.match(WEEK_6_START_SIT.description, /who to start/i);
    assert.match(WEEK_6_START_SIT.description, /week 6 start sit 2026/i);
    assert.equal(WEEKLY_START_SIT_UPDATED, "2026-10-15");
    assert.equal(WEEK_6_START_SIT.updated, WEEKLY_START_SIT_UPDATED);
    assert.equal(WEEK_6_START_SIT.week, 6);
    const page = readFileSync("src/app/start-sit/2026-week-6/page.tsx", "utf8");
    assert.match(page, /lastModified: "2026-10-15"/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/start-sit\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-6\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.equal(lastmodForPath(WEEKLY_START_SIT_PATH), "2026-10-15");
  });

  it("indexes the editorial page", () => {
    const meta = pageMetadata({
      path: WEEKLY_START_SIT_PATH,
      title: WEEKLY_START_SIT_TITLE,
      description: WEEK_6_START_SIT.description,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.robots, "index,follow");
    assert.equal(meta.alternates?.canonical, WEEKLY_START_SIT_PATH);
  });

  it("names the four verified bye clubs and keeps short cited cards", () => {
    assert.match(WEEK_6_START_SIT.byes, /Cincinnati Bengals/);
    assert.match(WEEK_6_START_SIT.byes, /Detroit Lions/);
    assert.match(WEEK_6_START_SIT.byes, /Miami Dolphins/);
    assert.match(WEEK_6_START_SIT.byes, /Minnesota Vikings/);
    assert.equal(WEEK_6_START_SIT.byeClubs.length, 4);
    const names = WEEK_6_START_SIT.picks.map((pick) => pick.name);
    assert.ok(names.includes("Zach Charbonnet"));
    assert.ok(names.includes("Emanuel Wilson"));
    assert.equal(
      WEEK_6_START_SIT.picks.find((pick) => pick.name === "Zach Charbonnet")?.call,
      "sit",
    );
    assert.equal(
      WEEK_6_START_SIT.picks.find((pick) => pick.name === "Emanuel Wilson")?.call,
      "start",
    );
    for (const club of WEEK_6_START_SIT.byeClubs) {
      const sentences = proseSentences(club.body);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, club.club);
    }
    for (const pick of WEEK_6_START_SIT.picks) {
      const sentences = proseSentences(pick.body);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, `${pick.name}: ${sentences.length}`);
      assert.ok(pick.nextGame);
    }
  });

  it("cites only https pages on the allowed hosts and publishes no projection or betting line", () => {
    const hrefs = new Set<string>();
    for (const body of weeklyStartSitBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of WEEK_6_START_SIT.sources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
      hrefs.add(source.href);
    }
    for (const href of hrefs) {
      assert.ok(
        WEEK_6_START_SIT.sources.some((source) => source.href === href),
        href,
      );
    }
    const blob = weeklyStartSitBodies().join("\n");
    assert.equal(/\d+\s*%/.test(blob), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.match(WEEK_6_START_SIT.opinion, /editorial opinion/);
    assert.match(WEEK_6_START_SIT.opinion, /not publishing a point projection/i);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook|moneyline/i.test(blob), false);
  });
});
