import { isKillSwitchActive } from "@/lib/compliance";

export function KillSwitchNotice({ children }: { children: React.ReactNode }) {
  if (!isKillSwitchActive()) return <>{children}</>;
  return (
    <section className="card">
      <p className="kicker">Compliance hold</p>
      <h2>Decision output withheld</h2>
      <p>
        COMPLIANCE_GATE is RED. Rankings, start/sit, injury, and projection figures are not shown.
        Flip the gate only after the operator accepts the source class for this fact family.
      </p>
    </section>
  );
}
