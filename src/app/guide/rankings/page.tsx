import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "How to read weekly positional rankings — mean, floor, ceiling, status";
const description =
  "How to read a Decide Football weekly positional rankings board: one position ordered by mean, with listed status, floor, and ceiling on the row. A rank is not a start/sit verdict, not official, and not a free-agent claim.";

const guideFaqs = [
  {
    question: "What does the weekly board sort on?",
    answer:
      "The board is one position: quarterback, running back, wide receiver, or tight end. Rows sort on the mean, high to low. The mean is the ranking number. If two means match, the higher ceiling ranks first. Kicker and team defense are not on this board. The order is an estimate stack for that week and that scoring format. It is not an official NFL list, and the rank integer is not a separate scouting grade.",
  },
  {
    question: "How do floor, ceiling, and listed status change a row that already has a rank?",
    answer:
      "The rank is the mean order. Floor and ceiling are the model range around that mean, a low end and a high end. A wider range means a thinner sample or a dirtier listed status. They are not a promise of points. Read the status column before you treat the rank as usable. OUT, IR, and INACTIVE force mean, floor, and ceiling to zero, so that row sorts with the other zeros. It is not a start, and a rank among zeros is not a return date. Questionable and doubtful leave a discounted estimate. The rank does not clear the label.",
  },
  {
    question: "Why is certainty not a column on the rankings board?",
    answer:
      "Certainty is a start/sit desk grade: thin, lean, clear, or strong. It says how hard a pairwise call can lean on the math. It is not the probability of winning the fantasy week. The positional board does not print it. A rank is an order, not that grade. When two neighbors are close, under 1.5 estimated points the start/sit desk treats the pair as a toss-up and keeps certainty thin. Take that pair to the start/sit card. The higher rank is not the verdict.",
  },
  {
    question: "Does a higher rank mean the player is a free agent, or a must-start?",
    answer:
      "No. The board does not know your league, your roster, or who is available on Yahoo, ESPN, Sleeper, or any other host. A high rank is not a free-agent claim. Waiver urgency — hot, rising, stash, and fade — is a different board. A rank is also not a start/sit verdict by itself. Pairwise comparison, with the certainty grade, is the start/sit card. The higher mean on a list is the order this desk printed.",
  },
  {
    question: "Why do the sample rankings URLs stay out of search?",
    answer:
      "The rankings desk and the week-by-position boards are on the site so the product can be reviewed, and they use sample data. They stay out of search until licensed GREEN sports data is in place. This guide does not promise those URLs will be indexed, and it does not give a date. This page lives at /guide/rankings/. That path is a reading guide. It is not the fixture board at /rankings/, and it does not match that blocked path.",
  },
] as const;

export const metadata = pageMetadata({
  path: "/guide/rankings/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function RankingsGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Rankings guide", path: "/guide/rankings/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/rankings/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Reading the order</p>
      <h1>How to read a weekly rankings board</h1>
      <p>
        A {SITE_NAME} weekly rankings board is one position, stacked. The rows sort on the mean.
        Listed status, floor, and ceiling sit on the same row. The rank is that order. It is not
        a start/sit verdict, not an official list, and not a free-agent claim.
      </p>
      <p>
        This page is how to read that stack. How the numbers are built is the{" "}
        <Link href="/methodology/">methodology</Link>. How a pairwise card uses the same mean,
        with a certainty grade, is the <Link href="/guide/start-sit/">start/sit guide</Link>.
        What the product is, and is not, is the <Link href="/about/">about page</Link>.
      </p>

      <h2>One position, ordered by the mean</h2>
      <p>
        Each board is a single position: quarterback, running back, wide receiver, or tight end.
        Kicker and team defense are not on this desk. The rows sort by the mean, high to low.
        That mean is the same ranking number start/sit sorts on. If two means match, the higher
        ceiling ranks first.
      </p>
      <p>
        The board is for one scoring format at a time. The sample pages stamp the default format
        as provisional. That stamp is an open input. It is not a published choice of format, and
        it is not a reason to treat the order as official.
      </p>
      <p>
        Treat the rank as the mean order for that position and that week. A name at 4 sits above
        a name at 5 because the mean says so, or because the means tied and the ceiling broke
        the tie. The integer is not a separate scouting grade.
      </p>

      <h2>Status, floor, and ceiling on the row</h2>
      <p>
        The table prints rank, player, status, mean, floor, and ceiling. Read the status before
        you use the rank. The designation is an input someone listed. The order does not vote a
        new one into existence.
      </p>
      <p>
        OUT, IR, and INACTIVE force the estimate to zero: mean, floor, and ceiling. Those rows
        sort with the other zeros. They are not starts, and a rank among zeros is not a return
        date. The model does not invent one. Questionable and doubtful apply a discount. They
        are not a cleared player, and they are not a ruled-out player. What each designation
        means is the <Link href="/guide/listed-status/">listed status guide</Link>.
      </p>
      <p>
        Floor and ceiling are the model range around the mean, a low end and a high end. A wider
        range means a thinner sample or a dirtier listed status. The range is not a promise of
        points. On this board, use the range to see how much room the model left around a rank
        you are about to trust. Weighing the floor against the ceiling for a week you are ahead
        or behind is the <Link href="/guide/start-sit/">start/sit guide</Link>. The rankings row
        shows the range. It does not turn that range into a lineup call.
      </p>

      <h2>Certainty is a different card</h2>
      <p>
        The positional board does not print a certainty score. Certainty — thin, lean, clear, or
        strong — is the start/sit desk grade of how hard a pairwise call can lean on the math. It
        is not the probability of winning the fantasy week. The{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link> is where that grade is taught.
      </p>
      <p>
        A higher rank is not that grade. When two neighbors sit close, the start/sit desk draws a
        toss-up line at 1.5 estimated points and keeps certainty thin inside it. Take the pair to
        the comparison card. The list already told you the mean order. It did not tell you the
        call is settled. Applying that line to two means you type is the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link>. Grading how sure the lean is, with the
        same desk score, is the <Link href="/guide/certainty/">certainty tool</Link>.
      </p>

      <h2>A rank is not a free-agent claim</h2>
      <p>
        The board does not know your league. It does not know your roster, your waiver order, or
        who is sitting free on Yahoo, ESPN, Sleeper, or any other host. A name near the top can
        already be rostered everywhere. A name near the bottom can be the best add in a thin
        league. Chase urgency is a different tag — hot, rising, stash, or fade — on the waiver
        board. How to read that tag is the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>. The rank does not replace
        it.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>
          Not a start/sit verdict. Pairwise comparison and the certainty grade are a different
          card.
        </li>
        <li>Not a free-agent list, and not a claim that any name is available on a host platform.</li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not an official ranking, club report, or injury wire.</li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Where the sample boards are</h2>
      <p>
        The <Link href="/rankings/">rankings desk</Link> is on the site so the product can be used
        and reviewed. Each position also has a week board. Those URLs use sample data. They stay
        out of search until licensed GREEN sports data is in place. This page does not set a date
        for that, and it does not promise those URLs will enter a search index. The fixture
        boards live on the rankings path and on week paths. This guide lives under /guide/, and
        it does not put those boards into search.
      </p>
      <p>
        The public description of the board is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, the{" "}
        <Link href="/guide/listed-status/">listed status guide</Link>, the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>, and the{" "}
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
