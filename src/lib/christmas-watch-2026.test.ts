import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { sportsEventItemListJsonLd } from "./seo";
import {
  CHRISTMAS_FAQS,
  CHRISTMAS_GAMES,
  CHRISTMAS_SOURCES,
  CHRISTMAS_WATCH_PATH,
  CHRISTMAS_WATCH_TITLE,
  CHRISTMAS_WATCH_UPDATED,
  CITATION_HOSTS,
  christmasWatchBodies,
  citationParts,
  formatZoneCell,
  OPERATIONS_URLS_CHECKED,
  startDateIso,
} from "./christmas-watch-2026";

describe("christmas watch 2026", () => {
  it("keeps the trailing-slash path, title, and update date", () => {
    assert.equal(CHRISTMAS_WATCH_PATH, "/guide/christmas-nfl-how-to-watch/");
    assert.equal(CHRISTMAS_WATCH_TITLE, "NFL Christmas Day 2026: How to Watch Every Game");
    assert.equal(CHRISTMAS_WATCH_UPDATED, "2026-10-20");
    assert.equal(CHRISTMAS_GAMES.length, 3);
    const page = readFileSync("src/app/guide/christmas-nfl-how-to-watch/page.tsx", "utf8");
    assert.match(page, /lastModified:\s*"2026-10-20"/);
    assert.match(page, /indexation:\s*\{\s*kind:\s*"editorial"\s*\}/);
    assert.match(page, /CHRISTMAS_WATCH_PATH/);
    assert.match(page, /href="\/guide\/thanksgiving-nfl-how-to-watch\/"/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/guide\/waiver-radar\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-7\/"/);
    assert.equal(/waiver[\s-]wire/i.test(page), false);
  });

  it("matches the verified matchups, Eastern kickoffs, and national windows", () => {
    assert.deepEqual(
      CHRISTMAS_GAMES.map((game) => ({
        away: game.away,
        home: game.home,
        date: game.date,
        et: game.et,
        national: game.national,
        venue: game.venue,
      })),
      [
        {
          away: "Green Bay Packers",
          home: "Chicago Bears",
          date: "2026-12-25",
          et: { hour: 13, minute: 0 },
          national: "Netflix",
          venue: "Soldier Field",
        },
        {
          away: "Buffalo Bills",
          home: "Denver Broncos",
          date: "2026-12-25",
          et: { hour: 16, minute: 30 },
          national: "Netflix",
          venue: "Empower Field at Mile High",
        },
        {
          away: "Los Angeles Rams",
          home: "Seattle Seahawks",
          date: "2026-12-25",
          et: { hour: 20, minute: 15 },
          national: "FOX",
          venue: "Lumen Field",
        },
      ],
    );
  });

  it("converts Eastern kickoffs into CT, MT, PT, and UK time", () => {
    const pt = CHRISTMAS_GAMES.map((game) => formatZoneCell(game.et, -3));
    assert.deepEqual(pt, ["10 a.m.", "1:30 p.m.", "5:15 p.m."]);
    assert.equal(formatZoneCell(CHRISTMAS_GAMES[0].et, -1), "12 p.m.");
    assert.equal(formatZoneCell(CHRISTMAS_GAMES[0].et, -2), "11 a.m.");
    assert.equal(formatZoneCell(CHRISTMAS_GAMES[0].et, 5), "6 p.m.");
    assert.equal(formatZoneCell(CHRISTMAS_GAMES[1].et, 5), "9:30 p.m.");
    assert.equal(formatZoneCell(CHRISTMAS_GAMES[2].et, 5), "1:15 a.m. Sat");
    assert.equal(startDateIso("2026-12-25", { hour: 13, minute: 0 }), "2026-12-25T13:00:00-05:00");
    assert.equal(startDateIso("2026-12-25", { hour: 16, minute: 30 }), "2026-12-25T16:30:00-05:00");
    assert.equal(startDateIso("2026-12-25", { hour: 20, minute: 15 }), "2026-12-25T20:15:00-05:00");
  });

  it("answers channel, UK, and Netflix questions and cites only https sources", () => {
    const questions = CHRISTMAS_FAQS.map((faq) => faq.question).join(" ");
    assert.match(questions, /What channel/);
    assert.match(questions, /UK/);
    assert.match(questions, /Netflix/);
    assert.match(questions, /Who should I start/);
    assert.match(CHRISTMAS_FAQS[1]?.answer ?? "", /Saturday, December 26/);
    assert.match(CHRISTMAS_FAQS[3]?.answer ?? "", /December 24/);

    const hrefs = new Set<string>();
    for (const body of christmasWatchBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of CHRISTMAS_SOURCES) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(hrefs.has(source.href), source.href);
    }
    for (const href of OPERATIONS_URLS_CHECKED) {
      assert.equal(hrefs.has(href), true, href);
    }
    const blob = christmasWatchBodies().join("\n");
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.equal(/draftkings|fanduel|betmgm|caesars|pointsbet|betrivers|sportsbook\.com/i.test(blob), false);
    assert.equal(/ticketmaster|stubhub|seatgeek/i.test(blob), false);
    assert.equal(/[?&](ref|tag|aff|affiliate)=/i.test(blob), false);
    assert.equal(/\$\d/.test(blob), false);
    assert.equal(/waiver[\s-]wire/i.test(blob), false);
    assert.match(blob, /will be confirmed|does not name|does not list|did not return/);
  });

  it("emits an ItemList of three SportsEvents without prices", () => {
    const data = sportsEventItemListJsonLd(
      CHRISTMAS_GAMES.map((game) => ({
        name: `${game.away} at ${game.home}`,
        startDate: startDateIso(game.date, game.et),
        description: `${game.national} at ${formatZoneCell(game.et, 0)} Eastern`,
        locationName: game.venue,
        addressLocality: game.locality,
        addressRegion: game.region,
        homeTeam: game.home,
        awayTeam: game.away,
      })),
    );
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 3);
    assert.equal(data.itemListElement[0]?.item["@type"], "SportsEvent");
    assert.equal(data.itemListElement[0]?.item.homeTeam.name, "Chicago Bears");
    assert.equal(data.itemListElement[0]?.item.awayTeam.name, "Green Bay Packers");
    assert.equal(data.itemListElement[2]?.item.startDate, "2026-12-25T20:15:00-05:00");
    assert.equal(data.itemListElement[2]?.item.homeTeam.name, "Seattle Seahawks");
    const blob = JSON.stringify(data);
    assert.equal(blob.includes("Offer"), false);
    assert.equal(blob.includes("price"), false);
  });
});
