import type { Zone } from "@/types";
import { zoneHealthIndex } from "@/lib/scoring/zoneHealthIndex";
import rawZones from "./zones.json";

/**
 * Mock "API" function to fetch all zones.
 * Computes healthIndex via the deterministic formula (not stored raw).
 * Written as an async function so swapping in a real API is a one-line change.
 */
export async function getZones(): Promise<Zone[]> {
  return rawZones.map((z) => ({
    ...z,
    coordinates: z.coordinates as [number, number],
    pollutionLevel: z.pollutionLevel as Zone["pollutionLevel"],
    coralBleachingTrend: z.coralBleachingTrend as Zone["coralBleachingTrend"],
    biodiversityTrend: z.biodiversityTrend as Zone["biodiversityTrend"],
    healthIndex: zoneHealthIndex(
      z.pollutionLevel as Zone["pollutionLevel"],
      z.coralBleachingTrend as Zone["coralBleachingTrend"],
      z.biodiversityTrend as Zone["biodiversityTrend"]
    ),
  }));
}

/**
 * Fetch a single zone by ID.
 */
export async function getZoneById(id: string): Promise<Zone | undefined> {
  const zones = await getZones();
  return zones.find((z) => z.id === id);
}

/**
 * Generate mock trend data for a specific zone (for charts).
 * Deterministic based on zone characteristics.
 */
export async function getZoneTrends(
  zoneId: string
): Promise<{ date: string; pollution: number; biodiversity: number; bleaching: number }[]> {
  const zone = await getZoneById(zoneId);
  if (!zone) return [];

  // Generate 30 days of deterministic trend data
  const basePollution =
    zone.pollutionLevel === "high" ? 72 : zone.pollutionLevel === "moderate" ? 45 : 18;
  const baseBiodiversity =
    zone.biodiversityTrend === "rising" ? 75 : zone.biodiversityTrend === "stable" ? 55 : 32;
  const baseBleaching =
    zone.coralBleachingTrend === "rising" ? 65 : zone.coralBleachingTrend === "stable" ? 30 : 15;

  const points = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Use deterministic wave pattern based on day index + zone characteristics
    const seed = (i * 7 + zoneId.length * 13) % 20;
    const wave = Math.sin((i * Math.PI) / 15) * 8;

    points.push({
      date: date.toISOString().split("T")[0],
      pollution: Math.round(
        Math.min(100, Math.max(0, basePollution + wave + seed * 0.3))
      ),
      biodiversity: Math.round(
        Math.min(100, Math.max(0, baseBiodiversity - wave * 0.5 + seed * 0.2))
      ),
      bleaching: Math.round(
        Math.min(100, Math.max(0, baseBleaching + wave * 0.7 + seed * 0.15))
      ),
    });
  }

  return points;
}
