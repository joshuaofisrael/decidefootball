import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { getStartSitPairs, getStartSitRecommendation } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Start / sit",
  description: "Fixture start/sit pairs computed from structured estimates.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function StartSitIndexPage() {
  const pairs = getStartSitPairs();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Start / sit", path: "/start-sit/" },
        ]}
      />
      <FixtureBanner />
      <h1>Start or sit</h1>
      <p>
        Pair order is canonical by ascending player id. Reverse URLs 301 to this order. AI
        explanation is off.
      </p>
      <div className="cards">
        {pairs.map(({ left, right }) => {
          const rec = getStartSitRecommendation(left, right);
          return (
            <article className="card" key={`${left.id}-${right.id}`}>
              <p className="kicker">
                {left.position} · week {rec.week}
              </p>
              <h2>
                <Link href={`/start-sit/${left.slug}-vs-${right.slug}/`}>
                  {left.displayName} vs {right.displayName}
                </Link>
              </h2>
              <p>{startLabel(rec)}</p>
              <p className="stamp">
                {rec.leftProjection.pointsMean.toFixed(1)} vs{" "}
                {rec.rightProjection.pointsMean.toFixed(1)} · delta {rec.scoreDelta.toFixed(1)}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
