import type { Source } from "@/types";

/**
 * Computes the confidence score (0–100) for a detection based on
 * its contributing sensor sources.
 *
 * Formula (deterministic, not random):
 *   - Base rate scales with the number of sources that participated.
 *   - Agreement bonus when multiple sources corroborate (+matched).
 *   - Conflict penalty if some sources disagree (matched vs not matched).
 *
 * Approximate ranges:
 *   - 1 matched source  ≈ 60–70%
 *   - 2 agreeing sources ≈ 75–85%
 *   - 3 agreeing sources ≈ 90%+
 */
export function confidenceScore(sources: Source[]): number {
  if (sources.length === 0) return 0;

  const matched = sources.filter((s) => s.matched).length;
  const unmatched = sources.length - matched;

  // Base rate: more sources that participated → higher starting point
  const baseRate = 50 + matched * 12;

  // Agreement bonus: extra credit when multiple sources independently agree
  const agreementBonus = matched > 1 ? (matched - 1) * 8 : 0;

  // Conflict penalty: sources that were present but didn't match reduce trust
  const conflictPenalty = unmatched * 6;

  const raw = baseRate + agreementBonus - conflictPenalty;

  // Clamp to 0–100 and round to 1 decimal
  return Math.round(Math.min(100, Math.max(0, raw)) * 10) / 10;
}

/**
 * Returns a severity label and color for a confidence value.
 */
export function confidenceLabel(score: number): {
  label: string;
  colorClass: string;
} {
  if (score >= 85) return { label: "High", colorClass: "text-red-400" };
  if (score >= 70) return { label: "Moderate", colorClass: "text-amber-400" };
  return { label: "Low", colorClass: "text-blue-400" };
}
