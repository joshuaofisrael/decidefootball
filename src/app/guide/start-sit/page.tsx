import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { faqPageJsonLd, organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "How to read start/sit estimates — floor, mean, ceiling, certainty";
const description =
  "How to read a Decide Football start/sit card: listed status first, mean as the ranking number, floor and ceiling as a model range, and certainty as a desk grade — not a win probability.";

const guideFaqs = [
  {
    question: "What do floor, mean, and ceiling mean here?",
    answer:
      "The mean is the ranking number: the estimate start/sit and weekly rankings sort on. Floor and ceiling are the model range around that mean, a low end and a high end. They are not a promise of points and not an official projection. A wider range means a thinner sample or a dirtier listed status. OUT, IR, and INACTIVE force the row to zero. The model does not invent a return date.",
  },
  {
    question: "What is the certainty score not?",
    answer:
      "Certainty is a desk grade of how much the call can lean on the math. The bands are thin, lean, clear, and strong. It is not a probability of winning the fantasy week, not a betting line, and not a guarantee that the higher mean wins. Read it next to listed status, not instead of it.",
  },
  {
    question: "Why are the sample start/sit URLs not in search?",
    answer:
      "Comparison pages on the start/sit desk are on the site so the product can be reviewed, and they use sample data. They stay out of search until licensed sports data is in place. This guide does not promise that those URLs will be indexed, and it does not give a date.",
  },
  {
    question: "If the means are close, does the higher one win the start?",
    answer:
      "No. A narrow mean gap is soft evidence. Under 1.5 estimated points the desk treats the pair as a toss-up and keeps certainty thin. Role and listed status still matter. The higher mean is a lean, not a verdict.",
  },
  {
    question: "When should I weigh the floor instead of the ceiling?",
    answer:
      "When you are protecting a lead in your fantasy matchup, weigh the floor: you care which side the model leaves less room to fall apart. When you need upside to catch up, weigh the ceiling. That is how to read the range for the week you have. It is not odds, a spread, or gambling advice.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function StartSitGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Start/sit guide", path: "/guide/start-sit/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/start-sit/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Reading the card</p>
      <h1>How to read a start/sit card</h1>
      <p>
        A {SITE_NAME} start/sit card is a stack, not a slogan. Listed status comes first. The mean
        is the ranking number. Floor and ceiling are a model range around that mean. Certainty is
        a grade of how hard the math can lean, not a chance of winning the week.
      </p>
      <p>
        This page is how to read that stack. How the numbers are built is the{" "}
        <Link href="/methodology/">methodology</Link>. What the product is, and is not, is the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>Listed status, before any number</h2>
      <p>
        OUT, IR, and INACTIVE are not starts. The model sets that row to zero. It does not invent
        a return date, a practice window, or a sentence about when someone might be back.
        Questionable and doubtful apply a discount. They are not a cleared player, and they are
        not a ruled-out player. The designation is an input someone listed. The projection does
        not vote a new one into existence.
      </p>
      <p>
        If the status and the mean disagree, believe the status. A healthy-looking mean on a
        player listed OUT is a zero for the week. The card is telling you the gate fired.
      </p>
      <p>
        What each designation means on this desk — Healthy, Questionable, Doubtful, OUT, IR, and
        INACTIVE — is the <Link href="/guide/listed-status/">listed status guide</Link>. This
        card still ranks on the mean. The label is read first.
      </p>

      <h2>Mean is the ranking number</h2>
      <p>
        Start/sit and the weekly rankings sort on the mean. That is the single estimate the desk
        uses to order a call. Floor and ceiling sit beside it as a range: the low end and the
        high end, given the sample and the status the model was handed. A wider range means the
        sample is thin or the status is dirty.
      </p>
      <p>
        The range is not a promise of points and not an official projection. Treat the mean as
        the rank. Treat floor and ceiling as the width around it.
      </p>

      <h2>Floor or ceiling, depending on the week you have</h2>
      <p>
        The mean ranks the pair. Which end of the range you weigh depends on the fantasy week in
        front of you.
      </p>
      <p>
        If you are ahead in your matchup and a crater would give the week away, weigh the floor.
        You are asking which side the model leaves less room to fall apart. If you are behind and
        a modest mean will not catch the gap, weigh the ceiling. You are asking which side the
        model leaves more room above the mean.
      </p>
      <p>
        That is roster reading. It is not a spread, a moneyline, a win probability, or advice on
        a wager. Nothing on this desk is a gambling product.
      </p>

      <h2>Certainty is a desk grade</h2>
      <p>
        The card also prints a certainty score, from 0 to 96, with a band: thin, lean, clear, or
        strong. On the card those bands read as a thin edge, a soft lean, a clear lean, or a
        strong call. The score is how much this desk thinks the call can lean on the math in
        front of it. A wider mean gap raises it. A toss-up keeps it thin. High uncertainty, a
        status discount, or an availability zero cuts it.
      </p>
      <ul>
        <li>
          <strong>Thin.</strong> The math is a thin edge. Do not treat the higher mean as settled.
        </li>
        <li>
          <strong>Lean.</strong> A soft lean. The mean prefers a side, and the inputs are not
          clean enough to carry the week alone.
        </li>
        <li>
          <strong>Clear.</strong> The call can lean on the math. Still read the status labels
          beside it.
        </li>
        <li>
          <strong>Strong.</strong> The numbers can carry more of the call. Still not a win
          probability, and still not a reason to ignore an OUT tag.
        </li>
      </ul>
      <p>
        It is not the probability that you win the fantasy week, and it is not the probability
        that the higher mean outscores the other side on Sunday. Read the band next to the status
        labels, not instead of them. The arithmetic behind the score is on the{" "}
        <Link href="/methodology/">methodology</Link> page, labeled v0 and subject to change.
      </p>

      <h2>A narrow mean is soft evidence</h2>
      <p>
        The desk draws a toss-up line at 1.5 estimated points. Inside that gap the card says to
        lean neither side on mean alone, and certainty stays thin. Outside it, the higher mean is
        a lean. Role and listed status still matter. A tenth of a point is not a verdict. A
        slightly higher mean on a smaller role does not, by itself, jump the player whose job is
        the one you are actually starting.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official projection, club report, or injury wire.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Where the comparison cards are</h2>
      <p>
        Comparison tools are at the <Link href="/start-sit/">start/sit desk</Link> so the product
        can be used and reviewed. Those URLs use sample data. They stay out of search until
        licensed sports data is in place. This page does not set a date for that, and it does not
        promise those URLs will enter a search index.
      </p>
      <p>
        The public description of the desk is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, and the <Link href="/about/">about page</Link>.
        Waiver urgency uses the same estimates. How to read hot, rising, stash, and fade — and
        why that tag is not a free-agent claim — is the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>.
      </p>

      <h2>Questions</h2>
      {guideFaqs.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
