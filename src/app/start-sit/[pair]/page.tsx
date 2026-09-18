import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertaintyMeter } from "@/components/CertaintyMeter";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { ProjectionCard } from "@/components/ProjectionCard";
import { StaticRedirect } from "@/components/StaticRedirect";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { WatchButton } from "@/components/WatchButton";
import { isAiExplainEnabled } from "@/lib/ai-explain";
import {
  getInjury,
  getPlayerNote,
  getStartSitRecommendation,
  getVerification,
  resolvePair,
} from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { startLabel } from "@/lib/recommendations";
import { startSitStaticParams } from "@/lib/static-paths";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return startSitStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const resolved = resolvePair(pair);
  if (!resolved) return { title: "Start or sit" };
  const canonical = `/start-sit/${resolved.left.slug}-vs-${resolved.right.slug}/`;
  return {
    title: `Start ${resolved.left.displayName} or ${resolved.right.displayName}?`,
    description: `Fixture start/sit with a certainty score. ${resolved.left.displayName} against ${resolved.right.displayName}, from structured estimates.`,
    alternates: { canonical },
    ...robotsMeta(
      decideIndexation({ sourceClass: "FIXTURE", thin: !resolved.isCanonical }),
    ),
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
    return <StaticRedirect to={`/start-sit/${resolved.left.slug}-vs-${resolved.right.slug}/`} />;
  }

  const rec = getStartSitRecommendation(resolved.left, resolved.right);
  const leftInjury = getInjury(resolved.left.id);
  const rightInjury = getInjury(resolved.right.id);
  const stamp = getVerification(resolved.left.id, "projection_week");
  const renderedAt = nowIso();
  const leftNote = getPlayerNote(resolved.left.slug);
  const rightNote = getPlayerNote(resolved.right.slug);

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
        {resolved.left.displayName} or {resolved.right.displayName}
      </h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />

      <KillSwitchNotice>
        <article className="card rec-hero">
          <div className="call-heads">
            <PlayerAvatar
              slug={resolved.left.slug}
              name={resolved.left.displayName}
              position={resolved.left.position}
            />
            <PlayerAvatar
              slug={resolved.right.slug}
              name={resolved.right.displayName}
              position={resolved.right.position}
            />
          </div>
          <h2>{startLabel(rec)}</h2>
          <p>
            Mean delta {rec.scoreDelta.toFixed(1)}. Toss-up line is 1.5 estimated points. AI
            explain is {isAiExplainEnabled() ? "on" : "off"}.
          </p>
          <CertaintyMeter certainty={rec.certainty} />
        </article>
        <div className="cards" style={{ marginTop: "1rem" }}>
          <ProjectionCard projection={rec.leftProjection} name={resolved.left.displayName} />
          <ProjectionCard projection={rec.rightProjection} name={resolved.right.displayName} />
        </div>
      </KillSwitchNotice>

      <section className="card" style={{ marginTop: "1rem" }}>
        <h2>Status, not a guess</h2>
        <ul className="status-list">
          <li>
            <Link href={`/players/${resolved.left.slug}/`}>{resolved.left.displayName}</Link>{" "}
            {leftInjury ? <StatusLabel code={leftInjury.statusCode} /> : null}
            <span className="stamp"> {leftNote.role}</span>
            <WatchButton slug={resolved.left.slug} name={resolved.left.displayName} />
          </li>
          <li>
            <Link href={`/players/${resolved.right.slug}/`}>{resolved.right.displayName}</Link>{" "}
            {rightInjury ? <StatusLabel code={rightInjury.statusCode} /> : null}
            <span className="stamp"> {rightNote.role}</span>
            <WatchButton slug={resolved.right.slug} name={resolved.right.displayName} />
          </li>
        </ul>
        <p>
          <Link href="/methodology/">Certainty and the mean live in methodology v0</Link>
          {" · "}
          <Link href="/slate/">See the week slate</Link>
          {" · "}
          <Link href={`/injuries/${resolved.left.slug}/`}>Left timeline</Link>
          {" · "}
          <Link href={`/injuries/${resolved.right.slug}/`}>Right timeline</Link>
        </p>
      </section>
    </div>
  );
}
