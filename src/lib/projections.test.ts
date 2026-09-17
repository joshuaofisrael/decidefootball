import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computeProjection } from "./projections";
import { recommendStartSit } from "./recommendations";
import { decideIndexation } from "./indexation";
import type { InjuryStatus, Player, PlayerStatsWeekly } from "./types";

const stats: PlayerStatsWeekly = {
  playerId: "p1",
  season: 2026,
  week: 1,
  stats: {
    passAtt: 0,
    passYds: 0,
    passTd: 0,
    interceptions: 0,
    rushAtt: 18,
    rushYds: 90,
    rushTd: 1,
    targets: 3,
    receptions: 2,
    recYds: 20,
    recTd: 0,
    fumblesLost: 0,
  },
};

const healthy: InjuryStatus = {
  playerId: "p1",
  asOf: "2026-09-16T17:30:00.000Z",
  statusCode: "HEALTHY",
  bodyArea: null,
  notesSourceText: null,
  sourceClass: "FIXTURE",
  sourceRunId: "run",
};

describe("computeProjection", () => {
  it("forces OUT to zero and does not invent stats", () => {
    const result = computeProjection({
      playerId: "p1",
      season: 2026,
      week: 3,
      recentStats: [stats],
      usage: null,
      priorUsage: null,
      injury: { ...healthy, statusCode: "OUT" },
      matchupFactor: 0.5,
      computedAt: "2026-09-16T18:00:00.000Z",
    });
    assert.equal(result.pointsMean, 0);
    assert.equal(result.pointsFloor, 0);
    assert.equal(result.pointsCeiling, 0);
    assert.equal(result.availabilityGated, true);
  });

  it("computes a positive mean from structured inputs", () => {
    const result = computeProjection({
      playerId: "p1",
      season: 2026,
      week: 3,
      recentStats: [stats],
      usage: null,
      priorUsage: null,
      injury: healthy,
      matchupFactor: 0,
      computedAt: "2026-09-16T18:00:00.000Z",
    });
    assert.ok(result.pointsMean > 0);
    assert.ok(result.pointsFloor <= result.pointsMean);
    assert.ok(result.pointsCeiling >= result.pointsMean);
  });
});

describe("recommendStartSit", () => {
  it("uses computed means only", () => {
    const left: Player = {
      id: "a",
      slug: "a",
      displayName: "A",
      position: "RB",
      teamId: "t",
      active: true,
    };
    const right: Player = { ...left, id: "b", slug: "b", displayName: "B" };
    const base = computeProjection({
      playerId: "a",
      season: 2026,
      week: 3,
      recentStats: [stats],
      usage: null,
      priorUsage: null,
      injury: healthy,
      matchupFactor: 0,
      computedAt: "2026-09-16T18:00:00.000Z",
    });
    const rec = recommendStartSit({
      left,
      right,
      leftProjection: { ...base, pointsMean: 16.2 },
      rightProjection: { ...base, playerId: "b", pointsMean: 9.1 },
      season: 2026,
      week: 3,
      scoringFormat: "ppr",
      computedAt: "2026-09-16T18:00:00.000Z",
    });
    assert.equal(rec.winnerPlayerId, "a");
    assert.equal(rec.scoreDelta, 7.1);
  });
});

describe("decideIndexation", () => {
  it("noindexes fixture pages even when gate is GREEN", () => {
    const decision = decideIndexation({ sourceClass: "FIXTURE" });
    assert.equal(decision.indexation, "noindex");
  });
});
