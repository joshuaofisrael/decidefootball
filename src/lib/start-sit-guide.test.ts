import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { TOSS_UP_DELTA } from "./recommendations";
import { faqPageJsonLd, pageMetadata } from "./seo";
import {
  START_SIT_CHECKLIST,
  START_SIT_DESCRIPTION,
  START_SIT_DIRECT_ANSWER,
  START_SIT_FAQS,
  START_SIT_H1,
  START_SIT_LOCK,
  START_SIT_NOT,
  START_SIT_PATH,
  START_SIT_TITLE,
  START_SIT_TOSS_UP,
  START_SIT_WEEK_TABLE,
} from "./start-sit-guide";

const PLAYER_NAMES = /jordan|noah|crowe|voss/i;
const HOST_SETTINGS = /support\.espn\.com|help\.yahoo\.com|support\.sleeper\.com|support\.nfl\.com/i;

describe("start/sit guide copy", () => {
  it("aims the title and H1 at who to start using floor, mean, and ceiling", () => {
    assert.ok(START_SIT_TITLE.length >= 55, `title is ${START_SIT_TITLE.length} characters`);
    assert.ok(START_SIT_TITLE.length <= 65, `title is ${START_SIT_TITLE.length} characters`);
    assert.equal(START_SIT_H1, START_SIT_TITLE);
    assert.match(START_SIT_TITLE, /who to start/i);
    assert.match(START_SIT_TITLE, /floor/);
    assert.match(START_SIT_TITLE, /mean/);
    assert.match(START_SIT_TITLE, /ceiling/);
    assert.equal(START_SIT_PATH, "/guide/start-sit/");
    assert.doesNotMatch(START_SIT_TITLE, /how to read/i);
  });

  it("answers floor, mean, and ceiling in the meta description", () => {
    assert.ok(START_SIT_DESCRIPTION.length >= 140);
    assert.ok(START_SIT_DESCRIPTION.length <= 155);
    assert.match(START_SIT_DESCRIPTION, /[Ff]loor/);
    assert.match(START_SIT_DESCRIPTION, /mean/);
    assert.match(START_SIT_DESCRIPTION, /ceiling/);
    assert.match(START_SIT_DESCRIPTION, /protect a lead/);
    assert.doesNotMatch(START_SIT_DESCRIPTION, /Decide Football card/i);
    assert.doesNotMatch(START_SIT_DESCRIPTION, PLAYER_NAMES);
  });

  it("opens with floor, mean, ceiling, and a narrow gap as soft evidence", () => {
    const sentences = START_SIT_DIRECT_ANSWER.split(/(?<=[.!?])\s+/).filter(Boolean);
    assert.ok(sentences.length >= 2 && sentences.length <= 4, `sentences: ${sentences.length}`);
    assert.match(START_SIT_DIRECT_ANSWER, /[Ff]loor is the low end/);
    assert.match(START_SIT_DIRECT_ANSWER, /mean is the number used to rank/);
    assert.match(START_SIT_DIRECT_ANSWER, /ceiling is the high end/);
    assert.match(START_SIT_DIRECT_ANSWER, /protecting a lead/);
    assert.match(START_SIT_DIRECT_ANSWER, /upside/);
    assert.match(START_SIT_DIRECT_ANSWER, /narrow gap/);
    assert.match(START_SIT_DIRECT_ANSWER, /soft evidence/);
    assert.doesNotMatch(START_SIT_DIRECT_ANSWER, /this desk/i);
    assert.doesNotMatch(START_SIT_DIRECT_ANSWER, PLAYER_NAMES);
  });

  it("compares floor-first, mean-first, and ceiling-first weeks without player projections", () => {
    assert.deepEqual(
      START_SIT_WEEK_TABLE.map((row) => row.week),
      ["Floor-first week", "Mean-first week", "Ceiling-first week"],
    );
    for (const row of START_SIT_WEEK_TABLE) {
      assert.ok(row.optimize.length > 20);
      assert.ok(row.fits.length > 20);
      assert.ok(row.accept.length > 20);
      assert.doesNotMatch(`${row.optimize} ${row.fits} ${row.accept}`, PLAYER_NAMES);
      assert.doesNotMatch(`${row.optimize} ${row.fits} ${row.accept}`, /\d/);
    }
  });

  it("orders the Sunday-lock checklist and refuses a host clock", () => {
    assert.deepEqual(
      START_SIT_CHECKLIST.map((step) => step.title),
      [
        "Check the injury designation first",
        "Compare the means",
        "Read the range",
        "Apply the toss-up line",
        "Do not treat certainty as a win probability",
      ],
    );
    assert.equal(START_SIT_CHECKLIST[0]?.href, "/guide/listed-status/");
    assert.equal(START_SIT_CHECKLIST[3]?.href, "/guide/toss-up/");
    assert.equal(START_SIT_CHECKLIST[4]?.href, "/guide/certainty/");
    assert.match(START_SIT_CHECKLIST[3]?.detail ?? "", /1\.5/);
    assert.match(START_SIT_LOCK, /league settings/);
    assert.match(START_SIT_LOCK, /does not name a host clock/);
    assert.doesNotMatch(START_SIT_LOCK, HOST_SETTINGS);
    assert.doesNotMatch(START_SIT_LOCK, /\d{1,2}:\d{2}/);
  });

  it("explains the desk toss-up line without becoming a second calculator", () => {
    assert.equal(TOSS_UP_DELTA, 1.5);
    assert.match(START_SIT_TOSS_UP, /1\.5 estimated points/);
    assert.match(START_SIT_TOSS_UP, /toss-up/);
    assert.match(START_SIT_TOSS_UP, /soft evidence/);
    assert.match(START_SIT_TOSS_UP, /do not move that line/);
    assert.doesNotMatch(START_SIT_TOSS_UP, /type two means/i);
  });

  it("puts the start/sit questions into FAQPage JSON-LD, including one card question", () => {
    const data = faqPageJsonLd([...START_SIT_FAQS]);
    const names = data.mainEntity.map((row) => row.name);
    assert.equal(data["@type"], "FAQPage");
    assert.equal(names.length, START_SIT_FAQS.length);
    assert.ok(names.some((name) => /What is floor vs ceiling in fantasy football/.test(name)));
    assert.ok(names.some((name) => /safer player/.test(name)));
    assert.ok(names.some((name) => /chase upside/.test(name)));
    assert.ok(names.some((name) => /almost the same/.test(name)));
    assert.ok(names.some((name) => /guarantee a win/.test(name)));
    assert.ok(names.some((name) => /injury designations/.test(name)));
    assert.ok(names.some((name) => /certainty grade mean on a Decide Football card/.test(name)));
    const cardFaqs = START_SIT_FAQS.filter((item) => /Decide Football card/.test(item.question));
    assert.equal(cardFaqs.length, 1);
    for (const item of START_SIT_FAQS) {
      assert.equal(
        data.mainEntity.find((row) => row.name === item.question)?.acceptedAnswer.text,
        item.answer,
      );
      assert.doesNotMatch(item.answer, /\d+\s*%/);
      assert.doesNotMatch(item.answer, PLAYER_NAMES);
      assert.doesNotMatch(item.answer, HOST_SETTINGS);
    }
  });

  it("keeps non-affiliation, not-gambling, and methodology v0 on the page", () => {
    const text = START_SIT_NOT.join(" ");
    assert.match(text, /Not affiliated with, endorsed by, or sponsored by the NFL/);
    assert.match(text, /Not gambling advice/);
    assert.match(text, /methodology v0/);
    assert.match(text, /No accuracy rate is published/);
  });

  it("sets the same title and description on the document and Open Graph", () => {
    const meta = pageMetadata({
      path: START_SIT_PATH,
      title: START_SIT_TITLE,
      description: START_SIT_DESCRIPTION,
      indexation: { kind: "editorial" },
    });
    assert.equal(meta.title, START_SIT_TITLE);
    assert.equal(meta.description, START_SIT_DESCRIPTION);
    assert.equal(meta.robots, "index,follow");
    const og = meta.openGraph;
    assert.ok(og && !Array.isArray(og));
    if (!og || Array.isArray(og)) return;
    assert.equal(og.title, START_SIT_TITLE);
    assert.equal(og.description, START_SIT_DESCRIPTION);
    assert.equal(og.url, "/guide/start-sit/");
  });

  it("matches the start-sit title and blurb in llms.txt", () => {
    const text = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");
    assert.match(
      text,
      new RegExp(
        `\\[${START_SIT_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]\\(https://decidefootball\\.com/guide/start-sit/\\): ${START_SIT_DESCRIPTION.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      ),
    );
  });
});
