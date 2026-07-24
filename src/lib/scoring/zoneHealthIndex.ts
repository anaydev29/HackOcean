import type { PollutionLevel, Trend } from "@/types";

/**
 * Numeric mapping for pollution levels.
 * Higher value = worse pollution = lower health contribution.
 */
const POLLUTION_SCORES: Record<PollutionLevel, number> = {
  low: 90,
  moderate: 55,
  high: 20,
};

/**
 * Numeric mapping for trend directions.
 * For bleaching: "rising" is bad, "declining" is good.
 * For biodiversity: "rising" is good, "declining" is bad.
 */
const TREND_SCORES: Record<Trend, number> = {
  stable: 60,
  rising: 30,
  declining: 85,
};

/**
 * Computes the Zone Health Index (0–100) from its three sub-components.
 *
 * Weights:
 *   - Pollution:   40%
 *   - Bleaching:   30%  (inverted — rising bleaching is bad)
 *   - Biodiversity: 30% (direct — rising biodiversity is good)
 *
 * The result is deterministic: same inputs always produce the same score.
 */
export function zoneHealthIndex(
  pollutionLevel: PollutionLevel,
  bleachingTrend: Trend,
  biodiversityTrend: Trend
): number {
  const pollutionScore = POLLUTION_SCORES[pollutionLevel]; // high pollution → low score

  // For bleaching, "rising" is bad → low health, "declining" is good → high health
  const bleachingScore = TREND_SCORES[bleachingTrend];

  // For biodiversity, we invert: "rising" is good → high health, "declining" is bad
  const biodiversityScore = 100 - TREND_SCORES[biodiversityTrend] + 15;
  const clampedBio = Math.min(100, Math.max(0, biodiversityScore));

  const raw =
    pollutionScore * 0.4 + bleachingScore * 0.3 + clampedBio * 0.3;

  return Math.round(Math.min(100, Math.max(0, raw)));
}

/**
 * Returns a health status label and color class based on the health index.
 */
export function healthStatus(index: number): {
  label: string;
  colorClass: string;
  bgClass: string;
} {
  if (index >= 75)
    return { label: "Healthy", colorClass: "text-emerald-400", bgClass: "bg-emerald-500" };
  if (index >= 50)
    return { label: "Moderate", colorClass: "text-amber-400", bgClass: "bg-amber-500" };
  if (index >= 25)
    return { label: "At Risk", colorClass: "text-orange-500", bgClass: "bg-orange-500" };
  return { label: "Critical", colorClass: "text-red-500", bgClass: "bg-red-500" };
}
