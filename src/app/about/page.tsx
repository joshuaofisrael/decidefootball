import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "About Decide Football";
const description =
  "Decide Football is an independent fantasy football decision site for start/sit, availability, injuries, waivers, and rankings. Not a sports news blog. Not NFL-affiliated. Not gambling advice.";

export const metadata: Metadata = {
  title,
  description,
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function AboutPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ]}
      />
      <JsonLd
        data={webPageJsonLd({
          path: "/about/",
          name: title,
          description,
        })}
      />
      <p className="kicker">Independent fantasy decisions</p>
      <h1>About {SITE_NAME}</h1>
      <p>
        {SITE_NAME} exists for a narrow job: help you make a roster call. Start or sit. Is this
        player available. What a listed status says versus what a projection is estimating. Who
        to add or drop. How a position ranks this week.
      </p>
      <p>
        Those are decisions with a clock on them. The site is built around that, not around a
        recap of every snap or a running news blog.
      </p>

      <h2>What this site is</h2>
      <p>
        An independent fantasy football <em>decision</em> site. Pages answer a specific question
        with structured estimates (floor, mean, and ceiling) and with availability kept separate
        from the projection model. The model does not invent a status, a return date, or a stat
        line that was not supplied as an input.
      </p>
      <p>The product is organized around the calls people actually make:</p>
      <ul>
        <li>
          <Link href="/start-sit/">Start / sit</Link>: compare two players on the same week,
          with a certainty score.
        </li>
        <li>
          <Link href="/is-playing/">Is playing</Link>: availability from a reported status
          label, not from the model guessing.
        </li>
        <li>Injuries: the status timeline, distinct from the estimate.</li>
        <li>Waivers and add/drop: priority, urgency, and pairwise comparisons.</li>
        <li>Weekly positional rankings: the same estimates, stacked.</li>
        <li>
          <Link href="/slate/">Week slate</Link>: kick windows and a Sunday Mode toggle.
        </li>
      </ul>
      <p>
        How those numbers are computed is written down on the{" "}
        <Link href="/methodology/">methodology</Link> page. It is versioned, labeled v0, and
        subject to change. There is no backtest published here, and none should be inferred.
      </p>

      <h2>What this site is not</h2>
      <ul>
        <li>
          Not a sports newsroom. Game stories, rumor mills, and clubhouse coverage belong
          elsewhere.
        </li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Player
          and team names are used for identification in fantasy analysis only.
        </li>
        <li>Not gambling advice, odds, or a sportsbook. Nothing here is a wagering product.</li>
        <li>
          Not a claim that estimates are official, guaranteed, or a substitute for your own
          roster judgment.
        </li>
      </ul>

      <h2>Data, and what is public in search</h2>
      <p>
        Decision tools are on the site so the product can be used and reviewed. Until licensed
        sports data is in place, sample sports pages stay out of search indexes. This About page
        and the methodology page are the public, indexable description of the product.
      </p>
      <p>
        Ownership is listed in the site footer. Contact and legal details that still need an
        operator input are marked on the draft{" "}
        <Link href="/disclaimer/">disclaimer</Link> and{" "}
        <Link href="/privacy/">privacy</Link> pages. None of those blanks are filled with
        invented addresses or credentials.
      </p>
    </div>
  );
}
