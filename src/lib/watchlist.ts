export const WATCHLIST_STORAGE_KEY = "df_watchlist";
export const SUNDAY_MODE_STORAGE_KEY = "df_sunday_mode";

export function parseWatchlist(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

export function toggleWatchlist(slugs: string[], slug: string): string[] {
  return slugs.includes(slug) ? slugs.filter((item) => item !== slug) : [...slugs, slug];
}
