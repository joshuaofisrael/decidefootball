import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { FLORIDA_GOVERNING_LAW, SITE_CONTACT_EMAIL, SITE_HOST, SITE_LEGAL_NAME, SITE_NAME } from "@/lib/site";

const title = "Independent disclaimer";
const description =
  "Decide Football is a brand of Joshua Israel Ventures LLC. Model estimates are not official data and not gambling advice. The site currently has no paid links or ads.";

export const metadata = pageMetadata({
  path: "/disclaimer/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function DisclaimerPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Disclaimer", path: "/disclaimer/" },
        ]}
      />
      <h1>Independent disclaimer</h1>
      <p>
        {SITE_NAME} ({SITE_HOST}) is a brand owned and operated by {SITE_LEGAL_NAME}. It is not
        affiliated with, endorsed by, or sponsored by the National Football League (NFL), its
        member clubs, the NFL Players Association, ESPN, Yahoo, or Sleeper.
      </p>

      <h2>Accuracy</h2>
      <p>
        Information on the Site may be incomplete, delayed, revised, or wrong. Rankings,
        statuses, and commentary are general information. They are not a promise that a player
        will be active or that an estimate will match a box score.
      </p>

      <h2>No professional relationship</h2>
      <p>
        Using the Site does not create a professional, advisory, fiduciary, or client
        relationship with {SITE_LEGAL_NAME}. Content is not legal advice, financial advice, or
        other professional advice.
      </p>

      <h2>Model estimates are not official data</h2>
      <p>
        Projections, floor, mean, ceiling, certainty grades, and similar figures are {SITE_NAME}{" "}
        model estimates. They are not official NFL or club data, and they are not a guarantee of
        fantasy points, availability, or outcomes.
      </p>

      <h2>Not gambling advice</h2>
      <p>
        The Site is not gambling advice or betting advice. It does not offer odds, a sportsbook,
        wagering, or real-money betting.
      </p>

      <h2>Advertising and affiliate disclosure</h2>
      <p>
        The Site currently has no paid links or ads. Any paid links or ads added later will be
        disclosed.
      </p>

      <h2>Trademarks</h2>
      <p>
        NFL, the names of NFL member clubs, ESPN, Yahoo, Sleeper, and other names mentioned on
        this site are trademarks of their respective owners. {SITE_NAME} uses them in plain text
        only to identify those organizations, their products, or rules they publish. No such use
        implies sponsorship or endorsement. {SITE_NAME} does not use NFL, club, NFL Players
        Association, or fantasy platform logos, shields, helmets, uniforms, or other trade dress,
        and it does not publish player photographs.
      </p>

      <h2>Governing law</h2>
      <p>{`This disclaimer is ${FLORIDA_GOVERNING_LAW}.`}</p>

      <h2>Contact</h2>
      <p>
        {SITE_LEGAL_NAME}
        <br />
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}
