import { StatusLabel } from "./StatusLabel";
import { formatTimestamp } from "@/lib/timestamps";
import type { InjuryEvent } from "@/lib/types";

export function InjuryTimeline({ events }: { events: InjuryEvent[] }) {
  if (!events.length) {
    return <p>No fixture timeline rows for this player.</p>;
  }

  return (
    <ol className="timeline">
      {events.map((event) => (
        <li key={`${event.playerId}-${event.asOf}-${event.statusCode}`}>
          <p className="stamp">{formatTimestamp(event.asOf)}</p>
          <p>
            <StatusLabel code={event.statusCode} />
            {event.bodyArea ? ` · ${event.bodyArea}` : ""}
          </p>
          <p>{event.note}</p>
        </li>
      ))}
    </ol>
  );
}
