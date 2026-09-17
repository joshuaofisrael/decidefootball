import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import {
  getGameForTeam,
  getInjury,
  getOpponent,
  getPlayerBySlug,
  getPlayers,
  getProjection,
  getVerification,
} from "@/lib/data";
import { statusVerb } from "@/lib/format";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { playingTodaySegment } from "@/lib/static-paths";
import { absoluteUrl, getDisplayTimeZone } from "@/lib/site";
import { formatTimestamp, nowIso } from "@/lib/timestamps";

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
  if (!player) return { title: "Is playing" };
  return {
    title: `Is ${player.displayName} playing today?`,
    description: `Fixture availability answer for ${player.displayName}. Not a live official report.`,
    alternates: { canonical: absoluteUrl(`/is-${playingTodaySegment(player.slug)}/`) },
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function IsPlayingPage({
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
  const opponent = getOpponent(player.teamId);
  const game = getGameForTeam(player.teamId);
  const projection = getProjection(player);
  const pretty = `/is-${playingTodaySegment(player.slug)}/`;

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Is playing", path: "/is-playing/" },
          { name: player.displayName, path: pretty },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">Availability query · {getDisplayTimeZone()}</p>
      <h1>Is {player.displayName} playing today?</h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      <article className="card rec-hero">
        <h2>{statusVerb(injury?.statusCode ?? "")}</h2>
        <p>
          Fixture designation: {injury ? <StatusLabel code={injury.statusCode} /> : "missing"}.
          This is not an official league inactive list.
        </p>
      </article>
      <article className="card" style={{ marginTop: "1rem" }}>
        <h2>Do not confuse status with the estimate</h2>
        <p>
          Model projection mean is {projection.pointsMean.toFixed(1)} estimated points
          {projection.availabilityGated ? " because the availability gate forced 0" : ""}. A
          projection is not proof someone is cleared to play.
        </p>
        <p>
          Opponent text: {opponent?.displayNameText ?? "unlisted"}
          {game ? ` · scheduled kickoff ${formatTimestamp(game.kickoffAt)}` : ""}.
        </p>
      </article>
      <p>
        <Link href={`/players/${player.slug}/`}>Player hub</Link>
        {" · "}
        <Link href={`/injuries/${player.slug}/`}>Injury page</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
