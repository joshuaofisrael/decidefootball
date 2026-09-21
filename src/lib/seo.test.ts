import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { breadcrumbJsonLd, faqPageJsonLd, organizationJsonLd, webPageJsonLd } from "./seo";

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
});
