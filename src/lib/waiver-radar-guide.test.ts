import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { faqPageJsonLd, pageMetadata } from "./seo";
import {
  WAIVER_RADAR_ARITHMETIC,
  WAIVER_RADAR_DESCRIPTION,
  WAIVER_RADAR_DIRECT_ANSWER,
  WAIVER_RADAR_FAQS,
  WAIVER_RADAR_H1,
  WAIVER_RADAR_PATH,
  WAIVER_RADAR_SOURCES,
  WAIVER_RADAR_TITLE,
  WAIVER_TYPE_TABLE,
} from "./waiver-radar-guide";

describe("waiver radar guide copy", () => {
  it("aims the title and H1 at how fantasy football waivers work", () => {
    assert.ok(WAIVER_RADAR_TITLE.length <= 65, `title is ${WAIVER_RADAR_TITLE.length} characters`);
    assert.equal(WAIVER_RADAR_H1, WAIVER_RADAR_TITLE);
    assert.match(WAIVER_RADAR_TITLE, /waivers work/);
    assert.match(WAIVER_RADAR_TITLE, /FAAB/);
    assert.equal(WAIVER_RADAR_PATH, "/guide/waiver-radar/");
    assert.doesNotMatch(WAIVER_RADAR_TITLE, /hot, rising/i);
  });

  it("describes the generic waiver question in the meta description", () => {
    assert.ok(WAIVER_RADAR_DESCRIPTION.length >= 140);
    assert.ok(WAIVER_RADAR_DESCRIPTION.length <= 160);
    assert.match(WAIVER_RADAR_DESCRIPTION, /rolling waiver priority/);
    assert.match(WAIVER_RADAR_DESCRIPTION, /reverse standings/);
    assert.match(WAIVER_RADAR_DESCRIPTION, /FAAB/);
    assert.match(WAIVER_RADAR_DESCRIPTION, /free agent/);
    assert.doesNotMatch(WAIVER_RADAR_DESCRIPTION, /jordan|noah|crowe|voss/i);
    assert.doesNotMatch(WAIVER_RADAR_DESCRIPTION, /hot, rising/i);
  });

  it("opens with a short direct answer and a three-type comparison", () => {
    const sentences = WAIVER_RADAR_DIRECT_ANSWER.split(/(?<=[.!?])\s+/).filter(Boolean);
    assert.ok(sentences.length >= 2 && sentences.length <= 4, `sentences: ${sentences.length}`);
    assert.match(WAIVER_RADAR_DIRECT_ANSWER, /free agent/i);
    assert.match(WAIVER_RADAR_DIRECT_ANSWER, /FAAB/);
    assert.match(WAIVER_RADAR_DIRECT_ANSWER, /depends on your league settings/);
    assert.doesNotMatch(WAIVER_RADAR_DIRECT_ANSWER, /this desk/i);
    assert.deepEqual(
      WAIVER_TYPE_TABLE.map((row) => row.type),
      ["Rolling waiver priority", "Reverse standings", "FAAB"],
    );
    for (const row of WAIVER_TYPE_TABLE) {
      assert.ok(row.order.length > 20);
      assert.ok(row.cost.length > 20);
      assert.ok(row.favors.length > 20);
    }
  });

  it("labels the budget split as arithmetic and does not invent a bid", () => {
    assert.match(WAIVER_RADAR_ARITHMETIC, /arithmetic/);
    assert.match(WAIVER_RADAR_ARITHMETIC, /\$40/);
    assert.match(WAIVER_RADAR_ARITHMETIC, /8 weeks/);
    assert.match(WAIVER_RADAR_ARITHMETIC, /\$5/);
    assert.match(WAIVER_RADAR_ARITHMETIC, /not a recommended bid/);
    assert.doesNotMatch(WAIVER_RADAR_ARITHMETIC, /\d+\s*%/);
    assert.doesNotMatch(WAIVER_RADAR_ARITHMETIC, /expert/i);
  });

  it("puts only on-page waiver questions into FAQPage JSON-LD", () => {
    const data = faqPageJsonLd([...WAIVER_RADAR_FAQS]);
    const names = data.mainEntity.map((row) => row.name);
    assert.equal(data["@type"], "FAQPage");
    assert.equal(names.length, WAIVER_RADAR_FAQS.length);
    assert.ok(names.some((name) => /How do fantasy football waivers work/.test(name)));
    assert.ok(names.some((name) => /rolling waivers and reverse standings/i.test(name)));
    assert.ok(names.some((name) => /What is FAAB/.test(name)));
    assert.ok(names.some((name) => /When do fantasy football waivers clear/.test(name)));
    assert.ok(names.some((name) => /bid \$0/.test(name)));
    assert.ok(names.some((name) => /remaining weeks/.test(name)));
    assert.ok(names.some((name) => /hot, rising, stash, and fade/.test(name)));
    for (const item of WAIVER_RADAR_FAQS) {
      assert.equal(
        data.mainEntity.find((row) => row.name === item.question)?.acceptedAnswer.text,
        item.answer,
      );
      assert.doesNotMatch(item.answer, /\d+\s*%/);
    }
  });

  it("cites ESPN, Yahoo, and Sleeper help pages and no unverified NFL settings page", () => {
    const urls = WAIVER_RADAR_SOURCES.map((source) => source.url);
    assert.ok(urls.includes("https://support.espn.com/hc/en-us/articles/360000041152-Waivers-Overview"));
    assert.ok(
      urls.includes(
        "https://support.espn.com/hc/en-us/articles/4669787227668-Waiver-Order-Overview-and-Free-Agent-Budget-Tiebreakers",
      ),
    );
    assert.ok(
      urls.includes(
        "https://help.yahoo.com/kb/fantasy-football/overview-waivers-fantasy-football-sln6427.html",
      ),
    );
    assert.ok(
      urls.includes("https://support.sleeper.com/en/articles/9656662-what-types-of-waivers-do-you-support"),
    );
    assert.ok(urls.includes("https://support.sleeper.com/en/articles/1876040-how-does-faab-bidding-work"));
    assert.ok(
      urls.includes("https://support.sleeper.com/en/articles/3978868-waivers-for-regular-season-playoffs"),
    );
    for (const url of urls) {
      assert.match(url, /^https:\/\/(support\.espn\.com|help\.yahoo\.com|support\.sleeper\.com)\//);
      assert.doesNotMatch(url, /support\.nfl\.com/);
    }
  });

  it("sets the same title and description on the document and Open Graph", () => {
    const meta = pageMetadata({
      path: WAIVER_RADAR_PATH,
      title: WAIVER_RADAR_TITLE,
      description: WAIVER_RADAR_DESCRIPTION,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.title, WAIVER_RADAR_TITLE);
    assert.equal(meta.description, WAIVER_RADAR_DESCRIPTION);
    assert.equal(meta.robots, "index,follow");
    const og = meta.openGraph;
    assert.ok(og && !Array.isArray(og));
    if (!og || Array.isArray(og)) return;
    assert.equal(og.title, WAIVER_RADAR_TITLE);
    assert.equal(og.description, WAIVER_RADAR_DESCRIPTION);
    assert.equal(og.url, "/guide/waiver-radar/");
  });
});
