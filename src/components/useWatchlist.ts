"use client";

import { useEffect, useState } from "react";
import { parseWatchlist, toggleWatchlist, WATCHLIST_STORAGE_KEY } from "@/lib/watchlist";

export function useWatchlist() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(parseWatchlist(window.localStorage.getItem(WATCHLIST_STORAGE_KEY)));
    setReady(true);
  }, []);

  function toggle(slug: string) {
    setSlugs((current) => {
      const next = toggleWatchlist(current, slug);
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { slugs, ready, toggle, has: (slug: string) => slugs.includes(slug) };
}
