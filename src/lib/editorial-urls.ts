import { decideIndexation } from "./indexation";
import { absoluteUrl } from "./site";

/** Trailing-slash paths that may enter the sitemap when editorial indexation is GREEN. */
export const EDITORIAL_SITEMAP_PATHS = ["/about/", "/methodology/"] as const;

export function editorialSitemapEntries(): { url: string }[] {
  const decision = decideIndexation({ kind: "editorial" });
  if (decision.indexation !== "index") {
    return [];
  }
  return EDITORIAL_SITEMAP_PATHS.map((path) => ({ url: absoluteUrl(path) }));
}
