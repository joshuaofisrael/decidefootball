import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  BOWL_FAQS,
  BOWL_GAMES,
  BOWL_SOURCES,
  BOWL_WATCH_PATH,
  BOWL_WATCH_TITLE,
  BOWL_WATCH_UPDATED,
  CITATION_HOSTS,
  bowlWatchBodies,
  citationParts,
} from "./bowl-watch-2026-27";
import { confirmedSportsEventItemListJsonLd } from "./seo";

describe("bowl watch 2026-27", () => {
  it("keeps the trailing-slash path, title, and last-updated date", () => {
    assert.equal(BOWL_WATCH_PATH, "/guide/bowl-schedule-2026-how-to-watch/");
    assert.equal(BOWL_WATCH_TITLE, "2026-27 college football bowl schedule and how to watch");
    assert.equal(BOWL_WATCH_UPDATED, "2026-10-21");
    assert.equal(BOWL_GAMES.length, 41);
    const page = readFileSync("src/app/guide/bowl-schedule-2026-how-to-watch/page.tsx", "utf8");
    assert.match(page, /lastModified:\s*"2026-10-21"/);
    assert.match(page, /indexation:\s*\{\s*kind:\s*"editorial"\s*\}/);
    assert.match(page, /Last updated:/);
    assert.match(page, /confirmedSportsEventItemListJsonLd/);
    assert.match(page, /college-football-playoff-2026-schedule-how-to-watch/);
    assert.match(page, /href="\/guide\/"/);
    assert.match(page, /href="\/guide\/start-sit\/"/);
    assert.match(page, /href="\/guide\/waiver-radar\/"/);
    assert.match(page, /href="\/start-sit\/2026-week-7\/"/);
    assert.match(page, /href="\/waiver-radar\/2026-week-7\/"/);
    assert.equal(page.includes("homeTeam"), false);
    assert.equal(page.includes("awayTeam"), false);
    assert.equal(page.includes("waiver-wire"), false);
  });

  it("lists verified bowls and leaves unannounced kickoffs and the Arizona date off", () => {
    const byId = Object.fromEntries(BOWL_GAMES.map((row) => [row.id, row]));
    assert.equal(byId.celebration?.kickoff, "Noon ET");
    assert.equal(byId.celebration?.network, "ABC");
    assert.equal(byId.celebration?.startDate, "2026-12-12T12:00:00-05:00");
    assert.equal(byId.poinsettia?.network, "The CW");
    assert.equal(byId.holiday?.kickoff, "5 p.m. ET");
    assert.equal(byId.sun?.network, "CBS");
    assert.equal(byId.sun?.cityVenue.includes("Sun Bowl Stadium"), true);
    assert.equal(byId.alamo?.kickoff, "9 p.m. ET");
    assert.equal(byId.fiesta?.network, "TNT, truTV, and HBO Max");
    assert.equal(byId.cotton?.kickoff, "to be announced");
    assert.equal(byId.cotton?.network, "to be announced");
    assert.equal(byId.cotton?.startDate, "2027-01-01");
    assert.equal(byId.peach?.kickoff, "to be announced");
    assert.equal(byId.rose?.kickoff, "to be announced");
    assert.equal(byId.texas?.cityVenue.includes("NRG Stadium"), true);
    assert.equal(byId.texas?.cityVenue.includes("Reliant Stadium"), true);
    assert.equal(byId.texas?.addressLocality, undefined);
    assert.equal(byId.sugar?.network, "ABC and ESPN");
    assert.equal(BOWL_GAMES.some((row) => row.id === "arizona"), false);
    const blob = BOWL_GAMES.map((row) => `${row.name} ${row.cityVenue} ${row.eventDescription}`).join(
      "\n",
    );
    assert.equal(/\bvs\.?\b/i.test(blob), false);
  });

  it("cites only https sources and does not link resale or a sportsbook", () => {
    const questions = BOWL_FAQS.map((faq) => faq.question).join(" ");
    assert.match(questions, /teams been announced/i);
    assert.match(questions, /Arizona Bowl/);
    assert.match(questions, /tickets/i);
    assert.match(BOWL_FAQS.map((faq) => faq.answer).join(" "), /to be announced/);

    const hrefs = new Set<string>();
    for (const body of bowlWatchBodies()) {
      for (const part of citationParts(body)) {
        if (part.type !== "link") continue;
        const url = new URL(part.href);
        assert.equal(url.protocol, "https:");
        assert.ok(CITATION_HOSTS.includes(url.host as (typeof CITATION_HOSTS)[number]), url.host);
        hrefs.add(part.href);
      }
    }
    for (const source of BOWL_SOURCES) {
      const url = new URL(source.href);
      assert.equal(url.protocol, "https:");
      assert.ok(hrefs.has(source.href), source.href);
    }
    const blob = bowlWatchBodies().join("\n");
    assert.equal(/super\s*bowl|pro\s*bowl/i.test(blob), false);
    assert.equal(
      /draftkings|fanduel|betmgm|caesars sportsbook|stubhub|seatgeek|vividseats|sportsbook|sling\.com/i.test(
        blob,
      ),
      false,
    );
    assert.equal(/ticketmaster\.com/i.test(blob), false);
    assert.equal(/[?&](ref|tag|aff|affiliate)=/i.test(blob), false);
    assert.equal(/\$\d/.test(blob), false);
    assert.match(blob, /to be announced/);
    assert.match(blob, /December 27, 2025/);
    assert.match(blob, /will be refreshed/);
  });

  it("emits SportsEvents only for confirmed dates, with no teams or prices", () => {
    const data = confirmedSportsEventItemListJsonLd(
      BOWL_GAMES.map((row) => ({
        name: row.eventName,
        startDate: row.startDate,
        description: row.eventDescription,
        locationName: row.locationName,
        addressLocality: row.addressLocality,
        addressRegion: row.addressRegion,
      })),
    );
    assert.equal(data["@type"], "ItemList");
    assert.equal(data.itemListElement.length, 41);
    const celebration = data.itemListElement[0]?.item;
    assert.equal(celebration?.["@type"], "SportsEvent");
    assert.equal(celebration?.startDate, "2026-12-12T12:00:00-05:00");
    assert.equal(celebration?.location["@type"], "StadiumOrArena");
    assert.equal("homeTeam" in celebration!, false);
    const texas = data.itemListElement.find((entry) => entry.item.name === "Kinder's Texas Bowl")?.item;
    assert.equal(texas?.location["@type"], "Place");
    assert.equal(texas?.location.name, "Houston, Texas");
    assert.equal("address" in texas!.location, false);
    const cotton = data.itemListElement.find((entry) =>
      entry.item.name.includes("Cotton Bowl"),
    )?.item;
    assert.equal(cotton?.startDate, "2027-01-01");
    assert.equal(cotton?.startDate.includes("T"), false);
    const blob = JSON.stringify(data);
    assert.equal(blob.includes("Offer"), false);
    assert.equal(blob.includes("price"), false);
    assert.equal(blob.includes("homeTeam"), false);
    assert.equal(blob.includes("awayTeam"), false);
  });
});
