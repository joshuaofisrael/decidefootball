import { computeCertainty } from "./certainty";
import { meanDeltaLean, type MeanDeltaDecision } from "./recommendations";
import { DEFAULT_SEASON, DEFAULT_WEEK, MODEL_VERSION } from "./site";
import type { CertaintyScore, ProjectionResult, UncertaintyLabel } from "./types";

/**
 * Soft status discount. Negative so `computeCertainty` treats the side as
 * discounted. The magnitude matches the Questionable adjustment in projections.
 * A gated side does not also take this discount.
 */
export const STATUS_DISCOUNT_ADJ = -0.12;

export interface CertaintySideFlags {
  availabilityGated: boolean;
  statusDiscount: boolean;
  uncertainty: UncertaintyLabel;
  trailingWeeksUsed: number;
}

/** Healthy, low-uncertainty, three-week side. A wide mean gap can grade clear or strong. */
export const HEALTHY_SIDE_FLAGS: CertaintySideFlags = {
  availabilityGated: false,
  statusDiscount: false,
  uncertainty: "low",
  trailingWeeksUsed: 3,
};

/** OUT, IR, and INACTIVE zero the mean the desk grades. The typed number is not used. */
export function effectiveDeskMean(mean: number, availabilityGated: boolean): number {
  return availabilityGated ? 0 : mean;
}

export function certaintyProjectionStub(
  sideId: "a" | "b",
  mean: number,
  flags: CertaintySideFlags,
): ProjectionResult {
  const gated = flags.availabilityGated;
  const pointsMean = effectiveDeskMean(mean, gated);
  const weeks = Math.max(0, Math.trunc(flags.trailingWeeksUsed));
  return {
    playerId: sideId === "a" ? "side-a" : "side-b",
    season: DEFAULT_SEASON,
    week: DEFAULT_WEEK,
    scoringFormat: "ppr",
    pointsMean,
    pointsFloor: pointsMean,
    pointsCeiling: pointsMean,
    uncertaintyLabel: flags.uncertainty,
    modelVersion: MODEL_VERSION,
    computedAt: "2026-10-02T00:00:00.000Z",
    availabilityGated: gated,
    components: {
      baseRate: pointsMean,
      usageAdj: 0,
      matchupAdj: 0,
      availabilityAdj: gated || !flags.statusDiscount ? 0 : STATUS_DISCOUNT_ADJ,
      trailingWeeksUsed: weeks,
    },
  };
}

export interface GradedCertainty {
  decision: MeanDeltaDecision;
  certainty: CertaintyScore;
  left: ProjectionResult;
  right: ProjectionResult;
}

/**
 * Build the two stubs the start/sit card would hand to `computeCertainty`.
 * The delta is `meanDeltaLean` on the desk means (gated sides are zero).
 */
export function gradeCertaintyInputs(args: {
  meanA: number;
  meanB: number;
  left: CertaintySideFlags;
  right: CertaintySideFlags;
}): GradedCertainty {
  const left = certaintyProjectionStub("a", args.meanA, args.left);
  const right = certaintyProjectionStub("b", args.meanB, args.right);
  const decision = meanDeltaLean(left.pointsMean, right.pointsMean);
  return {
    decision,
    left,
    right,
    certainty: computeCertainty({
      scoreDelta: decision.scoreDelta,
      left,
      right,
    }),
  };
}
