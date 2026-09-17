/**
 * AI explain is stubbed and off by default.
 * When enabled later, prompts must receive only structured computed metrics.
 * The model must not invent injuries, stats, or participation.
 */
export function isAiExplainEnabled(): boolean {
  return process.env.AI_EXPLAIN_ENABLED === "true";
}

export function explainFromMetrics(payload: Record<string, unknown>): string | null {
  void payload;
  if (!isAiExplainEnabled()) return null;
  return null;
}
