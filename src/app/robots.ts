import type { MetadataRoute } from "next";
import { AI_SEARCH_USER_AGENTS, buildRobotsRules } from "@/lib/robots-policy";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["*", ...AI_SEARCH_USER_AGENTS],
      ...buildRobotsRules(),
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
