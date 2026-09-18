export function Sparkline({
  values,
  label,
}: {
  values: number[];
  label: string;
}) {
  if (!values.length) return <p className="stamp">No sample weeks to plot.</p>;
  const width = 220;
  const height = 56;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);
  const points = values
    .map((value, i) => {
      const x = values.length === 1 ? width / 2 : (i / (values.length - 1)) * (width - 8) + 4;
      const y = height - 8 - ((value - min) / span) * (height - 16);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <figure className="sparkline">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
        {values.map((value, i) => {
          const x = values.length === 1 ? width / 2 : (i / (values.length - 1)) * (width - 8) + 4;
          const y = height - 8 - ((value - min) / span) * (height - 16);
          return <circle key={`${value}-${i}`} cx={x} cy={y} r="2.5" fill="currentColor" />;
        })}
      </svg>
      <figcaption>
        {label}: {values.map((v) => v.toFixed(1)).join(" / ")}
      </figcaption>
    </figure>
  );
}
