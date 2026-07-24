# 🌊 DeepSea Guardian — AI-Powered Ocean Monitoring Command Center

**HackOcean 2026 — Round 2: Deep Ocean (Grand Finale)**  
**Problem Statement:** PS03 — AI-Powered Deep Ocean Pollution & Biodiversity Monitoring  
**Team:** Team HRA (Anay Shivhare, Harsh Vardhan Rajput, Rashi Gupta)

---

## 📌 Overview

**DeepSea Guardian** is a real-time monitoring dashboard for deep-sea ecosystems. It simulates data streams from underwater ROV drones, acoustic sonar arrays, satellite imagery, and deep-sea IoT sensors to surface marine pollution, ghost fishing nets, coral bleaching, and biodiversity risks — fusing fragmented ocean data into a single, live, explainable command center.

The application features a **deterministic simulation data layer** grounded in real oceanographic depth zones, real species names, and plausible sensor configurations, paired with explainable AI detection breakdowns.

---

## ✨ Key Features & Differentiators

1. **Zone Health Index (Hero Metric)**  
   - Composite 0–100 score per zone calculated via a weighted deterministic formula (`pollution 40% + coral bleaching 30% + biodiversity 30%`).
   
2. **Detection Explainability Panel**  
   - Every alert breaks down *why* it was flagged, detailing which sensor sources corroborated the event (e.g. Sonar ✓, ROV Drone ✓, Satellite ✗ due to depth).

3. **Live Data Ticker**  
   - A real-time `setInterval`-driven event ticker at the bottom of the screen simulates live incoming telemetry stream updates.

4. **Interactive Deep-Sea Risk Map**  
   - Dark-themed map powered by Leaflet.js rendering zone markers color-coded directly by their Zone Health Index score.

5. **30-Day Ecosystem Trend Charts**  
   - Interactive Recharts area graphs displaying 30-day time-series data for pollution levels, biodiversity index, and bleaching rates per zone.

6. **Accessibility & Responsive Design**  
   - Full keyboard navigation support, high contrast ratio dark mode palette, proper ARIA landmark roles (`feed`, `status`, `navigation`), and mobile-responsive layouts.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom DeepSea Color System & Glassmorphism effects)
- **Mapping:** Leaflet.js + React-Leaflet (Carto Dark basemaps)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

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

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hackocean.git
   cd hackocean
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Data Methodology Note

*Data is simulated using ranges modeled on the NOAA Marine Debris Program & GBIF biodiversity datasets. All scores are computed deterministically without `Math.random()` to ensure internal data consistency.*
