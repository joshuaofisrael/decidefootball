import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  LISTED_STATUS_DESCRIPTION,
  LISTED_STATUS_FAQS,
  LISTED_STATUS_H1,
  LISTED_STATUS_PATH,
  LISTED_STATUS_SOURCES,
  LISTED_STATUS_TABLE,
  LISTED_STATUS_TITLE,
} from "./listed-status-guide";
import { faqPageJsonLd, pageMetadata } from "./seo";

describe("listed status guide copy", () => {
  it("aims the title and H1 at the generic injury-designation query", () => {
    assert.ok(
      LISTED_STATUS_TITLE.length <= 65,
      `title is ${LISTED_STATUS_TITLE.length} characters`,
    );
    assert.equal(LISTED_STATUS_H1, LISTED_STATUS_TITLE);
    assert.match(LISTED_STATUS_TITLE, /Questionable/);
    assert.match(LISTED_STATUS_TITLE, /Doubtful/);
    assert.match(LISTED_STATUS_TITLE, /Out/);
    assert.equal(LISTED_STATUS_PATH, "/guide/listed-status/");
  });

  it("describes the generic question in the meta description", () => {
    assert.ok(LISTED_STATUS_DESCRIPTION.length <= 160);
    assert.match(LISTED_STATUS_DESCRIPTION, /Questionable/);
    assert.match(LISTED_STATUS_DESCRIPTION, /Doubtful/);
    assert.match(LISTED_STATUS_DESCRIPTION, /Out/);
    assert.match(LISTED_STATUS_DESCRIPTION, /injured reserve/i);
    assert.match(LISTED_STATUS_DESCRIPTION, /inactive/i);
    assert.match(LISTED_STATUS_DESCRIPTION, /fantasy lineup/);
    assert.doesNotMatch(LISTED_STATUS_DESCRIPTION, /jordan|noah|crowe|voss/i);
  });

  it("answers with the six designations people ask about", () => {
    assert.deepEqual(
      LISTED_STATUS_TABLE.map((row) => row.designation),
      [
        "Questionable",
        "Doubtful",
        "Out",
        "IR (injured reserve)",
        "Inactive",
        "Not listed",
      ],
    );
    for (const row of LISTED_STATUS_TABLE) {
      assert.ok(row.league.length > 10);
      assert.ok(row.lineup.length > 10);
    }
  });

  it("puts only on-page generic questions into FAQPage JSON-LD", () => {
    const data = faqPageJsonLd([...LISTED_STATUS_FAQS]);
    const names = data.mainEntity.map((row) => row.name);
    assert.equal(data["@type"], "FAQPage");
    assert.equal(names.length, LISTED_STATUS_FAQS.length);
    assert.ok(names.some((name) => /Questionable/.test(name) && /Out/.test(name)));
    assert.ok(names.some((name) => /not on the injury report/i.test(name)));
    assert.ok(names.some((name) => /Out and inactive/i.test(name)));
    assert.ok(names.some((name) => /injured reserve/i.test(name)));
    assert.ok(names.some((name) => /Sunday game/i.test(name)));
    assert.ok(names.some((name) => /50\/50/.test(name)));
    assert.ok(names.some((name) => /Decide Football/.test(name)));
    for (const item of LISTED_STATUS_FAQS) {
      assert.equal(
        data.mainEntity.find((row) => row.name === item.question)?.acceptedAnswer.text,
        item.answer,
      );
    }
  });

  it("cites NFL.com and NFL Football Operations for the league facts", () => {
    const urls = LISTED_STATUS_SOURCES.map((source) => source.url);
    assert.ok(
      urls.includes(
        "https://www.nfl.com/news/competition-committee-approves-revisions-to-injury-report-0ap3000000688693",
      ),
    );
    assert.ok(urls.includes("https://operations.nfl.com/calendar-events/nfl-important-dates"));
    assert.ok(
      urls.includes(
        "https://operations.nfl.com/game-operations-logistics/preparation-safety/game-and-stadium-prep",
      ),
    );
    assert.ok(
      urls.includes("https://www.nfl.com/news/2026-27-national-football-league-important-dates"),
    );
    for (const url of urls) {
      assert.match(url, /^https:\/\/(www\.nfl\.com|operations\.nfl\.com)\//);
    }
  });

  it("sets the same title and description on the document and Open Graph", () => {
    const meta = pageMetadata({
      path: LISTED_STATUS_PATH,
      title: LISTED_STATUS_TITLE,
      description: LISTED_STATUS_DESCRIPTION,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.title, LISTED_STATUS_TITLE);
    assert.equal(meta.description, LISTED_STATUS_DESCRIPTION);
    assert.equal(meta.robots, "index,follow");
    const og = meta.openGraph;
    assert.ok(og && !Array.isArray(og));
    if (!og || Array.isArray(og)) return;
    assert.equal(og.title, LISTED_STATUS_TITLE);
    assert.equal(og.description, LISTED_STATUS_DESCRIPTION);
    assert.equal(og.url, "/guide/listed-status/");
  });
});
