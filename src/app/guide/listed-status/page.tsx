import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { faqPageJsonLd, organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "How to read listed status — Healthy, Questionable, Doubtful, OUT, IR, INACTIVE";
const description =
  "How to read a Decide Football listed status: Healthy, Questionable, Doubtful, OUT, IR, and INACTIVE, kept separate from the projection mean. Not an official injury report and not a return date.";

const guideFaqs = [
  {
    question: "What do Healthy, Questionable, and Doubtful mean on this desk?",
    answer:
      "Healthy means the row lists no injury designation. Status does not discount the estimate and does not zero it. That is not an official clearance, and it is not a promise of snaps. Questionable means uncertain: a soft discount, not a cleared player and not a ruled-out player. Doubtful means unlikely: a heavier soft discount than questionable, and still not a hard zero. All three are inputs someone listed. The model does not invent a designation.",
  },
  {
    question: "Why do OUT, IR, and INACTIVE zero the estimate?",
    answer:
      "OUT, IR, and INACTIVE are different labels someone listed, and on this desk they hit the same gate. The estimate goes to zero: mean, floor, and ceiling. Those rows are not starts this week. The model does not invent a return date, a practice window, or a week the player comes back. If a projection number still looks usable beside one of those labels, believe the label.",
  },
  {
    question: "What is the difference between last verified and page rendered?",
    answer:
      "Last verified is when the listed designation was last checked as an input. Page rendered is when this HTML was baked. They are different clocks. A new render does not mean the designation was re-checked. A last-verified time is not a return date, and it is not proof the label is an official league report.",
  },
  {
    question: "Is listed status an official NFL or club injury report?",
    answer:
      "No. Decide Football is not affiliated with the NFL or its member clubs. A listed status is an input someone listed for this desk. It is not an official injury wire, not a league inactive list, and not a promise of a return date. The method is methodology v0, subject to change. There is no published backtest, and none should be inferred.",
  },
  {
    question: "Why do the is-playing and injury pages stay out of search?",
    answer:
      "Sample availability pages are on the site so the product can be reviewed. The is-playing board, the per-player playing-today pages, and the injury timelines use fixture data. They stay out of search until licensed GREEN sports data is in place. This guide does not promise those URLs will be indexed, and it does not give a date. This page lives under /guide/, outside those fixture paths.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function ListedStatusGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Listed status guide", path: "/guide/listed-status/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/listed-status/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Reading the designation</p>
      <h1>How to read a listed status</h1>
      <p>
        A {SITE_NAME} availability line is a designation someone listed: Healthy, Questionable,
        Doubtful, OUT, IR, or INACTIVE. Read it before any projection number. The mean is a
        separate estimate. The label does not become the points, and the points do not vote a
        new label into existence.
      </p>
      <p>
        This page is how to read that designation. How the estimates are built is the{" "}
        <Link href="/methodology/">methodology</Link>. How to read the mean, the floor and
        ceiling, and the certainty grade is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>. How a waiver tag uses the same
        label is the <Link href="/guide/waiver-radar/">waiver radar guide</Link>. What the
        product is, and is not, is the <Link href="/about/">about page</Link>.
      </p>

      <h2>Status before any number</h2>
      <p>
        The designation comes first. A mean, a floor, a ceiling, and a certainty grade sit beside
        it on a start/sit card. Those are a different stack. The{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> is where that stack is taught. They
        do not replace the label, and this page does not re-teach them.
      </p>
      <p>
        If the status and the mean disagree, believe the status. A number that still looks usable
        on a player listed OUT, IR, or INACTIVE is a zero for the week. The card is telling you
        the gate fired. Questionable and doubtful leave a discounted estimate. That number is not
        a cleared player.
      </p>

      <h2>The six designations</h2>
      <p>
        The desk prints one listed status. Read it as the input it is. It is not a sentence
        about the future, and it is not a scouting report.
      </p>
      <ul>
        <li>
          <strong>Healthy.</strong> No injury designation on the row. Status does not discount
          the estimate and does not zero it. This desk reads the listing as available. That is
          not an official clearance, and it is not a promise of snaps.
        </li>
        <li>
          <strong>Questionable.</strong> Uncertain. A soft discount. Not a cleared player, and
          not a ruled-out player. The estimate can still be a number. The label is still dirty.
        </li>
        <li>
          <strong>Doubtful.</strong> Unlikely. A heavier soft discount than questionable. Still
          not a hard zero, and still not a return date. The row has not been cleared, and it has
          not been ruled out the way OUT is.
        </li>
        <li>
          <strong>OUT.</strong> Listed out. The estimate is forced to zero. Not a start this
          week. The desk does not add a sentence about when the player might be back.
        </li>
        <li>
          <strong>IR.</strong> Listed on injured reserve. The estimate is forced to zero, the
          same gate as OUT. The desk does not invent the week someone comes off IR.
        </li>
        <li>
          <strong>INACTIVE.</strong> Listed inactive. The estimate is forced to zero, the same
          gate as OUT and IR. A different label someone listed. Not a separate projection story,
          and not a return window.
        </li>
      </ul>

      <h2>Soft discount and hard zero</h2>
      <p>
        Questionable and doubtful are discounts. The model still produces an estimate, and it
        marks the row as less clean than a healthy listing. Doubtful discounts more than
        questionable, because the desk treats doubtful as unlikely and questionable as uncertain.
        The size of that discount is part of methodology v0 and can change. This page does not
        treat the discount as a fixed official rate. How the gate is applied is the{" "}
        <Link href="/methodology/">methodology</Link>.
      </p>
      <p>
        OUT, IR, and INACTIVE are a hard zero. Mean, floor, and ceiling are 0. The model does
        not invent a designation to get there, and it does not invent a return to get back.
      </p>
      <p>
        Waiver urgency reads the same gate. A hot tag is not printed over OUT, IR, or INACTIVE.
        How to read the tag is the <Link href="/guide/waiver-radar/">waiver radar guide</Link>.
        The tag does not replace the label.
      </p>

      <h2>Last verified is not the render time</h2>
      <p>
        Availability pages print two clocks, and they stay distinct. <strong>Last verified</strong>{" "}
        is when the listed designation was last checked as an input. <strong>Page rendered</strong>{" "}
        is when this HTML was baked. A new render does not mean someone re-checked the
        designation. A last-verified time is not a return date, and it is not proof the label
        came from an official league wire.
      </p>
      <p>
        Read them as two facts. One is about the status input. One is about the page you are
        looking at. Neither one is a projection, and neither one is a promise that the
        designation will still be true at kickoff.
      </p>

      <h2>Not an official report</h2>
      <p>
        {SITE_NAME} is not affiliated with, endorsed by, or sponsored by the NFL or its member
        clubs. A listed status is an input for a fantasy roster call. It is not an official
        injury wire, not a club report, and not a league inactive list. Names are identification
        for fantasy analysis only.
      </p>
      <p>
        Nothing here is a return date. Nothing here is gambling advice, a spread, or a
        sportsbook. The method is methodology v0, subject to change. No accuracy rate is
        published here, and none should be inferred.
      </p>

      <h2>Where the sample pages are</h2>
      <p>
        The <Link href="/is-playing/">is-playing board</Link> is on the site so the product can
        be used and reviewed. Each name also has a playing-today page, and an injury timeline
        under the injuries path. Those URLs use sample data. They stay out of search until
        licensed GREEN sports data is in place. This page does not set a date for that, and it
        does not promise those URLs will enter a search index.
      </p>
      <p>
        The public description of the designation is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>, and the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official injury wire, club report, or league inactive list.</li>
        <li>Not a return date, a practice window, or a promise someone plays.</li>
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
