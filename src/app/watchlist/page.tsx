import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FixtureBanner } from "@/components/FixtureBanner";
import { WatchlistDesk } from "@/components/WatchlistDesk";
import { getInjury, getPlayers, getProjection, getTeam } from "@/lib/data";
import { decideIndexation, robotsMeta } from "@/lib/indexation";

export const metadata: Metadata = {
  title: "Watchlist",
  description:
    "Local watchlist stored in this browser. Fixture names only. Not synced to a fantasy platform.",
  ...robotsMeta(decideIndexation({ sourceClass: "FIXTURE" })),
};

export default function WatchlistPage() {
  const catalog = getPlayers().map((player) => {
    const injury = getInjury(player.id);
    const team = getTeam(player.teamId);
    const proj = getProjection(player);
    return {
      slug: player.slug,
      name: player.displayName,
      position: player.position,
      team: team?.displayNameText ?? "n/a",
      status: injury?.statusCode ?? "n/a",
      mean: proj.pointsMean,
    };
  });

  return (
    <div className="wrap">
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Watchlist", path: "/watchlist/" },
        ]}
      />
      <FixtureBanner />
      <p className="kicker">This browser only</p>
      <h1>Watchlist</h1>
      <p>
        Pin names from a hub or a start/sit card. Saved as <code>df_watchlist</code> in
        localStorage. No account. No platform OAuth.
      </p>
      <WatchlistDesk catalog={catalog} />
    </div>
  );
}
