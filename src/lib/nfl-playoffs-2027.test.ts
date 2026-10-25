import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { confirmedSportsEventItemListJsonLd } from "./seo";
import {
  CITATION_HOSTS,
  PLAYOFF_FAQS,
  PLAYOFF_ROUNDS,
  PLAYOFF_SOURCES,
  PLAYOFF_TITLE_GAME,
  PLAYOFF_WATCH_DESCRIPTION,
  PLAYOFF_WATCH_H1,
  PLAYOFF_WATCH_PATH,
  PLAYOFF_WATCH_TITLE,
  PLAYOFF_WATCH_UPDATED,
  citationParts,
  playoffWatchBodies,
} from "./nfl-playoffs-2027";

describe("nfl playoffs 2027", () => {
  it("keeps the trailing-slash path, title, and last-checked date", () => {
    assert.equal(PLAYOFF_WATCH_PATH, "/guide/nfl-playoffs-2027-schedule-how-to-watch/");
    assert.equal(
      PLAYOFF_WATCH_TITLE,
      "2026 NFL playoffs schedule and how to watch (January 2027)",
    );
    assert.equal(PLAYOFF_WATCH_H1, PLAYOFF_WATCH_TITLE);
    assert.equal(PLAYOFF_WATCH_DESCRIPTION.length >= 140, true);
    assert.equal(PLAYOFF_WATCH_DESCRIPTION.length <= 160, true);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(PLAYOFF_WATCH_TITLE), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(PLAYOFF_WATCH_H1), false);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(PLAYOFF_WATCH_DESCRIPTION), false);
    assert.equal(PLAYOFF_WATCH_UPDATED, "2026-10-25");
    assert.equal(PLAYOFF_ROUNDS.length, 3);
    const page = readFileSync(
      "src/app/guide/nfl-playoffs-2027-schedule-how-to-watch/page.tsx",
      "utf8",
    );
    assert.match(page, /lastModified:\s*"2026-10-25"/);
    assert.match(page, /indexation:\s*\{\s*kind:\s*"editorial"\s*\}/);
    assert.match(page, /Last checked:/);
    assert.match(page, /confirmedSportsEventItemListJsonLd/);
    assert.match(page, /href="\/guide\/thanksgiving-nfl-how-to-watch\/"/);
    assert.match(page, /href="\/guide\/christmas-nfl-how-to-watch\/"/);
    assert.match(page, /href="\/guide\/college-football-playoff-2026-schedule-how-to-watch\/"/);
    assert.match(page, /href="\/start-sit\/"/);
    assert.match(page, /href="\/waiver-radar\/"/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/guide\/waiver-radar\/"/);
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(page), false);
    assert.equal(page.includes("homeTeam"), false);
    assert.equal(page.includes("awayTeam"), false);
  });

  it("keeps announced windows and leaves kickoffs TBA", () => {
    const byId = Object.fromEntries(PLAYOFF_ROUNDS.map((round) => [round.id, round]));
    assert.equal(byId["wild-card"]?.kickoff, "TBA");
    assert.equal(byId["wild-card"]?.startDate, "2027-01-16");
    assert.equal(byId["wild-card"]?.endDate, "2027-01-18");
    assert.equal(byId["wild-card"]?.addressLocality, undefined);
    assert.equal(byId["divisional"]?.kickoff, "TBA");
    assert.equal(byId["divisional"]?.startDate, "2027-01-23");
    assert.equal(byId["divisional"]?.endDate, "2027-01-24");
    assert.equal(byId["championship"]?.kickoff, "TBA");
    assert.equal(byId["championship"]?.startDate, "2027-01-31");
    assert.equal(byId["championship"]?.endDate, undefined);
    assert.equal(byId["championship"]?.watch, "TBA");
    assert.equal(PLAYOFF_TITLE_GAME.kickoff, "TBA");
    assert.equal(PLAYOFF_TITLE_GAME.startDate, "2027-02-14");
    assert.equal(PLAYOFF_TITLE_GAME.locationName, "SoFi Stadium");
    assert.equal(PLAYOFF_TITLE_GAME.addressLocality, "Inglewood");
    const blob = [...PLAYOFF_ROUNDS, PLAYOFF_TITLE_GAME]
      .map((round) => `${round.site} ${round.eventDescription}`)
      .join("\n");
    assert.equal(/\bvs\.?\b/i.test(blob), false);
  });

  it("cites only https sources and does not link resale or a sportsbook", () => {
    const questions = PLAYOFF_FAQS.map((faq) => faq.question).join(" ");
    assert.match(questions, /Wild Card/);
    assert.match(questions, /bye/);
    assert.match(questions, /Super Bowl LXI/);
    assert.match(questions, /tickets/i);
    assert.match(PLAYOFF_FAQS.map((faq) => faq.answer).join(" "), /TBA/);

    const hrefs = new Set<string>();
    for (const body of playoffWatchBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of PLAYOFF_SOURCES) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(hrefs.has(source.href), source.href);
    }
    const blob = playoffWatchBodies().join("\n");
    assert.match(blob, /Super Bowl LXI/);
    assert.equal(/pro\s*bowl/i.test(blob), false);
    assert.equal(
      /draftkings|fanduel|betmgm|caesars sportsbook|stubhub|seatgeek|vividseats|sportsbook|ticketmaster/i.test(
        blob,
      ),
      false,
    );
    assert.equal(/[?&](ref|tag|aff|affiliate)=/i.test(blob), false);
    assert.equal(/\$\d/.test(blob), false);
    assert.match(blob, /TBA/);
    assert.match(blob, /does not copy those earlier kickoffs/);
  });

  it("emits SportsEvents for the dated rounds and the February game, with no teams or prices", () => {
    const events = [...PLAYOFF_ROUNDS, PLAYOFF_TITLE_GAME];
    const data = confirmedSportsEventItemListJsonLd(
      events.map((round) => ({
        name: round.eventName,
        startDate: round.startDate,
        endDate: round.endDate,
        description: round.eventDescription,
        locationName: round.locationName,
        addressLocality: round.addressLocality,
        addressRegion: round.addressRegion,
      })),
    );
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 4);
    const wildCard = data.itemListElement[0]?.item;
    assert.equal(wildCard?.["@type"], "SportsEvent");
    assert.equal(wildCard?.startDate, "2027-01-16");
    assert.equal(wildCard?.endDate, "2027-01-18");
    assert.equal(wildCard?.location["@type"], "Place");
    assert.equal("address" in wildCard!.location, false);
    assert.equal("homeTeam" in wildCard!, false);
    assert.equal("awayTeam" in wildCard!, false);
    const championship = data.itemListElement[2]?.item;
    assert.equal(championship?.startDate, "2027-01-31");
    assert.equal("endDate" in championship!, false);
    const titleGame = data.itemListElement[3]?.item;
    assert.equal(titleGame?.name, "Super Bowl LXI");
    assert.equal(titleGame?.startDate, "2027-02-14");
    assert.equal(titleGame?.location["@type"], "StadiumOrArena");
    assert.equal(titleGame?.location.name, "SoFi Stadium");
    const blob = JSON.stringify(data);
    assert.equal(blob.includes("Offer"), false);
    assert.equal(blob.includes("price"), false);
    assert.equal(blob.includes("homeTeam"), false);
    assert.equal(blob.includes("awayTeam"), false);
  });
});
