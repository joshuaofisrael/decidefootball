import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { FLORIDA_GOVERNING_LAW, SITE_CONTACT_EMAIL, SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "Joshua Israel Ventures LLC is the data controller for Decide Football. Cloudflare Web Analytics is cookieless. Google AdSense is set up on the site. Google and its partners may use cookies to serve ads.";

const PAGE_DATE = { lastModified: "2026-10-23" } as const;

export const metadata = pageMetadata({
  path: "/privacy/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function PrivacyPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy/" },
        ]}
      />
      <h1>Privacy Policy</h1>
      <p>
        {`${SITE_LEGAL_NAME} is the data controller for the ${SITE_NAME} website at ${SITE_HOST}. ${SITE_NAME} is a brand of ${SITE_LEGAL_NAME}.`}
      </p>

      <h2>What the site collects</h2>
      <p>
        The Site loads Cloudflare Web Analytics on each page. That measurement is cookieless. It
        records aggregate page views. It is not an advertising pixel.
      </p>
      <p>
        The browser may keep a consent choice (<code>df_consent</code>), a watchlist (
        <code>df_watchlist</code>), and a Sunday-mode preference (<code>df_sunday_mode</code>) in
        local storage on the device. The Site does not run an account system.
      </p>

      <h2>Advertising</h2>
      <p>
        The Site loads the Google AdSense script. Google and its partners use cookies and similar
        technologies to serve and measure ads, including ads based on your earlier visits to this
        or other websites. No ad units are shown yet. Learn how Google uses data in advertising at{" "}
        <a href="https://policies.google.com/technologies/ads">policies.google.com/technologies/ads</a>.
        You can opt out of personalized ads in{" "}
        <a href="https://adssettings.google.com">Google Ads Settings</a>.
      </p>
      <p>
        Visitors in the European Economic Area, the United Kingdom, and Switzerland see a consent
        choice from Google before ad cookies are used.
      </p>
      <p>
        California residents can opt out of the sale or sharing of personal information for
        advertising through Google Ads Settings at{" "}
        <a href="https://adssettings.google.com">adssettings.google.com</a>. We do not sell
        personal information ourselves.
      </p>

      <h2>Contact form</h2>
      <p>
        Contact form submissions are processed by FormSubmit (formsubmit.co) and emailed to us. The
        form sends the name, email address, and message you enter. We use them only to read and
        answer your message.
      </p>

      <h2>Governing law</h2>
      <p>{`This Privacy Policy is ${FLORIDA_GOVERNING_LAW}.`}</p>

      <h2>Contact</h2>
      <p>
        Privacy questions can be sent to{" "}
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>.
        <br />
        Data controller: {SITE_LEGAL_NAME}.
      </p>
      <p>{`Last updated: ${PAGE_DATE.lastModified}.`}</p>
    </div>
  );
}
