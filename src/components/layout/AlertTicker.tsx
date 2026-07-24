"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Detection } from "@/types";
import { generateTickerDetection } from "@/lib/data/getDetections";
import { detectionTypeLabel } from "@/lib/utils";
import { Radio } from "lucide-react";

export default function AlertTicker() {
  const [current, setCurrent] = useState<Detection | null>(null);
  const tickRef = useRef(0);

  useEffect(() => {
    // Initial detection
    setCurrent(generateTickerDetection(tickRef.current));

    const interval = setInterval(() => {
      tickRef.current += 1;
      setCurrent(generateTickerDetection(tickRef.current));
    }, 8000); // New alert every 8 seconds

    return () => clearInterval(interval);
  }, []);

  if (!current) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-card-border bg-midnight/90 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Live alert ticker"
    >
      <div className="mx-auto flex h-8 max-w-7xl items-center gap-3 px-4 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Radio className="h-3 w-3 pulse-live" />
          <span className="font-semibold uppercase tracking-wide">Live</span>
        </div>
        <div className="h-3 w-px bg-foreground/20" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <span className="shrink-0 rounded bg-foreground/10 px-1.5 py-0.5 font-medium text-sky-300">
              {detectionTypeLabel(current.type)}
            </span>
            <span className="truncate text-foreground/60">
              {current.summary}
            </span>
            <span className="shrink-0 text-foreground/40">
              {current.confidence}% confidence
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
