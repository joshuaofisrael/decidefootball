"use client";

import { useEffect } from "react";
import { adsConfigured } from "@/lib/ads";
import { GA4_MEASUREMENT_ID, GA4_SCRIPT_ID, consentStateForChoice, gtagJsSrc } from "@/lib/ga4";
import { useConsent } from "./useConsent";

function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") return;
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
}

/**
 * Banner for an unset choice, plus the same-page loader.
 * A stored accept is applied by the head snippet before paint, so this effect
 * only injects gtag.js when the visitor accepts during this page view.
 * The banner is fixed, so showing or hiding it does not shift the page.
 */
export function ConsentStub() {
  const { choice, ready, save } = useConsent();
  const adsOn = adsConfigured();

  useEffect(() => {
    if (!ready || choice === "unset") return;
    ensureGtag();
    window.gtag?.("consent", "update", consentStateForChoice(choice, adsOn));
    if (choice !== "accept" || document.getElementById(GA4_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = GA4_SCRIPT_ID;
    script.async = true;
    script.src = gtagJsSrc();
    document.head.appendChild(script);
    window.gtag?.("js", new Date());
    window.gtag?.("config", GA4_MEASUREMENT_ID);
  }, [ready, choice, adsOn]);

  if (!ready || choice !== "unset") return null;

  return (
    <div className="consent" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-copy">
      <h2 id="consent-title" className="visually-hidden">
        Analytics consent
      </h2>
      <div className="consent-inner">
        <p id="consent-copy">
          Google Analytics 4 uses cookies and loads only if you accept.{" "}
          {adsOn
            ? "Cloudflare Web Analytics records aggregate page views. Advertising stays off until you choose. Ad scripts do not load without this consent."
            : "Cloudflare Web Analytics records aggregate page views. No advertising pixels are loaded in this build."}
        </p>
        <div>
          <button type="button" className="btn" onClick={() => save("reject")}>
            Decline
          </button>{" "}
          <button type="button" className="btn secondary" onClick={() => save("accept")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
