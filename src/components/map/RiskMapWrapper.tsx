"use client";

import dynamic from "next/dynamic";
import type { Zone } from "@/types";

const RiskMap = dynamic(() => import("@/components/map/RiskMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-midnight/50">
      <div className="flex flex-col items-center gap-2 text-foreground/40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
        <span className="text-xs">Loading map…</span>
      </div>
    </div>
  ),
});

interface RiskMapWrapperProps {
  zones: Zone[];
}

export default function RiskMapWrapper({ zones }: RiskMapWrapperProps) {
  return <RiskMap zones={zones} />;
}
