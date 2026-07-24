import type { Metadata } from "next";
import { getZones } from "@/lib/data/getZones";
import { getDetections } from "@/lib/data/getDetections";
import ZoneHealthCard from "@/components/zone/ZoneHealthCard";
import DetectionFeed from "@/components/feed/DetectionFeed";
import RiskMapWrapper from "@/components/map/RiskMapWrapper";
import { Map, Shield, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Command Center | DeepSea Guardian",
  description:
    "Real-time deep-sea ecosystem monitoring dashboard — pollution, biodiversity, and zone health at a glance.",
};

export default async function DashboardPage() {
  const [zones, detections] = await Promise.all([
    getZones(),
    getDetections(),
  ]);

  // Compute summary stats
  const avgHealth =
    Math.round(zones.reduce((sum, z) => sum + z.healthIndex, 0) / zones.length);
  const criticalZones = zones.filter((z) => z.healthIndex < 50).length;
  const highConfDetections = detections.filter((d) => d.confidence >= 80).length;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/15">
            <Shield className="h-5 w-5 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold">{avgHealth}</p>
            <p className="text-xs text-foreground/50">Avg. Zone Health</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral/15">
            <Activity className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-2xl font-bold">{criticalZones}</p>
            <p className="text-xs text-foreground/50">Zones at Risk</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
            <Map className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{highConfDetections}</p>
            <p className="text-xs text-foreground/50">High-Conf Detections</p>
          </div>
        </div>
      </div>

      {/* Map + Feed Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Map (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden" style={{ height: "480px" }}>
            <RiskMapWrapper zones={zones} />
          </div>
        </div>

        {/* Detection Feed (1/3 width) */}
        <div className="glass-card p-4" style={{ height: "480px" }}>
          <DetectionFeed
            detections={detections}
            title="Recent Detections"
            maxItems={8}
          />
        </div>
      </div>

      {/* Zone Health Cards Grid */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground/70">
          Monitoring Zones
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone, i) => (
            <ZoneHealthCard key={zone.id} zone={zone} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
