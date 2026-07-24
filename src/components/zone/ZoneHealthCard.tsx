"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Zone } from "@/types";
import { healthStatus } from "@/lib/scoring/zoneHealthIndex";
import { formatTimestamp } from "@/lib/utils";
import DepthBadge from "@/components/shared/DepthBadge";
import {
  Activity,
  Droplets,
  Leaf,
  ThermometerSun,
  ChevronRight,
} from "lucide-react";

interface ZoneHealthCardProps {
  zone: Zone;
  index: number;
}

export default function ZoneHealthCard({ zone, index }: ZoneHealthCardProps) {
  const status = healthStatus(zone.healthIndex);

  const trendIcon = (trend: string) => {
    if (trend === "rising") return "↑";
    if (trend === "declining") return "↓";
    return "→";
  };

  const trendColor = (trend: string, inverted = false) => {
    if (trend === "rising")
      return inverted ? "text-red-400" : "text-emerald-400";
    if (trend === "declining")
      return inverted ? "text-emerald-400" : "text-red-400";
    return "text-amber-400";
  };

  const glowColor =
    zone.healthIndex >= 75
      ? "rgba(34, 197, 94, 0.4)"
      : zone.healthIndex >= 50
      ? "rgba(234, 179, 8, 0.4)"
      : zone.healthIndex >= 25
      ? "rgba(249, 115, 22, 0.4)"
      : "rgba(239, 68, 68, 0.4)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Link
        href={`/dashboard/zone/${zone.id}`}
        className="group block glass-card p-4 transition-all duration-200 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5"
        aria-label={`View details for ${zone.name}`}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-sky-300 transition-colors">
              {zone.name}
            </h3>
            <DepthBadge depthMeters={zone.depthMeters} className="mt-1" />
          </div>
          <ChevronRight className="h-4 w-4 text-foreground/30 group-hover:text-sky-300 transition-all group-hover:translate-x-0.5" />
        </div>

        {/* Health Score */}
        <div className="mb-3 flex items-center gap-3">
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-full"
            style={{ boxShadow: `0 0 18px 2px ${glowColor}` }}
          >
            <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-foreground/10"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${(zone.healthIndex / 100) * 125.6} 125.6`}
                strokeLinecap="round"
                className={status.colorClass}
              />
            </svg>
            <span className="absolute text-sm font-extrabold">{zone.healthIndex}</span>
          </div>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${status.colorClass}`}>
              {status.label}
            </span>
            <p className="text-[11px] text-foreground/50">Zone Health Index</p>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-foreground/60">
              <Droplets className="h-3 w-3" /> Pollution
            </span>
            <span className={`font-medium ${
              zone.pollutionLevel === "high"
                ? "text-red-400"
                : zone.pollutionLevel === "moderate"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}>
              {zone.pollutionLevel.charAt(0).toUpperCase() + zone.pollutionLevel.slice(1)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-foreground/60">
              <ThermometerSun className="h-3 w-3" /> Bleaching
            </span>
            <span className={`font-medium ${trendColor(zone.coralBleachingTrend, true)}`}>
              {trendIcon(zone.coralBleachingTrend)}{" "}
              {zone.coralBleachingTrend.charAt(0).toUpperCase() +
                zone.coralBleachingTrend.slice(1)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-foreground/60">
              <Leaf className="h-3 w-3" /> Biodiversity
            </span>
            <span className={`font-medium ${trendColor(zone.biodiversityTrend)}`}>
              {trendIcon(zone.biodiversityTrend)}{" "}
              {zone.biodiversityTrend.charAt(0).toUpperCase() +
                zone.biodiversityTrend.slice(1)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-card-border pt-2">
          <span className="flex items-center gap-1 text-[10px] text-foreground/40">
            <Activity className="h-3 w-3" /> Updated {formatTimestamp(zone.lastUpdated)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
