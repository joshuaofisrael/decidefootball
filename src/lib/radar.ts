import { clamp } from "./format";
import type { InjuryStatus, Player, ProjectionResult, UsageMetric, WaiverRadarRow } from "./types";

export function waiverUrgency(args: {
  player: Player;
  projection: ProjectionResult;
  rank: number;
  score: number;
  usage: UsageMetric | null;
  priorUsage: UsageMetric | null;
  injury: InjuryStatus | null;
}): WaiverRadarRow {
  const reasons: string[] = [];
  let urgencyScore = 36 + args.projection.pointsMean * 1.6;

  const snap = args.usage?.metrics.snapShare ?? 0;
  const priorSnap = args.priorUsage?.metrics.snapShare ?? snap;
  const snapDelta = snap - priorSnap;
  const status = args.injury?.statusCode ?? "HEALTHY";

  if (status === "OUT" || status === "IR" || status === "INACTIVE") {
    urgencyScore -= 28;
    reasons.push("Fixture status is unavailable. This is a stash, not a start.");
  } else if (status === "QUESTIONABLE" || status === "DOUBTFUL") {
    urgencyScore -= 10;
    reasons.push("Status is not clean. Price the discount.");
  } else {
    reasons.push("Fixture lists no injury designation.");
  }

  if (snapDelta >= 0.08) {
    urgencyScore += 16;
    reasons.push("Snap share is up versus the prior week.");
  } else if (snapDelta <= -0.08) {
    urgencyScore -= 14;
    reasons.push("Snap share is fading versus the prior week.");
  }

  if (args.projection.pointsMean >= 12 && status === "HEALTHY") {
    urgencyScore += 10;
    reasons.push("Healthy with a double-digit mean.");
  }

  if (args.projection.availabilityGated) {
    urgencyScore = Math.min(urgencyScore, 28);
  }

  const bounded = Math.round(clamp(urgencyScore, 6, 97));
  let urgency: WaiverRadarRow["urgency"] = "stash";
  if (bounded >= 72 && status === "HEALTHY") urgency = "hot";
  else if (bounded >= 55 && snapDelta > 0) urgency = "rising";
  else if (bounded < 38 || args.projection.availabilityGated || snapDelta < -0.08) urgency = "fade";

  if (urgency === "hot") reasons.unshift("Radar: claim this if the bench is dead weight.");
  if (urgency === "rising") reasons.unshift("Radar: role is moving the right way.");
  if (urgency === "stash") reasons.unshift("Radar: hold if you have a bench spot.");
  if (urgency === "fade") reasons.unshift("Radar: do not spend FAAB chasing this.");

  return {
    rank: args.rank,
    player: args.player,
    projection: args.projection,
    score: args.score,
    urgency,
    urgencyScore: bounded,
    reasons: [...new Set(reasons)],
  };
}

export function urgencyLabel(urgency: WaiverRadarRow["urgency"]): string {
  if (urgency === "hot") return "Hot claim";
  if (urgency === "rising") return "Rising";
  if (urgency === "fade") return "Fade";
  return "Stash";
}
