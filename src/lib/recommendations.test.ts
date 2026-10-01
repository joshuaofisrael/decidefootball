import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { meanDeltaLean, recommendStartSit, TOSS_UP_DELTA } from "./recommendations";
import type { Player, ProjectionResult } from "./types";

function player(id: string): Player {
  return {
    id,
    slug: id,
    displayName: id === "a" ? "Side A" : "Side B",
    position: "RB",
    teamId: "t",
    active: true,
  };
}

function projection(playerId: string, mean: number): ProjectionResult {
  return {
    playerId,
    season: 2026,
    week: 3,
    scoringFormat: "ppr",
    pointsMean: mean,
    pointsFloor: mean - 2,
    pointsCeiling: mean + 3,
    uncertaintyLabel: "low",
    modelVersion: "v0-fixture",
    computedAt: "2026-10-01T00:00:00.000Z",
    availabilityGated: false,
    components: {
      baseRate: mean,
      usageAdj: 0,
      matchupAdj: 0,
      availabilityAdj: 0,
      trailingWeeksUsed: 3,
    },
  };
}

function recommend(meanA: number, meanB: number) {
  return recommendStartSit({
    left: player("a"),
    right: player("b"),
    leftProjection: projection("a", meanA),
    rightProjection: projection("b", meanB),
    season: 2026,
    week: 3,
    scoringFormat: "ppr",
    computedAt: "2026-10-01T00:00:00.000Z",
  });
}

describe("meanDeltaLean", () => {
  it("shares the desk toss-up line of 1.5 points", () => {
    assert.equal(TOSS_UP_DELTA, 1.5);
  });

  it("treats a rounded gap under 1.5 as a toss-up", () => {
    const decision = meanDeltaLean(11.4, 10);
    assert.equal(decision.scoreDelta, 1.4);
    assert.equal(decision.absoluteDelta, 1.4);
    assert.equal(decision.lean, "toss_up");
  });

  it("leans to the higher mean at exactly 1.5 after rounding", () => {
    const favorA = meanDeltaLean(11.5, 10);
    assert.equal(favorA.scoreDelta, 1.5);
    assert.equal(favorA.absoluteDelta, 1.5);
    assert.equal(favorA.lean, "a");

    const favorB = meanDeltaLean(10, 11.5);
    assert.equal(favorB.scoreDelta, -1.5);
    assert.equal(favorB.absoluteDelta, 1.5);
    assert.equal(favorB.lean, "b");
  });

  it("rounds to one decimal before applying the line", () => {
    const up = meanDeltaLean(10.05, 8.6);
    assert.equal(up.scoreDelta, 1.5);
    assert.equal(up.absoluteDelta, 1.5);
    assert.equal(up.lean, "a");

    const inside = meanDeltaLean(10.04, 8.59);
    assert.equal(inside.scoreDelta, 1.4);
    assert.equal(inside.absoluteDelta, 1.4);
    assert.equal(inside.lean, "toss_up");
  });

  it("does not lean when the means match", () => {
    const decision = meanDeltaLean(12, 12);
    assert.equal(decision.scoreDelta, 0);
    assert.equal(decision.absoluteDelta, 0);
    assert.equal(decision.lean, "toss_up");
  });
});

describe("recommendStartSit mean delta", () => {
  it("uses the same lean as meanDeltaLean", () => {
    for (const [meanA, meanB] of [
      [16.2, 9.1],
      [11.4, 10],
      [11.5, 10],
      [10, 11.5],
      [10.05, 8.6],
      [12, 12],
    ] as const) {
      const decision = meanDeltaLean(meanA, meanB);
      const rec = recommend(meanA, meanB);
      assert.equal(rec.scoreDelta, decision.scoreDelta);
      if (decision.lean === "a") {
        assert.equal(rec.lean, "start_left");
        assert.equal(rec.winnerPlayerId, "a");
      } else if (decision.lean === "b") {
        assert.equal(rec.lean, "start_right");
        assert.equal(rec.winnerPlayerId, "b");
      } else {
        assert.equal(rec.lean, "toss_up");
        assert.equal(rec.winnerPlayerId, null);
      }
    }
  });
});
