import { CLOUDFLARE_WEB_ANALYTICS_SNIPPET } from "@/lib/cloudflare-analytics";

/**
 * Always-on Cloudflare Web Analytics. Not gated by the consent stub.
 * Rendered once, as the last node in the shared layout, so the static HTML
 * includes the beacon script. Next's own runtime scripts follow it.
 */
export function CloudflareBeacon() {
  return (
    <div
      id="cf-web-analytics"
      hidden
      dangerouslySetInnerHTML={{ __html: CLOUDFLARE_WEB_ANALYTICS_SNIPPET }}
    />
  );
}
