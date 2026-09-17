import type { MetadataRoute } from "next";
import { decideIndexation } from "@/lib/indexation";

/**
 * Sitemap includes only indexable URLs.
 * Phase-1 fixture pages and draft legal shells are noindex, so this is empty
 * until licensed GREEN data + quality gates pass.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const fixture = decideIndexation({ sourceClass: "FIXTURE" });
  if (fixture.indexation !== "index") {
    return [];
  }
  return [];
}
