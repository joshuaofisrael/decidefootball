import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftBanner } from "@/components/LegalDraftBanner";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie notice (draft)",
  ...robotsMeta(decideIndexation({ sourceClass: "GREEN", draftLegal: true })),
};

export default function CookiesPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Cookies", path: "/cookies/" },
        ]}
      />
      <LegalDraftBanner />
      <h1>Cookie notice</h1>
      <p>
        This notice covers cookies, local storage, pixels, and similar technologies on {SITE_NAME}.
        Cloudflare Web Analytics is on for aggregate page views. Other non-essential tags stay off
        until counsel and Joshua confirm vendors.
      </p>
      <h2>Categories</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong> — security, consent preference storage, basic
          session integrity.
        </li>
        <li>
          <strong>Analytics</strong> — Cloudflare Web Analytics loads on every page and records
          aggregate page views. It is not an advertising pixel. GA4 stays off unless you accept
          the consent stub and <code>NEXT_PUBLIC_GA4_ID</code> is set.
        </li>
        <li>
          <strong>Preferences</strong> — first-party keys such as the consent choice{" "}
          <code>df_consent</code>.
        </li>
        <li>
          <strong>Marketing / advertising</strong> — gated. AdSense scripts load only when{" "}
          <code>NEXT_PUBLIC_ADS_ENABLED=true</code>, a client ID is present at export, and the
          visitor accepts the consent stub. Slots are labeled “Advertisement” and are never
          placed inside start/sit recommendation cards.
        </li>
      </ul>
      <h2>Vendors actually used</h2>
      <p>
        List only real tools when live. Hosting / CDN cookies:{" "}
        <span className="flag">NEED JOSHUA INPUT</span>. Analytics product: Cloudflare Web
        Analytics. CMP:{" "}
        <span className="flag">NEED JOSHUA INPUT</span> or none. Do not invent cookie names or
        third parties.
      </p>
      <h2>Consent and control</h2>
      <p>
        Chosen approach: <span className="flag">NEED JOSHUA INPUT</span>. This scaffold ships a
        first-party reject/accept stub. Browser controls can block cookies; some features may not
        work.
      </p>
      <p>
        Publishing this notice does not by itself make the Site GDPR/UK GDPR/CCPA “compliant.”
      </p>
      <h2>Contact</h2>
      <p>
        <span className="flag">NEED JOSHUA INPUT</span> privacy/contact email.
        <br />
        Operator: {SITE_LEGAL_NAME}.
        <br />
        Address: <span className="flag">NEED JOSHUA INPUT</span> — none invented.
      </p>
    </div>
  );
}
