"use client";

import { useState, useEffect } from "react";
import type { Detection, DetectionType } from "@/types";
import { confidenceScore } from "@/lib/scoring/confidence";
import DetectionCard from "@/components/feed/DetectionCard";
import { AlertTriangle, Filter } from "lucide-react";
import rawDetections from "@/lib/data/detections.json";

const typeFilters: { value: DetectionType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "ghost_net", label: "Ghost Net" },
  { value: "dumping", label: "Illegal Dumping" },
  { value: "bleaching", label: "Coral Bleaching" },
  { value: "species_sighting", label: "Species Sighting" },
];

export default function AlertsPage() {
  const [typeFilter, setTypeFilter] = useState<DetectionType | "all">("all");
  const [detections, setDetections] = useState<Detection[]>([]);

  useEffect(() => {
    const processed: Detection[] = rawDetections
      .map((d) => ({
        ...d,
        type: d.type as Detection["type"],
        confidence: confidenceScore(d.sources),
      }))
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    setDetections(processed);
  }, []);

  const filtered =
    typeFilter === "all"
      ? detections
      : detections.filter((d) => d.type === typeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <h1 className="text-xl font-bold">Detection Alerts</h1>
          <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground/50">
            {filtered.length} results
          </span>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-foreground/40" />
          <div className="flex flex-wrap gap-1.5">
            {typeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  typeFilter === f.value
                    ? "bg-teal/20 text-sky-300"
                    : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10"
                }`}
                aria-pressed={typeFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        role="feed"
        aria-label="Filtered detection alerts"
      >
        {filtered.map((det, i) => (
          <DetectionCard key={det.id} detection={det} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card flex h-40 items-center justify-center text-sm text-foreground/40">
          No detections match the selected filter.
        </div>
      )}
    </div>
  );
}
