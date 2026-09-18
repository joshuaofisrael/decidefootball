import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { waiverUrgency } from "./radar";
import type { InjuryStatus, Player, ProjectionResult, UsageMetric } from "./types";

const player: Player = {
  id: "p",
  slug: "amir-cole",
  displayName: "Amir Cole",
  position: "WR",
  teamId: "t",
  active: true,
};

const projection: ProjectionResult = {
  playerId: "p",
  season: 2026,
  week: 3,
  scoringFormat: "ppr",
  pointsMean: 14,
  pointsFloor: 11,
  pointsCeiling: 17,
  uncertaintyLabel: "med",
  modelVersion: "v0-fixture",
  computedAt: "2026-09-16T18:00:00.000Z",
  availabilityGated: false,
  components: {
    baseRate: 13,
    usageAdj: 0.04,
    matchupAdj: 0,
    availabilityAdj: 0,
    trailingWeeksUsed: 2,
  },
};

const healthy: InjuryStatus = {
  playerId: "p",
  asOf: "2026-09-16T17:30:00.000Z",
  statusCode: "HEALTHY",
  bodyArea: null,
  notesSourceText: null,
  sourceClass: "FIXTURE",
  sourceRunId: "run",
};

function usage(snap: number): UsageMetric {
  return {
    playerId: "p",
    season: 2026,
    week: 3,
    metrics: { snapShare: snap, targetShare: 0.15, carryShare: null, routeShare: 0.6 },
  };
}

describe("waiverUrgency", () => {
  it("marks a healthy climbing role as hot or rising", () => {
    const row = waiverUrgency({
      player,
      projection,
      rank: 1,
      score: 14,
      usage: usage(0.7),
      priorUsage: usage(0.5),
      injury: healthy,
    });
    assert.ok(row.urgency === "hot" || row.urgency === "rising");
    assert.ok(row.urgencyScore >= 55);
  });

  it("fades an availability-gated row", () => {
    const row = waiverUrgency({
      player,
      projection: { ...projection, pointsMean: 0, availabilityGated: true },
      rank: 3,
      score: 0,
      usage: usage(0),
      priorUsage: usage(0.7),
      injury: { ...healthy, statusCode: "OUT" },
    });
    assert.equal(row.urgency, "fade");
  });
});
