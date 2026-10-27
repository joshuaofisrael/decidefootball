import { CONSENT_STORAGE_KEY } from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Google Analytics 4 measurement ID. Baked in so the static export always has it. */
export const GA4_MEASUREMENT_ID = "G-TNS68J7G3M";

export const GA4_SCRIPT_ID = "ga4-gtag";

export const GA_OPTOUT_URL = "https://tools.google.com/dlpage/gaoptout";

export type ConsentSignal = "granted" | "denied";

/** Consent Mode v2 signals. Every one defaults to denied. */
export type ConsentState = {
  analytics_storage: ConsentSignal;
  ad_storage: ConsentSignal;
  ad_user_data: ConsentSignal;
  ad_personalization: ConsentSignal;
};

export const GA4_CONSENT_DEFAULT: ConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

const SIGNALS = [
  "analytics_storage",
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
] as const satisfies readonly (keyof ConsentState)[];

/**
 * Accept turns on analytics storage so GA4 may use cookies.
 * Ad signals stay denied unless this build actually renders ad units.
 * Decline keeps every signal denied.
 */
export function consentStateForChoice(choice: "accept" | "reject", adsOn: boolean): ConsentState {
  if (choice === "reject") return { ...GA4_CONSENT_DEFAULT };
  return {
    analytics_storage: "granted",
    ad_storage: adsOn ? "granted" : "denied",
    ad_user_data: adsOn ? "granted" : "denied",
    ad_personalization: adsOn ? "granted" : "denied",
  };
}

export function gtagJsSrc(id: string = GA4_MEASUREMENT_ID): string {
  return `https://www.googletagmanager.com/gtag/js?id=${id}`;
}

function formatState(state: ConsentState): string {
  return `{${SIGNALS.map((key) => `${key}:'${state[key]}'`).join(",")}}`;
}

/**
 * Inline head script. Sets Consent Mode defaults before the AdSense script.
 * gtag.js is created only when localStorage already says accept, and that
 * element is async. The URL is not a static script src.
 */
export function consentDefaultInlineScript(adsOn: boolean): string {
  const denied = formatState(GA4_CONSENT_DEFAULT);
  const accept = formatState(consentStateForChoice("accept", adsOn));
  const reject = formatState(consentStateForChoice("reject", adsOn));
  const src = gtagJsSrc();
  return (
    "window.dataLayer=window.dataLayer||[];" +
    "function gtag(){dataLayer.push(arguments);}" +
    `gtag('consent','default',${denied});` +
    "try{" +
    `var stored=localStorage.getItem('${CONSENT_STORAGE_KEY}');` +
    "if(stored==='accept'){" +
    `gtag('consent','update',${accept});` +
    `if(!document.getElementById('${GA4_SCRIPT_ID}')){` +
    "var s=document.createElement('script');" +
    `s.id='${GA4_SCRIPT_ID}';` +
    "s.async=true;" +
    `s.src='${src}';` +
    "document.head.appendChild(s);" +
    "}" +
    "gtag('js',new Date());" +
    `gtag('config','${GA4_MEASUREMENT_ID}');` +
    "}else if(stored==='reject'){" +
    `gtag('consent','update',${reject});` +
    "}" +
    "}catch(e){}"
  );
}
