import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { faqPageJsonLd, organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "How to read waiver radar tags — hot, rising, stash, fade";
const description =
  "How to read a Decide Football waiver radar tag: hot, rising, stash, or fade, from the same estimates plus snap-share change and listed status. Not a claim the player is free on your host platform.";

const guideFaqs = [
  {
    question: "What does hot mean here, and how is it different from rising?",
    answer:
      "Hot is the claim tag. The listing is healthy, and the estimate supports spending a waiver claim if the bench is dead weight. Rising means snap share is up and the role is moving the right way, but the row has not cleared hot. Rising is a direction. Hot is the stronger urgency. Neither tag means the player is free in your league, and neither is a win probability.",
  },
  {
    question: "Does the tag mean the player is free on my platform?",
    answer:
      "No. A waiver radar tag is not a claim that the name is available on Yahoo, ESPN, Sleeper, or any other host. This desk does not see your league's free-agent pool. The tag ranks urgency from the same estimates used on the rest of the desk, plus snap-share change and listed status. Check the platform before you treat any row as an add.",
  },
  {
    question: "When is a row a stash, and when is it a fade?",
    answer:
      "Stash means hold if you have a bench spot. The row is not urgent enough to chase. Fade means do not spend waiver budget chasing it: snap share is down, the estimate is soft, or listed status has taken the name off this week. Stash is a bench decision. Fade is a pass. Neither is a this-week start, and neither is gambling advice.",
  },
  {
    question: "How does listed status override a hot tag?",
    answer:
      "OUT, IR, and INACTIVE are not adds to start this week. Those designations force the estimate to zero, and a hot tag is not printed over that gate. Hot requires a healthy listing. If the status and the tag look like they disagree, believe the status. Questionable and doubtful are a discount, not a cleared player, and not the healthy listing hot uses.",
  },
  {
    question: "Is the waiver radar an official wire or a backtest?",
    answer:
      "No. Decide Football is not affiliated with the NFL or its member clubs. The radar is not an official waiver wire, not gambling advice, and not a published backtest. Fixture radar pages use sample data and stay out of search until licensed GREEN sports data is in place. The method is methodology v0, subject to change.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function WaiverRadarGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver radar guide", path: "/guide/waiver-radar/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/waiver-radar/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Reading the board</p>
      <h1>How to read a waiver radar tag</h1>
      <p>
        A {SITE_NAME} waiver row carries one urgency tag: hot, rising, stash, or fade. The tag
        is built from the same weekly estimates the rest of the desk uses, plus snap-share
        change and the listed status. It ranks how hard this desk would chase the name. It does
        not say the player is sitting free on Yahoo, ESPN, Sleeper, or any other host.
      </p>
      <p>
        This page is how to read that tag. How the estimates are built is the{" "}
        <Link href="/methodology/">methodology</Link>. How to read the mean, the floor and
        ceiling, and the certainty grade is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>. What the product is, and is not,
        is the <Link href="/about/">about page</Link>.
      </p>

      <h2>The four tags</h2>
      <p>
        The board prints one tag per row. Read it as urgency, not as a lineup order and not as
        a transaction your league has already approved.
      </p>
      <ul>
        <li>
          <strong>Hot.</strong> The claim tag. Listed status is healthy, and the estimate
          supports spending a waiver claim if the bench is dead weight. This is the strongest
          urgency the board prints. It is still not a start order.
        </li>
        <li>
          <strong>Rising.</strong> Snap share is up versus the prior week, and the role is
          moving the right way. The row has not cleared hot. Rising is a direction, not a
          finished add.
        </li>
        <li>
          <strong>Stash.</strong> Hold if you have a bench spot. The row is not urgent enough
          to chase and not weak enough to fade. A bench decision. Not a start for this week.
        </li>
        <li>
          <strong>Fade.</strong> Do not spend waiver budget chasing this. Snap share is down,
          the estimate is soft, or listed status has taken the name off the week. A pass on
          the claim.
        </li>
      </ul>

      <h2>Same estimates, two extra inputs</h2>
      <p>
        Start/sit, the weekly rankings, and this board share one mean. That mean is the ranking
        number. Floor and ceiling are a model range around it, not a promise of points.
        Certainty, on a start/sit card, is a desk grade of how hard the math can lean. It is not
        the probability of winning the fantasy week. The{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> is where that card is taught.
      </p>
      <p>
        Waiver urgency adds the two inputs the tag is actually for. Snap share versus the prior
        week can lift a row into rising, or into hot when the listing is healthy and the mean
        already supports a claim. A sharp drop in snap share can put the row on fade even when
        the mean has not collapsed. Listed status sits on top of both. The tag is that
        combination. It is not a separate scouting report, and a score printed beside the tag
        only orders urgency on this desk.
      </p>

      <h2>Status before the tag</h2>
      <p>
        OUT, IR, and INACTIVE are not adds to start this week. The model sets that estimate to
        zero. It does not invent a return date, a practice window, or a sentence about when
        someone might be back. Hot requires a healthy listing, so those rows do not print hot.
        The tag drops to a pass. The note on the row can still call the name a stash rather
        than a start. Read both the same way: not a lineup add this week.
      </p>
      <p>
        If the status and the tag look like they disagree, believe the status. A hot tag does
        not outrank an OUT label, and this desk does not print hot over that gate.
      </p>
      <p>
        Questionable and doubtful are a discount. They are not a cleared player, and they are
        not the healthy listing hot uses. A designation other than healthy does not print hot.
        If snap share is up, the row can still read rising. That is a direction under a dirty
        status, not a cleared start. The designation is an input someone listed. The tag does
        not vote a new one into existence.
      </p>
      <p>
        What each designation means before a tag is printed is the{" "}
        <Link href="/guide/listed-status/">listed status guide</Link>. The tag does not replace
        that label.
      </p>

      <h2>Not a free-agent list</h2>
      <p>
        The tag does not know your platform. It does not know your waiver order, your FAAB
        balance, or who your league already rostered. A hot row can already be owned. A fade
        row can be the best name still sitting free in a thin league. Check the host. Then use
        the tag to judge whether this desk would spend a claim.
      </p>
      <p>
        FAAB on a fade line means waiver budget: do not chase the name with it. That is a
        roster call. It is not a spread, a moneyline, or advice on a wager. Nothing on this
        desk is a gambling product.
      </p>

      <h2>Where the board is</h2>
      <p>
        The <Link href="/waiver-wire/week-3/">waiver board</Link> is on the site so the product
        can be used and reviewed. Those URLs use sample data. They stay out of search until
        licensed GREEN sports data is in place. This page does not set a date for that, and it
        does not promise those URLs will enter a search index.
      </p>
      <p>
        The public description of the tag is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, and the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official waiver wire, club report, or injury wire.</li>
        <li>Not a claim that any name is available on a host platform.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

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
