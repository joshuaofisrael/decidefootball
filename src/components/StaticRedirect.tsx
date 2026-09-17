import Link from "next/link";

/**
 * GitHub Pages has no Next server, so HTTP 301 is not available.
 * Emit a static equivalent: canonical link, meta refresh, and JS replace.
 */
export function StaticRedirect({ to }: { to: string }) {
  return (
    <div className="wrap">
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(to)});`,
        }}
      />
      <p className="kicker">Canonical pair</p>
      <h1>This URL redirects</h1>
      <p>
        Continue to <Link href={to}>{to}</Link>.
      </p>
    </div>
  );
}
