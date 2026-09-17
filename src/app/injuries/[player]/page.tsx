import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { StatusLabel } from "@/components/StatusLabel";
import { Timestamps } from "@/components/Timestamps";
import { getInjury, getPlayerBySlug, getPlayers, getVerification } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { nowIso } from "@/lib/timestamps";

export const revalidate = 3600;

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
    title: `${player.displayName} fixture injury status`,
    description: `Sample injury/status page for ${player.displayName}. Not live verified.`,
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
      <h1>{player.displayName} — fixture status</h1>
      <Timestamps lastVerifiedAt={stamp.lastVerifiedAt} renderedAt={renderedAt} />
      {injury ? (
        <article className="card">
          <p className="kicker">Reported fixture designation</p>
          <h2>
            <StatusLabel code={injury.statusCode} /> {injury.bodyArea ?? ""}
          </h2>
          <p>{injury.notesSourceText}</p>
          <p>
            Source class: {injury.sourceClass}. This page must never be read as a live verified
            injury or an official league report.
          </p>
        </article>
      ) : (
        <p>No fixture status row for this player.</p>
      )}
      <p>
        <Link href={`/players/${player.slug}/`}>Player hub</Link>
        {" · "}
        <Link href={`/is-${player.slug}-playing-today/`}>Is playing today</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
