import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDraftBanner } from "@/components/LegalDraftBanner";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent disclaimer (draft)",
  description:
    "Draft independent disclaimer for Decide Football. Unfinished operator inputs remain; this page is not offered for search indexing.",
  ...robotsMeta(decideIndexation({ sourceClass: "GREEN", draftLegal: true })),
};

export default function DisclaimerPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer/" },
        ]}
      />
      <LegalDraftBanner />
      <h1>Independent disclaimer</h1>
      <p>
        {SITE_NAME} ({SITE_HOST}) is an independent fantasy football information and analysis
        site operated by {SITE_LEGAL_NAME}. It is not affiliated with, endorsed by, or sponsored
        by the National Football League (NFL) or its member clubs. Exact non-affiliation wording
        requires attorney review.
      </p>
      <h2>Independence</h2>
      <p>{SITE_NAME} is not affiliated with, endorsed by, sponsored by, or officially connected to:</p>
      <ul>
        <li>the National Football League (NFL);</li>
        <li>any NFL member club;</li>
        <li>the NFL Players Association or related entities;</li>
        <li>
          any fantasy sports platform, media company, or data vendor merely because names appear
          in factual discussion.
        </li>
      </ul>
      <p>
        Use of player names, team names, or league terminology is for identification and fantasy
        analysis only. It does not imply endorsement.
      </p>
      <h2>Official status vs reported status vs model projection</h2>
      <ul>
        <li>
          <strong>Official</strong> — used only when counsel and product agree the source may be
          described that way. Most MVP feeds are not official NFL feeds. This scaffold uses
          fixtures only.
        </li>
        <li>
          <strong>Reported</strong> — status or stats as reported by approved sources. Can be
          wrong, delayed, or revised. Timestamps apply.
        </li>
        <li>
          <strong>Model projection</strong> — {SITE_NAME} estimates (floor / mean / ceiling). Not
          facts about what will happen.
        </li>
      </ul>
      <h2>Estimates; no guaranteed outcomes</h2>
      <p>
        Rankings, start/sit suggestions, add/drop comparisons, waiver ideas, and projections are
        estimates for informational and entertainment purposes. You alone decide how to set your
        fantasy roster.
      </p>
      <h2>No gambling at MVP</h2>
      <p>
        {SITE_NAME} does not offer gambling, wagering, sportsbook odds, or real-money betting
        services.
      </p>
      <h2>Data and logos</h2>
      <ul>
        <li>Do not assume NFL or club logos, shields, or trade dress may be used.</li>
        <li>
          The site will not claim “official NFL data” unless a license and counsel expressly
          support that claim.
        </li>
        <li>
          Trademarks and DBA for {SITE_NAME} are not filed as of this draft. Domain{" "}
          {SITE_HOST} is registered; mailboxes and legal contact still{" "}
          <span className="flag">NEED JOSHUA INPUT</span>.
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Privacy / legal contact email: <span className="flag">NEED JOSHUA INPUT</span>
        <br />
        Physical / registered address: <span className="flag">NEED JOSHUA INPUT</span> — do not
        invent a street address.
      </p>
    </div>
  );
}
