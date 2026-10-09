import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertaintyTool } from "@/components/CertaintyTool";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "Certainty tool — grade how sure the lean is";
const description =
  "Type two fantasy-point means and the desk flags. Decide Football applies the same certainty grade the start/sit card prints: thin, lean, clear, or strong. Not a win probability, not a player search, not official projections, and not gambling advice.";

const guideFaqs = [
  {
    question: "What does the certainty grade say?",
    answer:
      "It is the same desk grade the start/sit card prints: a score and a band of thin, lean, clear, or strong. On the card those bands read as a thin edge, a soft lean, a clear lean, or a strong call. The grade says how much the call can lean on the math in front of it. It is not a win probability, not odds, and not a moneyline.",
  },
  {
    question: "Which inputs move the score?",
    answer:
      "The rounded mean gap, an availability gate, a status discount, uncertainty on each side, and how many trailing weeks each side has. The sample check uses the shorter of the two sides. A healthy pair with low uncertainty and three trailing weeks lets a wide gap grade clear or strong. OUT, IR, and INACTIVE are the gate: that side is zero. Questionable and Doubtful are the soft discount, and they do not also apply once the gate is on. The cuts are methodology v0: 78 and above is strong, 58 and above is clear, 40 and above is lean, and anything lower is thin. They are subject to change. They are not a published accuracy rate.",
  },
  {
    question: "Does this tool look up players or pull official projections?",
    answer:
      "No. You type the means. Labels are optional short names you choose. Placeholders read Player A and Player B. They are not rostered names, and the form does not search a player list or call a projection feed. The numbers are not official NFL or club projections. Listed status still outranks any number you type.",
  },
  {
    question: "How is this different from the toss-up tool?",
    answer:
      "The toss-up tool answers who leans. It applies the 1.5-point mean-delta line and does not compute this grade. This tool answers how sure that lean is, using the same helper the start/sit card uses. A pair can clear 1.5 and still grade thin if a side is gated, discounted, uncertain, or short on weeks. A pair inside 1.5 is a toss-up on the line. The grade is still the desk score. It is not a second toss-up rule, and it is not a probability.",
  },
  {
    question: "If the means are far apart, does listed status still come first?",
    answer:
      "Yes. A strong grade is a desk grade of the numbers and flags you typed. It does not clear a listed designation you left off the form, and it does not replace role. Mark OUT, IR, or INACTIVE as availability-gated so that side is zero. The model does not invent a return date. This page is not gambling advice.",
  },
] as const;

export const metadata = pageMetadata({
  path: "/guide/certainty/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function CertaintyGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Certainty tool", path: "/guide/certainty/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/certainty/",
          name: title,
          description,
        })}
      />
      <JsonLd data={articleJsonLd({ path: "/guide/certainty/", headline: title, description })} />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Desk grade</p>
      <h1>Grade how sure the lean is</h1>
      <p>
        This page is a calculator for the certainty grade on the {SITE_NAME} desk. You type two
        means, and you can mark the flags the card already uses. The desk grades the pair thin,
        lean, clear, or strong. The{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link> answers who leans on the 1.5-point line.
        This page answers how sure that lean is.
      </p>
      <p>
        The <Link href="/guide/start-sit/">start/sit guide</Link> is how floor, mean, and ceiling
        decide who to start. These bands grade that call. How the estimates are
        built is the <Link href="/methodology/">methodology</Link>. What the product is, and is
        not, is the <Link href="/about/">about page</Link>.
      </p>
      <p>
        The form does not look up a player. It does not call a projection feed. The means are
        yours. Listed status still outranks any number you type. Nothing here is an official
        projection, and nothing here is gambling advice.
      </p>

      <CertaintyTool />

      <h2>What moves the grade</h2>
      <p>
        The score is the same helper the start/sit card calls. It is not a new scale. A wider
        rounded mean gap raises it. The other flags cut it or, for a three-week sample on both
        sides, add a little. The printed bands are thin, lean, clear, and strong. At 78 and
        above the band is strong. At 58 and above it is clear. At 40 and above it is lean.
        Below that it is thin. Those cuts are methodology v0, subject to change. They are not a
        win probability and not a published accuracy rate.
      </p>

      <h3>Mean gap</h3>
      <p>
        Mean delta is side A minus side B, rounded to one decimal, the same rounding{" "}
        <Link href="/guide/start-sit/">start/sit</Link> and the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link> use. The grade sees that rounded gap.
        Under 1.5 the pair is a toss-up on mean alone, and the grade says the gap sits inside
        the toss-up band. At 1.5 or more, the higher mean is the lean, and a wide gap can carry
        more of the call. The line is softness in the estimate. It is not a spread, a
        moneyline, or a win probability.
      </p>

      <h3>Availability gate</h3>
      <p>
        OUT, IR, and INACTIVE zero that side. On this form, mark the side availability-gated.
        The desk mean becomes zero, and the grade records that the side is gated. The model
        does not invent a return date.{" "}
        <Link href="/guide/listed-status/">
          What Questionable, Doubtful, Out, IR, and inactive mean
        </Link>{" "}
        is the page for the label. If the status and the
        mean disagree, believe the status.
      </p>

      <h3>Status discount</h3>
      <p>
        Questionable and Doubtful are a soft discount. They are not a zero. The flag maps to a
        negative availability adjustment, which is how the card cuts the grade for a dirty
        status that is still a possible play. Once a side is gated, the discount is not applied
        on top. The gate already zeroed the mean.
      </p>

      <h3>Uncertainty</h3>
      <p>
        Each side is low, med, or high. High uncertainty cuts the grade. Med cuts it less. Low
        is the default, and it does not add a penalty. Uncertainty is about the estimate, not
        about a betting market. A high label does not turn the grade into odds.
      </p>

      <h3>Trailing sample</h3>
      <p>
        Trailing weeks used is a whole number for each side. The helper looks at the shorter of
        the two. Three or more weeks on both sides adds a little. One week or fewer on the
        shorter side is a thin sample and cuts the grade. Two weeks is neither the bonus nor
        that penalty. The count is the sample you say you have. This form does not look up a
        game log.
      </p>

      <h2>What this tool is not</h2>
      <ul>
        <li>Not a player search, and not a call to a projection feed.</li>
        <li>
          Not a substitute for listed status. OUT, IR, and INACTIVE still zero a side. Mark the
          gate, or the grade will not see it.
        </li>
        <li>
          Not the toss-up line by itself. Who leans, under or over 1.5, is the{" "}
          <Link href="/guide/toss-up/">toss-up tool</Link>. This page grades the surety of that
          lean.
        </li>
        <li>Not a win probability, a moneyline, odds, or a sportsbook.</li>
        <li>Not an official projection, club report, or injury wire.</li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          you type are labels for the comparison only.
        </li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Where the reading guides are</h2>
      <p>
        The sample start/sit desk stays out of search until licensed GREEN sports data is in
        place. This page does not set a date for that, and it does not promise those URLs will
        enter a search index. This tool lives at /guide/certainty/. It does not put fixture
        player rows into the form, and it does not put that desk into search.
      </p>
      <p>
        How those bands sit on a lineup decision is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>. Apply the 1.5-point line in the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link>. Read the designation before the number
        in{" "}
        <Link href="/guide/listed-status/">
          what Questionable, Doubtful, and Out mean
        </Link>. How the score is built is the <Link href="/methodology/">methodology</Link>. The rest of
        the reading notes
        sit on the <Link href="/guide/">guides</Link> hub. What the product is, and is not, is
        the <Link href="/about/">about page</Link>.
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
