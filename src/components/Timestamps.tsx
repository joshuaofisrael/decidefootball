import { formatTimestamp } from "@/lib/timestamps";

export function Timestamps({
  lastVerifiedAt,
  renderedAt,
}: {
  lastVerifiedAt: string;
  renderedAt: string;
}) {
  return (
    <p className="stamp">
      <strong>Last verified:</strong> {formatTimestamp(lastVerifiedAt)}
      {" · "}
      <strong>Page rendered:</strong> {formatTimestamp(renderedAt)}
    </p>
  );
}
