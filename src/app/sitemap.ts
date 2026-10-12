import type { MetadataRoute } from "next";
import { indexableSitemapEntries } from "@/lib/indexable-urls";
import { lastmodForPath } from "@/lib/sitemap-lastmod";

export const dynamic = "force-static";

/**
 * Sitemap lists every real page. Sample desks are included and labeled on
 * the page as sample data. Redirect stubs, including /waiver-wire/, stay out.
 * lastModified is a W3C date (YYYY-MM-DD) from page metadata or git history.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableSitemapEntries().map((entry) => ({
    url: entry.url,
    lastModified: lastmodForPath(new URL(entry.url).pathname),
  }));
}
