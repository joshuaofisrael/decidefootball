"use client";

import { useWatchlist } from "./useWatchlist";

export function WatchButton({ slug, name }: { slug: string; name: string }) {
  const { ready, has, toggle } = useWatchlist();
  const watching = has(slug);

  return (
    <button
      type="button"
      className={`watch-btn${watching ? " on" : ""}`}
      onClick={() => toggle(slug)}
      disabled={!ready}
      aria-pressed={watching}
    >
      {watching ? `Watching ${name}` : `Watch ${name}`}
    </button>
  );
}
