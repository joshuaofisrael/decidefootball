import { getDisplayTimeZone } from "./site";

export function formatTimestamp(iso: string, timeZone = getDisplayTimeZone()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function nowIso(): string {
  return new Date().toISOString();
}
