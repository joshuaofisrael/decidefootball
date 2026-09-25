import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "./seo";

describe("seo json-ld helpers", () => {
  it("emits Organization without inventing contact points", () => {
    const data = organizationJsonLd();
    assert.equal(data["@type"], "Organization");
    assert.equal(data.name, "Decide Football");
    assert.equal(data.legalName, "Joshua Israel Ventures LLC");
    assert.equal("email" in data, false);
    assert.equal("address" in data, false);
  });

  it("emits WebPage and BreadcrumbList for editorial URLs", () => {
    const page = webPageJsonLd({
      path: "/about/",
      name: "About Decide Football",
      description: "Independent fantasy football decision site.",
    });
    assert.equal(page["@type"], "WebPage");
    assert.match(String(page.url), /\/about\/$/);

    const crumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]);
    assert.equal(crumbs["@type"], "BreadcrumbList");
    assert.equal(crumbs.itemListElement.length, 2);
  });

  it("emits FAQPage from the same question/answer pairs shown on About", () => {
    const data = faqPageJsonLd([
      {
        question: "Are the projections official?",
        answer: "No. Projections are Decide Football model estimates, not official NFL data.",
      },
    ]);
    assert.equal(data["@type"], "FAQPage");
    assert.equal(data.mainEntity[0]?.["@type"], "Question");
    assert.equal(data.mainEntity[0]?.name, "Are the projections official?");
    assert.equal(data.mainEntity[0]?.acceptedAnswer["@type"], "Answer");
  });

  it("emits an ItemList of the three reading guides and not fixture paths", () => {
    const data = itemListJsonLd([
      {
        name: "Start/sit",
        path: "/guide/start-sit/",
        description: "Mean, floor, ceiling, and the certainty stack.",
      },
      {
        name: "Listed status",
        path: "/guide/listed-status/",
        description: "Healthy through INACTIVE, before any number.",
      },
      {
        name: "Waiver radar",
        path: "/guide/waiver-radar/",
        description: "Hot, rising, stash, and fade.",
      },
    ]);
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 3);
    assert.equal(data.itemListElement[0]?.position, 1);
    const urls = data.itemListElement.map((row) => String(row.url));
    assert.match(urls[0] ?? "", /\/guide\/start-sit\/$/);
    assert.match(urls[1] ?? "", /\/guide\/listed-status\/$/);
    assert.match(urls[2] ?? "", /\/guide\/waiver-radar\/$/);
    for (const url of urls) {
      const path = new URL(url).pathname;
      assert.equal(path.startsWith("/guide/"), true);
      for (const prefix of [
        "/players/",
        "/start-sit/",
        "/is-playing/",
        "/is-",
        "/injuries/",
        "/rankings/",
        "/waiver-wire/",
        "/add-drop/",
        "/week-",
        "/slate/",
        "/watchlist/",
      ]) {
        assert.equal(path.startsWith(prefix), false, `${path} must not match ${prefix}`);
      }
    }
  });

  it("emits a Home → Guides breadcrumb for the reading hub", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guide/" },
    ]);
    assert.equal(crumbs.itemListElement.length, 2);
    assert.equal(crumbs.itemListElement[1]?.name, "Guides");
    assert.match(String(crumbs.itemListElement[1]?.item), /\/guide\/$/);
  });
});
