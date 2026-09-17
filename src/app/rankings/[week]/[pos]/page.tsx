import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaticRedirect } from "@/components/StaticRedirect";
import { FIXTURE_WEEK } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { weekRankingsPath } from "@/lib/static-paths";
import { POSITIONS, type SkillPosition, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

function parsePos(pos: string): SkillPosition | null {
  const upper = pos.toUpperCase();
  return (POSITIONS as readonly string[]).includes(upper) ? (upper as SkillPosition) : null;
}

export function generateStaticParams() {
  return POSITIONS.map((pos) => ({
    week: String(FIXTURE_WEEK),
    pos: pos.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string; pos: string }>;
}): Promise<Metadata> {
  const { week, pos } = await params;
  const position = parsePos(pos);
  const to = position ? weekRankingsPath(Number(week), position) : "/rankings/";
  return {
    title: position ? `Week ${week} ${position} rankings` : "Rankings",
    alternates: { canonical: absoluteUrl(to) },
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE", thin: true })),
  };
}

export default async function RankingsAliasPage({
  params,
}: {
  params: Promise<{ week: string; pos: string }>;
}) {
  const { week, pos } = await params;
  const position = parsePos(pos);
  if (!position) notFound();
  return <StaticRedirect to={weekRankingsPath(Number(week), position)} />;
}
