import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { getStartSitPairs, getStartSitRecommendation } from "@/lib/data";
import { certaintyCopy } from "@/lib/certainty";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";

export const metadata: Metadata = {
  title: "Start or sit",
  description: "Fixture start/sit pairs with a certainty score. Metrics first. Sample data.",
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
        Pair order is canonical by ascending player id. Reverse URLs redirect. Each card carries a
        certainty score. AI explain stays off.
      </p>
      <div className="cards">
        {pairs.map(({ left, right }) => {
          const rec = getStartSitRecommendation(left, right);
          return (
            <article className="card" key={`${left.id}-${right.id}`}>
              <div className="call-heads compact">
                <PlayerAvatar slug={left.slug} name={left.displayName} position={left.position} size={44} />
                <PlayerAvatar slug={right.slug} name={right.displayName} position={right.position} size={44} />
              </div>
              <p className="kicker">
                {left.position} · week {rec.week} · {certaintyCopy(rec.certainty.label)}{" "}
                {rec.certainty.score}
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
      <p>
        <Link href="/slate/">Week slate</Link>
        {" · "}
        <Link href="/methodology/">Certainty math</Link>
      </p>
    </div>
  );
}
