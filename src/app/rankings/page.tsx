import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { FIXTURE_WEEK } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { POSITIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Weekly rankings",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

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
