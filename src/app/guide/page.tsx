import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { itemListJsonLd, organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "Reading guides — how to read Decide Football decision cards";
const description =
  "Hub for how to read a Decide Football decision card: the start/sit stack, listed status before any number, and waiver radar tags. Not a news blog, not NFL-affiliated, and not gambling advice.";

const guides = [
  {
    href: "/guide/start-sit/",
    name: "Start/sit",
    heading: "Start/sit",
    sentence:
      "The mean, the floor, the ceiling, and the certainty stack: the ranking number, the range around it, and a desk grade of how hard the math can lean.",
  },
  {
    href: "/guide/listed-status/",
    name: "Listed status",
    heading: "Listed status",
    sentence: "Healthy through INACTIVE is read before any number.",
  },
  {
    href: "/guide/waiver-radar/",
    name: "Waiver radar",
    heading: "Waiver radar",
    sentence: "Hot, rising, stash, and fade say how hard this desk would chase the name.",
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  ...robotsMeta(decideIndexation({ kind: "editorial" })),
};

export default function GuideHubPage() {
  return (
    <div className="wrap prose">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guide/" },
        ]}
      />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/guide/",
          name: title,
          description,
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          guides.map((guide) => ({
            name: guide.name,
            path: guide.href,
            description: guide.sentence,
          })),
        )}
      />
      <p className="kicker">Reading the desk</p>
      <h1>How to read the decision cards</h1>
      <p>
        {SITE_NAME} prints a card for a roster call. This page is the hub for how to read those
        cards. It is not a news blog, not a game recap, and not a running wire.
      </p>
      <p>
        Three notes. Each one owns a different line on the card. How the estimates are built is
        the <Link href="/methodology/">methodology</Link>. What the product is, and is not, is the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>The three guides</h2>
      <div className="cards three">
        {guides.map((guide) => (
          <article className="card" key={guide.href}>
            <h3>
              <Link href={guide.href}>{guide.heading}</Link>
            </h3>
            <p>{guide.sentence}</p>
          </article>
        ))}
      </div>

      <h2>Sample desks stay out of search</h2>
      <p>
        The sports desks on this site use fixture data: players, start/sit comparisons,
        is-playing, injuries, rankings, the waiver wire, add/drop, week pages, the slate, and the
        watchlist. They stay out of search until licensed GREEN sports data is in place. This hub
        does not promise those URLs will be indexed, and it does not give a date.
      </p>
      <p>
        {SITE_NAME} is not affiliated with, endorsed by, or sponsored by the NFL or its member
        clubs. Nothing here is gambling advice, a spread, or a sportsbook. The method is
        methodology v0, subject to change. No accuracy rate is published here, and none should
        be inferred.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>Not a sports news blog, a recap, or a rumor wire.</li>
        <li>
          Not affiliated with, endorsed by, or sponsored by the NFL or its member clubs. Names
          are identification for fantasy analysis only.
        </li>
        <li>Not gambling advice, odds, or a sportsbook.</li>
        <li>
          Not a backtest. The method is methodology v0, subject to change. No accuracy rate is
          published here, and none should be inferred.
        </li>
        <li>Not a promise that fixture sports URLs will enter a search index, and not a date.</li>
      </ul>
    </div>
  );
}
