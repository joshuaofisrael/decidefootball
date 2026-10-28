import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { pageMetadata } from "./seo";
import { lastmodForPath } from "./sitemap-lastmod";
import {
  WEEK_8_START_SIT,
  WEEK_8_START_SIT_CITATION_HOSTS,
  WEEK_8_START_SIT_PATH,
  WEEK_8_START_SIT_TITLE,
  WEEK_8_START_SIT_UPDATED,
  citationParts,
  proseSentences,
  week8StartSitBodies,
} from "./weekly-start-sit-week-8";

describe("week 8 start/sit note", () => {
  it("targets the week 8 start/sit query and dates the note", () => {
    assert.equal(WEEK_8_START_SIT.path, "/start-sit/2026-week-8/");
    assert.equal(WEEK_8_START_SIT_PATH, WEEK_8_START_SIT.path);
    assert.equal(WEEK_8_START_SIT_TITLE, "Week 8 start sit 2026");
    assert.match(WEEK_8_START_SIT.h1, /who to start/i);
    assert.match(WEEK_8_START_SIT.h1, /week 8/i);
    assert.match(WEEK_8_START_SIT.description, /who to start/i);
    assert.match(WEEK_8_START_SIT.description, /week 8 start sit 2026/i);
    assert.equal(WEEK_8_START_SIT_UPDATED, "2026-10-28");
    assert.equal(WEEK_8_START_SIT.updated, WEEK_8_START_SIT_UPDATED);
    assert.equal(WEEK_8_START_SIT.week, 8);
    const page = readFileSync("src/app/start-sit/2026-week-8/page.tsx", "utf8");
    assert.match(page, /lastModified: "2026-10-28"/);
    assert.match(page, /faqPageJsonLd/);
    assert.match(page, /articleJsonLd/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/start-sit\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-6\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-8\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-7\/"/);
    assert.match(page, /Friday/);
    assert.equal(page.includes("/waiver-wire/"), false);
    assert.equal(lastmodForPath(WEEK_8_START_SIT_PATH), "2026-10-28");
  });

  it("indexes the editorial page", () => {
    const meta = pageMetadata({
      path: WEEK_8_START_SIT_PATH,
      title: WEEK_8_START_SIT_TITLE,
      description: WEEK_8_START_SIT.description,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.robots, "index,follow");
    assert.equal(meta.alternates?.canonical, WEEK_8_START_SIT_PATH);
    assert.equal(meta.openGraph?.title, WEEK_8_START_SIT_TITLE);
    assert.equal(meta.openGraph?.description, WEEK_8_START_SIT.description);
  });

  it("names the four verified bye clubs and keeps short cited cards", () => {
    assert.match(WEEK_8_START_SIT.byes, /Houston Texans/);
    assert.match(WEEK_8_START_SIT.byes, /New Orleans Saints/);
    assert.match(WEEK_8_START_SIT.byes, /New York Giants/);
    assert.match(WEEK_8_START_SIT.byes, /San Francisco 49ers/);
    assert.match(WEEK_8_START_SIT.reportGap, /Week 7/);
    assert.match(WEEK_8_START_SIT.reportGap, /Friday's final injury report/);
    assert.equal(WEEK_8_START_SIT.byeClubs.length, 4);
    assert.equal(WEEK_8_START_SIT.faqs.length >= 3, true);
    const names = WEEK_8_START_SIT.picks.map((pick) => pick.name);
    assert.ok(names.includes("Jalen Hurts"));
    assert.ok(names.includes("Tanner McKee"));
    assert.equal(
      WEEK_8_START_SIT.picks.find((pick) => pick.name === "Jalen Hurts")?.call,
      "sit",
    );
    assert.equal(
      WEEK_8_START_SIT.picks.find((pick) => pick.name === "Tanner McKee")?.call,
      "start",
    );
    for (const club of WEEK_8_START_SIT.byeClubs) {
      const sentences = proseSentences(club.body);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, `${club.club}: ${sentences.length}`);
    }
    for (const pick of WEEK_8_START_SIT.picks) {
      const sentences = proseSentences(pick.body);
      assert.ok(sentences.length >= 1 && sentences.length <= 3, `${pick.name}: ${sentences.length}`);
      assert.ok(pick.nextGame);
    }
  });

  it("cites only https pages on the allowed hosts and publishes no projection or betting line", () => {
    const hrefs = new Set<string>();
    for (const body of week8StartSitBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(
          WEEK_8_START_SIT_CITATION_HOSTS.includes(
            url.host as (typeof WEEK_8_START_SIT_CITATION_HOSTS)[number],
          ),
          url.host,
        );
        hrefs.add(part.href);
      }
    }
    for (const source of WEEK_8_START_SIT.sources) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(
        WEEK_8_START_SIT_CITATION_HOSTS.includes(
          url.host as (typeof WEEK_8_START_SIT_CITATION_HOSTS)[number],
        ),
        url.host,
      );
      hrefs.add(source.href);
    }
    for (const href of hrefs) {
      assert.ok(
        WEEK_8_START_SIT.sources.some((source) => source.href === href),
        href,
      );
    }
    const blob = week8StartSitBodies().join("\n");
    assert.equal(/\d+\s*%/.test(blob), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.match(WEEK_8_START_SIT.opinion, /editorial opinion/);
    assert.match(WEEK_8_START_SIT.opinion, /not publishing a point projection/i);
    assert.match(blob, /Friday's final injury report/);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook|moneyline/i.test(blob), false);
  });
});
