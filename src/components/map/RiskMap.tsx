"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { Zone } from "@/types";
import { healthStatus } from "@/lib/scoring/zoneHealthIndex";
import { formatDepth } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

interface RiskMapProps {
  zones: Zone[];
}

const healthColorHex = (index: number): string => {
  if (index >= 75) return "#34d399"; // emerald
  if (index >= 50) return "#fbbf24"; // amber
  if (index >= 25) return "#fb923c"; // orange
  return "#f87171"; // red
};

export default function RiskMap({ zones }: RiskMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-midnight/50">
        <div className="flex flex-col items-center gap-2 text-foreground/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          <span className="text-xs">Loading map…</span>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[15, -40]}
      zoom={3}
      minZoom={2}
      maxZoom={8}
      className="h-full w-full rounded-xl"
      style={{ background: "#0B1120" }}
      attributionControl={true}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {zones.map((zone) => {
        const color = healthColorHex(zone.healthIndex);
        const status = healthStatus(zone.healthIndex);

        return (
          <CircleMarker
            key={zone.id}
            center={zone.coordinates}
            radius={12}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[200px] space-y-2 text-sm">
                <div className="font-semibold text-gray-900">{zone.name}</div>
                <div className="text-xs text-gray-600">
                  Depth: {formatDepth(zone.depthMeters)}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-medium text-gray-800">
                    Health: {zone.healthIndex}/100 ({status.label})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                  <span>Pollution:</span>
                  <span className="font-medium capitalize">
                    {zone.pollutionLevel}
                  </span>
                  <span>Bleaching:</span>
                  <span className="font-medium capitalize">
                    {zone.coralBleachingTrend}
                  </span>
                  <span>Biodiversity:</span>
                  <span className="font-medium capitalize">
                    {zone.biodiversityTrend}
                  </span>
                </div>
                <a
                  href={`/dashboard/zone/${zone.id}`}
                  className="mt-1 block text-center text-xs font-medium text-blue-600 hover:underline"
                >
                  View Details →
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
