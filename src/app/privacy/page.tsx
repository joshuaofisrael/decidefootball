import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftBanner } from "@/components/LegalDraftBanner";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (draft)",
  ...robotsMeta(decideIndexation({ sourceClass: "GREEN", draftLegal: true })),
};

export default function PrivacyPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy/" },
        ]}
      />
      <LegalDraftBanner />
      <h1>Privacy Policy</h1>
      <p>
        Controller / operator: <strong>{SITE_LEGAL_NAME}</strong>, operating the {SITE_NAME} site
        at {SITE_HOST}. This framework does not mean the site is “GDPR compliant,” “UK GDPR
        compliant,” or “CCPA/CPRA compliant.”
      </p>
      <h2>Who we are</h2>
      <ul>
        <li>
          Public contact for privacy requests:{" "}
          <span className="flag">NEED JOSHUA INPUT</span> (do not invent an email mailbox).
        </li>
        <li>
          Data Protection Officer: <span className="flag">NEED JOSHUA INPUT</span> — do not invent
          a DPO.
        </li>
        <li>
          Postal / registered address: <span className="flag">NEED JOSHUA INPUT</span> — a street
          address has not been invented.
        </li>
      </ul>
      <h2>What we may collect (MVP-oriented)</h2>
      <ul>
        <li>Technical / logs via hosting (IP, user agent, URL, timestamps).</li>
        <li>Analytics only if a product is enabled after cookie/consent decisions.</li>
        <li>Consent records if the first-party consent stub is used.</li>
        <li>Email content if you write to us. Account email is not a default MVP feature.</li>
        <li>Licensed sports data powers content and is generally not your personal data.</li>
      </ul>
      <p>
        AI explanations, if ever enabled, must be generated from structured metrics. Do not send
        user emails or raw IPs to AI providers.
      </p>
      <h2>Purposes</h2>
      <p>
        Operate and secure the site; understand aggregate traffic if analytics are later enabled;
        respond to support and privacy requests; comply with law. Lawful-basis language:{" "}
        <span className="flag">NEED JOSHUA INPUT</span> + attorney review.
      </p>
      <h2>Cookies</h2>
      <p>
        See the Cookie Notice. Non-essential tags stay off until vendors and consent approach are
        decided. Analytics choice: <span className="flag">NEED JOSHUA INPUT</span>.
      </p>
      <h2>Processors (candidates, not a fake live list)</h2>
      <ul>
        <li>Hosting / CDN: <span className="flag">NEED JOSHUA INPUT</span> (Vercel documented as a path, not locked).</li>
        <li>Database / cache: <span className="flag">NEED JOSHUA INPUT</span></li>
        <li>Analytics: <span className="flag">NEED JOSHUA INPUT</span></li>
        <li>AI provider: none in this scaffold</li>
        <li>Sports data vendor: none purchased; fixtures only</li>
      </ul>
      <h2>Retention</h2>
      <p>
        Server logs, analytics, consent records, and support email retention:{" "}
        <span className="flag">NEED JOSHUA INPUT</span> + attorney review. No “keep forever”
        default for visitor identifiers.
      </p>
      <h2>Sharing</h2>
      <p>
        We do not sell personal information in the everyday sense. Whether “sell” / “share” under
        CCPA/CPRA applies is for counsel, especially if ads pixels are ever added (out of MVP).
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, export,
        restrict, or object. How to request: email{" "}
        <span className="flag">NEED JOSHUA INPUT</span>. Do not list GDPR Article numbers as if
        they automatically apply to every visitor.
      </p>
      <h2>Children</h2>
      <p>
        The site is not directed at children under 13 (US) or the digital consent age counsel
        selects elsewhere. We do not knowingly collect personal data from such children.
      </p>
      <h2>Contact</h2>
      <p>
        {SITE_LEGAL_NAME}
        <br />
        Privacy email: <span className="flag">NEED JOSHUA INPUT</span>
        <br />
        Address: <span className="flag">NEED JOSHUA INPUT</span> (none invented)
      </p>
    </div>
  );
}
