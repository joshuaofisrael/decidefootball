import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { KillSwitchNotice } from "@/components/KillSwitchNotice";
import { Timestamps } from "@/components/Timestamps";
import { getWaiverRanks } from "@/lib/data";
import { FIXTURE_VERIFIED_AT, FIXTURE_WEEK } from "@/lib/fixtures";
import { decideIndexation, robotsMeta } from "@/lib/indexation";
import { formatLabel, getDefaultFormat } from "@/lib/site";
import { nowIso } from "@/lib/timestamps";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ week: String(FIXTURE_WEEK) }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}): Promise<Metadata> {
  const { week } = await params;
  return {
    title: `Waiver wire week ${week}`,
    description: `Fixture waiver priorities for week ${week}. Estimates only.`,
    ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
  };
}

export default async function WaiverWeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const weekNum = Number(week);
  if (!Number.isInteger(weekNum) || weekNum < 1 || weekNum > 18) notFound();

  const format = getDefaultFormat();
  const ranks = getWaiverRanks(weekNum, format);
  const renderedAt = nowIso();

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Waiver wire", path: `/waiver-wire/week-${weekNum}/` },
        ]}
      />
      <FixtureBanner />
      <h1>Waiver wire — week {weekNum}</h1>
      <p>
        Priority list from fixture estimates ({formatLabel(format)}). Not a claim about real
        waiver wire availability on any platform. No platform OAuth.
      </p>
      <Timestamps lastVerifiedAt={FIXTURE_VERIFIED_AT} renderedAt={renderedAt} />
      <KillSwitchNotice>
        <ol>
          {ranks.map((row) => (
            <li key={row.player.id}>
              <Link href={`/players/${row.player.slug}/`}>{row.player.displayName}</Link> — est.{" "}
              {row.projection.pointsMean.toFixed(1)} mean / {row.projection.pointsCeiling.toFixed(1)}{" "}
              ceiling
            </li>
          ))}
        </ol>
      </KillSwitchNotice>
      <p>
        <Link href={`/week-${weekNum}/wr-rankings/`}>WR rankings</Link>
        {" · "}
        <Link href="/add-drop/">Add/drop pairs</Link>
        {" · "}
        <Link href="/methodology/">Methodology</Link>
      </p>
    </div>
  );
}
