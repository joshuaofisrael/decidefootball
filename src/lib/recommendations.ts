import { computeCertainty } from "./certainty";
import { MODEL_VERSION, type ScoringFormat } from "./site";
import type {
  AddDropRecommendation,
  Player,
  ProjectionResult,
  StartSitRecommendation,
  WaiverRank,
} from "./types";
import { round1 } from "./format";

const TOSS_UP_DELTA = 1.5;

export function recommendStartSit(args: {
  left: Player;
  right: Player;
  leftProjection: ProjectionResult;
  rightProjection: ProjectionResult;
  season: number;
  week: number;
  scoringFormat: ScoringFormat;
  computedAt?: string;
}): StartSitRecommendation {
  const { left, right, leftProjection, rightProjection } = args;
  const scoreDelta = round1(leftProjection.pointsMean - rightProjection.pointsMean);
  let lean: StartSitRecommendation["lean"] = "toss_up";
  let winnerPlayerId: string | null = null;

  if (scoreDelta >= TOSS_UP_DELTA) {
    lean = "start_left";
    winnerPlayerId = left.id;
  } else if (scoreDelta <= -TOSS_UP_DELTA) {
    lean = "start_right";
    winnerPlayerId = right.id;
  }

  return {
    type: "start_sit",
    left,
    right,
    season: args.season,
    week: args.week,
    scoringFormat: args.scoringFormat,
    winnerPlayerId,
    lean,
    scoreDelta,
    certainty: computeCertainty({ scoreDelta, left: leftProjection, right: rightProjection }),
    leftProjection,
    rightProjection,
    modelVersion: MODEL_VERSION,
    computedAt: args.computedAt ?? new Date().toISOString(),
  };
}

export function recommendAddDrop(args: {
  left: Player;
  right: Player;
  leftProjection: ProjectionResult;
  rightProjection: ProjectionResult;
  season: number;
  week: number;
  scoringFormat: ScoringFormat;
  computedAt?: string;
}): AddDropRecommendation {
  const start = recommendStartSit(args);
  const lean =
    start.lean === "start_left"
      ? "add_left"
      : start.lean === "start_right"
        ? "add_right"
        : "toss_up";

  return {
    type: "add_drop",
    left: args.left,
    right: args.right,
    season: args.season,
    week: args.week,
    scoringFormat: args.scoringFormat,
    addPlayerId: start.winnerPlayerId,
    dropPlayerId:
      start.winnerPlayerId === args.left.id
        ? args.right.id
        : start.winnerPlayerId === args.right.id
          ? args.left.id
          : null,
    lean,
    scoreDelta: start.scoreDelta,
    leftProjection: args.leftProjection,
    rightProjection: args.rightProjection,
    modelVersion: MODEL_VERSION,
    computedAt: start.computedAt,
  };
}

export function rankPlayersByProjection(
  rows: { player: Player; projection: ProjectionResult }[],
): WaiverRank[] {
  const sorted = [...rows].sort((a, b) => {
    if (b.projection.pointsMean !== a.projection.pointsMean) {
      return b.projection.pointsMean - a.projection.pointsMean;
    }
    return b.projection.pointsCeiling - a.projection.pointsCeiling;
  });

  return sorted.map((row, i) => ({
    rank: i + 1,
    player: row.player,
    projection: row.projection,
    score: row.projection.pointsMean,
  }));
}

export function startLabel(rec: StartSitRecommendation): string {
  if (rec.lean === "start_left") return `Start ${rec.left.displayName}`;
  if (rec.lean === "start_right") return `Start ${rec.right.displayName}`;
  return "Toss-up. Lean neither side on mean alone.";
}

export function addDropLabel(rec: AddDropRecommendation): string {
  if (rec.lean === "add_left") {
    return `Add ${rec.left.displayName} over ${rec.right.displayName}`;
  }
  if (rec.lean === "add_right") {
    return `Add ${rec.right.displayName} over ${rec.left.displayName}`;
  }
  return "Toss-up. No add/drop edge on mean alone.";
}
