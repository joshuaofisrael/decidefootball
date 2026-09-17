import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
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
