import { clamp } from "./format";
import type { CertaintyLabel, CertaintyScore, ProjectionResult } from "./types";

export function certaintyLabel(score: number): CertaintyLabel {
  if (score >= 78) return "strong";
  if (score >= 58) return "clear";
  if (score >= 40) return "lean";
  return "thin";
}

export function computeCertainty(args: {
  scoreDelta: number;
  left: ProjectionResult;
  right: ProjectionResult;
}): CertaintyScore {
  const delta = Math.abs(args.scoreDelta);
  const reasons: string[] = [];
  let score = 28 + Math.min(44, delta * 5.5);

  if (delta >= 6) reasons.push("Mean gap is wide enough to carry the call.");
  else if (delta >= 1.5) reasons.push("Mean gap clears the 1.5-point toss-up line.");
  else reasons.push("Mean gap sits inside the toss-up band.");

  for (const side of [args.left, args.right]) {
    if (side.availabilityGated) {
      score -= 22;
      reasons.push("One side is availability-gated to zero.");
    } else if (side.components.availabilityAdj < 1) {
      score -= 10;
      reasons.push("One side carries a status discount.");
    }
    if (side.uncertaintyLabel === "high") {
      score -= 12;
      reasons.push("High uncertainty on at least one side.");
    } else if (side.uncertaintyLabel === "med") {
      score -= 5;
    }
  }

  const weeks = Math.min(args.left.components.trailingWeeksUsed, args.right.components.trailingWeeksUsed);
  if (weeks >= 3) {
    score += 8;
    reasons.push("Both sides have three trailing weeks in the sample.");
  } else if (weeks <= 1) {
    score -= 8;
    reasons.push("Thin trailing sample.");
  }

  const bounded = Math.round(clamp(score, 8, 96));
  return { score: bounded, label: certaintyLabel(bounded), reasons: unique(reasons) };
}

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

export function certaintyCopy(label: CertaintyLabel): string {
  if (label === "strong") return "Strong call";
  if (label === "clear") return "Clear lean";
  if (label === "lean") return "Soft lean";
  return "Thin edge";
}
