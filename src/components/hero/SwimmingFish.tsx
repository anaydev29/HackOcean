"use client";

import { useMemo } from "react";

/**
 * A single small fish SVG — simple silhouette with tail fin.
 * Tinted to match the deep-sea palette.
 */
function FishSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="18" cy="10" rx="12" ry="6.5" fill={color} opacity="0.7" />
      {/* Tail fin */}
      <polygon points="30,10 38,3 38,17" fill={color} opacity="0.55" />
      {/* Eye */}
      <circle cx="10" cy="8.5" r="1.5" fill="#0B1120" opacity="0.7" />
      {/* Dorsal fin */}
      <polygon points="15,3.5 20,1 22,3.5" fill={color} opacity="0.45" />
    </svg>
  );
}

interface FishData {
  id: number;
  top: number;          // % from top
  size: number;         // px width of fish
  duration: number;     // seconds for one crossing
  delay: number;        // negative delay for stagger
  color: string;
  direction: "ltr" | "rtl"; // swim direction
  opacity: number;
}

const PALETTE = [
  "#2EB093",  // mint
  "#1C7293",  // teal
  "#38bdf8",  // sky-400
  "#34d399",  // emerald-400
  "#22d3ee",  // cyan-400
  "#2EB093",
  "#1C7293",
];

/**
 * Deterministic seed-based pseudo-random (no Math.random for visible data).
 * Simple LCG producing 0–1 from a seed integer.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function SwimmingFish() {
  const fish: FishData[] = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i + 1);
      const r2 = seededRandom(i + 50);
      const r3 = seededRandom(i + 100);
      const r4 = seededRandom(i + 150);

      return {
        id: i,
        top: 8 + r1 * 80,                        // 8% – 88% of viewport height
        size: 18 + r2 * 22,                       // 18px – 40px
        duration: 18 + r3 * 30,                   // 18s – 48s (slow, ambient)
        delay: -(r4 * 40),                        // staggered start
        color: PALETTE[i % PALETTE.length],
        direction: i % 3 === 0 ? "rtl" : "ltr",  // most swim left-to-right
        opacity: 0.25 + r2 * 0.35,               // 0.25 – 0.6 (subtle)
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {fish.map((f) => (
        <div
          key={f.id}
          className="absolute"
          style={{
            top: `${f.top}%`,
            opacity: f.opacity,
            animation: `${
              f.direction === "ltr" ? "swimLTR" : "swimRTL"
            } ${f.duration}s linear ${f.delay}s infinite`,
            transform: f.direction === "rtl" ? "scaleX(-1)" : undefined,
          }}
        >
          <FishSVG color={f.color} size={f.size} />
        </div>
      ))}

      <style>{`
        @keyframes swimLTR {
          0%   { left: -60px; }
          100% { left: calc(100vw + 60px); }
        }
        @keyframes swimRTL {
          0%   { right: -60px; }
          100% { right: calc(100vw + 60px); }
        }
      `}</style>
    </div>
  );
}
