/**
 * Background job interface. Phase-1 is a no-op.
 * Swap Inngest / Trigger.dev / BullMQ later without changing callers.
 */
export interface JobPayload {
  name: string;
  data: Record<string, unknown>;
}

export interface JobQueue {
  enqueue(job: JobPayload): Promise<void>;
}

export class NoopJobQueue implements JobQueue {
  async enqueue(job: JobPayload): Promise<void> {
    if (process.env.NODE_ENV !== "production") {
      console.info("[jobs:noop]", job.name);
    }
  }
}

export interface IngestAdapter {
  readonly sourceKey: string;
  readonly mode: "fixture" | "licensed";
  pull(): Promise<{ records: number; notes: string }>;
}

export class FixtureIngestAdapter implements IngestAdapter {
  readonly sourceKey = "first-party-fixtures";
  readonly mode = "fixture" as const;

  async pull() {
    return {
      records: 0,
      notes: "Fixture ingest is compile-time data. No network call.",
    };
  }
}

/** Licensed adapter stub — must not call a vendor until Joshua approves spend. */
export class LicensedIngestStub implements IngestAdapter {
  readonly sourceKey = "licensed-pending";
  readonly mode = "licensed" as const;

  async pull(): Promise<{ records: number; notes: string }> {
    throw new Error(
      "Licensed ingest is disabled. Do not buy or call sports data APIs from this scaffold.",
    );
  }
}

export const jobQueue: JobQueue = new NoopJobQueue();
