"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { round1 } from "@/lib/format";
import { meanDeltaLean, TOSS_UP_DELTA, type MeanDeltaLean } from "@/lib/recommendations";

type ComparisonMode = "start_sit" | "add_drop";

type Parsed = { ok: true; value: number | null } | { ok: false };

const RULE_NOTE =
  "Under 1.5 points the desk treats the pair as a toss-up on mean alone. Listed status still outranks numbers. This is not gambling advice and not an official projection.";

function parseField(raw: string): Parsed {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: null };
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(trimmed)) return { ok: false };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false };
  return { ok: true, value };
}

function sideName(label: string, fallback: string): string {
  const trimmed = label.trim();
  return trimmed || fallback;
}

function formatSigned(n: number): string {
  const text = n.toFixed(1);
  return n > 0 ? `+${text}` : text;
}

function leanSentence(mode: ComparisonMode, lean: MeanDeltaLean, nameA: string, nameB: string): string {
  if (mode === "start_sit") {
    if (lean === "a") return `Start ${nameA}`;
    if (lean === "b") return `Start ${nameB}`;
    return "Toss-up. Lean neither side on mean alone.";
  }
  if (lean === "a") return `Add ${nameA} over ${nameB}`;
  if (lean === "b") return `Add ${nameB} over ${nameA}`;
  return "Toss-up. No add/drop edge on mean alone.";
}

function rangeText(name: string, floor: number | null, ceiling: number | null): string | null {
  const parts: string[] = [];
  if (floor !== null) parts.push(`floor ${round1(floor).toFixed(1)}`);
  if (ceiling !== null) parts.push(`ceiling ${round1(ceiling).toFixed(1)}`);
  if (!parts.length) return null;
  return `${name}: ${parts.join(", ")}`;
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  invalid,
  numeric,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  invalid?: boolean;
  numeric?: boolean;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        {required ? " (required)" : ""}
      </span>
      <input
        id={id}
        type="text"
        inputMode={numeric ? "decimal" : "text"}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TossUpTool() {
  const baseId = useId();
  const [mode, setMode] = useState<ComparisonMode>("start_sit");
  const [labelA, setLabelA] = useState("");
  const [labelB, setLabelB] = useState("");
  const [meanA, setMeanA] = useState("");
  const [meanB, setMeanB] = useState("");
  const [floorA, setFloorA] = useState("");
  const [floorB, setFloorB] = useState("");
  const [ceilingA, setCeilingA] = useState("");
  const [ceilingB, setCeilingB] = useState("");

  const parsedMeanA = parseField(meanA);
  const parsedMeanB = parseField(meanB);
  const parsedFloorA = parseField(floorA);
  const parsedFloorB = parseField(floorB);
  const parsedCeilingA = parseField(ceilingA);
  const parsedCeilingB = parseField(ceilingB);

  const invalid =
    !parsedMeanA.ok ||
    !parsedMeanB.ok ||
    !parsedFloorA.ok ||
    !parsedFloorB.ok ||
    !parsedCeilingA.ok ||
    !parsedCeilingB.ok;

  const ready =
    !invalid && parsedMeanA.value !== null && parsedMeanB.value !== null
      ? meanDeltaLean(parsedMeanA.value, parsedMeanB.value)
      : null;

  const nameA = sideName(labelA, "Side A");
  const nameB = sideName(labelB, "Side B");
  const ranges = ready
    ? [
        rangeText(nameA, parsedFloorA.ok ? parsedFloorA.value : null, parsedCeilingA.ok ? parsedCeilingA.value : null),
        rangeText(nameB, parsedFloorB.ok ? parsedFloorB.value : null, parsedCeilingB.ok ? parsedCeilingB.value : null),
      ].filter((line): line is string => line !== null)
    : [];

  return (
    <form
      className="toss-tool"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2>Apply the line</h2>
      <p>
        Type two means. The desk subtracts them, rounds to one decimal, and leans only when the
        absolute gap is {TOSS_UP_DELTA.toFixed(1)} or more. Names are optional labels. This form
        does not search a player list and does not call a projection feed.
      </p>

      <fieldset className="mode-toggle">
        <legend>Comparison sentence</legend>
        <label>
          <input
            type="radio"
            name={`${baseId}-mode`}
            checked={mode === "start_sit"}
            onChange={() => setMode("start_sit")}
          />
          Start/sit
        </label>
        <label>
          <input
            type="radio"
            name={`${baseId}-mode`}
            checked={mode === "add_drop"}
            onChange={() => setMode("add_drop")}
          />
          Add/drop
        </label>
      </fieldset>
      <p className="tool-links">
        The same delta applies to a start/sit lineup call and an add/drop roster-churn
        comparison. The toggle changes the sentence. It does not change the math. How to read
        each card: <Link href="/guide/start-sit/">start/sit guide</Link>
        {" · "}
        <Link href="/guide/add-drop/">add/drop guide</Link>.
      </p>

      <div className="side-grid">
        <fieldset>
          <legend>Side A</legend>
          <Field
            id={`${baseId}-label-a`}
            label="Label"
            value={labelA}
            onChange={setLabelA}
            placeholder="Player A"
          />
          <Field
            id={`${baseId}-mean-a`}
            label="Mean"
            value={meanA}
            onChange={setMeanA}
            placeholder="14.2"
            required
            numeric
            invalid={!parsedMeanA.ok}
          />
          <Field
            id={`${baseId}-floor-a`}
            label="Floor"
            value={floorA}
            onChange={setFloorA}
            placeholder="Optional"
            numeric
            invalid={!parsedFloorA.ok}
          />
          <Field
            id={`${baseId}-ceiling-a`}
            label="Ceiling"
            value={ceilingA}
            onChange={setCeilingA}
            placeholder="Optional"
            numeric
            invalid={!parsedCeilingA.ok}
          />
        </fieldset>
        <fieldset>
          <legend>Side B</legend>
          <Field
            id={`${baseId}-label-b`}
            label="Label"
            value={labelB}
            onChange={setLabelB}
            placeholder="Player B"
          />
          <Field
            id={`${baseId}-mean-b`}
            label="Mean"
            value={meanB}
            onChange={setMeanB}
            placeholder="12.8"
            required
            numeric
            invalid={!parsedMeanB.ok}
          />
          <Field
            id={`${baseId}-floor-b`}
            label="Floor"
            value={floorB}
            onChange={setFloorB}
            placeholder="Optional"
            numeric
            invalid={!parsedFloorB.ok}
          />
          <Field
            id={`${baseId}-ceiling-b`}
            label="Ceiling"
            value={ceilingB}
            onChange={setCeilingB}
            placeholder="Optional"
            numeric
            invalid={!parsedCeilingB.ok}
          />
        </fieldset>
      </div>

      {invalid ? <p className="field-error">Means, floors, and ceilings have to be plain numbers, or left blank.</p> : null}

      <div className="toss-result" role="status" aria-live="polite">
        {ready ? (
          <>
            <p className="kicker">{mode === "start_sit" ? "Start/sit" : "Add/drop"}</p>
            <p className="toss-lean">{leanSentence(mode, ready.lean, nameA, nameB)}</p>
            <dl className="metric-row">
              <div className="metric">
                <dt>Absolute mean delta</dt>
                <dd>{ready.absoluteDelta.toFixed(1)}</dd>
              </div>
              <div className="metric">
                <dt>
                  {nameA} minus {nameB}
                </dt>
                <dd>{formatSigned(ready.scoreDelta)}</dd>
              </div>
            </dl>
            {ranges.length ? (
              <p className="toss-meta">
                {ranges.join(" · ")}.{" "}
                {ready.lean === "toss_up"
                  ? "The pair is a toss-up on mean alone. If you are protecting a lead, weigh the floor. If you need upside, weigh the ceiling. Those ends do not move the 1.5-point line."
                  : "Floor and ceiling are shown for weighing. The lean above is the mean delta only."}
              </p>
            ) : ready.lean === "toss_up" ? (
              <p className="toss-meta">
                Floor and ceiling were left blank. If you add them, weigh the floor when you are
                protecting a lead and the ceiling when you need upside. They do not move the
                1.5-point line.
              </p>
            ) : null}
            <p className="toss-note">{RULE_NOTE}</p>
          </>
        ) : (
          <>
            <p className="kicker">Waiting on two means</p>
            <p className="toss-lean">Enter a mean for each side.</p>
            <p className="toss-note">
              The desk rounds side A minus side B to one decimal. At 1.5 or more, the higher mean
              is the lean. {RULE_NOTE}
            </p>
          </>
        )}
      </div>
    </form>
  );
}
