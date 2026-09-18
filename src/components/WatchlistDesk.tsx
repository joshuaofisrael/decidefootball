"use client";

import Link from "next/link";
import { useWatchlist } from "./useWatchlist";

export function WatchlistDesk({
  catalog,
}: {
  catalog: {
    slug: string;
    name: string;
    position: string;
    team: string;
    status: string;
    mean: number;
  }[];
}) {
  const { slugs, ready, toggle } = useWatchlist();
  const rows = catalog.filter((row) => slugs.includes(row.slug));

  return (
    <section className="card">
      {!ready ? <p className="stamp">Reading localStorage…</p> : null}
      {ready && !rows.length ? (
        <p>
          Nothing pinned. Start on the{" "}
          <Link href="/players/">club board</Link> or a{" "}
          <Link href="/start-sit/">start/sit card</Link>.
        </p>
      ) : null}
      {rows.length ? (
        <ul className="watch-desk">
          {rows.map((row) => (
            <li key={row.slug}>
              <Link href={`/players/${row.slug}/`}>{row.name}</Link>
              <span className="stamp">
                {row.position} · {row.team} · {row.status} · {row.mean.toFixed(1)}
              </span>
              <button type="button" className="btn secondary" onClick={() => toggle(row.slug)}>
                Drop
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <p>
        <Link href="/slate/">Check the slate</Link>
        {" · "}
        <Link href="/waiver-wire/week-3/">Waiver radar</Link>
      </p>
    </section>
  );
}
