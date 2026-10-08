import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { FLORIDA_GOVERNING_LAW, SITE_CONTACT_EMAIL, SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "Joshua Israel Ventures LLC is the data controller for Decide Football. Cloudflare Web Analytics is cookieless. Ads are off, so the site sets no AdSense cookies.";

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
        Display ads are off. The Site does not load AdSense and does not set AdSense cookies.
      </p>
      <p>
        The browser may keep a consent choice (<code>df_consent</code>), a watchlist (
        <code>df_watchlist</code>), and a Sunday-mode preference (<code>df_sunday_mode</code>) in
        local storage on the device. The Site does not run an account system.
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
    </div>
  );
}
