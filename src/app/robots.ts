import type { MetadataRoute } from "next";
import { robotsAllowIndexing } from "@/lib/compliance";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const allow = robotsAllowIndexing();
  return {
    rules: {
      userAgent: "*",
      allow: allow ? "/" : undefined,
      disallow: allow ? ["/api/", "/health/"] : "/",
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
