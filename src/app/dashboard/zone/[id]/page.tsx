import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getZoneById, getZoneTrends } from "@/lib/data/getZones";
import { getDetectionsByZone } from "@/lib/data/getDetections";
import { healthStatus } from "@/lib/scoring/zoneHealthIndex";
import { formatDepth } from "@/lib/utils";
import DepthBadge from "@/components/shared/DepthBadge";
import TrendChart from "@/components/charts/TrendChart";
import DetectionFeed from "@/components/feed/DetectionFeed";
import {
  ArrowLeft,
  Droplets,
  ThermometerSun,
  Leaf,
  MapPin,
  Fish,
} from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const zone = await getZoneById(id);
  if (!zone) return { title: "Zone Not Found | DeepSea Guardian" };
  return {
    title: `${zone.name} | DeepSea Guardian`,
    description: `Deep-dive monitoring data for ${zone.name} at ${formatDepth(zone.depthMeters)} depth — pollution, biodiversity, and coral bleaching trends.`,
  };
}

export default async function ZoneDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [zone, trendData, detections] = await Promise.all([
    getZoneById(id),
    getZoneTrends(id),
    getDetectionsByZone(id),
  ]);

  if (!zone) notFound();

  const status = healthStatus(zone.healthIndex);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Command Center
      </Link>

      {/* Zone Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{zone.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <DepthBadge depthMeters={zone.depthMeters} />
              <span className="flex items-center gap-1 text-xs text-foreground/50">
                <MapPin className="h-3 w-3" />
                {zone.coordinates[0].toFixed(2)}°, {zone.coordinates[1].toFixed(2)}°
              </span>
            </div>
          </div>

          {/* Health Score */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-foreground/10"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={`${(zone.healthIndex / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                  className={status.colorClass}
                />
              </svg>
              <span className="absolute text-xl font-bold">{zone.healthIndex}</span>
            </div>
            <div>
              <span className={`text-lg font-bold ${status.colorClass}`}>
                {status.label}
              </span>
              <p className="text-xs text-foreground/50">Zone Health Index</p>
            </div>
          </div>
        </div>

        {/* Sub-metrics */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-foreground/5 p-3">
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <Droplets className="h-3.5 w-3.5" /> Pollution Level
            </div>
            <p className={`mt-1 text-lg font-bold capitalize ${
              zone.pollutionLevel === "high"
                ? "text-red-400"
                : zone.pollutionLevel === "moderate"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}>
              {zone.pollutionLevel}
            </p>
          </div>
          <div className="rounded-lg bg-foreground/5 p-3">
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <ThermometerSun className="h-3.5 w-3.5" /> Coral Bleaching
            </div>
            <p className="mt-1 text-lg font-bold capitalize text-foreground">
              {zone.coralBleachingTrend}
            </p>
          </div>
          <div className="rounded-lg bg-foreground/5 p-3">
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <Leaf className="h-3.5 w-3.5" /> Biodiversity
            </div>
            <p className="mt-1 text-lg font-bold capitalize text-foreground">
              {zone.biodiversityTrend}
            </p>
          </div>
          <div className="rounded-lg bg-foreground/5 p-3">
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <Fish className="h-3.5 w-3.5" /> Notable Species
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {zone.notableSpecies.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrendChart data={trendData} title={`${zone.name} — 30-Day Trend`} />
        </div>
        <div className="glass-card p-4" style={{ maxHeight: "420px" }}>
          <DetectionFeed
            detections={detections}
            title="Zone Detections"
          />
        </div>
      </div>
    </div>
  );
}
