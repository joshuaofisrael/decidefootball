import type { InjuryStatusCode } from "@/lib/types";

export function StatusLabel({ code }: { code: InjuryStatusCode }) {
  return <span className={`status ${code.toLowerCase()}`}>{code}</span>;
}
