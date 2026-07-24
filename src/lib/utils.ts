import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a depth value with comma separators and "m" suffix.
 * e.g. 2400 → "2,400 m"
 */
export function formatDepth(meters: number): string {
  return `${meters.toLocaleString()} m`;
}

/**
 * Format an ISO timestamp to a relative or short date/time string.
 */
export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Map detection type to a human-readable label.
 */
export function detectionTypeLabel(
  type: "ghost_net" | "dumping" | "bleaching" | "species_sighting"
): string {
  const labels: Record<string, string> = {
    ghost_net: "Ghost Net",
    dumping: "Illegal Dumping",
    bleaching: "Coral Bleaching",
    species_sighting: "Species Sighting",
  };
  return labels[type] ?? type;
}
