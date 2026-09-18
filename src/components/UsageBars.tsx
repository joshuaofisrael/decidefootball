import type { UsageSnapshot } from "@/lib/types";

const rows: { key: keyof UsageSnapshot; label: string }[] = [
  { key: "snapShare", label: "Snaps" },
  { key: "targetShare", label: "Targets" },
  { key: "carryShare", label: "Carries" },
  { key: "routeShare", label: "Routes" },
];

export function UsageBars({ metrics, week }: { metrics: UsageSnapshot | undefined; week: number }) {
  return (
    <article className="card">
      <p className="kicker">Usage · week {week} fixture</p>
      <h2>Role bars</h2>
      <ul className="usage-bars">
        {rows.map((row) => {
          const value = metrics?.[row.key] ?? null;
          const pct = value == null ? null : Math.round(value * 100);
          return (
            <li key={row.key}>
              <div className="usage-meta">
                <span>{row.label}</span>
                <span>{pct == null ? "n/a" : `${pct}%`}</span>
              </div>
              <div className="usage-track" aria-hidden="true">
                <span className="usage-fill" style={{ width: pct == null ? "0%" : `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="stamp">Derived from fixture weekly stats. Not a live snap chart.</p>
    </article>
  );
}
