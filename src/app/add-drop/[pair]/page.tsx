import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { ProjectionCard } from "@/components/ProjectionCard";
import { StaticRedirect } from "@/components/StaticRedirect";
import { Timestamps } from "@/components/Timestamps";
import { getAddDropRecommendation, getVerification, resolvePair } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { addDropLabel } from "@/lib/recommendations";
import { addDropStaticParams } from "@/lib/static-paths";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return addDropStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const resolved = resolvePair(pair);
  if (!resolved) return { title: "Add / drop" };
  const canonical = `/add-drop/${resolved.left.slug}-vs-${resolved.right.slug}/`;
  return {
    title: `Add ${resolved.left.displayName} or ${resolved.right.displayName}?`,
    description: "Fixture add/drop comparison from computed estimates.",
    alternates: { canonical },
    ...robotsMeta(
      decideIndexation({ sourceClass: "FIXTURE", thin: !resolved.isCanonical }),
    ),
  };
}

export default async function AddDropPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const resolved = resolvePair(pair);
  if (!resolved) notFound();
  if (!resolved.isCanonical) {
    return <StaticRedirect to={`/add-drop/${resolved.left.slug}-vs-${resolved.right.slug}/`} />;
  }

  const rec = getAddDropRecommendation(resolved.left, resolved.right);
  const stamp = getVerification(resolved.left.id, "projection_week");
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Add / drop", path: "/add-drop/" },
          {
            name: `${resolved.left.displayName} vs ${resolved.right.displayName}`,
            path: `/add-drop/${resolved.left.slug}-vs-${resolved.right.slug}/`,
          },
        ]}
      />
      <FixtureBanner />
      <h1>
        Add/drop: {resolved.left.displayName} vs {resolved.right.displayName}
      </h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      <KillSwitchNotice>
        <article className="card rec-hero">
          <h2>{addDropLabel(rec)}</h2>
          <p>Mean delta {rec.scoreDelta.toFixed(1)}. Same toss-up rule as start/sit (1.5 pts).</p>
        </article>
        <div className="cards" style={{ marginTop: "1rem" }}>
          <ProjectionCard projection={rec.leftProjection} name={resolved.left.displayName} />
          <ProjectionCard projection={rec.rightProjection} name={resolved.right.displayName} />
        </div>
      </KillSwitchNotice>
      <p>
        <Link href={`/players/${resolved.left.slug}/`}>{resolved.left.displayName}</Link>
        {" · "}
        <Link href={`/players/${resolved.right.slug}/`}>{resolved.right.displayName}</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
