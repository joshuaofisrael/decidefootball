import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "./seo";

function canonicalOf(metadata: Metadata): string {
  const canonical = metadata.alternates?.canonical;
  if (typeof canonical === "string") return canonical;
  if (canonical instanceof URL) return canonical.pathname;
  return "";
}

function ogOf(metadata: Metadata): { url?: string; siteName?: string; locale?: string; type?: string } {
  const og = metadata.openGraph;
  if (!og || Array.isArray(og)) return {};
  return {
    url: typeof og.url === "string" ? og.url : og.url?.toString(),
    siteName: "siteName" in og ? og.siteName : undefined,
    locale: "locale" in og ? og.locale : undefined,
    type: "type" in og ? og.type : undefined,
  };
}

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

  it("emits an ItemList of the reading guides, the tools, and not fixture paths", () => {
    const data = itemListJsonLd([
      {
        name: "Start/sit",
        path: "/guide/start-sit/",
        description: "Mean, floor, ceiling, and the certainty stack.",
      },
      {
        name: "Listed status",
        path: "/guide/listed-status/",
        description:
          "What Questionable, Doubtful, Out, injured reserve, and inactive mean.",
      },
      {
        name: "Waiver radar",
        path: "/guide/waiver-radar/",
        description: "Hot, rising, stash, and fade.",
      },
      {
        name: "Rankings",
        path: "/guide/rankings/",
        description: "One position, ordered by the mean.",
      },
      {
        name: "Add/drop",
        path: "/guide/add-drop/",
        description: "Roster-churn comparison: mean delta and the 1.5-point toss-up.",
      },
      {
        name: "Toss-up tool",
        path: "/guide/toss-up/",
        description: "Type two means. The lean is the 1.5-point mean delta.",
      },
      {
        name: "Certainty tool",
        path: "/guide/certainty/",
        description: "Type two means and the desk flags. The grade is thin, lean, clear, or strong.",
      },
    ]);
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 7);
    assert.equal(data.itemListElement[0]?.position, 1);
    const urls = data.itemListElement.map((row) => String(row.url));
    assert.match(urls[0] ?? "", /\/guide\/start-sit\/$/);
    assert.match(urls[1] ?? "", /\/guide\/listed-status\/$/);
    assert.match(urls[2] ?? "", /\/guide\/waiver-radar\/$/);
    assert.match(urls[3] ?? "", /\/guide\/rankings\/$/);
    assert.match(urls[4] ?? "", /\/guide\/add-drop\/$/);
    assert.match(urls[5] ?? "", /\/guide\/toss-up\/$/);
    assert.match(urls[6] ?? "", /\/guide\/certainty\/$/);
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

describe("pageMetadata canonicals", () => {
  it("emits trailing-slash canonical paths for editorial pages", () => {
    const about = pageMetadata({
      path: "/about",
      title: "About Decide Football",
      description: "Independent fantasy football decision site.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(about), "/about/");
    assert.equal(ogOf(about).url, "/about/");
    assert.equal(about.robots, "index,follow");
    assert.equal(about.title, "About Decide Football");
    assert.equal(about.description, "Independent fantasy football decision site.");
    assert.equal(ogOf(about).siteName, "Decide Football");
    assert.equal(ogOf(about).locale, "en_US");
    assert.equal(ogOf(about).type, "website");

    const hub = pageMetadata({
      path: "/guide/",
      title: "Reading guides",
      description: "How to read a decision card.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(hub), "/guide/");
    assert.equal(ogOf(hub).url, "/guide/");

    const rankings = pageMetadata({
      path: "guide/rankings",
      title: "Rankings guide",
      description: "One position, ordered by the mean.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(rankings), "/guide/rankings/");
    assert.equal(ogOf(rankings).url, "/guide/rankings/");

    const addDrop = pageMetadata({
      path: "/guide/add-drop/",
      title: "Add/drop guide",
      description: "How to read an add/drop comparison card.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(addDrop), "/guide/add-drop/");
    assert.equal(ogOf(addDrop).url, "/guide/add-drop/");
    assert.equal(addDrop.robots, "index,follow");

    const tossUp = pageMetadata({
      path: "/guide/toss-up/",
      title: "Toss-up tool",
      description: "Apply the 1.5-point mean-delta line to two means you type.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(tossUp), "/guide/toss-up/");
    assert.equal(ogOf(tossUp).url, "/guide/toss-up/");
    assert.equal(tossUp.robots, "index,follow");

    const certainty = pageMetadata({
      path: "/guide/certainty/",
      title: "Certainty tool",
      description: "Grade how sure a lean is from means and flags you type.",
      indexation: { kind: "editorial" },
    });
    assert.equal(canonicalOf(certainty), "/guide/certainty/");
    assert.equal(ogOf(certainty).url, "/guide/certainty/");
    assert.equal(certainty.robots, "index,follow");
  });

  it("emits a trailing-slash canonical for a sample fixture path and keeps it noindex", () => {
    const fixture = pageMetadata({
      path: "/start-sit/noah-crowe-vs-jordan-voss",
      title: "Start Noah Crowe or Jordan Voss?",
      description: "Fixture start/sit with a certainty score.",
      indexation: { sourceClass: "FIXTURE" },
    });
    assert.equal(canonicalOf(fixture), "/start-sit/noah-crowe-vs-jordan-voss/");
    assert.equal(ogOf(fixture).url, "/start-sit/noah-crowe-vs-jordan-voss/");
    assert.equal(fixture.robots, "noindex,follow");
    assert.equal(ogOf(fixture).siteName, "Decide Football");
    assert.equal(ogOf(fixture).type, "website");
  });

  it("keeps draft legal pages noindex and does not invent a description", () => {
    const privacy = pageMetadata({
      path: "/privacy/",
      title: "Privacy Policy (draft)",
      indexation: { sourceClass: "GREEN", draftLegal: true },
    });
    assert.equal(canonicalOf(privacy), "/privacy/");
    assert.equal(ogOf(privacy).url, "/privacy/");
    assert.equal(privacy.robots, "noindex,follow");
    assert.equal("description" in privacy, false);
    assert.equal("description" in (privacy.openGraph ?? {}), false);
  });

  it("keeps the homepage canonical at /", () => {
    const home = pageMetadata({
      path: "/",
      title: "Decide Football: start, sit, and the Sunday card",
      description: "Independent fantasy desk.",
      indexation: { sourceClass: "FIXTURE" },
    });
    assert.equal(canonicalOf(home), "/");
    assert.equal(ogOf(home).url, "/");
    assert.equal(home.robots, "noindex,follow");
  });
});
