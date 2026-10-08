export const SITE_NAME = "Decide Football";
export const SITE_HOST = "decidefootball.com";
export const SITE_LEGAL_NAME = "Joshua Israel Ventures LLC";
export const SITE_YEAR = 2026;
export const SITE_CONTACT_EMAIL = "joshuaofisrael@gmail.com";

/** Exact contiguous footer string required on every page. */
export const OPERATOR_VISIBLE_LINE = `Operated by ${SITE_LEGAL_NAME}`;

export const COPYRIGHT_LINE = `© ${SITE_YEAR} ${SITE_LEGAL_NAME}. All rights reserved. ${SITE_NAME} is owned and operated by ${SITE_LEGAL_NAME}.`;

export const BRAND_SENTENCE = `${SITE_NAME} is a brand of ${SITE_LEGAL_NAME}.`;

export const DEFAULT_SEASON = 2026;
export const DEFAULT_WEEK = 3;
export const MODEL_VERSION = "v0-fixture";

export const POSITIONS = ["QB", "RB", "WR", "TE"] as const;
export type SkillPosition = (typeof POSITIONS)[number];

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_HOST}`;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${getSiteUrl()}${withSlash}`;
}

export function getDisplayTimeZone(): string {
  return process.env.NEXT_PUBLIC_DISPLAY_TZ ?? "America/New_York";
}

export type ScoringFormat = "ppr" | "half" | "std";

export function getDefaultFormat(): ScoringFormat {
  const raw = process.env.NEXT_PUBLIC_DEFAULT_FORMAT;
  if (raw === "half" || raw === "std" || raw === "ppr") return raw;
  return "ppr";
}

export function formatLabel(format: ScoringFormat): string {
  if (format === "ppr") return "PPR";
  if (format === "half") return "Half-PPR";
  return "Standard";
}
