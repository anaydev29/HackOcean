# 🌊 DeepSea Guardian — AI-Powered Ocean Monitoring Command Center

**HackOcean 2026 — Round 2: Deep Ocean (Grand Finale)**
**Problem Statement:** PS03 — AI-Powered Deep Ocean Pollution & Biodiversity Monitoring
**Team:** Team HRA (Anay Shivhare, Harsh Vardhan Rajput, Rashi Gupta)

🔗 **Live Demo:** [hack-ocean.vercel.app](https://hack-ocean.vercel.app/)

---

## 📌 Overview

DeepSea Guardian is a real-time monitoring dashboard for deep-sea ecosystems. It simulates data streams from underwater ROV drones, acoustic sonar arrays, satellite imagery, and deep-sea IoT sensors to surface marine pollution, ghost fishing nets, coral bleaching, and biodiversity risks — fusing fragmented ocean data into a single, live, explainable command center.

Deep-sea ecosystems remain one of the least monitored environments on Earth, yet face escalating threats from illegal dumping, ghost fishing nets, ocean-warming-driven coral bleaching, and accelerating biodiversity loss. Current monitoring efforts are fragmented, with individual sensors producing isolated data streams and no unified view. DeepSea Guardian addresses this by simulating an AI-powered command center that fuses drone, sonar, satellite, and IoT data into a single, explainable dashboard — where every detection includes a transparency layer showing which sources corroborated the alert and which didn't.

The application is a **frontend-only simulation** built on a deterministic data layer grounded in real oceanographic depth zones, real species names, and plausible sensor configurations, paired with explainable AI detection breakdowns. It currently tracks **6 zones** and **12 live detections**.

---

## ✨ Key Features & Differentiators

1. **Zone Health Index (Hero Metric)**
   One composite 0–100 score per zone, fusing pollution, bleaching, and biodiversity data via a weighted deterministic formula (`pollution 40% + bleaching 30% + biodiversity 30%`) — a clear hero metric instead of scattered widgets.

2. **Detection Explainability Panel**
   Every alert breaks down why it was flagged, detailing which sensor sources corroborated the event (e.g. Sonar ✓, ROV Drone ✓, Satellite ✗ due to depth) and includes a confidence score that mirrors real multi-sensor fusion logic.

3. **Live Data Ticker**
   The dashboard "breathes" with a real-time `setInterval`-driven event ticker simulating live incoming telemetry from underwater drones, sonar, satellites, and IoT sensors.

4. **Interactive Deep-Sea Risk Map**
   Dark-themed map powered by Leaflet.js rendering zone markers color-coded directly by their Zone Health Index score.

5. **30-Day Ecosystem Trend Charts**
   Interactive Recharts area graphs displaying 30-day time-series data for pollution levels, biodiversity index, and bleaching rates per zone.

6. **Consistent, Deterministic Mock Data**
   No `Math.random()` is used anywhere — confidence scores scale predictably with corroborating sources, and pollution/biodiversity trends correlate, with no random contradictions between related metrics.

7. **Accessibility & Responsive Design**
   Full keyboard navigation support, high-contrast dark mode palette, proper ARIA landmark roles (`feed`, `status`, `navigation`), and mobile-responsive layouts.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (custom DeepSea color system & glassmorphism effects)
* **UI Components:** shadcn/ui
* **Mapping:** Leaflet.js + React-Leaflet (Carto Dark basemaps)
* **Charts:** Recharts
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 🏗️ Architecture & Information Architecture

```
/                       → Landing Page & Mission Overview
/dashboard              → Main Command Center (Risk Map + Zone Health + Detection Feed)
/dashboard/zone/[id]    → Single Zone Deep-Dive (30-day trend chart + zone details)
/dashboard/alerts       → Full Detection Feed with Type Filters
/about                  → Problem Framing, Data Methodology & Scoring Formulas
```

---

## 🚀 Getting Started Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/hackocean.git
cd hackocean
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Data Methodology

This is a **frontend-only simulation** — there is no live backend or real sensor hardware. All mock data is grounded in real reference points:

- **Depth zones** use actual oceanographic classifications (mesopelagic, bathyal, abyssal, hadal) with plausible coordinates.
- **Species names** are real deep-sea organisms (e.g. Giant Isopod, Coelacanth, Dumbo Octopus) found at their respective depth ranges.
- **Pollution & bleaching ranges** are modeled on data patterns from the [NOAA Marine Debris Program](https://marinedebris.noaa.gov/) and [GBIF Biodiversity Data](https://www.gbif.org/).
- **No `Math.random()`** is used for any visible data — all scores are computed via deterministic formulas that produce consistent, correlated results.

### Scoring Formulas

**Zone Health Index (0–100):**

```
healthIndex = pollution(40%) + bleaching(30%) + biodiversity(30%)
```

A weighted roll-up where each sub-component maps to a numeric score. The headline number always reflects its sub-components — it is never set independently.

**Detection Confidence (0–100%):**

```
confidence = baseRate(matchedSources) + agreementBonus - conflictPenalty
```

- 1 matched source ≈ 60–70%
- 2 agreeing sources ≈ 75–85%
- 3 agreeing sources ≈ 90%+

Sources that participated in a detection but didn't corroborate it reduce overall trust in the score.

---

## 👥 Team HRA

Built for **HackOcean 2026 — Round 2: Deep Ocean (Grand Finale)**

- Anay Shivhare
- Harsh Vardhan Rajput
- Rashi Gupta
