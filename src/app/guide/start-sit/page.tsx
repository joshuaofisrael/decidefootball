import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  START_SIT_CHECKLIST,
  START_SIT_CRUMB,
  START_SIT_DESCRIPTION,
  START_SIT_DIRECT_ANSWER,
  START_SIT_FAQS,
  START_SIT_H1,
  START_SIT_LOCK,
  START_SIT_NOT,
  START_SIT_PATH,
  START_SIT_TITLE,
  START_SIT_TOSS_UP,
  START_SIT_WEEK_TABLE,
} from "@/lib/start-sit-guide";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = START_SIT_TITLE;
const description = START_SIT_DESCRIPTION;

export const metadata = {
  ...pageMetadata({
    path: START_SIT_PATH,
    title,
    description,
    indexation: { kind: "editorial" },
  }),
  twitter: {
    card: "summary" as const,
    title,
    description,
  },
};

export default function StartSitGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: START_SIT_CRUMB, path: START_SIT_PATH },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: START_SIT_PATH,
          name: title,
          description,
        })}
      />
      <JsonLd data={articleJsonLd({ path: START_SIT_PATH, headline: title, description })} />
      <JsonLd data={faqPageJsonLd([...START_SIT_FAQS])} />
      <p className="kicker">Fantasy lineups</p>
      <h1>{START_SIT_H1}</h1>
      <p>{START_SIT_DIRECT_ANSWER}</p>

      <div className="table-wrap">
        <table>
          <caption className="visually-hidden">
            Floor-first, mean-first, and ceiling-first weeks: what you optimize for, when that
            week fits, and what you accept
          </caption>
          <thead>
            <tr>
              <th scope="col">Week</th>
              <th scope="col">What you optimize for</th>
              <th scope="col">When it fits</th>
              <th scope="col">What you accept</th>
            </tr>
          </thead>
          <tbody>
            {START_SIT_WEEK_TABLE.map((row) => (
              <tr key={row.week}>
                <th scope="row">{row.week}</th>
                <td>{row.optimize}</td>
                <td>{row.fits}</td>
                <td>{row.accept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The mean still ranks the pair. The week in front of you chooses which end of the range
        you weigh. A floor-first week protects a lead. A mean-first week stays with the ranking
        number when the matchup is close. A ceiling-first week looks for upside when you are
        behind. None of the three is a spread, a moneyline, or a win probability.
      </p>

      <h2>A checklist before Sunday lock</h2>
      <p>{START_SIT_LOCK}</p>
      <ol>
        {START_SIT_CHECKLIST.map((item) => (
          <li key={item.title}>
            <strong>{item.title}.</strong> {item.detail}
            {item.href && item.linkLabel ? (
              <>
                {" "}
                <Link href={item.href}>{item.linkLabel}</Link>.
              </>
            ) : null}
          </li>
        ))}
      </ol>

      <h2>When a close call is a toss-up</h2>
      <p>{START_SIT_TOSS_UP}</p>
      <p>
        The <Link href="/guide/toss-up/">toss-up tool</Link> applies that 1.5-point line to two
        means you type. The <Link href="/guide/certainty/">certainty tool</Link> grades how sure
        the lean is. This page is the decision framework. It does not repeat either form, and it
        does not look up a player.
      </p>

      <h2>How {SITE_NAME} cards use the stack</h2>
      <p>
        A {SITE_NAME} start/sit card prints the same decision in a fixed order. Listed status
        comes first. The mean is the ranking number. Floor and ceiling are the model range around
        that mean. Certainty is a grade of how hard the math can lean, not a chance of winning
        the week.
      </p>
      <p>
        How the numbers are built is the <Link href="/methodology/">methodology</Link>. What the
        product is, and is not, is the <Link href="/about/">about page</Link>.
      </p>

      <h3>Listed status first</h3>
      <p>
        OUT, IR, and INACTIVE are not starts. The model sets that row to zero. It does not invent
        a return date or a practice window. Questionable and Doubtful are a discount. They are
        not a cleared player, and they are not a ruled-out player. If the status and the mean
        disagree, believe the status.
      </p>
      <p>
        <Link href="/guide/listed-status/">
          What Questionable, Doubtful, Out, injured reserve, and inactive mean
        </Link>{" "}
        is the page for the label. The card still ranks on the mean. The label is read first.
      </p>

      <h3>Mean, then the range</h3>
      <p>
        Start/sit and the weekly rankings sort on the mean. Floor and ceiling sit beside it as a
        low end and a high end. A wider range means the sample is thin or the listed status is
        dirty. The range is not a promise of points and not an official projection.
      </p>
      <p>
        The weekly board is a different page. It stacks one position in mean order and prints
        status, floor, and ceiling on the row. It does not print a certainty score, and the order
        is not a pairwise verdict. How to read that list is the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>.
      </p>

      <h3>Certainty is not a win probability</h3>
      <p>
        The card prints a certainty band: thin, lean, clear, or strong. On the card those bands
        read as a thin edge, a soft lean, a clear lean, or a strong call. A wider mean gap can
        raise the grade. A toss-up keeps it thin. A status discount or an availability zero cuts
        it. The band is how much this desk thinks the call can lean on the math. It is not the
        probability that you win the fantasy week, and it is not the probability that the higher
        mean outscores the other side.
      </p>
      <ul>
        <li>
          <strong>Thin.</strong> A thin edge. Do not treat the higher mean as settled.
        </li>
        <li>
          <strong>Lean.</strong> A soft lean. The mean prefers a side, and the inputs are not
          clean enough to carry the week alone.
        </li>
        <li>
          <strong>Clear.</strong> The call can lean on the math. Still read the status beside it.
        </li>
        <li>
          <strong>Strong.</strong> The numbers can carry more of the call. Still not a win
          probability, and still not a reason to ignore an Out tag.
        </li>
      </ul>
      <p>
        To apply that grade to two means and the flags you type, use the{" "}
        <Link href="/guide/certainty/">certainty tool</Link>. The arithmetic is on the{" "}
        <Link href="/methodology/">methodology</Link> page, labeled v0 and subject to change. No
        accuracy rate is published here, and none should be inferred.
      </p>

      <h3>Where the comparison cards are</h3>
      <p>
        Comparison tools are at the <Link href="/start-sit/">start/sit desk</Link> so the product
        can be used and reviewed. Those URLs use sample data. They stay out of search until
        licensed sports data is in place. This page does not set a date for that, and it does not
        promise those URLs will enter a search index.
      </p>
      <p>
        Waiver urgency uses the same estimates.{" "}
        <Link href="/guide/waiver-radar/">How fantasy football waivers work</Link> is a different
        question from this lineup call, and a tag there is not a free-agent claim. The same
        estimates on a roster-churn card — add one name over the name you would drop — are the{" "}
        <Link href="/guide/add-drop/">add/drop guide</Link>. The shared 1.5-point line, applied
        to means you type, is the <Link href="/guide/toss-up/">toss-up tool</Link>.
      </p>

      <h2>What this is not</h2>
      <ul>
        {START_SIT_NOT.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Questions</h2>
      {START_SIT_FAQS.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
