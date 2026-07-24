import type { Metadata } from "next";
import { getZones } from "@/lib/data/getZones";
import { getDetections } from "@/lib/data/getDetections";
import ZoneHealthCard from "@/components/zone/ZoneHealthCard";
import DetectionFeed from "@/components/feed/DetectionFeed";
import RiskMapWrapper from "@/components/map/RiskMapWrapper";
import { Map, Shield, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Command Center — Real-Time Deep Ocean Monitoring Dashboard",
  description:
    "Live command center for deep-sea ecosystem monitoring. View zone health indices, interactive risk maps, real-time detection alerts with explainability panels, and multi-sensor fusion data across 6 monitored deep-ocean zones.",
  keywords: [
    "ocean command center",
    "zone health index",
    "real-time detection feed",
    "interactive risk map",
    "deep sea dashboard",
    "marine monitoring",
  ],
  openGraph: {
    title: "Command Center — DeepSea Guardian",
    description:
      "Live monitoring dashboard with zone health scores, interactive risk map, and real-time detection alerts across deep-sea ecosystems.",
    url: "https://deepsea-guardian.vercel.app/dashboard",
  },
  alternates: {
    canonical: "https://deepsea-guardian.vercel.app/dashboard",
  },
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
        <div className="glass-card flex items-center gap-3.5 p-4 transition-all duration-200 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/15">
            <Shield className="h-5 w-5 text-teal" />
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight">{avgHealth}</p>
            <p className="text-xs text-foreground/50">Avg. Zone Health</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3.5 p-4 transition-all duration-200 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral/15">
            <Activity className="h-5 w-5 text-coral" />
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight">{criticalZones}</p>
            <p className="text-xs text-foreground/50">Zones at Risk</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3.5 p-4 transition-all duration-200 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15">
            <Map className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight">{highConfDetections}</p>
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
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
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
