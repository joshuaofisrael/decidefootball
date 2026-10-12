import { isKillSwitchActive } from "./compliance";
import type { Indexation, IndexationKind, SourceClass } from "./types";

export interface IndexDecision {
  indexation: Indexation;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
  reason: string;
}

export interface DecideIndexationArgs {
  /** Product/editorial pages (About, Methodology, reading guides). Does not require licensed sports data. */
  kind?: IndexationKind;
  /** Sports templates may still pass a source class. It does not block indexing. */
  sourceClass?: SourceClass;
  thin?: boolean;
  draftLegal?: boolean;
  /** Static redirect stub. The destination page is the indexable URL. */
  redirectStub?: boolean;
}

/**
 * Pages are indexable by default. Sample desks stay indexable and are labeled
 * as sample data on the page. The RED kill switch, an unfinished legal draft,
 * a thin shell, and a redirect stub are the exceptions.
 */
export function decideIndexation(args: DecideIndexationArgs): IndexDecision {
  if (isKillSwitchActive()) {
    return {
      indexation: "blocked",
      robots: "noindex,nofollow",
      reason: "COMPLIANCE_GATE=RED kill switch",
    };
  }

  if (args.redirectStub) {
    return {
      indexation: "noindex",
      robots: "noindex,follow",
      reason: "Redirect stub. The destination URL is the indexable page.",
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
    return {
      indexation: "index",
      robots: "index,follow",
      reason: "Editorial / product page; licensed sports source not required",
    };
  }

  return {
    indexation: "index",
    robots: "index,follow",
    reason:
      "Indexable by default. Sample desks are labeled as sample data and are not live licensed NFL statistics.",
  };
}

export function robotsMeta(decision: IndexDecision): { robots: string } {
  return { robots: decision.robots };
}
