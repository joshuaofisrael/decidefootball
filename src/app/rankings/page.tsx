import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { FIXTURE_WEEK } from "@/lib/fixtures";
import { pageMetadata } from "@/lib/seo";
import { POSITIONS } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/rankings/",
  title: "Weekly rankings",
  indexation: { sourceClass: "FIXTURE" },
});

export default function RankingsIndexPage() {
  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Rankings", path: "/rankings/" },
        ]}
      />
      <FixtureBanner />
      <h1>Week {FIXTURE_WEEK} positional rankings</h1>
      <p>
        One position, ordered by the mean. Status, floor, and ceiling sit on the row.{" "}
        <Link href="/guide/rankings/">How to read the board</Link>.
      </p>
      <ul>
        {POSITIONS.map((pos) => (
          <li key={pos}>
            <Link href={`/week-${FIXTURE_WEEK}/${pos.toLowerCase()}-rankings/`}>
              {pos} rankings
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
