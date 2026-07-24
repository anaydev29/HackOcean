"use client";

import { motion } from "framer-motion";
import type { Detection } from "@/types";
import { confidenceLabel } from "@/lib/scoring/confidence";
import { detectionTypeLabel, formatTimestamp } from "@/lib/utils";
import ExplainabilityPanel from "./ExplainabilityPanel";
import {
  Ghost,
  Trash2,
  ThermometerSun,
  Fish,
} from "lucide-react";

interface DetectionCardProps {
  detection: Detection;
  index: number;
}

const typeConfig: Record<
  Detection["type"],
  { icon: typeof Ghost; color: string; bg: string }
> = {
  ghost_net: { icon: Ghost, color: "text-purple-400", bg: "bg-purple-500/15" },
  dumping: { icon: Trash2, color: "text-red-400", bg: "bg-red-500/15" },
  bleaching: {
    icon: ThermometerSun,
    color: "text-orange-400",
    bg: "bg-orange-500/15",
  },
  species_sighting: { icon: Fish, color: "text-cyan-400", bg: "bg-cyan-500/15" },
};

export default function DetectionCard({ detection, index }: DetectionCardProps) {
  const config = typeConfig[detection.type];
  const Icon = config.icon;
  const conf = confidenceLabel(detection.confidence);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="glass-card p-3 transition-all duration-200 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5"
      role="article"
      aria-label={`${detectionTypeLabel(detection.type)} detection with ${detection.confidence}% confidence`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${config.bg}`}
          >
            <Icon className={`h-3.5 w-3.5 ${config.color}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${config.color}`}>
                {detectionTypeLabel(detection.type)}
              </span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${conf.colorClass} bg-foreground/5`}
              >
                {detection.confidence}%
              </span>
            </div>
            <p className="mt-0.5 text-xs text-foreground/60 line-clamp-2">
              {detection.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-2 text-[10px] text-foreground/40">
        {formatTimestamp(detection.timestamp)}
      </div>

      {/* Explainability */}
      <ExplainabilityPanel
        sources={detection.sources}
        confidence={detection.confidence}
      />
    </motion.div>
  );
}
