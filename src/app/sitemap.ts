import type { MetadataRoute } from "next";
import { indexableSitemapEntries } from "@/lib/indexable-urls";

export const dynamic = "force-static";

/**
 * Sitemap lists every real page. Sample desks are included and labeled on
 * the page as sample data. Redirect stubs, including /waiver-wire/, stay out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableSitemapEntries();
}
