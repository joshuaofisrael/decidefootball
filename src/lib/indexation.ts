import {
  getComplianceGate,
  isFixtureMode,
  isKillSwitchActive,
  sourceIsPublishable,
} from "./compliance";
import type { Indexation, IndexationKind, SourceClass } from "./types";

export interface IndexDecision {
  indexation: Indexation;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
  reason: string;
}

export interface DecideIndexationArgs {
  /** Product/editorial pages (About, Methodology). Does not require licensed sports data. */
  kind?: IndexationKind;
  /** Sports templates must pass a source class. Ignored for editorial kind. */
  sourceClass?: SourceClass;
  thin?: boolean;
  draftLegal?: boolean;
}

export function decideIndexation(args: DecideIndexationArgs): IndexDecision {
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

  if (args.kind === "editorial") {
    if (getComplianceGate() !== "GREEN") {
      return {
        indexation: "noindex",
        robots: "noindex,follow",
        reason: `Editorial pages stay noindex while COMPLIANCE_GATE=${getComplianceGate()}`,
      };
    }
    return {
      indexation: "index",
      robots: "index,follow",
      reason: "Editorial / product page; licensed sports source not required",
    };
  }

  if (isFixtureMode() || args.sourceClass === "FIXTURE" || !args.sourceClass) {
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
