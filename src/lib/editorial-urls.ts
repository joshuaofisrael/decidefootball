import { decideIndexation } from "./indexation";
import { LEGAL_STUB_PATHS } from "./robots-policy";
import { absoluteUrl } from "./site";

export { LEGAL_STUB_PATHS };

/** Trailing-slash paths that may enter the sitemap when editorial indexation is GREEN. */
export const EDITORIAL_SITEMAP_PATHS = [
  "/about/",
  "/methodology/",
  "/guide/start-sit/",
  "/guide/waiver-radar/",
  "/guide/listed-status/",
] as const;

export function editorialSitemapEntries(): { url: string }[] {
  const decision = decideIndexation({ kind: "editorial" });
  if (decision.indexation !== "index") {
    return [];
  }
  return EDITORIAL_SITEMAP_PATHS.map((path) => ({ url: absoluteUrl(path) }));
}
