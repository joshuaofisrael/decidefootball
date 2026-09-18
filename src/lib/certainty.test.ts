import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { certaintyLabel, computeCertainty } from "./certainty";
import type { ProjectionResult } from "./types";

function proj(partial: Partial<ProjectionResult>): ProjectionResult {
  return {
    playerId: "p",
    season: 2026,
    week: 3,
    scoringFormat: "ppr",
    pointsMean: 14,
    pointsFloor: 11,
    pointsCeiling: 18,
    uncertaintyLabel: "low",
    modelVersion: "v0-fixture",
    computedAt: "2026-09-16T18:00:00.000Z",
    availabilityGated: false,
    components: {
      baseRate: 14,
      usageAdj: 0,
      matchupAdj: 0,
      availabilityAdj: 0,
      trailingWeeksUsed: 3,
    },
    ...partial,
  };
}

describe("computeCertainty", () => {
  it("scores a wide healthy gap as strong or clear", () => {
    const result = computeCertainty({
      scoreDelta: 13.2,
      left: proj({ pointsMean: 24.6 }),
      right: proj({ playerId: "q", pointsMean: 11.4 }),
    });
    assert.ok(result.score >= 58);
    assert.ok(result.label === "clear" || result.label === "strong");
  });

  it("cuts the score when one side is gated to zero", () => {
    const healthy = computeCertainty({
      scoreDelta: 8,
      left: proj({ pointsMean: 18 }),
      right: proj({ playerId: "q", pointsMean: 10 }),
    });
    const gated = computeCertainty({
      scoreDelta: 8,
      left: proj({ pointsMean: 18 }),
      right: proj({
        playerId: "q",
        pointsMean: 0,
        availabilityGated: true,
        uncertaintyLabel: "high",
      }),
    });
    assert.ok(gated.score < healthy.score);
    assert.match(gated.reasons.join(" "), /availability-gated/);
  });

  it("maps bands without gaps", () => {
    assert.equal(certaintyLabel(79), "strong");
    assert.equal(certaintyLabel(58), "clear");
    assert.equal(certaintyLabel(40), "lean");
    assert.equal(certaintyLabel(39), "thin");
  });
});
