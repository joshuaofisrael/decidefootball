"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CertaintyMeter } from "@/components/CertaintyMeter";
import {
  gradeCertaintyInputs,
  type CertaintySideFlags,
} from "@/lib/certainty-input";
import { TOSS_UP_DELTA } from "@/lib/recommendations";
import type { UncertaintyLabel } from "@/lib/types";

type Parsed = { ok: true; value: number | null } | { ok: false };

const GRADE_NOTE =
  "Certainty is a desk grade, not a win probability, not odds, and not a moneyline. Listed status still outranks numbers. Methodology v0, subject to change. This is not gambling advice and not an official projection.";

const UNCERTAINTY_OPTIONS: { value: UncertaintyLabel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "med", label: "Med" },
  { value: "high", label: "High" },
];

function parseMean(raw: string): Parsed {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: null };
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(trimmed)) return { ok: false };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false };
  return { ok: true, value };
}

function parseWeeks(raw: string): Parsed {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: null };
  if (!/^\d{1,2}$/.test(trimmed)) return { ok: false };
  return { ok: true, value: Number(trimmed) };
}

function sideName(label: string, fallback: string): string {
  const trimmed = label.trim();
  return trimmed || fallback;
}

function formatSigned(n: number): string {
  const text = n.toFixed(1);
  return n > 0 ? `+${text}` : text;
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

function SideFields({
  baseId,
  legend,
  label,
  mean,
  weeks,
  gated,
  discount,
  uncertainty,
  meanInvalid,
  weeksInvalid,
  onLabel,
  onMean,
  onWeeks,
  onGated,
  onDiscount,
  onUncertainty,
}: {
  baseId: string;
  legend: string;
  label: string;
  mean: string;
  weeks: string;
  gated: boolean;
  discount: boolean;
  uncertainty: UncertaintyLabel;
  meanInvalid: boolean;
  weeksInvalid: boolean;
  onLabel: (value: string) => void;
  onMean: (value: string) => void;
  onWeeks: (value: string) => void;
  onGated: (value: boolean) => void;
  onDiscount: (value: boolean) => void;
  onUncertainty: (value: UncertaintyLabel) => void;
}) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <Field
        id={`${baseId}-label`}
        label="Label"
        value={label}
        onChange={onLabel}
        placeholder={legend === "Side A" ? "Player A" : "Player B"}
      />
      <Field
        id={`${baseId}-mean`}
        label="Mean"
        value={mean}
        onChange={onMean}
        placeholder={legend === "Side A" ? "24.6" : "11.4"}
        required
        numeric
        invalid={meanInvalid}
      />
      <div className="flag-list">
        <label>
          <input
            type="checkbox"
            checked={gated}
            onChange={(event) => onGated(event.target.checked)}
          />
          <span>Availability gated (OUT, IR, or INACTIVE)</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={discount && !gated}
            disabled={gated}
            onChange={(event) => onDiscount(event.target.checked)}
          />
          <span>Status discount (Questionable or Doubtful)</span>
        </label>
      </div>
      <label className="field" htmlFor={`${baseId}-uncertainty`}>
        <span>Uncertainty</span>
        <select
          id={`${baseId}-uncertainty`}
          value={uncertainty}
          onChange={(event) => onUncertainty(event.target.value as UncertaintyLabel)}
        >
          {UNCERTAINTY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <Field
        id={`${baseId}-weeks`}
        label="Trailing weeks used"
        value={weeks}
        onChange={onWeeks}
        placeholder="3"
        required
        numeric
        invalid={weeksInvalid}
      />
    </fieldset>
  );
}

export function CertaintyTool() {
  const baseId = useId();
  const [labelA, setLabelA] = useState("");
  const [labelB, setLabelB] = useState("");
  const [meanA, setMeanA] = useState("");
  const [meanB, setMeanB] = useState("");
  const [gatedA, setGatedA] = useState(false);
  const [gatedB, setGatedB] = useState(false);
  const [discountA, setDiscountA] = useState(false);
  const [discountB, setDiscountB] = useState(false);
  const [uncertaintyA, setUncertaintyA] = useState<UncertaintyLabel>("low");
  const [uncertaintyB, setUncertaintyB] = useState<UncertaintyLabel>("low");
  const [weeksA, setWeeksA] = useState("3");
  const [weeksB, setWeeksB] = useState("3");

  const parsedMeanA = parseMean(meanA);
  const parsedMeanB = parseMean(meanB);
  const parsedWeeksA = parseWeeks(weeksA);
  const parsedWeeksB = parseWeeks(weeksB);

  const invalid = !parsedMeanA.ok || !parsedMeanB.ok || !parsedWeeksA.ok || !parsedWeeksB.ok;
  const meanAValue = parsedMeanA.ok ? parsedMeanA.value : null;
  const meanBValue = parsedMeanB.ok ? parsedMeanB.value : null;
  const weeksAValue = parsedWeeksA.ok ? parsedWeeksA.value : null;
  const weeksBValue = parsedWeeksB.ok ? parsedWeeksB.value : null;
  const meansReady = meanAValue !== null && meanBValue !== null;
  const weeksReady = weeksAValue !== null && weeksBValue !== null;

  const nameA = sideName(labelA, "Side A");
  const nameB = sideName(labelB, "Side B");

  const ready =
    meanAValue !== null && meanBValue !== null && weeksAValue !== null && weeksBValue !== null
      ? gradeCertaintyInputs({
          meanA: meanAValue,
          meanB: meanBValue,
          left: sideFlags(gatedA, discountA, uncertaintyA, weeksAValue),
          right: sideFlags(gatedB, discountB, uncertaintyB, weeksBValue),
        })
      : null;

  const gatedNames = [
    gatedA ? nameA : null,
    gatedB ? nameB : null,
  ].filter((name): name is string => name !== null);

  return (
    <form className="toss-tool" onSubmit={(event) => event.preventDefault()}>
      <h2>Grade the lean</h2>
      <p>
        Type two means. The desk rounds side A minus side B to one decimal, the same print the
        start/sit card uses, then grades how sure that gap is. Defaults are a healthy pair: not
        gated, no status discount, low uncertainty, three trailing weeks. Labels are optional.
        This form does not search a player list and does not call a projection feed.
      </p>
      <p className="tool-links">
        Who leans, on the {TOSS_UP_DELTA.toFixed(1)}-point line, is the{" "}
        <Link href="/guide/toss-up/">toss-up tool</Link>. How to read the finished card is the{" "}
        <Link href="/guide/start-sit/">start/sit guide</Link>.
      </p>

      <div className="side-grid">
        <SideFields
          baseId={`${baseId}-a`}
          legend="Side A"
          label={labelA}
          mean={meanA}
          weeks={weeksA}
          gated={gatedA}
          discount={discountA}
          uncertainty={uncertaintyA}
          meanInvalid={!parsedMeanA.ok}
          weeksInvalid={!parsedWeeksA.ok}
          onLabel={setLabelA}
          onMean={setMeanA}
          onWeeks={setWeeksA}
          onGated={setGatedA}
          onDiscount={setDiscountA}
          onUncertainty={setUncertaintyA}
        />
        <SideFields
          baseId={`${baseId}-b`}
          legend="Side B"
          label={labelB}
          mean={meanB}
          weeks={weeksB}
          gated={gatedB}
          discount={discountB}
          uncertainty={uncertaintyB}
          meanInvalid={!parsedMeanB.ok}
          weeksInvalid={!parsedWeeksB.ok}
          onLabel={setLabelB}
          onMean={setMeanB}
          onWeeks={setWeeksB}
          onGated={setGatedB}
          onDiscount={setDiscountB}
          onUncertainty={setUncertaintyB}
        />
      </div>

      {invalid ? (
        <p className="field-error">
          Means have to be plain numbers. Trailing weeks have to be a whole number from 0 to 99, or
          left blank until you fill them in.
        </p>
      ) : null}

      <div className="toss-result" role="status" aria-live="polite">
        {ready ? (
          <>
            <CertaintyMeter certainty={ready.certainty} />
            <dl className="metric-row">
              <div className="metric">
                <dt>Absolute mean delta</dt>
                <dd>{ready.decision.absoluteDelta.toFixed(1)}</dd>
              </div>
              <div className="metric">
                <dt>
                  {nameA} minus {nameB}
                </dt>
                <dd>{formatSigned(ready.decision.scoreDelta)}</dd>
              </div>
            </dl>
            <p className="toss-meta">
              {ready.decision.lean === "toss_up" ? (
                <>
                  Toss-up on the {TOSS_UP_DELTA.toFixed(1)}-point line. The desk does not treat the
                  higher mean as a verdict. Who leans is the{" "}
                  <Link href="/guide/toss-up/">toss-up tool</Link>.
                </>
              ) : (
                <>
                  Not a toss-up. The absolute gap clears {TOSS_UP_DELTA.toFixed(1)}, so the lean is{" "}
                  {ready.decision.lean === "a" ? nameA : nameB}. The line itself is the{" "}
                  <Link href="/guide/toss-up/">toss-up tool</Link>.
                </>
              )}
            </p>
            {gatedNames.length ? (
              <p className="toss-meta">
                {gatedNames.join(" and ")} {gatedNames.length === 1 ? "is" : "are"}{" "}
                availability-gated, so the desk mean on that side is zero. A status discount is not
                applied on top of the gate.
              </p>
            ) : null}
            <p className="toss-note">{GRADE_NOTE}</p>
          </>
        ) : (
          <>
            <p className="kicker">
              {meansReady && !weeksReady ? "Waiting on trailing weeks" : "Waiting on two means"}
            </p>
            <p className="toss-lean">
              {meansReady && !weeksReady
                ? "Enter trailing weeks for each side."
                : "Enter a mean for each side."}
            </p>
            <p className="toss-note">
              With the defaults — healthy, low uncertainty, three trailing weeks — a wide mean gap
              grades clear or strong. {GRADE_NOTE}
            </p>
          </>
        )}
      </div>
    </form>
  );
}

function sideFlags(
  gated: boolean,
  discount: boolean,
  uncertainty: UncertaintyLabel,
  trailingWeeksUsed: number,
): CertaintySideFlags {
  return {
    availabilityGated: gated,
    statusDiscount: gated ? false : discount,
    uncertainty,
    trailingWeeksUsed,
  };
}
