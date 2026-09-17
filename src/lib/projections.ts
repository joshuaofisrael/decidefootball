import { getDefaultFormat, MODEL_VERSION, type ScoringFormat } from "./site";
import type {
  InjuryStatus,
  InjuryStatusCode,
  PlayerStatsWeekly,
  ProjectionResult,
  UncertaintyLabel,
  UsageMetric,
} from "./types";
import { clamp, fantasyPoints, round1, round2 } from "./format";

export const DECAY_WEIGHTS = [1, 0.7, 0.5] as const;
export const USAGE_ADJ_CAP = 0.15;
export const MATCHUP_ADJ_CAP = 0.08;

export interface ProjectionInput {
  playerId: string;
  season: number;
  week: number;
  scoringFormat?: ScoringFormat;
  recentStats: PlayerStatsWeekly[];
  usage: UsageMetric | null;
  priorUsage: UsageMetric | null;
  injury: InjuryStatus | null;
  matchupFactor: number;
  computedAt?: string;
}

function availabilityAdj(code: InjuryStatusCode | undefined): number {
  if (!code || code === "HEALTHY") return 0;
  if (code === "QUESTIONABLE") return -0.12;
  if (code === "DOUBTFUL") return -0.35;
  return 0;
}

function isForcedZero(code: InjuryStatusCode | undefined): boolean {
  return code === "OUT" || code === "IR" || code === "INACTIVE";
}

function uncertaintyFrom(input: ProjectionInput): UncertaintyLabel {
  const weeks = input.recentStats.length;
  const code = input.injury?.statusCode;
  if (isForcedZero(code) || code === "DOUBTFUL" || weeks < 2) return "high";
  if (code === "QUESTIONABLE") return "med";
  return weeks >= 3 ? "low" : "med";
}

function usageAdjustment(input: ProjectionInput): number {
  if (!input.usage || !input.priorUsage) return 0;
  const current =
    input.usage.metrics.targetShare ??
    input.usage.metrics.carryShare ??
    input.usage.metrics.snapShare;
  const prior =
    input.priorUsage.metrics.targetShare ??
    input.priorUsage.metrics.carryShare ??
    input.priorUsage.metrics.snapShare;
  if (prior <= 0) return 0;
  return clamp(((current / prior) - 1) * 0.4, -USAGE_ADJ_CAP, USAGE_ADJ_CAP);
}

/**
 * Metrics-first weekly estimate. Never invents counting stats or injury codes.
 * OUT / IR / INACTIVE force 0. Weights are methodology v0 placeholders.
 */
export function computeProjection(input: ProjectionInput): ProjectionResult {
  const scoringFormat = input.scoringFormat ?? getDefaultFormat();
  const computedAt = input.computedAt ?? new Date().toISOString();
  const code = input.injury?.statusCode;
  const uncertaintyLabel = uncertaintyFrom(input);

  if (isForcedZero(code)) {
    return {
      playerId: input.playerId,
      season: input.season,
      week: input.week,
      scoringFormat,
      pointsMean: 0,
      pointsFloor: 0,
      pointsCeiling: 0,
      uncertaintyLabel,
      modelVersion: MODEL_VERSION,
      computedAt,
      availabilityGated: true,
      components: {
        baseRate: 0,
        usageAdj: 0,
        matchupAdj: 0,
        availabilityAdj: 0,
        trailingWeeksUsed: input.recentStats.length,
      },
    };
  }

  const sorted = [...input.recentStats].sort((a, b) => b.week - a.week);
  let weightSum = 0;
  let pointSum = 0;
  sorted.slice(0, DECAY_WEIGHTS.length).forEach((row, i) => {
    const w = DECAY_WEIGHTS[i] ?? 0;
    pointSum += fantasyPoints(row.stats, scoringFormat) * w;
    weightSum += w;
  });

  const baseRate = weightSum > 0 ? pointSum / weightSum : 0;
  const usageAdj = usageAdjustment(input);
  const matchupAdj = clamp(input.matchupFactor, -MATCHUP_ADJ_CAP, MATCHUP_ADJ_CAP);
  const availAdj = availabilityAdj(code);
  const mean = Math.max(0, round1(baseRate * (1 + usageAdj + matchupAdj + availAdj)));
  const sigma = uncertaintyLabel === "high" ? 0.35 : uncertaintyLabel === "med" ? 0.22 : 0.14;

  return {
    playerId: input.playerId,
    season: input.season,
    week: input.week,
    scoringFormat,
    pointsMean: mean,
    pointsFloor: round1(Math.max(0, mean * (1 - sigma))),
    pointsCeiling: round1(mean * (1 + sigma * 1.15)),
    uncertaintyLabel,
    modelVersion: MODEL_VERSION,
    computedAt,
    availabilityGated: false,
    components: {
      baseRate: round1(baseRate),
      usageAdj: round2(usageAdj),
      matchupAdj: round2(matchupAdj),
      availabilityAdj: round2(availAdj),
      trailingWeeksUsed: sorted.length,
    },
  };
}
