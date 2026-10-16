import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { sportsEventItemListJsonLd } from "./seo";
import {
  CITATION_HOSTS,
  citationParts,
  formatKickoff,
  OPERATIONS_URLS_CHECKED,
  startDateIso,
  THANKSGIVING_FAQS,
  THANKSGIVING_GAMES,
  THANKSGIVING_SOURCES,
  THANKSGIVING_WATCH_PATH,
  THANKSGIVING_WATCH_TITLE,
  THANKSGIVING_WATCH_UPDATED,
  thanksgivingWatchBodies,
} from "./thanksgiving-watch-2026";

describe("thanksgiving watch 2026", () => {
  it("keeps the trailing-slash path, title, and update date", () => {
    assert.equal(THANKSGIVING_WATCH_PATH, "/guide/thanksgiving-nfl-how-to-watch/");
    assert.equal(THANKSGIVING_WATCH_TITLE, "NFL Thanksgiving 2026: How to Watch All 5 Games");
    assert.equal(THANKSGIVING_WATCH_UPDATED, "2026-10-16");
    assert.equal(THANKSGIVING_GAMES.length, 5);
    const page = readFileSync("src/app/guide/thanksgiving-nfl-how-to-watch/page.tsx", "utf8");
    assert.match(page, /lastModified:\s*"2026-10-16"/);
    assert.match(page, /indexation:\s*\{\s*kind:\s*"editorial"\s*\}/);
    assert.match(page, /THANKSGIVING_WATCH_PATH/);
  });

  it("matches the verified matchups, Eastern kickoffs, and national windows", () => {
    assert.deepEqual(
      THANKSGIVING_GAMES.map((game) => ({
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
          home: "Los Angeles Rams",
          date: "2026-11-25",
          et: { hour: 20, minute: 0 },
          national: "Netflix",
          venue: "SoFi Stadium",
        },
        {
          away: "Chicago Bears",
          home: "Detroit Lions",
          date: "2026-11-26",
          et: { hour: 13, minute: 0 },
          national: "CBS",
          venue: "Ford Field",
        },
        {
          away: "Philadelphia Eagles",
          home: "Dallas Cowboys",
          date: "2026-11-26",
          et: { hour: 16, minute: 30 },
          national: "FOX",
          venue: "AT&T Stadium",
        },
        {
          away: "Kansas City Chiefs",
          home: "Buffalo Bills",
          date: "2026-11-26",
          et: { hour: 20, minute: 20 },
          national: "NBC",
          venue: "Highmark Stadium",
        },
        {
          away: "Denver Broncos",
          home: "Pittsburgh Steelers",
          date: "2026-11-27",
          et: { hour: 15, minute: 0 },
          national: "Prime Video",
          venue: "Acrisure Stadium",
        },
      ],
    );
  });

  it("converts Eastern kickoffs into the other U.S. zones", () => {
    const pt = THANKSGIVING_GAMES.map((game) => formatKickoff(game.et, -3));
    assert.deepEqual(pt, ["5 p.m.", "10 a.m.", "1:30 p.m.", "5:20 p.m.", "12 p.m."]);
    assert.equal(formatKickoff(THANKSGIVING_GAMES[0].et, -1), "7 p.m.");
    assert.equal(formatKickoff(THANKSGIVING_GAMES[0].et, -4), "4 p.m.");
    assert.equal(formatKickoff(THANKSGIVING_GAMES[0].et, -5), "3 p.m.");
    assert.equal(startDateIso("2026-11-25", { hour: 20, minute: 0 }), "2026-11-25T20:00:00-05:00");
    assert.equal(startDateIso("2026-11-26", { hour: 16, minute: 30 }), "2026-11-26T16:30:00-05:00");
  });

  it("answers channel, Netflix, and Black Friday questions and cites only https sources", () => {
    const questions = THANKSGIVING_FAQS.map((faq) => faq.question).join(" ");
    assert.match(questions, /What channel/);
    assert.match(questions, /Netflix/);
    assert.match(questions, /Black Friday/);
    assert.match(THANKSGIVING_FAQS[2]?.answer ?? "", /Friday, November 27, 2026/);
    assert.match(THANKSGIVING_FAQS[1]?.answer ?? "", /TBA/);

    const hrefs = new Set<string>();
    for (const body of thanksgivingWatchBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of THANKSGIVING_SOURCES) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(hrefs.has(source.href), source.href);
    }
    for (const href of OPERATIONS_URLS_CHECKED) {
      assert.equal(hrefs.has(href), true, href);
    }
    const blob = thanksgivingWatchBodies().join("\n");
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.equal(/draftkings|fanduel|betmgm|caesars|pointsbet|betrivers|sportsbook\.com/i.test(blob), false);
    assert.equal(/[?&](ref|tag|aff|affiliate)=/i.test(blob), false);
    assert.equal(/\$\d/.test(blob), false);
  });

  it("emits an ItemList of five SportsEvents without prices", () => {
    const data = sportsEventItemListJsonLd(
      THANKSGIVING_GAMES.map((game) => ({
        name: `${game.away} at ${game.home}`,
        startDate: startDateIso(game.date, game.et),
        description: `${game.national} at ${formatKickoff(game.et, 0)} Eastern`,
        locationName: game.venue,
        addressLocality: game.locality,
        addressRegion: game.region,
        homeTeam: game.home,
        awayTeam: game.away,
      })),
    );
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 5);
    assert.equal(data.itemListElement[0]?.item["@type"], "SportsEvent");
    assert.equal(data.itemListElement[0]?.item.homeTeam.name, "Los Angeles Rams");
    assert.equal(data.itemListElement[0]?.item.awayTeam.name, "Green Bay Packers");
    assert.equal(data.itemListElement[4]?.item.startDate, "2026-11-27T15:00:00-05:00");
    const blob = JSON.stringify(data);
    assert.equal(blob.includes("Offer"), false);
    assert.equal(blob.includes("price"), false);
  });
});
