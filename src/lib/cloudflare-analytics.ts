/**
 * Cloudflare Web Analytics for decidefootball.com.
 * The token is baked in so the static export always ships the beacon.
 * The site id is the dashboard reference Joshua provided; the snippet uses the token only.
 * This is not GA4, AdSense, or an advertising pixel.
 */
export const CLOUDFLARE_WEB_ANALYTICS_SITE_ID = "6f6ca49eef9c432d88976c60a1aa7918";

export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "9c4f710ff2a04acb99c29039ac218aea";

export const CLOUDFLARE_WEB_ANALYTICS_SNIPPET = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}'></script><!-- End Cloudflare Web Analytics -->`;
