"use client";

import dynamic from "next/dynamic";

const JellyfishScene = dynamic(
  () => import("@/components/hero/JellyfishScene"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: 280, height: 280 }}
        className="flex items-center justify-center"
        aria-hidden="true"
      >
        {/* Empty placeholder while Three.js loads — no layout shift */}
      </div>
    ),
  }
);

export default function JellyfishHero() {
  return <JellyfishScene />;
}
