"use client";

import dynamic from "next/dynamic";

const SwimmingFish = dynamic(
  () => import("@/components/hero/SwimmingFish"),
  { ssr: false }
);

export default function SwimmingFishWrapper() {
  return <SwimmingFish />;
}
