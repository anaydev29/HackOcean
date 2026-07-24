import type { Detection } from "@/types";
import { confidenceScore } from "@/lib/scoring/confidence";
import rawDetections from "./detections.json";

/**
 * Mock "API" function to fetch all detections.
 * Computes confidence score via the deterministic formula at runtime.
 */
export async function getDetections(): Promise<Detection[]> {
  return rawDetections
    .map((d) => ({
      ...d,
      type: d.type as Detection["type"],
      confidence: confidenceScore(d.sources),
    }))
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

/**
 * Fetch detections for a specific zone.
 */
export async function getDetectionsByZone(
  zoneId: string
): Promise<Detection[]> {
  const detections = await getDetections();
  return detections.filter((d) => d.zoneId === zoneId);
}

/**
 * Generate a new mock detection for the live ticker.
 * Uses a seed index to keep the data deterministic within a session.
 */
export function generateTickerDetection(tickIndex: number): Detection {
  const types: Detection["type"][] = [
    "ghost_net",
    "dumping",
    "bleaching",
    "species_sighting",
  ];
  const zoneIds = [
    "abyssal-sector-d12",
    "hadal-trench-k7",
    "mesopelagic-reef-a3",
    "bathyal-ridge-e9",
    "pelagic-zone-m15",
    "continental-shelf-c2",
  ];

  const summaries: Record<Detection["type"], string[]> = {
    ghost_net: [
      "New ghost net fragment detected drifting near monitoring buoy",
      "Abandoned longline gear snagged on rocky outcrop",
      "Derelict crab pot identified on seafloor",
    ],
    dumping: [
      "Oil sheen detected on surface above monitoring zone",
      "Unusual chemical signature in water column sample",
      "Ballast water discharge pattern identified",
    ],
    bleaching: [
      "Thermal stress threshold exceeded for coral colony",
      "Bleaching front advancing across reef section",
      "New bleaching observed on previously healthy coral head",
    ],
    species_sighting: [
      "Rare deep-sea octopus observed during routine survey",
      "Whale shark transit through monitoring corridor",
      "Bioluminescent jellyfish bloom detected at depth",
    ],
  };

  const type = types[tickIndex % types.length];
  const zoneId = zoneIds[tickIndex % zoneIds.length];
  const summaryList = summaries[type];
  const summary = summaryList[tickIndex % summaryList.length];

  const sourcePool = [
    { name: "Sonar", matched: true, note: "Acoustic anomaly confirmed" },
    { name: "ROV Drone", matched: true, note: "Visual confirmation obtained" },
    {
      name: "Satellite",
      matched: tickIndex % 3 !== 0,
      note:
        tickIndex % 3 !== 0
          ? "Optical/thermal match confirmed"
          : "Cloud cover prevented confirmation",
    },
    {
      name: "IoT Sensor",
      matched: true,
      note: "Environmental parameter anomaly logged",
    },
  ];

  // Pick 2-3 sources deterministically
  const sourceCount = 2 + (tickIndex % 2);
  const sources = sourcePool.slice(0, sourceCount);

  return {
    id: `det-tick-${tickIndex.toString().padStart(4, "0")}`,
    zoneId,
    type,
    confidence: confidenceScore(sources),
    timestamp: new Date().toISOString(),
    sources,
    summary,
  };
}
