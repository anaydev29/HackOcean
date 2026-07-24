import Link from "next/link";
import type { Metadata } from "next";
import { getZones } from "@/lib/data/getZones";
import { getDetections } from "@/lib/data/getDetections";
import {
  Anchor,
  ArrowRight,
  Shield,
  Eye,
  Radio,
  Waves,
  Activity,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DeepSea Guardian — AI-Powered Ocean Monitoring",
  description:
    "Real-time monitoring dashboard for deep-sea ecosystems. Track pollution, ghost fishing nets, coral bleaching, and biodiversity using multi-sensor fusion.",
  openGraph: {
    title: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    description:
      "Turning fragmented ocean data into one live, explainable command center.",
    type: "website",
  },
};

export default async function LandingPage() {
  const [zones, detections] = await Promise.all([
    getZones(),
    getDetections(),
  ]);

  const features = [
    {
      icon: Shield,
      title: "Zone Health Index",
      description:
        "One composite score per zone fusing pollution, bleaching, and biodiversity data — a clear hero metric instead of scattered widgets.",
    },
    {
      icon: Eye,
      title: "Detection Explainability",
      description:
        "Every alert shows why it was flagged: which sensor sources agreed, which didn't. Mirrors real multi-sensor fusion logic.",
    },
    {
      icon: Radio,
      title: "Live Data Ticker",
      description:
        "Dashboard breathes with real-time simulated updates from underwater drones, sonar, satellites, and IoT sensors.",
    },
    {
      icon: Activity,
      title: "Consistent Mock Data",
      description:
        "Confidence scores scale with corroborating sources. Pollution and biodiversity trends correlate — no random contradictions.",
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-20 text-center sm:pt-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-20 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal to-mint shadow-xl shadow-teal/20">
            <Anchor className="h-8 w-8 text-white" />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">DeepSea Guardian</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/60">
            AI-powered monitoring for deep-sea ecosystems. Turning fragmented
            ocean data into one live, explainable command center.
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-foreground/50">
              <Globe className="h-4 w-4 text-teal" />
              <span>
                <strong className="text-foreground">{zones.length}</strong> Zones
              </span>
            </div>
            <div className="h-4 w-px bg-foreground/20" />
            <div className="flex items-center gap-2 text-foreground/50">
              <Waves className="h-4 w-4 text-sky-400" />
              <span>
                <strong className="text-foreground">{detections.length}</strong>{" "}
                Detections
              </span>
            </div>
            <div className="h-4 w-px bg-foreground/20" />
            <div className="flex items-center gap-2 text-foreground/50">
              <Radio className="h-4 w-4 text-emerald-400 pulse-live" />
              <span className="text-emerald-400 font-medium">Live</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal to-mint px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition-all hover:shadow-xl hover:shadow-teal/30 hover:-translate-y-0.5"
            >
              Enter Command Center
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 px-6 py-3 text-sm font-medium text-foreground/70 transition-all hover:bg-foreground/5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-foreground/40">
          What Makes This Different
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 transition-all hover:border-sky-400/20">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <f.icon className="h-5 w-5 text-teal" />
              </div>
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Statement */}
      <section className="mx-auto max-w-2xl text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/40">
          HackOcean 2026 — PS03
        </h2>
        <p className="mt-4 text-lg font-medium text-foreground/80">
          AI-Powered Deep Ocean Pollution & Biodiversity Monitoring
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">
          Deep-sea ecosystems face mounting threats from pollution, ghost fishing
          nets, coral bleaching, and biodiversity loss. DeepSea Guardian
          simulates a real-time monitoring platform that fuses data from
          underwater drones, sonar arrays, satellite imagery, and IoT sensors —
          surfacing actionable insights through an explainable AI framework.
        </p>
        <p className="mt-4 text-xs text-foreground/30">
          Team HRA — Anay Shivhare, Harsh Vardhan Rajput, Rashi Gupta
        </p>
      </section>
    </div>
  );
}
