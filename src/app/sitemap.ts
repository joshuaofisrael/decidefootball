import type { MetadataRoute } from "next";
import { editorialSitemapEntries } from "@/lib/editorial-urls";

export const dynamic = "force-static";

/**
 * Sitemap includes only indexable URLs.
 * Fixture sports pages stay out. While sample data is live, that means the
 * editorial pages only: About, Methodology, the reading-guides hub,
 * the start/sit reading guide, the waiver radar reading guide, the
 * listed status reading guide, the weekly rankings reading guide, the
 * add/drop reading guide, and the toss-up tool. Fixture /add-drop/ stays out.
 * /guide/add-drop/ does not match that prefix. /guide/toss-up/ is editorial.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return editorialSitemapEntries();
}
