// ─── Core Domain Types ─────────────────────────────────────────────────────

/** Pollution severity level */
export type PollutionLevel = "low" | "moderate" | "high";

/** Trend direction for coral bleaching and biodiversity */
export type Trend = "stable" | "rising" | "declining";

/** Detection / alert types from simulated sensors */
export type DetectionType =
  | "ghost_net"
  | "dumping"
  | "bleaching"
  | "species_sighting";

// ─── Source ────────────────────────────────────────────────────────────────

/** A single sensor source that contributed to a detection */
export interface Source {
  /** Display name of the sensor (e.g. "Sonar", "ROV Drone", "Satellite") */
  name: string;
  /** Whether this source corroborated the detection */
  matched: boolean;
  /** Human-readable note explaining the source's contribution */
  note: string;
}

// ─── Zone ──────────────────────────────────────────────────────────────────

/** A monitored deep-sea zone */
export interface Zone {
  id: string;
  name: string;
  /** Depth in meters below sea level */
  depthMeters: number;
  /** [latitude, longitude] */
  coordinates: [number, number];
  /** Composite Zone Health Index (0–100), derived from the three fields below */
  healthIndex: number;
  pollutionLevel: PollutionLevel;
  coralBleachingTrend: Trend;
  biodiversityTrend: Trend;
  /** ISO 8601 timestamp of last data update */
  lastUpdated: string;
  /** Comma-separated notable species for display */
  notableSpecies: string[];
}

// ─── Detection ─────────────────────────────────────────────────────────────

/** A single detection / alert event */
export interface Detection {
  id: string;
  /** The zone this detection belongs to */
  zoneId: string;
  type: DetectionType;
  /** Computed confidence score (0–100) derived from sources */
  confidence: number;
  /** ISO 8601 timestamp of the detection */
  timestamp: string;
  /** Sensor sources that participated in this detection */
  sources: Source[];
  /** Short human-readable summary for display */
  summary: string;
}

// ─── Trend Data Point (for charts) ─────────────────────────────────────────

/** A data point on a time-series trend chart */
export interface TrendDataPoint {
  /** ISO 8601 date string */
  date: string;
  /** Pollution index (0–100) */
  pollution: number;
  /** Biodiversity index (0–100) */
  biodiversity: number;
  /** Coral bleaching index (0–100) */
  bleaching: number;
}
