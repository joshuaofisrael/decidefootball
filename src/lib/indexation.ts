import {
  getComplianceGate,
  isFixtureMode,
  isKillSwitchActive,
  sourceIsPublishable,
} from "./compliance";
import type { Indexation, SourceClass } from "./types";

export interface IndexDecision {
  indexation: Indexation;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
  reason: string;
}

export function decideIndexation(args: {
  sourceClass: SourceClass;
  thin?: boolean;
  draftLegal?: boolean;
}): IndexDecision {
  if (isKillSwitchActive()) {
    return {
      indexation: "blocked",
      robots: "noindex,nofollow",
      reason: "COMPLIANCE_GATE=RED kill switch",
    };
  }

  if (args.draftLegal) {
    return {
      indexation: "noindex",
      robots: "noindex,follow",
      reason: "Legal shells are drafts pending counsel and Joshua inputs",
    };
  }

  if (args.thin) {
    return {
      indexation: "noindex",
      robots: "noindex,follow",
      reason: "Thin or incomplete page",
    };
  }

  if (isFixtureMode() || args.sourceClass === "FIXTURE") {
    return {
      indexation: "noindex",
      robots: "noindex,follow",
      reason: "Fixture / sample sports data is never indexable",
    };
  }

  if (!sourceIsPublishable(args.sourceClass)) {
    return {
      indexation: "noindex",
      robots: "noindex,follow",
      reason: `Source class ${args.sourceClass} is not publishable under ${getComplianceGate()}`,
    };
  }

  return {
    indexation: "index",
    robots: "index,follow",
    reason: "GREEN licensed data passed quality gates",
  };
}

export function robotsMeta(decision: IndexDecision): { robots: string } {
  return { robots: decision.robots };
}
