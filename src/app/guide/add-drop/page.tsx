import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqPageJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "How to read an add/drop card — mean, floor, ceiling, mean delta";
const description =
  "How to read a Decide Football add/drop card: listed status first, mean as the ranking number, floor and ceiling as a model range, and the mean delta against the same 1.5-point toss-up as start/sit. A roster-churn comparison, not a lineup call and not a free-agent claim.";

const guideFaqs = [
  {
    question: "What is an add/drop card, and how is it different from start/sit?",
    answer:
      "An add/drop card is a roster-churn comparison. It asks which of two names to keep by adding one over the name you would drop. The label is Add A over B, or a toss-up when the means are too close. It is not a start/sit lineup call among players already on the roster. It is not a claim that either name is free on ESPN, Yahoo, Sleeper, or any other host.",
  },
  {
    question: "What do mean, floor, ceiling, and mean delta mean on this card?",
    answer:
      "Read listed status first. OUT, IR, and INACTIVE force that side to zero. The mean is the ranking number, the same estimate start/sit sorts on. Floor and ceiling are the model range around that mean, a low end and a high end. Mean delta is the left mean minus the right mean, printed to one decimal. The card does not print the start/sit certainty bands. Those bands live on the start/sit card. This card prints the delta and the toss-up line.",
  },
  {
    question: "When is the pair a toss-up?",
    answer:
      "The line is the same as start/sit. Under 1.5 estimated points the desk treats the pair as a toss-up and prints that there is no add/drop edge on mean alone. The higher mean is not a verdict inside that gap. At 1.5 points or more, the label names the higher side as the add and the other side as the drop. Role and listed status still matter. The line is softness in the estimate. It is not odds, a FAAB bid, or gambling advice.",
  },
  {
    question: "Why is there one URL for a pair, and what happens to the reverse order?",
    answer:
      "Canonical order is ascending player id, the same rule as start/sit. Alphabetical slug order is not the rule. The swapped URL is not a second card. It redirects to the canonical pair. This desk calls that the reverse-pair 301, the same family as start/sit. Search is pointed at one comparison.",
  },
  {
    question: "Does the card mean either player is a free agent, or tell me what to bid?",
    answer:
      "No. The card does not know your league, your roster, your waiver order, or your FAAB balance. It does not know who is available on Yahoo, ESPN, Sleeper, or any other host. It is not a waiver claim and not a bid. Hot, rising, stash, and fade are a different board. This comparison only says which name the mean prefers if you are choosing one over the other.",
  },
  {
    question: "Why do the sample add/drop URLs stay out of search while this guide does not?",
    answer:
      "The add/drop desk and the pair cards are on the site so the product can be reviewed, and they use sample data. They stay out of search until licensed GREEN sports data is in place. Crawlers are told to skip the add/drop prefix. This guide does not promise those URLs will be indexed, and it does not give a date. This page lives at /guide/add-drop/. That path is a reading guide. It is not the fixture desk at /add-drop/, and it does not match that blocked path.",
  },
] as const;

export const metadata = pageMetadata({
  path: "/guide/add-drop/",
  title,
  description,
  indexation: { kind: "editorial" },
});

export default function AddDropGuidePage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
          { name: "Add/drop guide", path: "/guide/add-drop/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/add-drop/",
          name: title,
          description,
        })}
      />
      <JsonLd data={faqPageJsonLd([...guideFaqs])} />
      <p className="kicker">Reading the pair</p>
      <h1>How to read an add/drop card</h1>
      <p>
        A {SITE_NAME} add/drop card is a roster-churn comparison. It asks which name to keep by
        adding one over the name you would drop. It is not a start/sit lineup call, and it is
        not a claim that either player is free on ESPN, Yahoo, Sleeper, or any other host.
      </p>
      <p>
        This page is how to read that card. How the numbers are built is the{" "}
        <Link href="/methodology/">methodology</Link>. How the same mean, floor, ceiling, and
        toss-up line work on a lineup card is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>. What the product is, and is not,
        is the <Link href="/about/">about page</Link>.
      </p>

      <h2>A roster-churn comparison</h2>
      <p>
        The card prints one label. When the mean gap clears the line, the label names the add
        and the name it replaces: Add one player over the other. When the gap is inside the
        line, the label is a toss-up: no add/drop edge on mean alone.
      </p>
      <p>
        That is a keep-or-replace call. Start/sit asks which of two rostered names to put in the
        lineup. This card does not make that call. Waiver urgency — hot, rising, stash, and
        fade — asks how hard this desk would chase a name. How to read that tag is the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>. The add/drop label does not
        replace it, and the tag does not replace this pair.
      </p>

      <h2>The same estimate stack</h2>
      <p>
        Read listed status before any number. OUT, IR, and INACTIVE force that side to zero.
        The model does not invent a return date. Questionable and doubtful leave a discounted
        estimate. What each designation means is the{" "}
        <Link href="/guide/listed-status/">listed status guide</Link>. If the status and the
        mean disagree, believe the status.
      </p>
      <p>
        The mean is the ranking number, the same estimate start/sit and the weekly board sort
        on. Floor and ceiling are the model range around that mean, a low end and a high end. A
        wider range means a thinner sample or a dirtier listed status. The range is not a
        promise of points and not an official projection. How a positional list uses that mean
        is the <Link href="/guide/rankings/">rankings guide</Link>.
      </p>
      <p>
        Mean delta is the left mean minus the right mean, printed to one decimal. The card
        shows that gap next to the label. It does not print the start/sit certainty bands —
        thin, lean, clear, or strong. Those bands grade how hard a lineup call can lean on the
        math. This card uses the shared toss-up line instead.
      </p>

      <h2>The 1.5-point line</h2>
      <p>
        The desk draws the same toss-up line as start/sit: 1.5 estimated points. Inside that
        gap the card says to lean neither side on mean alone. At 1.5 points or beyond, the
        higher mean is the add and the other name is the drop. Role and listed status still
        matter. A tenth of a point is not a verdict. Applying the line to means you type is the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link>. The same delta is the start/sit lean.
      </p>
      <p>
        The line is softness in the estimate. It is not a spread, a moneyline, a win
        probability, or a FAAB bid. Nothing on this desk is a gambling product.
      </p>

      <h2>One canonical pair</h2>
      <p>
        Each comparison has one URL. Order is ascending player id, the same rule as start/sit.
        Alphabetical slug order is a different sort, and this desk does not use it. Left and
        right on the card follow that id order. The mean delta follows them: left minus right.
      </p>
      <p>
        The swapped URL is not a second comparison. It redirects to the canonical pair. This
        desk calls that the reverse-pair 301, the same family as start/sit. Search is pointed
        at one card.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>Not a start/sit lineup call among players already on the roster.</li>
        <li>
          Not a claim that either name is available on Yahoo, ESPN, Sleeper, or any other host.
        </li>
        <li>Not a waiver claim, a waiver-priority order, or FAAB advice.</li>
        <li>Not an official projection, club report, or injury wire.</li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
      </ul>

      <h2>Where the sample cards are</h2>
      <p>
        Comparison tools are at the <Link href="/add-drop/">add/drop desk</Link> so the product
        can be used and reviewed. Those URLs, including each pair card, use sample data. They
        stay out of search until licensed GREEN sports data is in place. This page does not set
        a date for that, and it does not promise those URLs will enter a search index.
      </p>
      <p>
        The sample desk lives on the add/drop path. This guide lives at /guide/add-drop/. That
        path is a reading guide. It does not match the blocked add/drop prefix, and it does not
        put the sample cards into search.
      </p>
      <p>
        The public description of the card is this guide, the{" "}
        <Link href="/methodology/">methodology</Link>, the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>, the{" "}
        <Link href="/guide/waiver-radar/">waiver radar guide</Link>, the{" "}
        <Link href="/guide/rankings/">rankings guide</Link>, the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link>, and the{" "}
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
