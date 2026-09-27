import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CLOUDFLARE_WEB_ANALYTICS_SITE_ID,
  CLOUDFLARE_WEB_ANALYTICS_SNIPPET,
  CLOUDFLARE_WEB_ANALYTICS_TOKEN,
} from "./cloudflare-analytics";

const EXACT_SNIPPET =
  `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "9c4f710ff2a04acb99c29039ac218aea"}'></script><!-- End Cloudflare Web Analytics -->`;

describe("Cloudflare Web Analytics beacon", () => {
  it("uses the provided site id and token", () => {
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SITE_ID, "6f6ca49eef9c432d88976c60a1aa7918");
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_TOKEN, "9c4f710ff2a04acb99c29039ac218aea");
  });

  it("is the exact snippet once, with no other measurement products", () => {
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SNIPPET, EXACT_SNIPPET);
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SNIPPET.split("data-cf-beacon").length - 1, 1);
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SNIPPET.includes("googletagmanager"), false);
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SNIPPET.includes("adsbygoogle"), false);
    assert.equal(CLOUDFLARE_WEB_ANALYTICS_SNIPPET.includes("google-analytics"), false);
  });
});
