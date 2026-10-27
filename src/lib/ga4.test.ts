import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { CONSENT_STORAGE_KEY } from "./consent";
import {
  GA4_CONSENT_DEFAULT,
  GA4_MEASUREMENT_ID,
  GA4_SCRIPT_ID,
  GA_OPTOUT_URL,
  consentDefaultInlineScript,
  consentStateForChoice,
  gtagJsSrc,
} from "./ga4";

const SIGNALS = [
  "analytics_storage",
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

describe("GA4 consent mode", () => {
  it("uses the site measurement id and the opt-out add-on", () => {
    assert.equal(GA4_MEASUREMENT_ID, "G-TNS68J7G3M");
    assert.equal(GA_OPTOUT_URL, "https://tools.google.com/dlpage/gaoptout");
    assert.equal(gtagJsSrc(), "https://www.googletagmanager.com/gtag/js?id=G-TNS68J7G3M");
  });

  it("defaults every Consent Mode v2 signal to denied", () => {
    for (const signal of SIGNALS) {
      assert.equal(GA4_CONSENT_DEFAULT[signal], "denied", signal);
    }
  });

  it("grants analytics storage on accept and ad storage only when ad units are on", () => {
    assert.deepEqual(consentStateForChoice("accept", false), {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    assert.deepEqual(consentStateForChoice("accept", true), {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    assert.deepEqual(consentStateForChoice("reject", true), GA4_CONSENT_DEFAULT);
    assert.deepEqual(consentStateForChoice("reject", false), GA4_CONSENT_DEFAULT);
  });

  it("keeps gtag.js behind the stored accept choice and loads it async", () => {
    for (const adsOn of [false, true]) {
      const snippet = consentDefaultInlineScript(adsOn);
      const acceptAt = snippet.indexOf("stored==='accept'");
      const rejectAt = snippet.indexOf("stored==='reject'");
      const srcAt = snippet.indexOf("https://www.googletagmanager.com/gtag/js?id=G-TNS68J7G3M");
      assert.equal(snippet.includes(CONSENT_STORAGE_KEY), true);
      assert.equal(snippet.includes("s.async=true"), true);
      assert.equal(snippet.includes(`s.id='${GA4_SCRIPT_ID}'`), true);
      assert.equal(snippet.includes("<script"), false);
      assert.equal(snippet.includes("google-analytics.com"), false);
      assert.ok(acceptAt > snippet.indexOf("gtag('consent','default'"), "default is set first");
      assert.ok(acceptAt < srcAt && srcAt < rejectAt, "library URL stays inside the accept branch");
      for (const signal of SIGNALS) {
        assert.equal(snippet.includes(`${signal}:'denied'`), true, signal);
      }
    }
    assert.equal(consentDefaultInlineScript(false).includes("ad_storage:'granted'"), false);
    assert.equal(consentDefaultInlineScript(true).includes("ad_storage:'granted'"), true);
    assert.equal(consentDefaultInlineScript(false).includes("analytics_storage:'granted'"), true);
  });
});

describe("GA4 legal copy", () => {
  it("names Google Analytics 4, cookies, consent, and both opt-outs on the legal pages", () => {
    for (const file of ["src/app/privacy/page.tsx", "src/app/cookies/page.tsx"]) {
      const text = readFileSync(file, "utf8").replace(/\s+/g, " ");
      assert.equal(text.includes("LegalNotice"), true, file);
      assert.match(text, /Google Analytics 4/);
      assert.match(text, /It uses cookies/);
      assert.match(text, /The Google Analytics script loads only after you accept/);
      assert.match(text, /GA_OPTOUT_URL/);
      assert.match(text, /#analytics-choice/);
      assert.match(text, /pages viewed/);
    }
  });

  it("leaves the AdSense head tag and ads.txt publisher line in place", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    const consentAt = layout.indexOf('id="df-consent-default"');
    const adsenseAt = layout.indexOf("src={ADSENSE_HEAD_SRC}");
    assert.ok(consentAt > -1 && adsenseAt > consentAt);
    assert.match(layout, /crossOrigin="anonymous"/);
    assert.equal(layout.includes("google-adsense-account"), true);
    const ads = readFileSync("public/ads.txt", "utf8");
    assert.equal(ads, "google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0\n");
  });
});
