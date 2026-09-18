"use client";

import Link from "next/link";
import { useWatchlist } from "./useWatchlist";

export function WatchlistHome({
  players,
}: {
  players: { slug: string; name: string; line: string }[];
}) {
  const { slugs, ready } = useWatchlist();
  const rows = players.filter((player) => slugs.includes(player.slug));

  return (
    <section className="card watch-home">
      <p className="kicker">Local watchlist</p>
      <h2>On your card</h2>
      {!ready ? <p className="stamp">Loading saved names…</p> : null}
      {ready && !rows.length ? (
        <p>
          Empty. Pin a player from a hub. Stored in this browser only, key{" "}
          <code>df_watchlist</code>.
        </p>
      ) : null}
      {rows.length ? (
        <ul className="watch-list">
          {rows.map((row) => (
            <li key={row.slug}>
              <Link href={`/players/${row.slug}/`}>{row.name}</Link>
              <span className="stamp">{row.line}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p>
        <Link href="/watchlist/">Open the watchlist desk</Link>
      </p>
    </section>
  );
}
