import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { SITE_CONTACT_EMAIL, SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Terms of Use";
const description =
  "Terms of Use for Decide Football, a brand owned by Joshua Israel Ventures LLC. General information only. Governed by the laws of the State of Michigan.";

export const metadata = pageMetadata({
  path: "/terms/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function TermsPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms/" },
        ]}
      />
      <h1>Terms of Use</h1>
      <p>
        {`These Terms are a contract between you and ${SITE_LEGAL_NAME}. ${SITE_LEGAL_NAME} is the contracting party for the ${SITE_NAME} website at ${SITE_HOST} (the “Site”). ${SITE_NAME} is a brand owned by ${SITE_LEGAL_NAME}.`}
      </p>
      <p>
        By accessing or using the Site, you agree to these Terms. If you do not agree, do not
        use the Site.
      </p>

      <h2>General information only</h2>
      <p>
        Content on the Site is general information only. It is not financial advice, not
        gambling or betting advice, not legal advice, and not other professional advice. Using
        the Site does not create a professional, advisory, fiduciary, or client relationship
        with {SITE_LEGAL_NAME}.
      </p>
      <p>
        The Site provides independent fantasy football information, analysis, rankings,
        comparisons, and related commentary for informational and entertainment purposes. It
        does not provide gambling, sports betting, wagering accounts, or real-money gaming
        services.
      </p>
      <p>
        Projections, rankings, start/sit guidance, waiver suggestions, and similar outputs are
        model estimates only. They are not promises, guarantees, or official league or club
        data. You are solely responsible for your roster and fantasy decisions.
      </p>
      <p>
        The Site is not affiliated with, endorsed by, or sponsored by the NFL, its member clubs,
        the NFL Players Association, ESPN, Yahoo, or Sleeper.
      </p>

      <h2>License to use the Site</h2>
      <p>
        {SITE_LEGAL_NAME} grants a limited, non-exclusive, non-transferable, revocable license
        for personal, non-commercial use of the Site. You must not scrape or systematically
        download the Site in bulk, bypass access controls, use the Site to build a competing
        data feed, misrepresent affiliation, or use the Site unlawfully.
      </p>

      <h2>Intellectual property</h2>
      <p>
        {SITE_NAME} is a brand owned by {SITE_LEGAL_NAME}. Site design, original text, and
        original analysis are owned by {SITE_LEGAL_NAME} or its licensors. No license is granted
        to NFL marks, club marks, player publicity rights, or third-party logos. Player and team
        names may appear for identification and fantasy discussion only. NFL, NFL club names,
        ESPN, Yahoo, Sleeper, and other third-party names are trademarks of their respective
        owners. The Site uses them in plain text only to identify those organizations and does
        not claim affiliation, sponsorship, or endorsement.
      </p>

      <h2>Warranty disclaimer</h2>
      <p>
        To the maximum extent permitted by law, the Site and all content are provided &quot;as
        is&quot; and &quot;as available,&quot; without warranties of any kind, whether express or
        implied, including warranties of accuracy, merchantability, fitness for a particular
        purpose, and non-infringement. {SITE_LEGAL_NAME} does not warrant that the Site will be
        uninterrupted or error-free, or that projections, rankings, reported statuses, or other
        content will be accurate, complete, or current.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {SITE_LEGAL_NAME} and its members, officers, and
        agents will not be liable for any indirect, incidental, special, consequential, or
        punitive damages, or for lost profits, lost data, or fantasy outcomes, arising out of or
        related to your use of the Site or your reliance on its content, whether in contract,
        tort, or otherwise. Some jurisdictions do not allow certain limitations, so parts of
        this section may not apply to you.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Michigan, without regard to
        conflict-of-law rules.
      </p>

      <h2>Contact</h2>
      <p>
        {SITE_LEGAL_NAME}
        <br />
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}
