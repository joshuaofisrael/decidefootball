import type { MetadataRoute } from "next";
import { editorialSitemapEntries } from "@/lib/editorial-urls";

export const dynamic = "force-static";

/**
 * Sitemap includes only indexable URLs.
 * Fixture sports pages stay out. While sample data is live, that means the
 * editorial pages only: About, Methodology, the start/sit reading guide,
 * and the waiver radar reading guide.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return editorialSitemapEntries();
}
