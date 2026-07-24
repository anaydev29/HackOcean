import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Database,
  Brain,
  Shield,
  Eye,
  BarChart3,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About & Methodology | DeepSea Guardian",
  description:
    "How DeepSea Guardian simulates deep-sea monitoring — data methodology, scoring formulas, and design rationale.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Command Center
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">About DeepSea Guardian</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Problem framing, data methodology, and the design philosophy behind
          our deep-sea monitoring simulation.
        </p>
      </div>

      {/* Problem Statement */}
      <section className="glass-card p-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Brain className="h-4 w-4 text-teal" />
          Problem Statement — PS03
        </h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          Deep-sea ecosystems remain one of the least monitored environments on
          Earth, yet they face escalating threats from illegal dumping, ghost
          fishing nets, coral bleaching driven by ocean warming, and
          accelerating biodiversity loss. Current monitoring efforts are
          fragmented — individual sensors produce isolated data streams with no
          unified view.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          DeepSea Guardian addresses this by simulating an AI-powered command
          center that fuses data from underwater drones, sonar arrays, satellite
          imagery, and IoT sensors into a single, explainable dashboard. Every
          detection includes a transparency layer showing which sources
          corroborated the alert and which didn&apos;t.
        </p>
      </section>

      {/* Data Methodology */}
      <section className="glass-card p-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-mint" />
          Data Methodology
        </h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          This is a{" "}
          <strong className="text-foreground">frontend-only simulation</strong>{" "}
          with a deterministic data layer. All mock data is grounded in real
          reference points:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-foreground/60">
          <li className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <strong className="text-foreground/80">Depth zones</strong> use
              actual oceanographic classifications (mesopelagic, bathyal,
              abyssal, hadal) with plausible coordinates.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <strong className="text-foreground/80">Species names</strong> are
              real deep-sea organisms (Giant Isopod, Coelacanth, Dumbo Octopus)
              found at the respective depth ranges.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <strong className="text-foreground/80">
                Pollution & bleaching ranges
              </strong>{" "}
              are modeled on data patterns from the NOAA Marine Debris Program
              and GBIF biodiversity datasets.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>
              <strong className="text-foreground/80">
                No <code className="rounded bg-foreground/10 px-1 py-0.5 text-xs">Math.random()</code>
              </strong>{" "}
              is used for any visible data. All scores are computed via
              deterministic formulas that produce consistent, correlated results.
            </span>
          </li>
        </ul>
      </section>

      {/* Scoring Formulas */}
      <section className="glass-card p-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <BarChart3 className="h-4 w-4 text-sky-400" />
          Scoring Formulas
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
              <Shield className="h-3.5 w-3.5" /> Zone Health Index (0–100)
            </h3>
            <div className="mt-2 rounded-lg bg-midnight/60 p-3 font-mono text-xs text-sky-300">
              healthIndex = pollution(40%) + bleaching(30%) + biodiversity(30%)
            </div>
            <p className="mt-2 text-xs text-foreground/50">
              Weighted roll-up where each sub-component maps to a numeric score.
              The headline number always reflects its sub-components — never set
              independently.
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
              <Eye className="h-3.5 w-3.5" /> Detection Confidence (0–100%)
            </h3>
            <div className="mt-2 rounded-lg bg-midnight/60 p-3 font-mono text-xs text-sky-300">
              confidence = baseRate(matchedSources) + agreementBonus -
              conflictPenalty
            </div>
            <p className="mt-2 text-xs text-foreground/50">
              1 matched source ≈ 60–70% · 2 agreeing ≈ 75–85% · 3 agreeing ≈
              90%+. Sources that participated but didn&apos;t match reduce trust.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass-card p-6">
        <h2 className="mb-3 text-sm font-semibold">Tech Stack</h2>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
          {[
            "Next.js (App Router)",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
            "Framer Motion",
            "Recharts",
            "Leaflet.js",
            "Lucide React",
            "Vercel",
          ].map((tech) => (
            <div
              key={tech}
              className="rounded-lg bg-foreground/5 px-3 py-2 text-center font-medium text-foreground/70"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="glass-card p-6">
        <h2 className="mb-3 text-sm font-semibold">Team HRA</h2>
        <p className="text-sm text-foreground/60">
          Built for HackOcean 2026 — Round 2: Deep Ocean (Grand Finale)
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {["Anay Shivhare", "Harsh Vardhan Rajput", "Rashi Gupta"].map(
            (name) => (
              <span
                key={name}
                className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
              >
                {name}
              </span>
            )
          )}
        </div>
      </section>

      {/* References */}
      <section className="text-xs text-foreground/30">
        <p>
          Data methodology note: Simulated using ranges modeled on{" "}
          <a
            href="https://marinedebris.noaa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground/50"
          >
            NOAA Marine Debris Program
            <ExternalLink className="ml-0.5 inline h-3 w-3" />
          </a>{" "}
          &{" "}
          <a
            href="https://www.gbif.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground/50"
          >
            GBIF Biodiversity Data
            <ExternalLink className="ml-0.5 inline h-3 w-3" />
          </a>
          .
        </p>
      </section>
    </div>
  );
}
