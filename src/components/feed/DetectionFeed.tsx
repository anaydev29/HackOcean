"use client";

import type { Detection } from "@/types";
import DetectionCard from "./DetectionCard";
import { AlertTriangle } from "lucide-react";

interface DetectionFeedProps {
  detections: Detection[];
  title?: string;
  maxItems?: number;
}

export default function DetectionFeed({
  detections,
  title = "Detection Feed",
  maxItems,
}: DetectionFeedProps) {
  const items = maxItems ? detections.slice(0, maxItems) : detections;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <span>{title}</span>
        <span className="ml-auto rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/50">
          {items.length} alerts
        </span>
      </div>
      <div
        className="flex-1 space-y-2 overflow-y-auto pr-1"
        role="feed"
        aria-label="Detection alerts feed"
      >
        {items.map((det, i) => (
          <DetectionCard key={det.id} detection={det} index={i} />
        ))}
        {items.length === 0 && (
          <div className="flex h-32 items-center justify-center text-xs text-foreground/40">
            No detections to display
          </div>
        )}
      </div>
    </div>
  );
}
