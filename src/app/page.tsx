import Link from "next/link";
import type { Metadata } from "next";
import { getZones } from "@/lib/data/getZones";
import { getDetections } from "@/lib/data/getDetections";
import SwimmingFishWrapper from "@/components/hero/SwimmingFishWrapper";
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
  title: "DeepSea Guardian — AI-Powered Deep Ocean Pollution & Biodiversity Monitoring",
  description:
    "AI-powered real-time monitoring dashboard for deep-sea ecosystems. DeepSea Guardian fuses data from underwater drones, sonar arrays, satellite imagery, and IoT sensors to track ocean pollution, ghost fishing nets, coral bleaching, and marine biodiversity — with full detection explainability.",
  keywords: [
    "deep sea monitoring dashboard",
    "ocean pollution AI",
    "marine biodiversity tracker",
    "coral bleaching early warning",
    "ghost fishing net detection",
    "underwater drone data fusion",
    "explainable AI ocean",
    "real-time ocean monitoring",
    "HackOcean 2026",
  ],
  openGraph: {
    title: "DeepSea Guardian — AI-Powered Deep Ocean Monitoring",
    description:
      "Turning fragmented ocean data into one live, explainable command center. Monitor 6 deep-sea zones with real-time detection alerts and multi-sensor fusion.",
    url: "https://deepsea-guardian.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    description:
      "Real-time deep-sea ecosystem dashboard with explainable AI detection, zone health scoring, and multi-sensor fusion.",
  },
  alternates: {
    canonical: "https://deepsea-guardian.vercel.app",
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
    <div className="space-y-28 pb-24">
      {/* Swimming fish background — full page, behind everything */}
      <SwimmingFishWrapper />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-24 text-center sm:pt-36">
        {/* Ambient floating orbs */}
        <div className="ambient-orb -top-16 left-1/4 h-[400px] w-[400px] bg-teal/8" style={{ animationDelay: "0s" }} />
        <div className="ambient-orb -top-10 right-1/4 h-[300px] w-[300px] bg-mint/6" style={{ animationDelay: "-7s" }} />
        <div className="ambient-orb top-40 left-1/2 h-[250px] w-[250px] bg-sky-500/5" style={{ animationDelay: "-14s" }} />

        <div className="relative z-10 flex flex-col items-center">
          {/* Sonar icon with subtle glow */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-teal/5 ring-1 ring-teal/20" style={{ boxShadow: "0 0 40px 8px rgba(28, 114, 147, 0.15)" }}>
            <Anchor className="h-9 w-9 text-mint" />
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">DeepSea Guardian</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/55">
            AI-powered monitoring for deep-sea ecosystems. Turning fragmented
            ocean data into one live, explainable command center.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex items-center gap-6 rounded-2xl glass-card px-6 py-3 text-sm">
            <div className="flex items-center gap-2 text-foreground/50">
              <Globe className="h-4 w-4 text-teal" />
              <span>
                <strong className="font-extrabold text-foreground">{zones.length}</strong> Zones
              </span>
            </div>
            <div className="h-4 w-px bg-foreground/15" />
            <div className="flex items-center gap-2 text-foreground/50">
              <Waves className="h-4 w-4 text-sky-400" />
              <span>
                <strong className="font-extrabold text-foreground">{detections.length}</strong>{" "}
                Detections
              </span>
            </div>
            <div className="h-4 w-px bg-foreground/15" />
            <div className="flex items-center gap-2 text-foreground/50">
              <Radio className="h-4 w-4 text-emerald-400 pulse-live" />
              <span className="text-emerald-400 font-medium">Live</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="cta-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal to-mint px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-1"
            >
              Enter Command Center
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 px-7 py-3.5 text-sm font-medium text-foreground/70 transition-all duration-300 hover:bg-foreground/5 hover:border-foreground/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-lg" />

      {/* Features Grid */}
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
          What Makes This Different
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card stat-card-accent card-shimmer p-7 transition-all duration-300 hover:border-teal/25 hover:shadow-lg hover:shadow-teal/8 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal/15 to-mint/10 ring-1 ring-teal/15">
                <f.icon className="h-5 w-5 text-mint" />
              </div>
              <h3 className="text-sm font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/45">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-lg" />

      {/* Problem Statement */}
      <section className="mx-auto max-w-2xl text-center">
        <div className="glass-card p-10 relative overflow-hidden">
          {/* Subtle gradient border glow */}
          <div className="absolute inset-0 rounded-[1rem] p-px bg-gradient-to-br from-teal/20 via-transparent to-mint/20 pointer-events-none" />
          
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal/60">
            HackOcean 2026 — PS03
          </h2>
          <p className="mt-5 text-xl font-bold gradient-text">
            AI-Powered Deep Ocean Pollution &amp; Biodiversity Monitoring
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/50">
            Deep-sea ecosystems face mounting threats from pollution, ghost fishing
            nets, coral bleaching, and biodiversity loss. DeepSea Guardian
            simulates a real-time monitoring platform that fuses data from
            underwater drones, sonar arrays, satellite imagery, and IoT sensors —
            surfacing actionable insights through an explainable AI framework.
          </p>
          <div className="section-divider mx-auto mt-6 max-w-[160px]" />
          <p className="mt-5 text-xs font-medium text-foreground/30">
            Team HRA — Anay Shivhare · Harsh Vardhan Rajput · Rashi Gupta
          </p>
        </div>
      </section>
    </div>
  );
}
