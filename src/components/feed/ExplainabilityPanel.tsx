"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Source } from "@/types";
import { CheckCircle, XCircle, ChevronDown } from "lucide-react";

interface ExplainabilityPanelProps {
  sources: Source[];
  confidence: number;
}

export default function ExplainabilityPanel({
  sources,
  confidence,
}: ExplainabilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const matched = sources.filter((s) => s.matched).length;

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-foreground/5 px-3 py-2 text-xs text-foreground/60 hover:bg-foreground/10 transition-colors"
        aria-expanded={isOpen}
        aria-label="Toggle explainability details"
      >
        <span>
          Why {confidence}%? — {matched}/{sources.length} sources agree
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 space-y-1.5 rounded-lg bg-midnight/50 p-3">
              {sources.map((source, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs"
                >
                  {source.matched ? (
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/70" />
                  )}
                  <div>
                    <span className="font-medium text-foreground/80">
                      {source.name}
                    </span>
                    <span
                      className={`ml-1.5 ${
                        source.matched
                          ? "text-emerald-400/70"
                          : "text-red-400/50"
                      }`}
                    >
                      {source.matched ? "Matched" : "Not matched"}
                    </span>
                    <p className="mt-0.5 text-foreground/40">{source.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
