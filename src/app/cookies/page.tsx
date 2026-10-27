import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConsentChoices } from "@/components/ConsentChoices";
import { LegalNotice } from "@/components/LegalNotice";
import { GA4_MEASUREMENT_ID, GA_OPTOUT_URL } from "@/lib/ga4";
import { SITE_LEGAL_NAME } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";
import { SITE_CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const PAGE_DATE = { lastModified: "2026-10-27" } as const;

export const metadata = pageMetadata({
  path: "/cookies/",
  title: "Cookie notice",
  description: `How ${SITE_NAME} uses cookieless Cloudflare Web Analytics. Google Analytics 4 uses cookies and loads only with consent. Google AdSense is set up and may set ad cookies.`,
  indexation: { kind: "editorial" },
});

export default function CookiesPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Cookies", path: "/cookies/" },
        ]}
      />
      <h1>Cookie notice</h1>
      <LegalNotice />
      <p>
        This notice describes cookies and similar storage on {SITE_NAME}, a brand of{" "}
        {SITE_LEGAL_NAME}.
      </p>
      <h2>Analytics</h2>
      <p>
        Cloudflare Web Analytics loads on every page and records aggregate page views. It is
        cookieless. It does not set an analytics cookie, and it is not an advertising pixel.
      </p>
      <h2>Google Analytics 4</h2>
      <p>
        The Site uses Google Analytics 4 ({GA4_MEASUREMENT_ID}). It collects pages viewed, the time
        of the visit, a general location, the browser and device, and the referring site. It uses
        cookies. The Google Analytics script loads only after you accept. Until then, analytics
        storage stays denied and the script is not requested.
      </p>
      <p>
        You can accept or decline in <a href="#analytics-choice">your analytics choice</a> below.
        You can change that choice later. The same control is on the{" "}
        <a href="/privacy/#analytics-choice">privacy policy</a>. You can also opt out with the{" "}
        <a href={GA_OPTOUT_URL}>Google Analytics Opt-out Browser Add-on</a>.
      </p>
      <ConsentChoices />
      <h2>Advertising</h2>
      <p>
        The Site loads the Google AdSense script. Google and its partners may set cookies to serve
        and measure ads. No ad units are shown yet. EU, UK, and Swiss visitors see a consent choice
        from Google. See the <a href="/privacy/">Privacy Policy</a> for opt-out links.
      </p>
      <h2>Local storage</h2>
      <p>The browser on this device may store these first-party values:</p>
      <ul>
        <li>
          <code>df_consent</code> — the accept or decline choice for Google Analytics 4. The script
          loads only after accept.
        </li>
        <li>
          <code>df_watchlist</code> — names saved on the watchlist.
        </li>
        <li>
          <code>df_sunday_mode</code> — the Sunday-mode preference.
        </li>
      </ul>
      <p>Those values stay in local storage. They are not an account.</p>
      <h2>Contact</h2>
      <p>
        Operator: {SITE_LEGAL_NAME}.
        <br />
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
      </p>
      <p>{`Last updated: ${PAGE_DATE.lastModified}.`}</p>
    </div>
  );
}
