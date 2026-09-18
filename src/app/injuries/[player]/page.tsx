import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { InjuryTimeline } from "@/components/InjuryTimeline";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { getInjury, getInjuryTimeline, getPlayerBySlug, getPlayers, getVerification } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlayers().map((player) => ({ player: player.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ player: string }>;
}): Promise<Metadata> {
  const { player: slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return { title: "Injury page" };
  return {
    title: `${player.displayName} availability timeline`,
    description: `Fixture injury and availability timeline for ${player.displayName}. Not a live or official report.`,
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function InjuryPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const { player: slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) notFound();
  const injury = getInjury(player.id);
  const stamp = getVerification(player.id, "injury_status");
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Players", path: "/players/" },
          { name: player.displayName, path: `/players/${player.slug}/` },
          { name: "Injury status", path: `/injuries/${player.slug}/` },
        ]}
      />
      <FixtureBanner />
      <header className="hub-head">
        <PlayerAvatar slug={player.slug} name={player.displayName} position={player.position} size={72} />
        <div>
          <h1>{player.displayName} availability</h1>
          {injury ? <StatusLabel code={injury.statusCode} /> : null}
        </div>
      </header>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      <article className="card">
        <h2>Timeline</h2>
        <p>
          Dated fixture rows only. This is not a live verified injury and not an official league
          report.
        </p>
        <InjuryTimeline events={getInjuryTimeline(player.id)} />
      </article>
      <p>
        <Link href={`/players/${player.slug}/`}>Player hub</Link>
        {" · "}
        <Link href={`/is-${player.slug}-playing-today/`}>Is playing today</Link>
        {" · "}
        <Link href="/is-playing/">Full availability board</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
