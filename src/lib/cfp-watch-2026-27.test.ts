import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { confirmedSportsEventItemListJsonLd } from "./seo";
import {
  CFP_FAQS,
  CFP_GAMES,
  CFP_SOURCES,
  CFP_WATCH_PATH,
  CFP_WATCH_TITLE,
  CFP_WATCH_UPDATED,
  CITATION_HOSTS,
  citationParts,
  cfpWatchBodies,
} from "./cfp-watch-2026-27";

describe("cfp watch 2026-27", () => {
  it("keeps the trailing-slash path, title, and last-checked date", () => {
    assert.equal(CFP_WATCH_PATH, "/guide/college-football-playoff-2026-schedule-how-to-watch/");
    assert.equal(CFP_WATCH_TITLE, "2026-27 College Football Playoff schedule and how to watch");
    assert.equal(CFP_WATCH_UPDATED, "2026-10-17");
    assert.equal(CFP_GAMES.length, 11);
    const page = readFileSync(
      "src/app/guide/college-football-playoff-2026-schedule-how-to-watch/page.tsx",
      "utf8",
    );
    assert.match(page, /lastModified:\s*"2026-10-17"/);
    assert.match(page, /indexation:\s*\{\s*kind:\s*"editorial"\s*\}/);
    assert.match(page, /Last checked:/);
    assert.match(page, /confirmedSportsEventItemListJsonLd/);
    assert.equal(page.includes("homeTeam"), false);
    assert.equal(page.includes("awayTeam"), false);
  });

  it("keeps announced sites and leaves unassigned kickoffs unannounced", () => {
    const byId = Object.fromEntries(CFP_GAMES.map((game) => [game.id, game]));
    assert.equal(byId["fr-fri"]?.kickoff, "8 p.m. ET");
    assert.equal(byId["fr-fri"]?.startDate, "2026-12-18T20:00:00-05:00");
    assert.equal(byId["fr-fri"]?.addressLocality, undefined);
    assert.equal(byId["qf-fiesta"]?.site.includes("State Farm Stadium"), true);
    assert.equal(byId["qf-fiesta"]?.startDate, "2026-12-30T19:30:00-05:00");
    assert.equal(byId["qf-cotton"]?.kickoff, "to be announced");
    assert.equal(byId["qf-cotton"]?.startDate, "2027-01-01");
    assert.equal(byId["qf-peach"]?.kickoff, "to be announced");
    assert.equal(byId["qf-rose"]?.kickoff, "to be announced");
    assert.equal(byId["sf-orange"]?.site.includes("Hard Rock Stadium"), true);
    assert.equal(byId["sf-sugar"]?.site.includes("Caesars Superdome"), true);
    assert.equal(byId["championship"]?.startDate, "2027-01-25T19:30:00-05:00");
    assert.equal(byId["championship"]?.locationName, "Allegiant Stadium");
    const blob = CFP_GAMES.map((game) => `${game.site} ${game.eventDescription}`).join("\n");
    assert.equal(/\bvs\.?\b/i.test(blob), false);
  });

  it("cites only https sources and does not link resale or a sportsbook", () => {
    const questions = CFP_FAQS.map((faq) => faq.question).join(" ");
    assert.match(questions, /selection day/);
    assert.match(questions, /national championship/);
    assert.match(questions, /tickets/i);
    assert.match(CFP_FAQS.map((faq) => faq.answer).join(" "), /to be announced/);

    const hrefs = new Set<string>();
    for (const body of cfpWatchBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of CFP_SOURCES) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(hrefs.has(source.href), source.href);
    }
    const blob = cfpWatchBodies().join("\n");
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.equal(/draftkings|fanduel|betmgm|caesars sportsbook|stubhub|seatgeek|vividseats|sportsbook/i.test(blob), false);
    assert.equal(/ticketmaster\.com/i.test(blob), false);
    assert.equal(/[?&](ref|tag|aff|affiliate)=/i.test(blob), false);
    assert.equal(/\$\d/.test(blob), false);
    assert.match(blob, /to be announced/);
    assert.match(blob, /does not name truTV/);
  });

  it("emits SportsEvents only for confirmed dates and sites, with no teams or prices", () => {
    const data = confirmedSportsEventItemListJsonLd(
      CFP_GAMES.map((game) => ({
        name: game.eventName,
        startDate: game.startDate,
        description: game.eventDescription,
        locationName: game.locationName,
        addressLocality: game.addressLocality,
        addressRegion: game.addressRegion,
      })),
    );
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 11);
    const first = data.itemListElement[0]?.item;
    assert.equal(first?.["@type"], "SportsEvent");
    assert.equal(first?.startDate, "2026-12-18T20:00:00-05:00");
    assert.equal(first?.location["@type"], "Place");
    assert.equal("address" in first!.location, false);
    assert.equal("homeTeam" in first!, false);
    assert.equal("awayTeam" in first!, false);
    const fiesta = data.itemListElement[4]?.item;
    assert.equal(fiesta?.location["@type"], "StadiumOrArena");
    assert.equal(fiesta?.location.name, "State Farm Stadium");
    const cotton = data.itemListElement[5]?.item;
    assert.equal(cotton?.startDate, "2027-01-01");
    assert.equal(cotton?.startDate.includes("T"), false);
    const blob = JSON.stringify(data);
    assert.equal(blob.includes("Offer"), false);
    assert.equal(blob.includes("price"), false);
    assert.equal(blob.includes("homeTeam"), false);
    assert.equal(blob.includes("awayTeam"), false);
  });
});
