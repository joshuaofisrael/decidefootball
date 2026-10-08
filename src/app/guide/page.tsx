import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, itemListJsonLd, organizationJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const title = "Reading guides — how to read Decide Football decision cards";
const description =
  "Hub for how to read a Decide Football decision card: the start/sit stack, NFL injury designations before any number, how waivers work, the weekly positional rankings board, and the add/drop comparison, plus a toss-up tool for the 1.5-point mean delta and a certainty tool for the desk grade. Not a news blog, not NFL-affiliated, and not gambling advice.";

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
    name: "Injury designations",
    heading: "Injury designations",
    sentence:
      "What Questionable, Doubtful, Out, injured reserve, and inactive mean on the NFL injury report, and how a lineup should treat each label.",
  },
  {
    href: "/guide/waiver-radar/",
    name: "How waivers work",
    heading: "How waivers work",
    sentence:
      "How rolling waiver priority, reverse standings, and FAAB decide a claim, and when a player becomes a free agent.",
  },
  {
    href: "/guide/rankings/",
    name: "Rankings",
    heading: "Rankings",
    sentence:
      "One position, ordered by the mean, with status, floor, and ceiling on the row. A rank is not a start/sit verdict and not a free-agent claim.",
  },
  {
    href: "/guide/add-drop/",
    name: "Add/drop",
    heading: "Add/drop",
    sentence:
      "Keep one name by adding it over the name you would drop. Mean, floor, ceiling, and the mean delta, with the same 1.5-point toss-up as start/sit. Not a lineup call and not a free-agent claim.",
  },
  {
    href: "/guide/toss-up/",
    name: "Toss-up tool",
    heading: "Toss-up tool",
    sentence:
      "Type two means. The desk leans on the same 1.5-point mean delta used for start/sit and add/drop. Floor and ceiling are for weighing. The form does not look up a player.",
  },
  {
    href: "/guide/certainty/",
    name: "Certainty tool",
    heading: "Certainty tool",
    sentence:
      "Type two means and the desk flags. The grade is the same thin, lean, clear, or strong band the start/sit card prints. It is how sure the lean is, not who leans, and not a win probability.",
  },
] as const;

export const metadata = pageMetadata({
  path: "/guide/",
  title,
  description,
  indexation: { kind: "editorial" },
});

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
      <JsonLd data={articleJsonLd({ path: "/guide/", headline: title, description })} />
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
        This page is the hub for how to read a {SITE_NAME} decision card. It is not a news blog,
        not a game recap, and not a running wire.
      </p>
      <p>
        Five reading notes, and two tools. Each note owns a different line on the card. The
        toss-up tool applies the 1.5-point mean-delta line to numbers you type. The certainty
        tool grades how sure that lean is. How the estimates are built is the{" "}
        <Link href="/methodology/">methodology</Link>. What the product is, and is not, is the{" "}
        <Link href="/about/">about page</Link>.
      </p>

      <h2>Five reading guides and two tools</h2>
      <div className="cards four">
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
