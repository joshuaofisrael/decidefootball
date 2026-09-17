import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { getAddDropPairs, getAddDropRecommendation } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { addDropLabel } from "@/lib/recommendations";

export const metadata: Metadata = {
  title: "Add / drop",
  description: "Fixture add/drop comparisons from the same estimate engine as start/sit.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function AddDropIndexPage() {
  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Add / drop", path: "/add-drop/" },
        ]}
      />
      <FixtureBanner />
      <h1>Add or drop</h1>
      <p>Same metrics family as start/sit. Canonical pair order and reverse 301.</p>
      <div className="cards">
        {getAddDropPairs().map(({ left, right }) => {
          const rec = getAddDropRecommendation(left, right);
          return (
            <article className="card" key={`${left.id}-${right.id}`}>
              <h2>
                <Link href={`/add-drop/${left.slug}-vs-${right.slug}/`}>
                  {left.displayName} vs {right.displayName}
                </Link>
              </h2>
              <p>{addDropLabel(rec)}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
