import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftBanner } from "@/components/LegalDraftBanner";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use (draft)",
  description:
    "Draft terms of use for Decide Football. Unfinished operator inputs remain; this page is not offered for search indexing.",
  ...robotsMeta(decideIndexation({ sourceClass: "GREEN", draftLegal: true })),
};

export default function TermsPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms/" },
        ]}
      />
      <LegalDraftBanner />
      <h1>Terms of Use</h1>
      <p>
        By accessing or using the {SITE_NAME} website at {SITE_HOST} (the “Site”), you agree to
        these Terms. If you do not agree, do not use the Site.
      </p>
      <p>
        The Site is operated by <strong>{SITE_LEGAL_NAME}</strong> (“Operator”). Joshua Israel
        personally is not named as the Site operator in these Terms.
      </p>
      <h2>What the Site is (and is not)</h2>
      <p>
        The Site provides independent fantasy football information, analysis, rankings,
        comparisons, and related commentary for informational and entertainment purposes.
      </p>
      <p>
        The Site’s MVP does not provide gambling, sports betting, wagering accounts, or
        real-money gaming services. Content is not offered as betting advice.
      </p>
      <p>
        Projections, rankings, start/sit guidance, waiver suggestions, and similar outputs are
        estimates only. They are not promises or guarantees. You are solely responsible for your
        roster and fantasy decisions.
      </p>
      <p>
        Labels used on the Site: <strong>Official</strong> only when Operator and counsel agree
        the source may be described that way; <strong>Reported</strong> facts from approved
        sources (may be delayed or revised); <strong>Model projection</strong> — Operator’s own
        estimates, not factual predictions.
      </p>
      <p>
        The Site may later use AI to explain structured metrics. AI must not invent statistics,
        injuries, or participation status. Structured data controls if prose conflicts. AI
        explain is off in this scaffold.
      </p>
      <p>
        The Site is not affiliated with, endorsed by, or sponsored by the NFL or its member
        clubs. See the Independent Disclaimer.
      </p>
      <h2>Eligibility</h2>
      <p>
        You must be able to form a binding contract. The Site is not directed at children under
        13 (US) or the relevant age elsewhere. Higher age gate:{" "}
        <span className="flag">NEED JOSHUA INPUT</span>.
      </p>
      <h2>License to use the Site</h2>
      <p>
        Operator grants a limited, non-exclusive, non-transferable, revocable license for
        personal, non-commercial fantasy information use. You must not scrape or systematically
        download the Site in bulk; bypass access controls or compliance gates; use the Site to
        build a competing data feed; misrepresent affiliation; or use the Site unlawfully.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Site design, original text, and Operator-created analysis are owned by {SITE_LEGAL_NAME}{" "}
        or its licensors. No license is granted to NFL marks, club marks, player publicity
        rights, or third-party logos. Player and team names may appear for identification and
        fantasy discussion only. As of this draft, no trademark or DBA for {SITE_NAME} has been
        filed.
      </p>
      <h2>Disclaimers</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SITE AND ALL CONTENT ARE PROVIDED “AS IS”
        AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND. OPERATOR DOES NOT WARRANT THAT
        PROJECTIONS OR RANKINGS WILL BE ACCURATE, THAT REPORTED STATUSES ARE ERROR-FREE, OR THAT
        ANY PARTICULAR FANTASY OUTCOME WILL OCCUR. Attorney review required for enforceability
        and consumer-law carve-outs.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE_LEGAL_NAME} AND ITS OFFICERS, MEMBERS, AND
        AGENTS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
        DAMAGES, OR FOR LOST FANTASY WINS, LOST PROFITS, OR DATA LOSS. Aggregate liability cap:{" "}
        <span className="flag">ATTORNEY REVIEW</span> — do not invent a number without counsel.
      </p>
      <h2>Governing law</h2>
      <p>
        Governing law and venue: <span className="flag">NEED JOSHUA INPUT</span> + attorney
        review. Do not invent a state or country. US-focused audience is expected; ops may
        involve Europe/London context.
      </p>
      <h2>Contact</h2>
      <p>
        Legal / terms contact: <span className="flag">NEED JOSHUA INPUT</span>
        <br />
        Notice address: <span className="flag">NEED JOSHUA INPUT</span> — do not invent a street
        address.
        <br />
        Entity: {SITE_LEGAL_NAME}
      </p>
    </div>
  );
}
