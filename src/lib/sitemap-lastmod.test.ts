import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import sitemap from "../app/sitemap";
import { indexableSitemapPaths } from "./indexable-urls";
import {
  buildDate,
  contentFilesForPath,
  lastmodForPath,
  metadataDateFromSource,
  resolveContentLastmod,
} from "./sitemap-lastmod";

const SITEMAP_PATHS = [
  "/",
  "/about/",
  "/methodology/",
  "/guide/",
  "/guide/start-sit/",
  "/guide/waiver-radar/",
  "/guide/listed-status/",
  "/guide/rankings/",
  "/guide/add-drop/",
  "/guide/toss-up/",
  "/guide/certainty/",
  "/guide/thanksgiving-nfl-how-to-watch/",
  "/guide/college-football-playoff-2026-schedule-how-to-watch/",
  "/guide/bowl-schedule-2026-how-to-watch/",
  "/guide/christmas-nfl-how-to-watch/",
  "/waiver-radar/2026-week-6/",
  "/waiver-radar/2026-week-7/",
  "/start-sit/2026-week-6/",
  "/start-sit/2026-week-7/",
  "/terms/",
  "/privacy/",
  "/disclaimer/",
  "/contact/",
  "/contact/thanks/",
  "/cookies/",
  "/start-sit/",
  "/add-drop/",
  "/rankings/",
  "/waiver-radar/",
  "/players/",
  "/is-playing/",
  "/slate/",
  "/watchlist/",
  "/health/",
  "/week-3/qb-rankings/",
  "/week-3/rb-rankings/",
  "/week-3/wr-rankings/",
  "/week-3/te-rankings/",
  "/start-sit/jordan-voss-vs-noah-crowe/",
  "/start-sit/marcus-hale-vs-kai-benton/",
  "/start-sit/elias-quinn-vs-riley-soto/",
  "/add-drop/kai-benton-vs-amir-cole/",
  "/add-drop/noah-crowe-vs-amir-cole/",
  "/players/jordan-voss/",
  "/injuries/jordan-voss/",
  "/is-jordan-voss-playing-today/",
  "/players/marcus-hale/",
  "/injuries/marcus-hale/",
  "/is-marcus-hale-playing-today/",
  "/players/elias-quinn/",
  "/injuries/elias-quinn/",
  "/is-elias-quinn-playing-today/",
  "/players/theo-marsh/",
  "/injuries/theo-marsh/",
  "/is-theo-marsh-playing-today/",
  "/players/kai-benton/",
  "/injuries/kai-benton/",
  "/is-kai-benton-playing-today/",
  "/players/noah-crowe/",
  "/injuries/noah-crowe/",
  "/is-noah-crowe-playing-today/",
  "/players/riley-soto/",
  "/injuries/riley-soto/",
  "/is-riley-soto-playing-today/",
  "/players/amir-cole/",
  "/injuries/amir-cole/",
  "/is-amir-cole-playing-today/",
] as const;

describe("resolveContentLastmod", () => {
  it("prefers page metadata, then git history, then the build date", () => {
    assert.equal(
      resolveContentLastmod({
        metadataDate: "2026-01-02",
        gitDate: "2026-03-04",
        buildDate: "2026-05-06",
      }),
      "2026-01-02",
    );
    assert.equal(
      resolveContentLastmod({
        metadataDate: null,
        gitDate: "2026-03-04",
        buildDate: "2026-05-06",
      }),
      "2026-03-04",
    );
    assert.equal(
      resolveContentLastmod({
        metadataDate: "yesterday",
        gitDate: null,
        buildDate: "2026-05-06",
      }),
      "2026-05-06",
    );
    assert.equal(
      resolveContentLastmod({
        metadataDate: null,
        gitDate: null,
        buildDate: "not-a-date",
      }),
      buildDate(),
    );
  });

  it("reads a metadata date and ignores prose that is not a date field", () => {
    assert.equal(metadataDateFromSource('export const contentUpdated = "2026-04-01";'), "2026-04-01");
    assert.equal(metadataDateFromSource('lastModified: "2026-04-01T12:00:00.000Z"'), "2026-04-01");
    assert.equal(metadataDateFromSource("Updated in September for the sample desk."), null);
    assert.equal(metadataDateFromSource(readFileSync("src/app/terms/page.tsx", "utf8")), null);
  });
});

describe("sitemap lastmod", () => {
  it("keeps the 67 urls and gives each a real content date", () => {
    assert.deepEqual(indexableSitemapPaths(), [...SITEMAP_PATHS]);
    assert.deepEqual(contentFilesForPath("/terms/"), ["src/app/terms/page.tsx"]);
    assert.ok(contentFilesForPath("/slate/").includes("src/components/FixtureBanner.tsx"));
    assert.ok(contentFilesForPath("/slate/").includes("src/lib/fixtures.ts"));
    assert.ok(contentFilesForPath("/guide/start-sit/").includes("src/lib/start-sit-guide.ts"));

    const entries = sitemap();
    assert.equal(entries.length, SITEMAP_PATHS.length);
    const dates = new Set<string>();
    for (const [index, entry] of entries.entries()) {
      const path = new URL(entry.url).pathname;
      assert.equal(path, SITEMAP_PATHS[index]);
      assert.match(entry.url, /^https:\/\/decidefootball\.com\//);
      assert.equal(typeof entry.lastModified, "string");
      assert.match(String(entry.lastModified), /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(entry.lastModified, lastmodForPath(path));
      dates.add(String(entry.lastModified));
    }
    assert.ok(dates.size >= 2, "pages last updated on different days need different lastmod values");

    assert.equal(lastmodForPath("/terms/"), "2026-10-08");
    assert.equal(lastmodForPath("/privacy/"), "2026-10-23");
    assert.equal(lastmodForPath("/disclaimer/"), "2026-10-08");
    assert.equal(lastmodForPath("/contact/"), "2026-10-18");
    assert.equal(lastmodForPath("/"), "2026-10-22");
    assert.equal(lastmodForPath("/about/"), "2026-10-11");
    assert.equal(lastmodForPath("/guide/start-sit/"), "2026-10-15");
    assert.equal(lastmodForPath("/waiver-radar/2026-week-7/"), "2026-10-18");
    assert.equal(lastmodForPath("/start-sit/2026-week-6/"), "2026-10-15");
    assert.equal(lastmodForPath("/start-sit/2026-week-7/"), "2026-10-19");
    assert.equal(lastmodForPath("/contact/thanks/"), "2026-10-18");
    assert.ok(
      contentFilesForPath("/start-sit/2026-week-7/").includes("src/lib/weekly-start-sit-week-7.ts"),
    );
    assert.equal(lastmodForPath("/guide/thanksgiving-nfl-how-to-watch/"), "2026-10-16");
    assert.equal(
      lastmodForPath("/guide/college-football-playoff-2026-schedule-how-to-watch/"),
      "2026-10-17",
    );
    assert.equal(lastmodForPath("/guide/bowl-schedule-2026-how-to-watch/"), "2026-10-21");
    assert.ok(
      contentFilesForPath("/guide/bowl-schedule-2026-how-to-watch/").includes(
        "src/lib/bowl-watch-2026-27.ts",
      ),
    );
    assert.ok(
      contentFilesForPath("/guide/college-football-playoff-2026-schedule-how-to-watch/").includes(
        "src/lib/cfp-watch-2026-27.ts",
      ),
    );
    assert.ok(
      contentFilesForPath("/guide/thanksgiving-nfl-how-to-watch/").includes(
        "src/lib/thanksgiving-watch-2026.ts",
      ),
    );
    assert.equal(lastmodForPath("/guide/christmas-nfl-how-to-watch/"), "2026-10-20");
    assert.ok(
      contentFilesForPath("/guide/christmas-nfl-how-to-watch/").includes(
        "src/lib/christmas-watch-2026.ts",
      ),
    );
    assert.equal(lastmodForPath("/slate/"), "2026-10-11");
    assert.equal(lastmodForPath("/start-sit/"), "2026-10-15");
    assert.equal(lastmodForPath("/players/jordan-voss/"), "2026-10-11");
    assert.ok(lastmodForPath("/terms/") < lastmodForPath("/"));
  });

  it("falls back to the build date when the path has no page and no history", () => {
    assert.equal(lastmodForPath("/not-a-page/", new Date("2024-01-15T18:00:00.000Z")), "2024-01-15");
  });
});
