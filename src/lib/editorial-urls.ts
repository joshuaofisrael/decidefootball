import { decideIndexation } from "./indexation";
import { LEGAL_STUB_DISALLOW } from "./robots-policy";
import { absoluteUrl } from "./site";

/** Trailing-slash paths that may enter the sitemap when editorial indexation is GREEN. */
export const EDITORIAL_SITEMAP_PATHS = ["/about/", "/methodology/"] as const;

/** Draft legal shells stay human-readable but never enter the sitemap. */
export const LEGAL_STUB_PATHS = LEGAL_STUB_DISALLOW;

export function editorialSitemapEntries(): { url: string }[] {
  const decision = decideIndexation({ kind: "editorial" });
  if (decision.indexation !== "index") {
    return [];
  }
  return EDITORIAL_SITEMAP_PATHS.map((path) => ({ url: absoluteUrl(path) }));
}
