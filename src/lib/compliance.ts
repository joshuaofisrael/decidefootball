import type { ComplianceGate, SourceClass } from "./types";

export function getComplianceGate(): ComplianceGate {
  const raw = (process.env.COMPLIANCE_GATE ?? "GREEN").toUpperCase();
  if (raw === "RED" || raw === "YELLOW" || raw === "GREEN") return raw;
  return "RED";
}

export function isKillSwitchActive(): boolean {
  return getComplianceGate() === "RED";
}

export function isYellowHold(): boolean {
  return getComplianceGate() === "YELLOW";
}

export function isFixtureMode(): boolean {
  if (process.env.USE_FIXTURES === "false" && process.env.USE_DATABASE === "true") {
    return false;
  }
  return true;
}

export function sourceIsPublishable(sourceClass: SourceClass): boolean {
  const gate = getComplianceGate();
  if (gate === "RED") return false;
  if (sourceClass === "RED") return false;
  if (sourceClass === "FIXTURE") return false;
  if (sourceClass === "YELLOW") return false;
  return gate === "GREEN" && sourceClass === "GREEN";
}

export function robotsAllowIndexing(): boolean {
  return getComplianceGate() === "GREEN";
}

export const FIXTURE_BANNER =
  "SAMPLE / FIXTURE DATA. The numbers on this page are sample data for demonstrating the tool. They are not live licensed NFL stats, injuries, or official reports.";

export const ESTIMATE_DISCLAIMER =
  "Estimates only. Not a guarantee of fantasy points, availability, or outcomes. You decide your roster.";

export const INDEPENDENT_MICROCOPY =
  "Decide Football is an independent fantasy football information site. It is not affiliated with, endorsed by, or sponsored by the NFL, its member clubs, the NFL Players Association, ESPN, Yahoo, or Sleeper. All trademarks belong to their respective owners and are used only to identify them.";
