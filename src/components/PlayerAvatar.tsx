import type { SkillPosition } from "@/lib/site";

const PALETTES = [
  { field: "#1b3a2c", ink: "#f4efe4", mark: "#d4a24a" },
  { field: "#243048", ink: "#f3ead7", mark: "#c45c26" },
  { field: "#3a2418", ink: "#f6efe2", mark: "#7aa37a" },
  { field: "#1f2a22", ink: "#efe6d2", mark: "#d27a6a" },
  { field: "#2c1f33", ink: "#f2eadc", mark: "#c9a227" },
];

function hashSlug(slug: string): number {
  return [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function PlayerAvatar({
  slug,
  name,
  position,
  size = 72,
}: {
  slug: string;
  name: string;
  position: SkillPosition;
  size?: number;
}) {
  const palette = PALETTES[hashSlug(slug) % PALETTES.length];
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  const offset = (hashSlug(slug) % 11) - 5;

  return (
    <svg
      className="player-avatar"
      width={size}
      height={size}
      viewBox="0 0 72 72"
      role="img"
      aria-label={`Illustrated mark for ${name}`}
    >
      <rect width="72" height="72" rx="6" fill={palette.field} />
      <path d={`M0 48 L72 ${40 + offset} L72 72 L0 72 Z`} fill={palette.mark} opacity="0.35" />
      <circle cx={36 + offset} cy="26" r="11" fill={palette.ink} opacity="0.92" />
      <rect x="22" y="38" width="28" height="22" rx="10" fill={palette.ink} opacity="0.88" />
      <text x="8" y="16" fill={palette.mark} fontSize="9" fontFamily="IBM Plex Mono, ui-monospace, monospace">
        {position}
      </text>
      <text
        x="36"
        y="66"
        textAnchor="middle"
        fill={palette.field}
        fontSize="11"
        fontFamily="IBM Plex Sans, ui-sans-serif, sans-serif"
        fontWeight="700"
      >
        {initials}
      </text>
    </svg>
  );
}
