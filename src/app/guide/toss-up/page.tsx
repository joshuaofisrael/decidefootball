import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TossUpTool } from "@/components/TossUpTool";
import { faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "Toss-up tool — apply the 1.5-point mean-delta line";
const description =
  "Type two fantasy-point means. Decide Football applies the same 1.5-point toss-up line used on start/sit and add/drop. Floor and ceiling are for weighing only. Not a player search, not official projections, and not gambling advice.";

const guideFaqs = [
  {
    question: "What does the 1.5-point toss-up rule do?",
    answer:
      "The desk subtracts the two means and rounds the gap to one decimal, the same print the start/sit and add/drop cards use. Under 1.5 estimated points the pair is a toss-up on mean alone. At 1.5 or more, the higher mean is the lean. A gap of 1.4 stays a toss-up. A gap of 1.5 is a lean. The line is softness in the estimate. It is not a spread, a moneyline, or a win probability.",
  },
  {
    question: "Do floor and ceiling change which side the tool favors?",
    answer:
      "No. The lean is the mean delta only. Floor and ceiling are the range around each mean, for display and for weighing. When the pair is a toss-up, weigh the floor if you are protecting a lead and the ceiling if you need upside. Those ends do not move the 1.5-point line, and they are not a promise of points.",
  },
  {
    question: "Does this tool look up players or pull official projections?",
    answer:
      "No. You type the means. Labels are optional short names you choose. Placeholders read Player A and Player B. They are not rostered names, and the form does not search a player list or call a projection feed. The numbers are not official NFL or club projections. Listed status still outranks any number you type. On the real card, OUT, IR, and INACTIVE force that side to zero.",
  },
  {
    question: "Is the delta the same for start/sit and add/drop?",
    answer:
      "Yes. Start/sit asks which name to put in the lineup. The sentence is Start A, Start B, or a toss-up that leans neither side on mean alone. Add/drop asks which name to keep by adding one over the name you would drop. The sentence is Add A over B, or a toss-up with no add/drop edge on mean alone. The gap that switches those sentences is the same 1.5 points. The toggle on this page changes the sentence. It does not change the math.",
  },
  {
    question: "If the means are far apart, does listed status still come first?",
    answer:
      "Yes. A wide mean gap is a lean on the numbers you typed. It does not clear a listed designation, and it does not replace role. The start/sit card also prints a certainty grade — thin, lean, clear, or strong — which this tool does not compute. That grade, from means and flags you type, is the certainty tool at /guide/certainty/. Read status before the mean. This page is not gambling advice.",
  },
] as const;

export const metadata = pageMetadata({
  path: "/guide/toss-up/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function TossUpGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Toss-up tool", path: "/guide/toss-up/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/toss-up/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Mean delta</p>
      <h1>Apply the 1.5-point toss-up line</h1>
      <p>
        This page is a calculator for one rule on the {SITE_NAME} desk. You type two means. The
        desk subtracts them, rounds to one decimal, and leans only when the absolute gap is 1.5
        estimated points or more. Under that line the pair is a toss-up on mean alone.
      </p>
      <p>
        The <Link href="/guide/start-sit/">start/sit guide</Link> teaches how to read a finished
        lineup card: listed status, the mean, the range, and the certainty bands. The{" "}
        <Link href="/guide/add-drop/">add/drop guide</Link> teaches the roster-churn label. This
        page applies the shared line to numbers you supply. How the estimates are built is the{" "}
        <Link href="/methodology/">methodology</Link>. What the product is, and is not, is the{" "}
        <Link href="/about/">about page</Link>.
      </p>
      <p>
        The form does not look up a player. It does not call a projection feed. The means are
        yours. Listed status still outranks any number you type. Nothing here is an official
        projection, and nothing here is gambling advice.
      </p>

      <TossUpTool />

      <h2>The 1.5-point line</h2>
      <p>
        The constant is 1.5 estimated points. The same number sits in the start/sit and add/drop
        recommendations. Mean delta is side A minus side B, printed to one decimal, the same
        rounding the cards use. The line is applied to that rounded gap. At 1.5 or beyond, the
        higher mean is the lean. Under 1.5, the desk does not treat the higher mean as a verdict.
      </p>
      <p>
        A gap of 1.4 points stays a toss-up. A gap of 1.5 points is a lean toward the higher
        mean. A tenth of a point inside the line is softness in the estimate. It is not a
        spread, a moneyline, or a win probability. Nothing on this desk is a gambling product.
      </p>

      <h2>Floor and ceiling, when the pair is a toss-up</h2>
      <p>
        Floor and ceiling do not move the line. The lean is the mean delta only. When you type a
        floor or a ceiling, the tool shows them so you can weigh the range. They are a low end
        and a high end around the mean you entered. They are not a promise of points.
      </p>
      <p>
        When the pair is a toss-up, that range is what you weigh next. If you are protecting a
        lead and a crater would give the week away, weigh the floor: which side leaves less room
        to fall apart. If you are behind and a modest mean will not catch the gap, weigh the
        ceiling. That is the same reading the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> gives for a finished card. It is
        still roster reading. It is not odds.
      </p>
      <p>
        On the real card, listed status is read before any of those numbers. OUT, IR, and
        INACTIVE force that side to zero. The model does not invent a return date. What each
        designation means is{" "}
        <Link href="/guide/listed-status/">
          what Questionable, Doubtful, Out, IR, and inactive mean
        </Link>.
        If the status and the mean disagree, believe the status. This tool cannot see a
        designation you did not account for in the means you typed.
      </p>

      <h2>One delta, two cards</h2>
      <p>
        Start/sit asks which name to put in the lineup. When the rounded gap clears 1.5, the
        sentence names the higher side: Start that side. Inside the line, the sentence is a
        toss-up: lean neither side on mean alone. The card also prints a certainty grade — thin,
        lean, clear, or strong. This tool prints the delta and the line. It does not print that
        grade. Applying the same grade to means and flags you type is the{" "}
        <Link href="/guide/certainty/">certainty tool</Link>. The arithmetic is on the{" "}
        <Link href="/methodology/">methodology</Link> page, labeled v0 and subject to change.
      </p>
      <p>
        Add/drop asks which name to keep by adding one over the name you would drop. The same
        gap switches the sentence. At 1.5 or more, the higher mean is the add and the other name
        is the drop. Inside the line, there is no add/drop edge on mean alone. That card does
        not know your league, your waiver order, or your FAAB balance. It is not a claim that
        either name is free on ESPN, Yahoo, Sleeper, or any other host. How to read the label
        is the <Link href="/guide/add-drop/">add/drop guide</Link>.
      </p>
      <p>
        The toggle on this page switches between those two sentences. The subtraction does not
        change. Role and listed status still matter on both cards.
      </p>

      <h2>What this tool is not</h2>
      <ul>
        <li>Not a player search, and not a call to a projection feed.</li>
        <li>
          Not a substitute for listed status. OUT, IR, and INACTIVE still zero a side on the
          real card.
        </li>
        <li>
          Not the certainty grade. Thin, lean, clear, and strong are the{" "}
          <Link href="/guide/certainty/">certainty tool</Link>. This page only applies the
          1.5-point line.
        </li>
        <li>Not a free-agent claim, a waiver-priority order, or FAAB advice.</li>
        <li>Not an official projection, club report, or injury wire.</li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          you type are labels for the comparison only.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Where the reading guides are</h2>
      <p>
        The sample start/sit and add/drop desks stay out of search until licensed GREEN sports
        data is in place. This page does not set a date for that, and it does not promise those
        URLs will enter a search index. This tool lives at /guide/toss-up/. It does not put
        fixture player rows into the form, and it does not put those desks into search.
      </p>
      <p>
        Read the line on the cards in the <Link href="/guide/start-sit/">start/sit guide</Link>{" "}
        and the <Link href="/guide/add-drop/">add/drop guide</Link>. How the numbers are built
        is the <Link href="/methodology/">methodology</Link>. The rest of the reading notes sit
        on the <Link href="/guide/">guides</Link> hub. What the product is, and is not, is the{" "}
        <Link href="/about/">about page</Link>.
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
