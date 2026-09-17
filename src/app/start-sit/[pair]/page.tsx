import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { ProjectionCard } from "@/components/ProjectionCard";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { isAiExplainEnabled } from "@/lib/ai-explain";
import { pairPath } from "@/lib/canonicalize";
import {
  getInjury,
  getStartSitPairs,
  getStartSitRecommendation,
  getVerification,
  resolvePair,
} from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";
import { nowIso } from "@/lib/timestamps";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getStartSitPairs().map(({ left, right }) => ({
    pair: pairPath(left.slug, right.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const resolved = resolvePair(pair);
  if (!resolved) return { title: "Start / sit" };
  return {
    title: `Start ${resolved.left.displayName} or ${resolved.right.displayName}?`,
    description: `Fixture start/sit comparison computed from structured estimates.`,
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function StartSitPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const resolved = resolvePair(pair);
  if (!resolved) notFound();
  if (!resolved.isCanonical) {
    permanentRedirect(`/start-sit/${resolved.left.slug}-vs-${resolved.right.slug}/`);
  }

  const rec = getStartSitRecommendation(resolved.left, resolved.right);
  const leftInjury = getInjury(resolved.left.id);
  const rightInjury = getInjury(resolved.right.id);
  const stamp = getVerification(resolved.left.id, "projection_week");
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Start / sit", path: "/start-sit/" },
          {
            name: `${resolved.left.displayName} vs ${resolved.right.displayName}`,
            path: `/start-sit/${resolved.left.slug}-vs-${resolved.right.slug}/`,
          },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">Start / sit · metrics first · model {rec.modelVersion}</p>
      <h1>
        {resolved.left.displayName} vs {resolved.right.displayName}
      </h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />

      <KillSwitchNotice>
        <article className="card rec-hero">
          <h2>{startLabel(rec)}</h2>
          <p>
            Mean delta {rec.scoreDelta.toFixed(1)}. Toss-up threshold is 1.5 estimated points.
            AI explanation is {isAiExplainEnabled() ? "on" : "off (stub)"}.
          </p>
        </article>
        <div className="cards" style={{ marginTop: "1rem" }}>
          <ProjectionCard projection={rec.leftProjection} name={resolved.left.displayName} />
          <ProjectionCard projection={rec.rightProjection} name={resolved.right.displayName} />
        </div>
      </KillSwitchNotice>

      <section className="card" style={{ marginTop: "1rem" }}>
        <h2>Fixture status vs estimate</h2>
        <ul>
          <li>
            <Link href={`/players/${resolved.left.slug}/`}>{resolved.left.displayName}</Link>{" "}
            {leftInjury ? <StatusLabel code={leftInjury.statusCode} /> : null}
          </li>
          <li>
            <Link href={`/players/${resolved.right.slug}/`}>{resolved.right.displayName}</Link>{" "}
            {rightInjury ? <StatusLabel code={rightInjury.statusCode} /> : null}
          </li>
        </ul>
        <p>
          <Link href="/methodology/">Computed from the methodology v0 module</Link>. Explanation
          text is not AI-generated in this scaffold.
        </p>
      </section>
    </div>
  );
}
