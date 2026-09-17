import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <h1>Page not found</h1>
      <p>That path is not in this Phase-1 fixture set.</p>
      <p>
        <Link href="/">Back to Decide Football</Link>
      </p>
    </div>
  );
}
