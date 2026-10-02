import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { EDITORIAL_SITEMAP_PATHS } from "./editorial-urls";
import { FIXTURE_CONTENT_DISALLOW } from "./robots-policy";
import {
  addDropStaticParams,
  parsePlayingTodaySegment,
  parseRankingsPosSlug,
  playingTodaySegment,
  rankingsPosSlug,
  startSitStaticParams,
} from "./static-paths";

describe("playing today segments", () => {
  it("round-trips fixture slugs", () => {
    assert.equal(parsePlayingTodaySegment(playingTodaySegment("jordan-voss")), "jordan-voss");
    assert.equal(parsePlayingTodaySegment("jordan-voss"), null);
  });
});

describe("rankings pos slugs", () => {
  it("parses public week ranking filenames", () => {
    assert.equal(parseRankingsPosSlug(rankingsPosSlug("RB")), "RB");
    assert.equal(parseRankingsPosSlug("rb"), null);
  });
});

describe("startSitStaticParams", () => {
  it("emits both pair orders for static export", () => {
    const slugs = startSitStaticParams().map((row) => row.pair);
    assert.ok(slugs.includes("jordan-voss-vs-noah-crowe"));
    assert.ok(slugs.includes("noah-crowe-vs-jordan-voss"));
  });
});

describe("editorial tool paths", () => {
  it("keeps /guide/certainty/ out of fixture pair exports and fixture disallow prefixes", () => {
    assert.equal(EDITORIAL_SITEMAP_PATHS.includes("/guide/certainty/"), true);
    const fixtureSlugs = [...startSitStaticParams(), ...addDropStaticParams()].map((row) => row.pair);
    assert.equal(fixtureSlugs.includes("certainty"), false);
    for (const prefix of FIXTURE_CONTENT_DISALLOW) {
      assert.equal(
        "/guide/certainty/".startsWith(prefix),
        false,
        `/guide/certainty/ must not match ${prefix}`,
      );
    }
  });
});
