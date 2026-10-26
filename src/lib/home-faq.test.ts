import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HOME_FAQS, linkFaqAnswer } from "./home-faq";
import { faqPageJsonLd, organizationJsonLd } from "./seo";

describe("homepage FAQ", () => {
  it("keeps 5 to 7 answers identical in the visible copy and the FAQPage", () => {
    assert.ok(HOME_FAQS.length >= 5 && HOME_FAQS.length <= 7);
    const data = faqPageJsonLd([...HOME_FAQS]);
    assert.equal(data["@type"], "FAQPage");
    assert.equal(data.mainEntity.length, HOME_FAQS.length);
    for (const [index, item] of HOME_FAQS.entries()) {
      const entity = data.mainEntity[index];
      assert.equal(entity?.["@type"], "Question");
      assert.equal(entity?.name, item.question);
      assert.equal(entity?.acceptedAnswer["@type"], "Answer");
      assert.equal(entity?.acceptedAnswer.text, item.answer);
      const linked = linkFaqAnswer(item.answer);
      assert.equal(linked.map((part) => part.value).join(""), item.answer);
      for (const part of linked) {
        if (part.type === "link") assert.equal(part.value.startsWith("/"), true);
      }
    }
  });

  it("describes the real desks and does not invent a social profile or a wager", () => {
    const blob = HOME_FAQS.map((item) => `${item.question} ${item.answer}`).join("\n");
    assert.match(blob, /\/waiver-radar\//);
    assert.match(blob, /\/start-sit\/2026-week-7\//);
    assert.match(blob, /\/guide\/certainty\//);
    assert.match(blob, /df_watchlist/);
    assert.match(blob, /\/rankings\//);
    assert.match(blob, /sample data for demonstrating the tool/);
    assert.match(blob, /\/contact\//);
    const contact = HOME_FAQS.find((item) => item.question.includes("contact"));
    assert.equal(
      linkFaqAnswer(contact?.answer ?? "").some((part) => part.type === "link" && part.value === "/contact/"),
      true,
    );
    assert.equal(
      linkFaqAnswer(blob).some((part) => part.value.includes("waiver-wire")),
      false,
    );
    assert.match(blob, /not affiliated with, endorsed by, or sponsored by the NFL/);
    assert.match(blob, /No ad units are shown yet/);
    assert.equal(/waiver[\s-]*wire/i.test(blob), false);
    assert.equal(/live licensed|official statistics|SportsEvent|Dataset/i.test(blob), false);
    assert.equal(/draftkings|fanduel|betmgm|sportsbook|moneyline|\bodds\b/i.test(blob), false);
    assert.equal(blob.includes("Joshua Israel"), false);
    assert.equal(blob.includes("sameAs"), false);

    const org = organizationJsonLd();
    assert.equal(org.name, "Decide Football");
    assert.equal("sameAs" in org, false);
    assert.equal("legalName" in org, false);
  });
});