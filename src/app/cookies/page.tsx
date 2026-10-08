import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/cookies/",
  title: "Cookie notice",
  description: `How ${SITE_NAME} uses cookieless Cloudflare Web Analytics. Ads are off, so no AdSense cookies are set.`,
  indexation: { sourceClass: "GREEN", draftLegal: true },
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
      <p>
        This notice describes cookies and similar storage on {SITE_NAME}, a brand of{" "}
        {SITE_LEGAL_NAME}.
      </p>
      <h2>Analytics</h2>
      <p>
        Cloudflare Web Analytics loads on every page and records aggregate page views. It is
        cookieless. It does not set an analytics cookie, and it is not an advertising pixel.
      </p>
      <h2>Advertising</h2>
      <p>
        Display ads are off. The Site does not load AdSense and does not set AdSense cookies.
      </p>
      <h2>Local storage</h2>
      <p>The browser on this device may store these first-party values:</p>
      <ul>
        <li>
          <code>df_consent</code> — the consent choice.
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
    </div>
  );
}
